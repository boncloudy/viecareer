// ==========================================
// VieCareer - Mock Data & Types
// ==========================================
"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter  } from "next/navigation";

import {
  LayoutDashboard,
  MessageSquare,
  LineChart,
  User,
  Sparkles,
  LogOut,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Interviews", href: "/setup", icon: MessageSquare },
  { label: "Action Plan", href: "/action-plan", icon: LineChart },
  { label: "Profile", href: "#", icon: User },
];

export interface UserProfile {
  fullName: string;
  targetPosition: string;
  techStack: string[];
  email: string;
  avatarInitials: string;
}

export interface JobRequirements {
  mustHaveSkills: string[];
  educationLevel: string;
  keyResponsibilities: string[];
}

export interface InterviewQuestion {
  id: number;
  question: string;
  userAnswer: string;
  strengths: string[];
  weaknesses: string[];
  optimalAnswer: string;
}

export interface RadarDataPoint {
  dimension: string;
  current: number;
  target: number;
  fullMark: number;
}

export interface SkillRecommendation {
  skillGap: string;
  description: string;
  priority: "Critical" | "Moderate" | "Ongoing";
  recommendedAction: string;
  actionLabel: string;
  jdiBoost: string;
}

// ---------- User Profile ----------
export const userProfile: UserProfile = {
  fullName: "Alex Rivera",
  targetPosition: "Frontend Developer Intern",
  techStack: ["React", "Tailwind CSS", "JavaScript", "TypeScript", "Next.js"],
  email: "alex.rivera@email.com",
  avatarInitials: "JD",
};

// ---------- Job Requirements ----------
export const jobRequirements: JobRequirements = {
  mustHaveSkills: ["RESTful API", "TypeScript"],
  educationLevel: "Bachelor's Degree in CS or related field",
  keyResponsibilities: [
    "Develop responsive user interfaces using modern frameworks.",
    "Collaborate with back-end teams for API integration.",
    "Ensure high-quality graphic standards and brand consistency.",
  ],
};

// ---------- ATS Match Score ----------
export const atsMatchScore = 72;

// ---------- JRI Score Data ----------
export const jdiScore = 75;
export const finalJdiScore = 82;

// ---------- Radar Chart Data (Dashboard) ----------
export const dashboardRadarData: RadarDataPoint[] = [
  { dimension: "Technical Skills", current: 70, target: 90, fullMark: 100 },
  { dimension: "Communication", current: 65, target: 85, fullMark: 100 },
  { dimension: "Problem Solving", current: 60, target: 88, fullMark: 100 },
  { dimension: "Attitude", current: 75, target: 85, fullMark: 100 },
  { dimension: "Cultural Fit", current: 68, target: 80, fullMark: 100 },
];

// ---------- Radar Chart Data (Analytics) ----------
export const analyticsRadarData: RadarDataPoint[] = [
  { dimension: "Technical", current: 85, target: 95, fullMark: 100 },
  { dimension: "Behavioral", current: 90, target: 95, fullMark: 100 },
  { dimension: "Communication", current: 78, target: 90, fullMark: 100 },
  { dimension: "Problem Solving", current: 92, target: 95, fullMark: 100 },
  { dimension: "Attitude", current: 88, target: 92, fullMark: 100 },
];

export const analyticsDimensionScores = [
  { label: "TECHNICAL", value: "85%" },
  { label: "BEHAVIORAL", value: "90%" },
  { label: "COMM.", value: "78%" },
  { label: "PROBLEM SOLV.", value: "92%" },
  { label: "ATTITUDE", value: "88%" },
];

// ---------- Interview Questions ----------
export const interviewQuestions: InterviewQuestion[] = [
  {
    id: 1,
    question: "What is your experience with React state management?",
    userAnswer:
      "I have worked with React's built-in useState and useReducer hooks for local state management. For global state, I've used Context API in smaller projects and Redux Toolkit in larger applications. I understand the importance of choosing the right tool based on application complexity and have experience with state normalization patterns.",
    strengths: [
      "Good understanding of different state management approaches",
      "Mentions both local and global state solutions",
      "Awareness of scalability considerations",
    ],
    weaknesses: [
      "Could elaborate more on specific project examples",
      "No mention of newer solutions like Zustand or Jotai",
      "Missing discussion of server state management (React Query/TanStack Query)",
    ],
    optimalAnswer:
      "A strong answer would include specific project examples, discuss trade-offs between different state management solutions, mention server state management with tools like TanStack Query, and demonstrate understanding of when to use local vs. global state. Including performance optimization techniques like memoization would further strengthen the response.",
  },
  {
    id: 2,
    question:
      "How do you approach building responsive and accessible user interfaces?",
    userAnswer:
      "I follow a mobile-first approach using CSS Flexbox and Grid for responsive layouts. I use Tailwind CSS utility classes for rapid responsive development. For accessibility, I ensure proper semantic HTML structure, use ARIA attributes where needed, and test with screen readers.",
    strengths: [
      "Strong mobile-first methodology",
      "Good use of modern CSS layout techniques",
      "Mentions accessibility testing with screen readers",
    ],
    weaknesses: [
      "Could discuss WCAG compliance levels",
      "No mention of keyboard navigation handling",
      "Missing progressive enhancement strategies",
    ],
    optimalAnswer:
      "An ideal answer would cover WCAG 2.1 compliance, keyboard navigation, focus management, color contrast ratios, progressive enhancement, and testing strategies using tools like axe-core or Lighthouse accessibility audits.",
  },
  {
    id: 3,
    question:
      "Describe a challenging technical problem you solved and your approach to debugging it.",
    userAnswer:
      "In a recent project, I encountered a complex state management issue where components were re-rendering unnecessarily, causing performance problems. I used React DevTools Profiler to identify the bottleneck and implemented React.memo and useMemo to optimize the rendering. I also refactored the context structure to prevent unnecessary re-renders.",
    strengths: [
      "Clear problem identification and structured approach",
      "Effective use of profiling tools",
      "Practical optimization techniques applied",
    ],
    weaknesses: [
      "Could quantify the performance improvement",
      "Missing mention of testing the fix",
      "No discussion of preventing similar issues in the future",
    ],
    optimalAnswer:
      "A comprehensive answer would include specific metrics (e.g., 'reduced re-renders by 60%'), discuss the root cause analysis process, mention preventive measures like code review checklists, and describe how the solution was validated through testing.",
  },
];

// ---------- Skill Recommendations ----------
export const skillRecommendations: SkillRecommendation[] = [
  {
    skillGap: "State Management",
    description: "Advanced patterns in Redux/Context API",
    priority: "Critical",
    recommendedAction: "Complete Redux Lab",
    actionLabel: "COMPLETE REDUX LAB",
    jdiBoost: "+12%",
  },
  {
    skillGap: "System Design",
    description: "Scalability and microservices architecture",
    priority: "Moderate",
    recommendedAction: "View Design Case Study",
    actionLabel: "VIEW DESIGN CASE STUDY",
    jdiBoost: "+8%",
  },
  {
    skillGap: "Behavioral Feedback",
    description: "Refining STAR method for conflict resolution",
    priority: "Ongoing",
    recommendedAction: "Mock Interview Session",
    actionLabel: "MOCK INTERVIEW SESSION",
    jdiBoost: "+5%",
  },
];

// ---------- Coding Problem ----------
export const codingProblem = {
  title: "Problem #1: Two Sum",
  description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.`,
  examples: [
    {
      input: "nums = [2,7,11,15], target = 9",
      output: "[0,1]",
      explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
    },
  ],
  constraints: [
    "2 ≤ nums.length ≤ 10⁴",
    "-10⁹ ≤ nums[i] ≤ 10⁹",
    "-10⁹ ≤ target ≤ 10⁹",
    "Only one valid answer exists.",
  ],
  defaultCode: `class Solution:
    def twoSum(self, nums: List[int], target: int) ->
    List[int]:
        # Use a hash map to store seen values and
        # their indices
        prevMap = {}  # val : index

        for i, n in enumerate(nums):
            diff = target - n
            if diff in prevMap:
                return [prevMap[diff], i]
            prevMap[n] = i
        return []`,
  timeComplexity: "O(n)",
  spaceComplexity: "O(n)",
  liveFeedback:
    '"Great choice! Using a Hash Map (prevMap) allows you to find the complement in constant time. This reduces the overall time complexity from O(n²) to O(n)."',
  hints: [
    "How would you handle negative numbers in the input array?",
    "Can you optimize space if the input array is already sorted?",
  ],
};

// ---------- Dashboard Sidebar Data ----------
export const activeGoal = {
  matchPercent: 82,
  title: "INTERN FRONTEND ROLE",
  company: "FPT Software (Da Nang)",
  stipend: "Competitive",
  duration: "3 Months",
};

export const upcomingMilestones = [
  {
    title: "Technical Screening with Interviewer AI",
    time: "Today, 2:00 PM",
    hasJoinButton: true,
  },
  {
    title: "Complete API Integration Lab",
    time: "Tomorrow, 10:00 AM",
    hasJoinButton: false,
  },
];

export const recommendedResources = [
  {
    title: "API Integration Lab",
    description: "Hands-on practice with Fetch & Axios",
    action: "START LAB →",
    iconColor: "text-teal-500",
  },
  {
    title: "BehavioralSTAR Practice",
    description: "Master the STAR interview technique",
    action: "PRACTICE NOW →",
    iconColor: "text-orange-500",
  },
  {
    title: "Frontend Architecture",
    description: "Advanced system design patterns",
    action: "READ COURSE →",
    iconColor: "text-purple-500",
  },
];
export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <aside className="fixed left-0 top-0 h-screen w-[220px] bg-[#0F172A] text-white flex flex-col z-50">
      {/* Logo */}
      <div className="p-5 pb-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-teal-400 rounded-lg flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight">VieCareer</h1>
            <p className="text-[10px] text-slate-400 uppercase tracking-widest">
              Job Readiness
            </p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`
                flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
                transition-all duration-200
                ${
                  isActive
                    ? "bg-white/10 text-white"
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                }
              `}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Pro Plan Card */}
      <div className="p-4">
      <div className="bg-white/5 rounded-xl p-4 border border-white/10">
        <p className="text-[10px] text-teal-400 uppercase tracking-wider font-semibold mb-1">
          Pro Plan
        </p>
        <p className="text-sm font-semibold mb-1">
          Upgrade for AI Mock Interviews
        </p>
        <button
          onClick={() => router.push("/pricing")}
          className="mt-3 w-full bg-teal-500 hover:bg-teal-600 text-white text-xs font-semibold py-2 px-4 rounded-lg transition-colors"
        >
          UPGRADE NOW
        </button>
      </div>

      {/* Log Out */}
      <button
        onClick={() => router.push("/")}
        className="mt-4 w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:bg-white/5 hover:text-red-400 transition-all duration-200"
      >
        <LogOut className="w-5 h-5" />
        Log Out
      </button>
    </div>
    </aside>
  );
}
// --- Action Plan Page Data ---
export const roadmapSteps = [
  {
    phase: "Phase 1: Foundation Recovery",
    status: "In Progress",
    tasks: [
      { id: 1, title: "Advanced State Management Patterns", duration: "4 hours", type: "Technical", completed: false },
      { id: 2, title: "System Design: Scalability Basics", duration: "6 hours", type: "Technical", completed: true },
    ]
  },
  {
    phase: "Phase 2: Performance Optimization",
    status: "Locked",
    tasks: [
      { id: 3, title: "Optimizing React Rendering", duration: "3 hours", type: "Performance", completed: false },
      { id: 4, title: "Next.js Server Side Rendering Deep-dive", duration: "5 hours", type: "Technical", completed: false },
    ]
  }
];

export const aiLibraryResources = [
  { title: "The STAR Method Handbook", type: "PDF Guide", detail: "12 Pages" },
  { title: "System Design Interview Vol. 1", type: "Interactive Course", detail: "6 Modules" },
];