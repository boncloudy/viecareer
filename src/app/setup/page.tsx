"use client";

import React, { useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { TopNavbar } from "@/components/top-navbar";
import { UploadDropzone } from "@/components/upload-dropzone";
import { CircularScore } from "@/components/circular-score";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useApp } from "@/lib/app-context";
import {
  userProfile,
  jobRequirements,
  atsMatchScore,
  gapAnalysis,
} from "@/lib/mock-data";
import type { GapSkill } from "@/lib/mock-data";
import { extractCVJDWithAI } from "@/lib/jri-calculator";
import { API_BASE } from "@/lib/api-config";
import { Lock, ShieldCheck, ArrowRight, BrainCircuit, CheckCircle2, Loader2, AlertTriangle, XCircle, ChevronDown, ChevronUp } from "lucide-react";

// Helper: upload file to backend for proper text extraction (PDF, DOCX, TXT)
async function parseFileViaBackend(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${API_BASE}/parse-file`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: "File parsing failed" }));
    throw new Error(err.detail || `Server error ${res.status}`);
  }

  const data = await res.json();
  return data.text;
}

export default function SetupPage() {
  const router = useRouter();
  const app = useApp();

  const [cvUploading, setCvUploading] = useState(false);
  const [cvUploaded, setCvUploaded] = useState(false);
  const [cvFileName, setCvFileName] = useState("");

  const [jdUploading, setJdUploading] = useState(false);
  const [jdUploaded, setJdUploaded] = useState(false);
  const [jdFileName, setJdFileName] = useState("");

  const [isExtracting, setIsExtracting] = useState(false);
  const [showExtraction, setShowExtraction] = useState(false);

  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const jdUploadedRef = useRef(false);
  const cvUploadedRef = useRef(false);

  // Data to display: real extraction if available, otherwise mock fallback
  const ext = app.extraction;

  const displayProfile = ext
    ? { fullName: ext.fullName, targetPosition: ext.targetPosition, techStack: ext.techStack }
    : userProfile;
  const displayJobReqs = ext
    ? { mustHaveSkills: ext.mustHaveSkills, educationLevel: ext.educationLevel, keyResponsibilities: ext.keyResponsibilities }
    : jobRequirements;
  const displayAtsScore = ext ? ext.atsScore : atsMatchScore;
  const displayGapAnalysis = ext ? ext.gapAnalysis : gapAnalysis;

  const triggerExtraction = useCallback(async () => {
    setIsExtracting(true);

    try {
      const result = await extractCVJDWithAI(app.cvTextContent, app.jdTextContent);
      app.setExtraction(result);
    } catch (err) {
      console.error("AI extraction failed:", err);
    }

    setIsExtracting(false);
    setShowExtraction(true);
    app.setExtractionVisible(true);
  }, [app]);

  const handleCvFile = useCallback(async (file: File) => {
    setCvUploading(true);
    setCvFileName(file.name);

    try {
      const text = await parseFileViaBackend(file);
      app.setCvTextContent(text);
    } catch (err) {
      console.error("CV parsing failed:", err);
      app.setCvTextContent(`[Failed to parse ${file.name}]`);
    }

    setCvUploading(false);
    setCvUploaded(true);
    cvUploadedRef.current = true;
    app.setCvUploaded(true);
    app.setCvFileName(file.name);
    if (jdUploadedRef.current) {
      triggerExtraction();
    }
  }, [app, triggerExtraction]);

  const handleJdFile = useCallback(async (file: File) => {
    setJdUploading(true);
    setJdFileName(file.name);

    try {
      const text = await parseFileViaBackend(file);
      app.setJdTextContent(text);
    } catch (err) {
      console.error("JD parsing failed:", err);
      app.setJdTextContent(`[Failed to parse ${file.name}]`);
    }

    setJdUploading(false);
    setJdUploaded(true);
    jdUploadedRef.current = true;
    app.setJdUploaded(true);
    app.setJdFileName(file.name);
    if (cvUploadedRef.current) {
      triggerExtraction();
    }
  }, [app, triggerExtraction]);

  const handleRescan = useCallback(() => {
    setCvUploaded(false);
    setCvUploading(false);
    setCvFileName("");
    cvUploadedRef.current = false;

    setJdUploaded(false);
    setJdUploading(false);
    setJdFileName("");
    jdUploadedRef.current = false;

    setShowExtraction(false);
    setIsExtracting(false);

    app.setCvUploaded(false);
    app.setJdUploaded(false);
    app.setCvFileName("");
    app.setJdFileName("");
    app.setExtractionVisible(false);
    app.setExtraction(null);
    app.setCvTextContent("");
    app.setJdTextContent("");
  }, [app]);

  return (
    <div className="min-h-screen bg-white">
      <TopNavbar />

      <main className="max-w-5xl mx-auto px-6 py-12">
        {/* Title */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-[#191A23] mb-2">
            Context Setup
          </h1>
          <p className="text-[#191A23]/60 text-lg">
            Upload your profile and the job description to begin the AI-powered
            interview simulation.
          </p>
          <div className="mt-2 inline-flex items-center gap-2 bg-[#5378EF]/10 border border-[#5378EF]/30 rounded-full px-4 py-1.5">
            <span className="w-2 h-2 bg-[#5378EF] rounded-full animate-pulse" />
            <span className="text-sm font-medium text-[#5378EF]">AI-Powered — Real extraction & scoring</span>
          </div>
        </div>

        {/* Upload Zones */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <UploadDropzone
            title="Upload CV/Resume"
            subtitle="Drag and drop your PDF or Docx here"
            isUploading={cvUploading}
            isUploaded={cvUploaded}
            fileName={cvFileName}
            onFileSelected={handleCvFile}
            variant="cv"
          />
          <UploadDropzone
            title="Upload Job Description (JD)"
            subtitle="Drag and drop the JD PDF or Docx here"
            isUploading={jdUploading}
            isUploaded={jdUploaded}
            fileName={jdFileName}
            onFileSelected={handleJdFile}
            variant="jd"
          />
        </div>

        {/* Extraction Loading */}
        {isExtracting && (
          <Card className="p-12 text-center border-2 border-[#191A23] shadow-[4px_4px_0_#191A23] mb-8 animate-fade-in-up bg-white rounded-2xl">
            <Loader2 className="w-10 h-10 text-[#5378EF] animate-spin mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-[#191A23] mb-1">
              AI is extracting & scoring your documents...
            </h3>
            <p className="text-sm text-[#191A23]/60">
              Calculating ATS score, gap analysis, and JRI baseline using real AI
            </p>
          </Card>
        )}

        {/* AI Preview & Extraction */}
        {showExtraction && (
          <Card className="p-8 animate-fade-in-up border-2 border-[#191A23] shadow-[4px_4px_0_#191A23] bg-white rounded-2xl">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2">
                <BrainCircuit className="w-5 h-5 text-[#5378EF]" />
                <h2 className="text-xl font-bold text-[#191A23]">
                  AI Preview & Extraction
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#5378EF]" />
                <span className="text-xs font-semibold text-[#5378EF] uppercase tracking-wider">
                  AI Extracted — Real Analysis
                </span>
              </div>
            </div>

            {/* Uploaded Files Info */}
            <div className="flex gap-4 mb-6">
              <div className="flex items-center gap-2 bg-[#F3F3F3] px-3 py-2 rounded-lg border-2 border-[#191A23] text-sm">
                <CheckCircle2 className="w-4 h-4 text-[#5378EF]" />
                <span className="text-[#191A23]/60">CV:</span>
                <span className="font-medium text-[#191A23]">{cvFileName}</span>
              </div>
              <div className="flex items-center gap-2 bg-[#F3F3F3] px-3 py-2 rounded-lg border-2 border-[#191A23] text-sm">
                <CheckCircle2 className="w-4 h-4 text-[#5378EF]" />
                <span className="text-[#191A23]/60">JD:</span>
                <span className="font-medium text-[#191A23]">{jdFileName}</span>
              </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Left: Extracted Profile */}
              <div className="space-y-5">
                <h3 className="text-xs font-bold text-[#191A23]/50 uppercase tracking-widest">
                  AI Extracted Profile
                </h3>
                <div>
                  <label className="text-xs font-semibold text-[#5378EF] uppercase tracking-wider">
                    Full Name
                  </label>
                  <p className="mt-1 text-base text-[#191A23] bg-[#F3F3F3] px-4 py-2.5 rounded-lg border-2 border-[#191A23]/20">
                    {displayProfile.fullName}
                  </p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#5378EF] uppercase tracking-wider">
                    Target Position
                  </label>
                  <p className="mt-1 text-base text-[#191A23] bg-[#F3F3F3] px-4 py-2.5 rounded-lg border-2 border-[#191A23]/20">
                    {displayProfile.targetPosition}
                  </p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#5378EF] uppercase tracking-wider">
                    Technical Stack
                  </label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {displayProfile.techStack.slice(0, 3).map((tech) => (
                      <Badge
                        key={tech}
                        variant="outline"
                        className="text-sm px-3 py-1 border-2 border-[#191A23] text-[#191A23]"
                      >
                        {tech}
                      </Badge>
                    ))}
                    {displayProfile.techStack.length > 3 && (
                      <Badge
                        variant="outline"
                        className="text-sm px-3 py-1 border-2 border-[#191A23]/30 text-[#191A23]/50"
                      >
                        +{displayProfile.techStack.length - 3}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>

              {/* Center: Score */}
              <div className="flex flex-col items-center justify-center">
                <CircularScore
                  score={displayAtsScore}
                  label="JRI BASELINE"
                  sublabel=""
                  size={140}
                  strokeWidth={8}
                  color="#191A23"
                />
                {ext && (
                  <p className="mt-3 text-xs text-[#191A23]/50 text-center max-w-[180px]">
                    ATS: S_skill={ext.atsComponents.S_skill} S_exp={ext.atsComponents.S_exp} S_edu={ext.atsComponents.S_edu} S_sem={ext.atsComponents.S_sem}
                  </p>
                )}
              </div>

              {/* Right: Job Requirements */}
              <div className="space-y-5">
                <h3 className="text-xs font-bold text-[#191A23]/50 uppercase tracking-widest">
                  Extracted Job Requirements
                </h3>
                <div>
                  <label className="text-xs font-semibold text-[#5378EF] uppercase tracking-wider">
                    Must-Have Skills
                  </label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {displayJobReqs.mustHaveSkills.map((skill) => (
                      <Badge
                        key={skill}
                        className="bg-[#5378EF]/10 text-[#5378EF] border border-[#5378EF]/30 px-3 py-1 text-sm"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#5378EF] uppercase tracking-wider">
                    Education Level
                  </label>
                  <p className="mt-1 text-base text-[#191A23] font-medium">
                    {displayJobReqs.educationLevel}
                  </p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#5378EF] uppercase tracking-wider">
                    Key Responsibilities
                  </label>
                  <ul className="mt-2 space-y-2">
                    {displayJobReqs.keyResponsibilities.map((resp, i) => (
                      <li key={i} className="text-sm text-[#191A23]/70 leading-relaxed">
                        {resp}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Gap Analysis Detail */}
            <div className="mt-10 pt-8 border-t border-[#191A23]/10">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-bold text-[#191A23]">
                    Gap Analysis Detail
                  </h3>
                  <p className="text-sm text-[#191A23]/50 mt-1">
                    Breakdown of skill matches between your CV and the job description
                  </p>
                </div>
                <div className="flex items-center gap-4 text-xs">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    Matched
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                    Partial
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                    Missing
                  </span>
                </div>
              </div>

              {/* Summary Stats */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                {(() => {
                  const all = displayGapAnalysis.flatMap((c) => c.skills);
                  const matched = all.filter((s) => s.status === "matched").length;
                  const partial = all.filter((s) => s.status === "partial").length;
                  const missing = all.filter((s) => s.status === "missing").length;
                  return (
                    <>
                      <div className="bg-emerald-50 border-2 border-emerald-200 rounded-xl p-4 text-center">
                        <p className="text-2xl font-bold text-emerald-600">{matched}</p>
                        <p className="text-xs font-semibold text-emerald-600/70 uppercase tracking-wider mt-1">Skills Matched</p>
                      </div>
                      <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-4 text-center">
                        <p className="text-2xl font-bold text-amber-600">{partial}</p>
                        <p className="text-xs font-semibold text-amber-600/70 uppercase tracking-wider mt-1">Partial Match</p>
                      </div>
                      <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 text-center">
                        <p className="text-2xl font-bold text-red-600">{missing}</p>
                        <p className="text-xs font-semibold text-red-600/70 uppercase tracking-wider mt-1">Skills Missing</p>
                      </div>
                    </>
                  );
                })()}
              </div>

              {/* Category Breakdown */}
              <div className="space-y-3">
                {displayGapAnalysis.map((category) => {
                  const isExpanded = expandedCategory === category.category;
                  const matchedCount = category.skills.filter((s) => s.status === "matched").length;
                  const totalCount = category.skills.length;

                  return (
                    <div
                      key={category.category}
                      className="border-2 border-[#191A23]/10 rounded-xl overflow-hidden"
                    >
                      {/* Category Header */}
                      <button
                        onClick={() => setExpandedCategory(isExpanded ? null : category.category)}
                        className="w-full flex items-center justify-between p-4 hover:bg-[#F3F3F3] transition-colors text-left"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-bold text-[#191A23]">
                            {category.category}
                          </span>
                          <span className="text-xs text-[#191A23]/50">
                            {matchedCount}/{totalCount} matched
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          {/* Mini progress bar */}
                          <div className="w-24 h-2 bg-[#191A23]/10 rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all duration-500"
                              style={{
                                width: `${category.score}%`,
                                backgroundColor: category.score >= 75 ? "#22C55E" : category.score >= 50 ? "#F59E0B" : "#EF4444",
                              }}
                            />
                          </div>
                          <span className="text-sm font-bold text-[#191A23] w-8 text-right">
                            {category.score}%
                          </span>
                          {isExpanded ? (
                            <ChevronUp className="w-4 h-4 text-[#191A23]/40" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-[#191A23]/40" />
                          )}
                        </div>
                      </button>

                      {/* Expanded Skills */}
                      {isExpanded && (
                        <div className="border-t border-[#191A23]/10 bg-[#FAFAFA]">
                          {category.skills.map((skill: GapSkill) => (
                            <div
                              key={skill.skill}
                              className="flex items-start gap-3 p-4 border-b border-[#191A23]/5 last:border-b-0"
                            >
                              {/* Status Icon */}
                              <div className="mt-0.5">
                                {skill.status === "matched" && (
                                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                                )}
                                {skill.status === "partial" && (
                                  <AlertTriangle className="w-5 h-5 text-amber-500" />
                                )}
                                {skill.status === "missing" && (
                                  <XCircle className="w-5 h-5 text-red-500" />
                                )}
                              </div>

                              {/* Skill Info */}
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-sm font-semibold text-[#191A23]">
                                    {skill.skill}
                                  </span>
                                  <Badge
                                    className={`text-[10px] px-2 py-0 ${
                                      skill.status === "matched"
                                        ? "bg-emerald-100 text-emerald-700 border-emerald-200"
                                        : skill.status === "partial"
                                        ? "bg-amber-100 text-amber-700 border-amber-200"
                                        : "bg-red-100 text-red-700 border-red-200"
                                    }`}
                                  >
                                    {skill.status === "matched" ? "Matched" : skill.status === "partial" ? "Partial" : "Missing"}
                                  </Badge>
                                </div>
                                <div className="grid grid-cols-2 gap-4 mt-2">
                                  <div>
                                    <p className="text-[10px] font-semibold text-[#191A23]/40 uppercase tracking-wider mb-1">
                                      Your CV
                                    </p>
                                    <p className="text-xs text-[#191A23]/70 leading-relaxed">
                                      {skill.cvEvidence}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-[10px] font-semibold text-[#191A23]/40 uppercase tracking-wider mb-1">
                                      JD Requirement
                                    </p>
                                    <p className="text-xs text-[#191A23]/70 leading-relaxed">
                                      {skill.jdRequirement}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-4 mt-10 pt-6 border-t border-[#191A23]/10">
              <Button
                variant="ghost"
                className="text-[#191A23]/60 hover:text-[#191A23] text-base rounded-full"
                onClick={handleRescan}
              >
                Re-scan Documents
              </Button>
              <Button
                onClick={() => {
                  app.setCurrentFlow("interview");
                  router.push("/interview");
                }}
                className="bg-[#191A23] hover:bg-[#5378EF] text-white px-8 py-3 text-base h-auto rounded-full transition-colors"
              >
                Proceed to Interview
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </Card>
        )}

        {/* Footer */}
        <div className="flex items-center justify-center gap-6 mt-16 text-sm text-[#191A23]/40">
          <div className="flex items-center gap-1.5">
            <Lock className="w-4 h-4" />
            Secure SSL Encryption
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4" />
            Data Privacy Guaranteed
          </div>
        </div>
      </main>
    </div>
  );
}
