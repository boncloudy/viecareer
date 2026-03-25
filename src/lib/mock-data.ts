// ==========================================
// VieCareer - Mock Data & Types
// ==========================================

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

// ---------- Gap Analysis ----------
export interface GapSkill {
  skill: string;
  status: "matched" | "partial" | "missing";
  cvEvidence: string;
  jdRequirement: string;
}

export interface GapCategory {
  category: string;
  score: number;
  skills: GapSkill[];
}

export const gapAnalysis: GapCategory[] = [
  {
    category: "Technical Skills",
    score: 75,
    skills: [
      { skill: "React", status: "matched", cvEvidence: "3 years experience with React, Redux, Hooks", jdRequirement: "Proficiency in React.js" },
      { skill: "TypeScript", status: "partial", cvEvidence: "Listed as skill, no project examples", jdRequirement: "Strong TypeScript skills required" },
      { skill: "RESTful API", status: "missing", cvEvidence: "Not mentioned in CV", jdRequirement: "Experience with RESTful API design & integration" },
      { skill: "Next.js", status: "matched", cvEvidence: "Built 2 projects with Next.js App Router", jdRequirement: "Experience with Next.js preferred" },
      { skill: "Testing (Jest/Cypress)", status: "missing", cvEvidence: "Not mentioned in CV", jdRequirement: "Unit & E2E testing experience" },
    ],
  },
  {
    category: "Soft Skills",
    score: 80,
    skills: [
      { skill: "Team Collaboration", status: "matched", cvEvidence: "Led 4-person team in capstone project", jdRequirement: "Collaborate with cross-functional teams" },
      { skill: "Communication", status: "partial", cvEvidence: "Presentation experience mentioned", jdRequirement: "Strong verbal & written communication" },
      { skill: "Agile/Scrum", status: "missing", cvEvidence: "Not mentioned in CV", jdRequirement: "Experience working in Agile environment" },
    ],
  },
  {
    category: "Experience & Education",
    score: 60,
    skills: [
      { skill: "Bachelor's in CS", status: "matched", cvEvidence: "B.S. Computer Science, GPA 3.5", jdRequirement: "Bachelor's Degree in CS or related field" },
      { skill: "2+ Years Experience", status: "missing", cvEvidence: "Internship + personal projects only", jdRequirement: "Minimum 2 years professional experience" },
      { skill: "CI/CD Pipeline", status: "missing", cvEvidence: "Not mentioned in CV", jdRequirement: "Familiarity with CI/CD workflows" },
    ],
  },
];

// ---------- ATS Match Score ----------
export const atsMatchScore = 72;

// ---------- JRI Score Data ----------
export const jriScore = 75;
export const finaljriScore = 82;

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

// ---------- Coding Feedback Data ----------
export interface CodingTestCase {
  id: number;
  label: string;
  passed: boolean;
  input: string;
  expected: string;
  output: string;
  runtime: string;
}

export interface CodingFeedbackScore {
  label: string;
  value: number;
  max: number;
  color: string;
}

export interface FeedbackStep {
  icon: string;
  label: string;
}

export const codingOverallScore = 90;
export const codingOverallLabel = "Exceptional";

export const codingSubScores: CodingFeedbackScore[] = [
  { label: "Correctness", value: 95, max: 100, color: "#22C55E" },
  { label: "Optimization", value: 70, max: 100, color: "#F59E0B" },
  { label: "Code Quality", value: 85, max: 100, color: "#3B82F6" },
  { label: "Learning", value: 80, max: 100, color: "#A855F7" },
];

export const codingTestCases: CodingTestCase[] = [
  { id: 1, label: "Case 1", passed: true, input: "nums = [2,7,11,15], target = 9", expected: "[0,1]", output: "[0,1]", runtime: "4ms" },
  { id: 2, label: "Case 2", passed: true, input: "nums = [3,2,4], target = 6", expected: "[1,2]", output: "[1,2]", runtime: "3ms" },
  { id: 3, label: "Case 3", passed: true, input: "nums = [3,3], target = 6", expected: "[0,1]", output: "[0,1]", runtime: "2ms" },
  { id: 4, label: "Case 4", passed: true, input: "nums = [-1,-2,-3,-4,-5], target = -8", expected: "[2,4]", output: "[2,4]", runtime: "5ms" },
  { id: 5, label: "Case 5", passed: true, input: "nums = [1000000,500000,-1500000], target = -1000000", expected: "[1,2]", output: "[1,2]", runtime: "3ms" },
];

export const codingCorrectnessAnalysis = {
  score: 95,
  summary: "All tests passed!",
  description: "Your solution correctly handles all test cases including edge cases with negative numbers and large values. The hash map approach ensures O(1) lookup for complement values.",
  suggestions: [
    "Consider adding input validation for empty arrays",
    "Handle the case where no solution exists more explicitly",
    "Add type hints for better code documentation",
  ],
};

export const codingComplexityAnalysis = {
  timeComplexity: "O(n)",
  timeExplanation: "Single pass through the array with hash map lookups",
  spaceComplexity: "O(n)",
  spaceExplanation: "Hash map stores at most n key-value pairs",
};

export const feedbackSteps: FeedbackStep[] = [
  { icon: "code", label: "Analyzing Code Structure" },
  { icon: "search", label: "Deep Analysis" },
  { icon: "zap", label: "Performance Review" },
  { icon: "shield", label: "Quality Assessment" },
  { icon: "lightbulb", label: "Generating Insights" },
  { icon: "check", label: "Finalizing Feedback" },
];

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

// --- Admin Dashboard Data ---
export const adminKPIs = [
  { title: "Total Users", value: "2,845", trend: "+12.5%", isPositive: true },
  { title: "Active Sessions", value: "842", trend: "+5.2%", isPositive: true },
  { title: "Monthly Revenue", value: "125,400,000 ₫", trend: "+15.3%", isPositive: true },
  { title: "Suspended Accounts", value: "12", trend: "-2.1%", isPositive: false },
];

export const adminRevenueData = [
  { month: "Jan", revenue: 45000000 },
  { month: "Feb", revenue: 52000000 },
  { month: "Mar", revenue: 48000000 },
  { month: "Apr", revenue: 70000000 },
  { month: "May", revenue: 95000000 },
  { month: "Jun", revenue: 125400000 },
];

// --- Admin Users Management ---
export type UserStatus = "Active" | "Suspended" | "Pending";
export type UserPlan = "Free" | "Pro" | "Team";

export interface AppliedJob {
  title: string;
  company: string;
  status: "Applied" | "Interviewing" | "Rejected" | "Offered";
}
export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
  status: UserStatus;
  plan: UserPlan;
  joinDate: string;
  lastActive: string;
  totalSessions: number;
  avatarInitials: string;
  avatarColor: string;
  birthYear: number;
  university: string;
  skills: string[];
  targetProfile: string; 
  quotaUsed: number;
  quotaTotal: number;
  rateLimit: string;
  notifications: string[]; 
  appliedJobs: AppliedJob[];
}

export const adminUsers: AdminUser[] = [
  { 
    id: "U001", name: "Nguyen Thi Lan", email: "lan.nguyen@email.com", role: "Job Seeker", status: "Active", plan: "Pro", joinDate: "2025-01-15", lastActive: "2 mins ago", totalSessions: 24, avatarInitials: "NL", avatarColor: "bg-[#5378EF]",
    birthYear: 2002, university: "National Economics University (NEU)", skills: ["React", "UI/UX Design", "Figma"], targetProfile: "Frontend Developer", quotaUsed: 15, quotaTotal: 50, rateLimit: "50 req/min", notifications: ["Email", "Push"],
    appliedJobs: [{ title: "Junior Frontend", company: "FPT Software", status: "Interviewing" }, { title: "Web Designer", company: "VNG", status: "Applied" }]
  },
  { 
    id: "U002", name: "Tran Minh Duc", email: "duc.tran@fpt.edu.vn", role: "Student", status: "Active", plan: "Pro", joinDate: "2025-02-03", lastActive: "1 hour ago", totalSessions: 8, avatarInitials: "TD", avatarColor: "bg-blue-500",
    birthYear: 2004, university: "FPT University", skills: ["Java", "C++", "HTML/CSS"], targetProfile: "Backend Intern", quotaUsed: 8, quotaTotal: 10, rateLimit: "20 req/min", notifications: ["Email"],
    appliedJobs: [{ title: "Java Intern", company: "CMC Global", status: "Rejected" }]
  },
  { 
    id: "U003", name: "Le Thi Hoa", email: "hoa.le@company.vn", role: "Job Seeker", status: "Pending", plan: "Free", joinDate: "2025-03-10", lastActive: "3 days ago", totalSessions: 2, avatarInitials: "LH", avatarColor: "bg-purple-500",
    birthYear: 2001, university: "Hanoi University (HANU)", skills: ["Marketing", "Content Writing"], targetProfile: "Digital Marketer", quotaUsed: 2, quotaTotal: 10, rateLimit: "20 req/min", notifications: ["Email"],
    appliedJobs: []
  },
  { 
    id: "U004", name: "Pham Van Khoa", email: "khoa.pham@gmail.com", role: "Job Seeker", status: "Active", plan: "Team", joinDate: "2024-11-20", lastActive: "5 mins ago", totalSessions: 57, avatarInitials: "PK", avatarColor: "bg-orange-500",
    birthYear: 1998, university: "Bach Khoa University (HUST)", skills: ["Python", "AWS", "Docker", "Kubernetes"], targetProfile: "DevOps Engineer", quotaUsed: 120, quotaTotal: 500, rateLimit: "Unlimited", notifications: ["Email", "Push", "SMS"],
    appliedJobs: [{ title: "DevOps Engineer", company: "Viettel Group", status: "Offered" }, { title: "SRE", company: "Grab", status: "Interviewing" }]
  },
  { 
    id: "U005", name: "Vo Thi Mai", email: "mai.vo@tech.io", role: "Student", status: "Suspended", plan: "Pro", joinDate: "2025-01-30", lastActive: "12 days ago", totalSessions: 15, avatarInitials: "VM", avatarColor: "bg-rose-500",
    birthYear: 2003, university: "University of Science (HCMUS)", skills: ["Data Analysis", "SQL", "R"], targetProfile: "Data Analyst", quotaUsed: 40, quotaTotal: 50, rateLimit: "50 req/min", notifications: ["Push"],
    appliedJobs: [{ title: "DA Intern", company: "Shopee", status: "Rejected" }]
  },
  { 
    id: "U006", name: "Hoang Duc Nam", email: "nam.hoang@dev.vn", role: "Job Seeker", status: "Active", plan: "Pro", joinDate: "2024-12-05", lastActive: "30 mins ago", totalSessions: 31, avatarInitials: "HN", avatarColor: "bg-cyan-500",
    birthYear: 2000, university: "University of Engineering and Technology (UET)", skills: ["Golang", "Microservices", "Redis"], targetProfile: "Backend Developer", quotaUsed: 22, quotaTotal: 50, rateLimit: "50 req/min", notifications: ["Email", "Push"],
    appliedJobs: [{ title: "Backend Dev", company: "ZaloPay", status: "Interviewing" }]
  },
  { 
    id: "U007", name: "Bui Thi Thu", email: "thu.bui@student.edu.vn", role: "Student", status: "Active", plan: "Free", joinDate: "2025-03-01", lastActive: "2 hours ago", totalSessions: 6, avatarInitials: "BT", avatarColor: "bg-indigo-500",
    birthYear: 2005, university: "Foreign Trade University (FTU)", skills: ["English", "Public Speaking", "Sales"], targetProfile: "Business Development Intern", quotaUsed: 9, quotaTotal: 10, rateLimit: "20 req/min", notifications: ["Email"],
    appliedJobs: [{ title: "BD Intern", company: "Lazada", status: "Applied" }]
  },
  { 
    id: "U008", name: "Dang Van Long", email: "long.dang@corp.com", role: "Job Seeker", status: "Suspended", plan: "Free", joinDate: "2025-02-14", lastActive: "20 days ago", totalSessions: 4, avatarInitials: "DL", avatarColor: "bg-amber-500",
    birthYear: 1996, university: "Hanoi University of Industry (HaUI)", skills: ["Manual Testing", "Jira"], targetProfile: "QC Engineer", quotaUsed: 10, quotaTotal: 10, rateLimit: "20 req/min", notifications: ["Email"],
    appliedJobs: []
  },
  { 
    id: "U009", name: "Nguyen Bao Chau", email: "chau.nb@viecviet.vn", role: "Job Seeker", status: "Active", plan: "Team", joinDate: "2024-10-10", lastActive: "Just now", totalSessions: 89, avatarInitials: "NC", avatarColor: "bg-emerald-500",
    birthYear: 1997, university: "RMIT University", skills: ["Project Management", "Agile", "Scrum"], targetProfile: "Product Manager", quotaUsed: 310, quotaTotal: 500, rateLimit: "Unlimited", notifications: ["Email", "Push"],
    appliedJobs: [{ title: "Product Manager", company: "Momo", status: "Offered" }]
  },
  { 
    id: "U010", name: "Tran Quoc Huy", email: "huy.tq@uet.edu.vn", role: "Student", status: "Pending", plan: "Free", joinDate: "2025-03-18", lastActive: "1 day ago", totalSessions: 1, avatarInitials: "TH", avatarColor: "bg-violet-500",
    birthYear: 2004, university: "University of Engineering and Technology (UET)", skills: ["Machine Learning", "Pytorch"], targetProfile: "AI Engineer Intern", quotaUsed: 1, quotaTotal: 10, rateLimit: "20 req/min", notifications: ["Push"],
    appliedJobs: []
  },
];

// --- Admin Interview Sessions ---
export type SessionStatus = "Completed" | "In Progress" | "Scheduled" | "Cancelled";
export type SessionType = "Technical" | "Behavioral" | "Mixed" | "Coding";

export interface AdminSession {
  id: string;
  userId: string;
  userName: string;
  position: string;
  company: string;
  date: string;
  duration: string;
  score: number | null;
  status: SessionStatus;
  type: SessionType;
  avatarInitials: string;
  avatarColor: string;
}

export const adminSessions: AdminSession[] = [
  { id: "S001", userId: "U001", userName: "Nguyen Thi Lan", position: "Frontend Developer Intern", company: "FPT Software", date: "2026-03-19 09:30", duration: "42 min", score: 85, status: "Completed", type: "Technical", avatarInitials: "NL", avatarColor: "bg-teal-500" },
  { id: "S002", userId: "U004", userName: "Pham Van Khoa", position: "Full Stack Engineer", company: "VNG Corporation", date: "2026-03-19 10:15", duration: "—", score: null, status: "In Progress", type: "Mixed", avatarInitials: "PK", avatarColor: "bg-orange-500" },
  { id: "S003", userId: "U002", userName: "Tran Minh Duc", position: "Backend Developer", company: "MoMo", date: "2026-03-19 14:00", duration: "—", score: null, status: "Scheduled", type: "Technical", avatarInitials: "TD", avatarColor: "bg-blue-500" },
  { id: "S004", userId: "U009", userName: "Nguyen Bao Chau", position: "Product Manager", company: "Shopee Vietnam", date: "2026-03-18 15:45", duration: "55 min", score: 92, status: "Completed", type: "Behavioral", avatarInitials: "NC", avatarColor: "bg-emerald-500" },
  { id: "S005", userId: "U006", userName: "Hoang Duc Nam", position: "DevOps Engineer", company: "Tiki", date: "2026-03-18 11:00", duration: "38 min", score: 74, status: "Completed", type: "Technical", avatarInitials: "HN", avatarColor: "bg-cyan-500" },
  { id: "S006", userId: "U003", userName: "Le Thi Hoa", position: "UI/UX Designer", company: "Zalo", date: "2026-03-17 09:00", duration: "—", score: null, status: "Cancelled", type: "Behavioral", avatarInitials: "LH", avatarColor: "bg-purple-500" },
  { id: "S007", userId: "U007", userName: "Bui Thi Thu", position: "Data Analyst Intern", company: "VinAI", date: "2026-03-17 16:30", duration: "47 min", score: 68, status: "Completed", type: "Mixed", avatarInitials: "BT", avatarColor: "bg-indigo-500" },
  { id: "S008", userId: "U004", userName: "Pham Van Khoa", position: "Senior React Dev", company: "Grab Vietnam", date: "2026-03-16 10:00", duration: "60 min", score: 88, status: "Completed", type: "Coding", avatarInitials: "PK", avatarColor: "bg-orange-500" },
  { id: "S009", userId: "U001", userName: "Nguyen Thi Lan", position: "Frontend Developer Intern", company: "FPT Software", date: "2026-03-15 14:30", duration: "35 min", score: 79, status: "Completed", type: "Behavioral", avatarInitials: "NL", avatarColor: "bg-teal-500" },
  { id: "S010", userId: "U010", userName: "Tran Quoc Huy", position: "ML Engineer Intern", company: "VinAI", date: "2026-03-19 16:00", duration: "—", score: null, status: "Scheduled", type: "Technical", avatarInitials: "TH", avatarColor: "bg-violet-500" },
];

// --- Admin Activity Logs ---
export type LogType = "Auth" | "Session" | "Payment" | "Account" | "System";

export interface ActivityLog {
  id: string;
  userId: string;
  userName: string;
  action: string;
  detail: string;
  timestamp: string;
  ip: string;
  type: LogType;
  avatarInitials: string;
  avatarColor: string;
}

export const adminActivityLogs: ActivityLog[] = [
  { id: "L001", userId: "U004", userName: "Pham Van Khoa", action: "Session Started", detail: "Started Mixed Interview — Full Stack Engineer @ VNG", timestamp: "2026-03-19 10:15:02", ip: "113.161.44.12", type: "Session", avatarInitials: "PK", avatarColor: "bg-orange-500" },
  { id: "L002", userId: "U001", userName: "Nguyen Thi Lan", action: "Session Completed", detail: "Completed Technical Interview — Score: 85/100", timestamp: "2026-03-19 10:12:55", ip: "27.72.98.211", type: "Session", avatarInitials: "NL", avatarColor: "bg-teal-500" },
  { id: "L003", userId: "U009", userName: "Nguyen Bao Chau", action: "User Login", detail: "Logged in via Google OAuth", timestamp: "2026-03-19 09:58:33", ip: "42.117.185.9", type: "Auth", avatarInitials: "NC", avatarColor: "bg-emerald-500" },
  { id: "L004", userId: "U006", userName: "Hoang Duc Nam", action: "Plan Upgraded", detail: "Upgraded from Free to Pro — 299,000 ₫ charged", timestamp: "2026-03-19 09:45:10", ip: "14.160.27.88", type: "Payment", avatarInitials: "HN", avatarColor: "bg-cyan-500" },
  { id: "L005", userId: "U005", userName: "Vo Thi Mai", action: "Account Suspended", detail: "Suspended by admin — Violation of ToS §3.2", timestamp: "2026-03-19 09:30:00", ip: "—", type: "Account", avatarInitials: "VM", avatarColor: "bg-rose-500" },
  { id: "L006", userId: "U002", userName: "Tran Minh Duc", action: "Session Scheduled", detail: "Booked Technical Interview — Backend Dev @ MoMo for 14:00", timestamp: "2026-03-19 09:22:47", ip: "115.78.5.44", type: "Session", avatarInitials: "TD", avatarColor: "bg-blue-500" },
  { id: "L007", userId: "U008", userName: "Dang Van Long", action: "User Logout", detail: "Session ended — duration: 12 min", timestamp: "2026-03-19 09:01:15", ip: "118.70.211.33", type: "Auth", avatarInitials: "DL", avatarColor: "bg-amber-500" },
  { id: "L008", userId: "SYSTEM", userName: "System", action: "Backup Completed", detail: "Scheduled daily backup — 847 MB archived", timestamp: "2026-03-19 03:00:00", ip: "Internal", type: "System", avatarInitials: "SY", avatarColor: "bg-slate-500" },
  { id: "L009", userId: "U007", userName: "Bui Thi Thu", action: "Profile Updated", detail: "Updated target position and tech stack", timestamp: "2026-03-18 22:14:30", ip: "1.52.211.99", type: "Account", avatarInitials: "BT", avatarColor: "bg-indigo-500" },
  { id: "L010", userId: "U009", userName: "Nguyen Bao Chau", action: "Payment Processed", detail: "Team Plan renewal — 799,000 ₫ charged", timestamp: "2026-03-18 20:05:55", ip: "42.117.185.9", type: "Payment", avatarInitials: "NC", avatarColor: "bg-emerald-500" },
  { id: "L011", userId: "U003", userName: "Le Thi Hoa", action: "Session Cancelled", detail: "Cancelled UI/UX Designer Interview — Zalo", timestamp: "2026-03-18 18:30:12", ip: "103.82.22.5", type: "Session", avatarInitials: "LH", avatarColor: "bg-purple-500" },
  { id: "L012", userId: "U004", userName: "Pham Van Khoa", action: "Session Completed", detail: "Completed Coding Interview — Score: 88/100", timestamp: "2026-03-16 11:00:44", ip: "113.161.44.12", type: "Session", avatarInitials: "PK", avatarColor: "bg-orange-500" },
];

// --- Profile Sidebar Data ---
export interface SkillProgress {
  name: string;
  progress: number;
  stage: "Beginner" | "Intermediate" | "Advanced";
  trend: "up" | "stable";
}

export interface RoadmapStep {
  title: string;
  status: "completed" | "in-progress" | "planned";
}

export interface LearningGoal {
  targetRole: string;
  matchPercent: number;
  roadmap: RoadmapStep[];
}

export interface ProfileActivityItem {
  action: string;
  detail: string;
  time: string;
  type: "session" | "resource" | "milestone";
}

export const profileSkillProgress: SkillProgress[] = [
  { name: "TypeScript", progress: 72, stage: "Intermediate", trend: "up" },
  { name: "System Design", progress: 40, stage: "Beginner", trend: "up" },
  { name: "React Advanced", progress: 85, stage: "Advanced", trend: "stable" },
  { name: "Node.js", progress: 58, stage: "Intermediate", trend: "up" },
];

export const profileLearningGoal: LearningGoal = {
  targetRole: "Senior Frontend Engineer",
  matchPercent: 68,
  roadmap: [
    { title: "React Fundamentals", status: "completed" },
    { title: "TypeScript Mastery", status: "in-progress" },
    { title: "System Design Basics", status: "in-progress" },
    { title: "Performance Optimization", status: "planned" },
    { title: "Team Leadership Skills", status: "planned" },
  ],
};

export const profileRecentActivity: ProfileActivityItem[] = [
  { action: "Completed Interview", detail: "Technical Round — Score 85/100", time: "2 hours ago", type: "session" },
  { action: "Read Article", detail: "Advanced React Patterns", time: "Yesterday", type: "resource" },
  { action: "Milestone Reached", detail: "10 Interviews Completed", time: "3 days ago", type: "milestone" },
  { action: "Started Module", detail: "TypeScript Generics & Utility Types", time: "4 days ago", type: "resource" },
];

export const profileNextSteps = [
  "Complete the TypeScript Advanced module",
  "Schedule your next mock interview",
  "Review System Design fundamentals",
];

// ---------- Interview History ----------
export interface InterviewHistoryQA {
  question: string;
  answer: string;
  score: number;
  timestamp: string; // "mm:ss" — when this Q&A started in the recording
}

export interface InterviewHistoryEntry {
  id: string;
  date: string;
  position: string;
  type: "Technical" | "Behavioral" | "Mixed";
  duration: string;
  overallScore: number;
  questionsAnswered: number;
  qaPairs: InterviewHistoryQA[];
  hasRecording: boolean;
}

export const interviewHistory: InterviewHistoryEntry[] = [
  {
    id: "IH001",
    date: "2026-03-25",
    position: "Frontend Developer Intern",
    type: "Technical",
    duration: "28:14",
    overallScore: 85,
    questionsAnswered: 5,
    hasRecording: true,
    qaPairs: [
      {
        question: "What is your experience with React state management?",
        answer: "I have worked with React's built-in useState and useReducer hooks for local state management. For global state, I've used Context API in smaller projects and Redux Toolkit in larger applications.",
        score: 80,
        timestamp: "01:12",
      },
      {
        question: "How do you approach building responsive and accessible user interfaces?",
        answer: "I follow a mobile-first approach using CSS Flexbox and Grid for responsive layouts. I use Tailwind CSS utility classes for rapid responsive development. For accessibility, I ensure proper semantic HTML structure.",
        score: 85,
        timestamp: "06:34",
      },
      {
        question: "Describe a challenging technical problem you solved.",
        answer: "In a recent project, I encountered a complex state management issue where components were re-rendering unnecessarily, causing performance problems. I used React DevTools Profiler to identify the bottleneck.",
        score: 88,
        timestamp: "12:08",
      },
      {
        question: "How do you handle API error states in a React application?",
        answer: "I use try-catch blocks with async/await and maintain error state alongside loading and data states. I display user-friendly error messages and implement retry mechanisms where appropriate.",
        score: 82,
        timestamp: "18:41",
      },
      {
        question: "Explain the difference between useMemo and useCallback.",
        answer: "useMemo memoizes a computed value while useCallback memoizes a function reference. Both accept a dependency array and only recompute when dependencies change. They help prevent unnecessary re-renders.",
        score: 90,
        timestamp: "23:55",
      },
    ],
  },
  {
    id: "IH002",
    date: "2026-03-22",
    position: "Frontend Developer Intern",
    type: "Behavioral",
    duration: "22:45",
    overallScore: 78,
    questionsAnswered: 4,
    hasRecording: true,
    qaPairs: [
      {
        question: "Tell me about a time you had to work under a tight deadline.",
        answer: "During my university capstone project, we had 2 weeks to deliver a fully functional web app. I organized daily standups and broke the work into prioritized sprints.",
        score: 82,
        timestamp: "00:48",
      },
      {
        question: "How do you handle disagreements with team members?",
        answer: "I try to understand their perspective first by actively listening. Then I present my reasoning with data or examples. If we still disagree, I suggest we try the approach that is easiest to reverse.",
        score: 75,
        timestamp: "06:15",
      },
      {
        question: "Describe a situation where you had to learn something quickly.",
        answer: "When our team decided to migrate from REST to GraphQL mid-project, I had to learn Apollo Client in three days. I went through the official docs and built a small prototype first.",
        score: 80,
        timestamp: "12:30",
      },
      {
        question: "What motivates you to pursue a career in frontend development?",
        answer: "I love the immediate visual feedback of building interfaces. Seeing users interact with something I built is very rewarding. I'm also drawn to the rapid evolution of the frontend ecosystem.",
        score: 76,
        timestamp: "17:52",
      },
    ],
  },
  {
    id: "IH003",
    date: "2026-03-18",
    position: "React Developer",
    type: "Technical",
    duration: "35:02",
    overallScore: 72,
    questionsAnswered: 5,
    hasRecording: false,
    qaPairs: [
      {
        question: "What is the virtual DOM and how does React use it?",
        answer: "The virtual DOM is a lightweight JavaScript representation of the real DOM. React uses it to batch updates and minimize direct DOM manipulation by comparing the previous and new virtual DOM trees.",
        score: 85,
        timestamp: "01:05",
      },
      {
        question: "Explain how React's reconciliation algorithm works.",
        answer: "React compares the old and new virtual DOM trees using a diffing algorithm. It assumes elements of different types produce different trees, and uses keys to identify which items changed in lists.",
        score: 70,
        timestamp: "08:20",
      },
      {
        question: "How would you optimize a slow React application?",
        answer: "I would use React DevTools Profiler to identify bottlenecks, then apply React.memo, useMemo, and useCallback where needed. I'd also consider code splitting and lazy loading.",
        score: 68,
        timestamp: "15:44",
      },
      {
        question: "What are React Server Components?",
        answer: "Server Components render on the server and send HTML to the client, reducing the JavaScript bundle size. They can access backend resources directly but cannot use hooks or browser APIs.",
        score: 72,
        timestamp: "22:18",
      },
      {
        question: "Describe how you would implement authentication in a Next.js app.",
        answer: "I would use NextAuth.js or a similar library, set up JWT or session-based auth with middleware to protect routes. For sensitive pages, I'd use server-side session validation.",
        score: 65,
        timestamp: "28:36",
      },
    ],
  },
];

export const MOCK_USER = {
  id: "u1",
  fullName: "John Doe",
  email: "john.doe@example.com",
  role: "React Developer",
  avatar: "/candidate-avatar.png",
  bio: "Passionate Frontend Developer with 3 years of experience in building scalable web applications using React and Next.js.",
  location: "Ho Chi Minh City, Vietnam",
  joinedDate: "March 2026",
  skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js"],
  stats: {
    interviewsDone: 12,
    resumeScore: 85,
    rank: "Silver",
  },
  socials: {
    github: "github.com/johndoe",
    linkedin: "linkedin.com/in/johndoe",
  }
};

