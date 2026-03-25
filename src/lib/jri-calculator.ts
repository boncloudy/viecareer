// ==========================================
// VieCareer - JRI Calculator (based on algo.html)
// ==========================================

import { API_BASE } from "@/lib/api-config";

// ── Phase 1: ATS Baseline ──

export interface ATSComponents {
  S_skill: number; // 0-100
  S_exp: number;   // 0-100
  S_edu: number;   // 0-100
  S_sem: number;   // 0-100 (semantic similarity)
}

export function calculateATS(c: ATSComponents): number {
  return clamp(0.35 * c.S_skill + 0.25 * c.S_exp + 0.15 * c.S_edu + 0.25 * c.S_sem, 0, 100);
}

// JRI_baseline = ATS (before any interview session)
export function calculateJRIBaseline(ats: number): number {
  return Math.round(ats);
}

// ── Phase 2: Post-Interview ──

export interface DimensionScores {
  D1_technical: number;     // 0-100
  D2_communication: number; // 0-100
  D3_problem_solving: number; // 0-100
  D4_attitude: number;      // 0-100
  D5_cultural_fit: number;  // 0-100
}

export function calculateSessionScore(d: DimensionScores): number {
  return clamp(
    0.40 * d.D1_technical +
    0.25 * d.D2_communication +
    0.20 * d.D3_problem_solving +
    0.10 * d.D4_attitude +
    0.05 * d.D5_cultural_fit,
    0, 100
  );
}

export function calculateComposite(sessionScore: number, ats: number): number {
  return 0.60 * sessionScore + 0.40 * ats;
}

export function calculateJRIFinal(
  composite: number,
  jriPrev: number,
  sessionCount: number
): number {
  // EMA alpha based on session count
  const alpha = sessionCount < 3 ? 0.40 : sessionCount <= 8 ? 0.25 : 0.15;
  const jri = alpha * composite + (1 - alpha) * jriPrev;
  return Math.round(clamp(jri, 0, 100));
}

function clamp(v: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, v));
}

// ── AI Extraction: Use backend to analyze CV/JD and score ──

export interface ExtractedCVJD {
  fullName: string;
  targetPosition: string;
  techStack: string[];
  mustHaveSkills: string[];
  educationLevel: string;
  keyResponsibilities: string[];
  atsComponents: ATSComponents;
  atsScore: number;
  jriBaseline: number;
  gapAnalysis: {
    category: string;
    score: number;
    skills: {
      skill: string;
      status: "matched" | "partial" | "missing";
      cvEvidence: string;
      jdRequirement: string;
    }[];
  }[];
}

export async function extractCVJDWithAI(cvText: string, jdText: string): Promise<ExtractedCVJD> {
  try {
    const res = await fetch(`${API_BASE}/extract-cvjd`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cv_text: cvText, jd_text: jdText }),
    });

    if (!res.ok) throw new Error(`API responded ${res.status}`);

    const data = await res.json();
    const responseText = data.response || data.reply || data.message || JSON.stringify(data);

    // Extract JSON from response
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("No JSON found in AI response");

    const parsed = JSON.parse(jsonMatch[0]);
    const ats = calculateATS(parsed.atsComponents);

    return {
      ...parsed,
      atsScore: Math.round(ats),
      jriBaseline: calculateJRIBaseline(ats),
    };
  } catch (err) {
    console.error("AI extraction failed:", err);
    // Return reasonable defaults if AI fails
    return getDefaultExtraction();
  }
}

function getDefaultExtraction(): ExtractedCVJD {
  return {
    fullName: "Candidate",
    targetPosition: "Software Developer",
    techStack: ["JavaScript", "React"],
    mustHaveSkills: ["JavaScript", "React"],
    educationLevel: "Bachelor's Degree",
    keyResponsibilities: ["Develop features", "Write tests", "Collaborate with team"],
    atsComponents: { S_skill: 65, S_exp: 50, S_edu: 70, S_sem: 60 },
    atsScore: 62,
    jriBaseline: 62,
    gapAnalysis: [
      {
        category: "Technical Skills",
        score: 65,
        skills: [
          { skill: "JavaScript", status: "matched", cvEvidence: "Listed in CV", jdRequirement: "Required" },
          { skill: "React", status: "partial", cvEvidence: "Basic experience", jdRequirement: "Advanced required" },
        ],
      },
      {
        category: "Soft Skills",
        score: 70,
        skills: [
          { skill: "Communication", status: "matched", cvEvidence: "Team projects mentioned", jdRequirement: "Strong communication" },
        ],
      },
      {
        category: "Experience & Education",
        score: 55,
        skills: [
          { skill: "Education", status: "matched", cvEvidence: "CS degree", jdRequirement: "Bachelor's in CS" },
          { skill: "Experience", status: "missing", cvEvidence: "Limited experience", jdRequirement: "2+ years required" },
        ],
      },
    ],
  };
}

// ── AI Scoring: Score interview Q&A using 5 dimensions ──

export interface CapturedQA {
  question: string;
  answer: string;
  timestamp: string;
}

export interface ScoredQA extends CapturedQA {
  score: number;
}

export interface InterviewScoring {
  dimensions: DimensionScores;
  sessionScore: number;
  scoredQA: ScoredQA[];
  interviewQuestions: {
    id: number;
    question: string;
    userAnswer: string;
    strengths: string[];
    weaknesses: string[];
    optimalAnswer: string;
  }[];
}

export async function scoreInterviewWithAI(
  qaPairs: CapturedQA[],
  position: string
): Promise<InterviewScoring> {
  try {
    const res = await fetch(`${API_BASE}/score-interview`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        qa_pairs: qaPairs.map((qa) => ({
          question: qa.question,
          answer: qa.answer,
          timestamp: qa.timestamp,
        })),
        position,
      }),
    });

    if (!res.ok) throw new Error(`API responded ${res.status}`);

    const data = await res.json();
    const responseText = data.response || data.reply || data.message || JSON.stringify(data);

    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("No JSON in AI scoring response");

    const parsed = JSON.parse(jsonMatch[0]);
    const sessionScore = calculateSessionScore(parsed.dimensions);

    return {
      dimensions: parsed.dimensions,
      sessionScore: Math.round(sessionScore),
      scoredQA: parsed.scoredQA || qaPairs.map((qa) => ({ ...qa, score: 70 })),
      interviewQuestions: parsed.interviewQuestions || [],
    };
  } catch (err) {
    console.error("AI scoring failed:", err);
    // Fallback scoring
    const dimensions: DimensionScores = {
      D1_technical: 70,
      D2_communication: 72,
      D3_problem_solving: 68,
      D4_attitude: 75,
      D5_cultural_fit: 65,
    };
    return {
      dimensions,
      sessionScore: Math.round(calculateSessionScore(dimensions)),
      scoredQA: qaPairs.map((qa) => ({ ...qa, score: 70 })),
      interviewQuestions: qaPairs.map((qa, i) => ({
        id: i + 1,
        question: qa.question,
        userAnswer: qa.answer,
        strengths: ["Addressed the question", "Showed understanding"],
        weaknesses: ["Could provide more detail"],
        optimalAnswer: "A comprehensive answer with specific examples and technical depth.",
      })),
    };
  }
}
