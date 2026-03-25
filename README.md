# VieCareer — AI-Powered Mock Interview Platform

> **Empowering Vietnamese candidates to compete with confidence.**

---

## Table of Contents

- [Introduction](#introduction)
- [Current Product Overview](#current-product-overview)
  - [Tech Stack](#tech-stack)
  - [Project Structure](#project-structure)
  - [User Flow](#user-flow)
  - [Page-by-Page Breakdown](#page-by-page-breakdown)
  - [Global State Management](#global-state-management)
  - [Component Library](#component-library)
- [Planned Features](#planned-features)
- [Task Tracking — Full Production Roadmap](#task-tracking--full-production-roadmap)

---

## Introduction

**VieCareer** is an AI-powered career readiness and mock interview platform built specifically for the Vietnamese job market — targeting students, fresh graduates, and early-career professionals pursuing internships and junior roles at companies like FPT Software, VNG, Viettel, and international tech firms operating in Vietnam.

The platform addresses a clear gap: most candidates in Vietnam lack access to structured, feedback-rich interview practice. Traditional mock interviews are expensive, hard to schedule, and provide inconsistent feedback. VieCareer replaces this with an always-available AI interviewer that simulates real hiring scenarios — behavioral Q&A, live coding challenges, and post-session analytics — all personalized to the candidate's CV and the specific job description they're targeting.

### Core Value Proposition

| Pain Point | VieCareer Solution |
|---|---|
| No access to real interviewers for practice | AI interviewer available 24/7, no scheduling needed |
| Generic feedback that doesn't match the job | CV + JD upload creates a personalized interview context |
| No objective measure of readiness | **Job Readiness Index (JDI)** — a single, evolving score tracking improvement over time |
| Coding rounds are unpredictable | LeetCode-style coding environment with AI tutor mode built in |
| Interview anxiety with no visibility | Full post-session analytics: per-question breakdown, strength/weakness mapping, action plan |
| Cost barrier for premium prep resources | Freemium model with VND-denominated plans (0 → 100,000 → 299,000 VND/month) |

### Target Users

- **University students** (Year 3–4) preparing for internship applications
- **Fresh graduates** applying for their first developer, analyst, or product role
- **Career switchers** entering the tech industry from adjacent fields
- **University career centers** that want to offer structured interview prep at scale

---

## Current Product Overview

> **Status:** Frontend prototype — all data is mocked via `src/lib/mock-data.ts`. No backend, authentication, or real AI integration exists yet. The current build demonstrates the complete UI/UX flow end-to-end.

### Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 |
| UI Library | React 19 |
| Styling | Tailwind CSS v4 + tw-animate-css |
| Component System | shadcn/ui (Button, Card, Badge, Tabs, etc.) |
| Charts | Recharts (RadarChart) |
| Code Editor | Monaco Editor (`@monaco-editor/react`) |
| State Management | React Context API (`AppContext`) |
| Icons | Lucide React |
| Font | Inter (Google Fonts via `next/font`) |
| Package Manager | npm |
| Deployment Target | Vercel |

### Project Structure

```
viecareer/
├── public/
│   ├── candidate-avatar.png        # Placeholder candidate photo
│   └── mentor-avatar.png           # Placeholder AI mentor photo
│
├── src/
│   ├── app/                        # Next.js App Router pages
│   │   ├── layout.tsx              # Root layout + AppProvider wrapper
│   │   ├── page.tsx                # Entry point → redirects to /dashboard
│   │   ├── globals.css             # Global styles + custom animations
│   │   ├── dashboard/page.tsx      # Main dashboard with JDI score & radar chart
│   │   ├── setup/page.tsx          # CV + JD upload, AI extraction preview
│   │   ├── interview/page.tsx      # Live mock interview (video-call UI)
│   │   ├── coding/page.tsx         # 3-panel coding challenge environment
│   │   ├── coding-feedback/page.tsx # Standalone analysis loading screen (legacy)
│   │   ├── coding-results/page.tsx  # Code review results & AI feedback
│   │   ├── analytics/page.tsx      # Post-interview analytics report
│   │   ├── loading/page.tsx        # Animated transition screen
│   │   └── pricing/page.tsx        # Subscription plans page
│   │
│   ├── components/
│   │   ├── ui/                     # shadcn/ui base components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── tabs.tsx
│   │   │   ├── accordion.tsx
│   │   │   ├── progress.tsx
│   │   │   ├── resizable.tsx
│   │   │   └── separator.tsx
│   │   ├── sidebar.tsx             # Dark fixed sidebar (dashboard pages)
│   │   ├── top-navbar.tsx          # Light sticky navbar (setup/analytics pages)
│   │   ├── circular-score.tsx      # SVG circular progress ring component
│   │   ├── radar-chart.tsx         # Recharts radar chart wrapper
│   │   ├── audio-wave.tsx          # Animated audio equalizer bars
│   │   └── upload-dropzone.tsx     # Drag-and-drop file upload zone
│   │
│   └── lib/
│       ├── app-context.tsx         # Global React Context (session state)
│       ├── mock-data.ts            # All static mock data + TypeScript interfaces
│       └── utils.ts                # cn() utility (clsx + tailwind-merge)
│
├── next.config.ts
├── tsconfig.json
├── tailwind.config (inline in postcss)
└── package.json
```

---

### User Flow

The entire product follows a single linear flow. Navigation between stages is handled programmatically by `AppContext.currentFlow` and `router.push()`.

```
/ (root)
  │
  └──► /dashboard          ← Home: JDI score, readiness radar, milestones
          │
          └──► /setup       ← Upload CV + JD → AI extraction & ATS match score
                  │
                  └──► /interview   ← Mock behavioral Q&A (auto scale)
                          │
                          └──► /coding   ← Live coding challenge (Two Sum)
                                  │
                                  └──► /coding-results   ← Code analysis & AI feedback
                                          │
                                          └──► /loading   ← Animated results processing screen
                                                  │
                                                  └──► /analytics   ← Full post-interview report
```

Supporting pages available independently:
- `/pricing` — Accessible from the sidebar Upgrade button
- `/coding-feedback` — Legacy standalone version of the coding analysis loader

---

### Page-by-Page Breakdown

#### `/dashboard` — Performance Dashboard

The landing experience after login. Uses the dark `Sidebar` navigation layout.

**Sections:**
- **JDI Score Card** — Displays the candidate's current Job Readiness Index (currently mocked at `75`). Shows a `CircularScore` ring, a personalized AI recommendation ("focus on System Design"), and two CTAs: *Start Interview* → `/setup` and *Analyze Gaps*.
- **Daily Focus Banner** — A dark callout card showing the current learning goal (mocked: "Mastering the STAR method"). Includes an *Update Goal* button.
- **Readiness Gap Analysis** — A `RadarChartComponent` comparing current skill levels vs. target across 5 dimensions: Technical Skills, Communication, Problem Solving, Attitude, Cultural Fit.
- **Next Milestones** — Two upcoming tasks with timestamps, rendered as hoverable cards with a chevron indicator.

**Key mock data used:** `jdiScore`, `dashboardRadarData`, `upcomingMilestones`

---

#### `/setup` — Context Setup

Uses the light `TopNavbar`. Handles file upload and AI-powered document analysis.

**Flow:**
1. Two `UploadDropzone` components accept CV (PDF/Docx) and Job Description files.
2. When both files are uploaded (each simulated with 1.5s `setTimeout`), an "AI extraction" process triggers (2s delay).
3. A loading card is shown during extraction, then replaced by the **AI Preview & Extraction** card containing:
   - Extracted profile (name, target position, tech stack badges)
   - `CircularScore` showing ATS match score (`72`)
   - Extracted job requirements (must-have skills, education level, responsibilities)
4. Footer: *Re-scan Documents* resets all state. *Proceed to Interview* sets `currentFlow = "interview"` and navigates to `/interview`.

**Security trust indicators:** SSL Encryption and Data Privacy badges in the footer.

**Key mock data used:** `userProfile`, `jobRequirements`, `atsMatchScore`

---

#### `/interview` — Live Mock Interview

Full-screen dark UI mimicking a video call interface.

**Layout:**
- **Header:** VieCareer branding, live recording timer (counts up from 00:00), Settings and Help buttons.
- **Question Banner:** Fixed overlay at the top of the video area showing the current question number and text. Displays "AI is generating the next question..." during the 2s processing delay between questions.
- **Candidate Video Area:** Placeholder gradient panel with a `User` icon (no real webcam integration). Animated teal audio wave bars in the top-right corner.
- **AI Interviewer Panel:** Smaller panel showing an AI avatar with an `AudioWave` component and "AI Speaking..." label.
- **Control Bar:**
  - Mic toggle (turns red when muted)
  - Video toggle
  - Raise Hand, Layout Grid buttons
  - **Submit & Next** / **Submit Final Answer** — advances through the 3 questions with a processing overlay
  - **Next: Code Interview** — appears after all questions are answered, routes to `/coding`
  - **End Interview** — routes directly to `/loading`
- **Progress Bar:** Shows questions answered out of total at the bottom.

**Key mock data used:** `interviewQuestions` (3 questions on React state management, responsive UI, and debugging)

---

#### `/coding` — Coding Challenge

The most complex page. A fully responsive 3-panel IDE layout.

**Top Bar:**
- Learn Mode toggle (on/off switch)
- Guidance hint text
- Elapsed timer

**Left Panel — Problem:**
- Title: "Problem #1: Two Sum" with difficulty badge (Medium) and topic tags (Array, Hash Table)
- Three tabs: **Description** (problem statement + examples + constraints), **Test Cases** (5 pre-defined test cases with pass/fail status), **Hints** (2 actionable hints)
- Bottom action buttons: *Get AI Coach help*, *Try random Interview*
- On mobile: slides in from the left as an overlay

**Center Panel — Code Editor:**
- Two tabs: **Code** (Monaco Editor) and **AI Diagram** (placeholder)
- Toolbar: Language selector (Python, JavaScript, TypeScript, Java, C++), Reset button, Run button, Submit button
- Monaco Editor with VS Dark theme, Fira Code font, line numbers enabled
- **Test Results Panel**: Appears after "Run" — shows 5 test case tabs with Input/Expected/Output columns and runtime
- Status bar when test results are hidden

**Right Panel — Participants / Analysis:**
- Normal state: Shows mentor avatar (Samuel Brooks, Google) and candidate avatar with `AudioWave` speaking indicator
- During analysis (after Submit): Replaces participant view with inline analysis steps, progress bar, and feedback badge
- On mobile: slides in from the right as an overlay

**Submit Flow:**
1. `handleSubmit()` triggers `isAnalyzing = true`
2. 6 `feedbackSteps` animate through at 1200ms intervals
3. Progress bar fills to 100%
4. After completion, navigates to `/coding-results`

**Key mock data used:** `codingProblem`, `codingTestCases`, `feedbackSteps`

---

#### `/coding-results` — AI Code Analysis

Split-panel results view.

**Left (45%):** Read-only Monaco Editor showing the submitted code, with a test results panel at the bottom (all 5/5 passed).

**Right (55%):** AI feedback panel with:
- **Score Ring:** Animated SVG ring counting up to `90` ("Exceptional") with smooth easing
- **Sub-score bars:** Correctness (95), Optimization (70), Code Quality (85), Learning (80) — all animate from 0
- **4 Analysis Tabs:**
  - *Correctness* — score, pass/fail summary, actionable suggestions, time/space complexity breakdown
  - *Optimization* — score (70/100) with improvement suggestions
  - *Learning* — score (80/100) with related topics to study (Hash Tables, Two Pointers, etc.)
  - *Solution* — code quality (85/100) with best practices checklist

**Actions:** Export button, Share button, End Interview button (triggers confirmation modal)

**Key mock data used:** `codingOverallScore`, `codingSubScores`, `codingTestCases`, `codingCorrectnessAnalysis`, `codingComplexityAnalysis`

---

#### `/loading` — Processing Results

4-step animated loading screen (6.5s total) with a spinning teal ring and rotating step text. Auto-navigates to `/analytics`.

Steps: Analyzing responses → Evaluating technical depth → Generating ATS matching report → Finalizing performance score.

---

#### `/analytics` — Post-Interview Analytics

Full report page using the light `TopNavbar`.

**Sections:**
1. **Header** — Role title, Share with University button, Export PDF button
2. **JDI Score Card** — Final score `82/100` with "Excellent Readiness" badge and AI summary quote
3. **Radar Chart** — Analytics-specific radar comparing current vs. target across 5 dimensions with dimension scores displayed below
4. **Action Plan Table** — 3-column skill gap recommendations table with priority badges (Critical/Moderate/Ongoing) and predicted JDI boost percentages
5. **Interview Question Breakdown** — Accordion-style list of all 3 questions. Expanding each shows: User Answer, Strengths, Areas to Improve, and Optimal Answer Suggestion
6. **CTA Banner** — Dark panel: "You are in the top 5% of candidates" with Apply for Internship and View Similar Roles buttons
7. **Footer** — Privacy Policy, Support, Help Center links

**Key mock data used:** `analyticsRadarData`, `analyticsDimensionScores`, `skillRecommendations`, `interviewQuestions`, `finalJdiScore`

---

#### `/pricing` — Service Plans

Dark-themed standalone pricing page (no navbar).

| Plan | Price | Target |
|---|---|---|
| Freemium | 0 VND/month | Explore the platform |
| Standard ⭐ | 100,000 VND/month | Intern/Fresher levels |
| Premium | 299,000 VND/month | Middle/Senior levels |
| Usage-Based | 29,000 VND/interview | Ad-hoc top-ups |

---

### Global State Management

All session state lives in `AppContext` (`src/lib/app-context.tsx`), provided at the root layout level.

```typescript
interface AppContextType {
  // Navigation
  currentFlow: "setup" | "dashboard" | "interview" | "coding" | "analytics";
  setCurrentFlow: (flow: AppFlow) => void;

  // Upload state (Setup page)
  cvUploaded: boolean;
  jdUploaded: boolean;
  cvFileName: string;
  jdFileName: string;
  extractionVisible: boolean;

  // Interview state
  currentQuestionIndex: number;
  isAiProcessing: boolean;
  interviewCompleted: boolean;
  questionsAnswered: number;

  // Coding state
  codeSubmitted: boolean;

  // Reset everything
  resetAll: () => void;
}
```

> ⚠️ **Current limitation:** All state is in-memory only. Refreshing the page resets the session completely. Persistence is a priority for the next development phase.

---

### Component Library

| Component | Props | Usage |
|---|---|---|
| `CircularScore` | `score`, `maxScore`, `size`, `strokeWidth`, `color`, `label`, `sublabel` | Dashboard JDI score, Setup ATS match, Analytics JDI |
| `RadarChartComponent` | `data`, `height`, `showLegend`, `currentColor`, `targetColor` | Dashboard gap analysis, Analytics radar |
| `AudioWave` | `barCount`, `color`, `className` | Interview AI speaker, Coding mentor avatar |
| `UploadDropzone` | `title`, `subtitle`, `isUploading`, `isUploaded`, `fileName`, `onFileSelected`, `variant` | Setup CV & JD upload |
| `Sidebar` | — | Dashboard layout navigation |
| `TopNavbar` | — | Setup, Analytics page navigation |

---

## Planned Features

The following features are required to evolve VieCareer from a UI prototype into a fully functional product.

### P0 — Core Infrastructure (Required for any real users)

- **Authentication system** — Sign up / login via email+password and Google OAuth. JWT-based session management. Protected routes.
- **Database & backend API** — User profiles, interview sessions, scores, and history persisted in a database (PostgreSQL recommended). REST or tRPC API layer.
- **Real AI integration** — Connect to an LLM (Claude API recommended) to generate interview questions dynamically based on the uploaded JD, evaluate user answers, generate per-question feedback, and calculate JDI score in real time.
- **CV & JD parsing** — Extract structured data from uploaded PDF/Docx files using a document AI service (e.g., Claude's document API, AWS Textract, or LlamaParse).
- **File storage** — Securely store uploaded CVs and JDs in cloud storage (S3 or Supabase Storage) with per-user access control.

### P1 — Interview Engine

- **Voice input & speech-to-text** — Allow candidates to answer interview questions verbally. Integrate Web Speech API or a service like AssemblyAI/Deepgram.
- **Real webcam feed** — Replace the placeholder video panel with actual MediaStream from the user's webcam using WebRTC.
- **Dynamic question generation** — Questions should be generated by AI based on the specific CV + JD combination, not hardcoded. Question banks should vary by role type, seniority level, and skill domain.
- **Answer recording & replay** — Record audio/video responses for post-session review.
- **Real-time answer scoring** — As the candidate speaks, progressively evaluate the answer quality and surface live coaching hints.

### P2 — Coding Challenge Engine

- **Code execution backend** — Run submitted code in an isolated sandbox (e.g., Judge0 API or a custom container-based executor) and return real test case results.
- **Expanded problem library** — Add 50+ problems covering Arrays, Strings, Trees, Graphs, Dynamic Programming, and System Design across Easy/Medium/Hard difficulty.
- **AI Diagram tab** — Implement the currently placeholder "AI Diagram" tab to visually illustrate algorithm flow and data structures for the submitted code.
- **Code plagiarism detection** — Flag solutions copied from known sources.
- **Multi-language execution** — Support Python, JavaScript, TypeScript, Java, and C++ runtime environments.

### P3 — Analytics & Personalization

- **JDI score history & trend chart** — Track score evolution across multiple interview sessions over time.
- **Skill-level benchmarking** — Compare a candidate's JDI and sub-scores against anonymized aggregates of peers applying for similar roles.
- **Personalized learning roadmap** — Generate a step-by-step improvement plan with specific courses, labs, and practice sessions tied to identified skill gaps.
- **Session replay** — Allow candidates to re-watch their interview session with AI annotations overlaid at key moments.
- **Share report with universities / employers** — Exportable PDF reports and shareable links for career advisors and HR teams.

### P4 — Platform & Growth

- **Company-specific interview simulations** — Simulations tailored to known interview formats of companies like FPT Software, VNG, Momo, and Grab Vietnam.
- **University partnership portal** — Dashboard for career center staff to track student progress and readiness metrics across cohorts.
- **Referral & social features** — Leaderboards, community Q&A, peer review of mock interview responses.
- **Mobile app** — Native iOS/Android app for on-the-go practice sessions.
- **Payment integration** — VNPay and Momo integration for the Vietnamese market alongside international payment options.

---

## Task Tracking — Full Production Roadmap

Each task is tagged with a **priority**, **effort estimate**, and the **assignee role** best suited to complete it.

> Legend: 🔴 Critical path &nbsp;|&nbsp; 🟡 High priority &nbsp;|&nbsp; 🟢 Standard &nbsp;|&nbsp; ⬜ Future/Nice-to-have

---

### Phase 0 — Codebase Cleanup & Foundation

| # | Task | Priority | Effort | Role |
|---|---|---|---|---|
| 0.1 | Remove all hardcoded mock data from `mock-data.ts`; replace with typed API response interfaces | 🔴 | S | Frontend Dev |
| 0.2 | Remove or consolidate `/coding-feedback/page.tsx` (duplicate of inline coding analysis) | 🟢 | XS | Frontend Dev |
| 0.3 | Audit and fix all `useEffect` dependency arrays (currently missing `loadingSteps.length` etc.) | 🟡 | S | Frontend Dev |
| 0.4 | Replace `Math.random()` in `AudioWave` component (causes hydration mismatch in SSR) | 🟡 | XS | Frontend Dev |
| 0.5 | Set up ESLint + Prettier with team-agreed config, enforce in CI | 🟢 | S | DevOps |
| 0.6 | Set up Husky pre-commit hooks (lint + type-check) | 🟢 | XS | DevOps |
| 0.7 | Create `.env.example` with all required environment variable keys | 🔴 | XS | Backend Dev |
| 0.8 | Write unit tests for utility functions and pure components (Vitest + React Testing Library) | 🟢 | M | Frontend Dev |

---

### Phase 1 — Backend & Infrastructure

| # | Task | Priority | Effort | Role |
|---|---|---|---|---|
| 1.1 | Choose and provision database (PostgreSQL on Supabase or Railway recommended) | 🔴 | S | Backend Dev |
| 1.2 | Design and implement core database schema: `users`, `sessions`, `questions`, `answers`, `scores` | 🔴 | M | Backend Dev |
| 1.3 | Set up API layer (Next.js API Routes or separate Express/Hono service) | 🔴 | M | Backend Dev |
| 1.4 | Implement user authentication: email/password + Google OAuth via NextAuth.js or Supabase Auth | 🔴 | L | Backend Dev |
| 1.5 | Add protected route middleware — redirect unauthenticated users to login | 🔴 | S | Frontend Dev |
| 1.6 | Set up cloud file storage (Supabase Storage or AWS S3) with pre-signed upload URLs | 🔴 | M | Backend Dev |
| 1.7 | Implement CV and JD file upload to cloud storage from the Setup page | 🔴 | M | Frontend Dev |
| 1.8 | Set up Anthropic Claude API integration (server-side only, never expose key to client) | 🔴 | S | Backend Dev |
| 1.9 | Implement CV parsing endpoint: send uploaded PDF to Claude API, return structured profile JSON | 🔴 | L | Backend Dev |
| 1.10 | Implement JD parsing endpoint: extract must-have skills, responsibilities, and education level | 🔴 | M | Backend Dev |
| 1.11 | Implement ATS match scoring: compare parsed CV skills vs. JD requirements, return match % | 🔴 | L | Backend Dev |
| 1.12 | Replace Setup page mock extraction with real API calls; display loading states properly | 🔴 | M | Frontend Dev |
| 1.13 | Implement session persistence: save interview session start/end, questions, answers to DB | 🔴 | M | Backend Dev |
| 1.14 | Replace in-memory `AppContext` with server-persisted session (use session ID in URL or cookie) | 🔴 | L | Frontend Dev |

---

### Phase 2 — Interview Engine

| # | Task | Priority | Effort | Role |
|---|---|---|---|---|
| 2.1 | Build question generation API: input = parsed CV + parsed JD → output = 5–8 tailored interview questions | 🔴 | L | Backend Dev |
| 2.2 | Replace hardcoded `interviewQuestions` array with dynamically generated questions from API | 🔴 | M | Frontend Dev |
| 2.3 | Integrate Web Speech API for browser-native speech-to-text input on the Interview page | 🟡 | L | Frontend Dev |
| 2.4 | Implement real-time answer capture: transcript displayed live as user speaks | 🟡 | M | Frontend Dev |
| 2.5 | Build answer evaluation API: input = question + transcript → output = scores, strengths, weaknesses, optimal answer | 🔴 | L | Backend Dev |
| 2.6 | Integrate MediaDevices API for real webcam feed in the interview video panel | 🟡 | M | Frontend Dev |
| 2.7 | Add microphone visualizer using Web Audio API (replace static `AudioWave` animation) | 🟢 | S | Frontend Dev |
| 2.8 | Build JDI score calculation engine: aggregate per-question scores into a single composite JDI | 🔴 | M | Backend Dev |
| 2.9 | Implement interview session timer with auto-end at configurable time limit | 🟢 | S | Frontend Dev |
| 2.10 | Store all question/answer pairs and evaluation results in the database after session ends | 🔴 | M | Backend Dev |
| 2.11 | Build "pause & resume" interview flow (candidate can stop mid-session and continue later) | ⬜ | L | Backend Dev |

---

### Phase 3 — Coding Challenge Engine

| # | Task | Priority | Effort | Role |
|---|---|---|---|---|
| 3.1 | Integrate Judge0 API (or self-hosted equivalent) as the code execution backend | 🔴 | L | Backend Dev |
| 3.2 | Replace "Run" button mock results with real test case execution against submitted code | 🔴 | M | Frontend Dev |
| 3.3 | Build problem management system: store problems with test cases, hints, editorial in DB | 🟡 | L | Backend Dev |
| 3.4 | Seed initial problem library with 20 problems (Easy × 10, Medium × 8, Hard × 2) | 🟡 | M | Backend Dev |
| 3.5 | Implement problem selection based on role type from JD (frontend = DOM/async problems, etc.) | 🟡 | L | Backend Dev |
| 3.6 | Build AI code analysis endpoint: submit code → Claude evaluates correctness, style, complexity | 🔴 | L | Backend Dev |
| 3.7 | Replace mock `codingSubScores` and `codingCorrectnessAnalysis` with real AI evaluation results | 🔴 | M | Frontend Dev |
| 3.8 | Implement "AI Diagram" tab: generate algorithm flowchart/visualization from submitted code | 🟡 | XL | Backend Dev + Frontend Dev |
| 3.9 | Add language-specific starter code templates per problem per language | 🟢 | M | Backend Dev |
| 3.10 | Add code execution time and memory stats to test result panels | 🟢 | S | Frontend Dev |
| 3.11 | Build "Get AI Coach Help" feature: real-time Socratic hints from Claude without revealing the answer | 🟡 | L | Backend Dev + Frontend Dev |

---

### Phase 4 — Analytics & Reporting

| # | Task | Priority | Effort | Role |
|---|---|---|---|---|
| 4.1 | Build post-interview analytics API: aggregate interview + coding scores into final report | 🔴 | L | Backend Dev |
| 4.2 | Replace all mock analytics data with real API response data on the `/analytics` page | 🔴 | M | Frontend Dev |
| 4.3 | Implement JDI score history chart (line chart showing score trend across sessions over time) | 🟡 | M | Frontend Dev |
| 4.4 | Build skill benchmarking: compare user JDI sub-scores vs. anonymized cohort percentiles | 🟡 | L | Backend Dev |
| 4.5 | Implement PDF report export (use Puppeteer or a headless browser service) | 🟡 | L | Backend Dev |
| 4.6 | Build "Share with University" feature: generate a secure shareable link to the analytics report | 🟡 | M | Backend Dev |
| 4.7 | Add AI-generated personalized action plan: map skill gaps → recommended resources | 🟡 | L | Backend Dev |
| 4.8 | Implement session replay: store timestamps + transcript, allow scrubbing through the interview | ⬜ | XL | Backend Dev + Frontend Dev |

---

### Phase 5 — User Experience & Polish

| # | Task | Priority | Effort | Role |
|---|---|---|---|---|
| 5.1 | Add onboarding flow for new users: role selection, experience level, target company type | 🟡 | M | Frontend Dev |
| 5.2 | Implement loading skeletons on all data-fetched pages (replace empty states with skeletons) | 🟡 | M | Frontend Dev |
| 5.3 | Add error boundary components with retry UI on all API-dependent pages | 🟡 | S | Frontend Dev |
| 5.4 | Improve mobile responsiveness on Dashboard, Setup, and Analytics pages | 🟢 | M | Frontend Dev |
| 5.5 | Add toast notification system (success, error, info) for all async actions | 🟢 | S | Frontend Dev |
| 5.6 | Implement proper 404 and 500 error pages | 🟢 | XS | Frontend Dev |
| 5.7 | Add keyboard accessibility: focus traps in modals, skip-to-content link, ARIA labels | 🟢 | M | Frontend Dev |
| 5.8 | Internationalization (i18n) foundation: support Vietnamese and English UI strings | ⬜ | L | Frontend Dev |
| 5.9 | Dark/light mode toggle on Dashboard | ⬜ | S | Frontend Dev |
| 5.10 | Add progressive web app (PWA) support: service worker, offline mode, install prompt | ⬜ | L | Frontend Dev |

---

### Phase 6 — Platform & Monetization

| # | Task | Priority | Effort | Role |
|---|---|---|---|---|
| 6.1 | Implement subscription plan enforcement: limit interview count for Freemium, track usage | 🔴 | L | Backend Dev |
| 6.2 | Integrate VNPay payment gateway for VND-denominated subscriptions | 🟡 | L | Backend Dev |
| 6.3 | Integrate Momo payment gateway | 🟡 | L | Backend Dev |
| 6.4 | Add Stripe for international card payments (Standard + Premium plans) | 🟡 | L | Backend Dev |
| 6.5 | Build admin dashboard: user management, session stats, revenue metrics | 🟡 | XL | Backend Dev + Frontend Dev |
| 6.6 | Implement company-specific interview packs: FPT Software, VNG, Grab Vietnam profiles | 🟡 | L | Backend Dev |
| 6.7 | Build university partner portal with cohort analytics and student progress tracking | ⬜ | XL | Backend Dev + Frontend Dev |
| 6.8 | Implement referral program and usage-based top-up flow (29,000 VND per interview) | ⬜ | M | Backend Dev |

---

### Phase 7 — Infrastructure & Reliability

| # | Task | Priority | Effort | Role |
|---|---|---|---|---|
| 7.1 | Set up CI/CD pipeline (GitHub Actions: lint → test → build → deploy to Vercel) | 🔴 | M | DevOps |
| 7.2 | Configure staging environment (separate DB, separate Vercel deployment) | 🔴 | S | DevOps |
| 7.3 | Set up error monitoring (Sentry) | 🟡 | S | DevOps |
| 7.4 | Add API rate limiting to all public endpoints (prevent abuse) | 🟡 | S | Backend Dev |
| 7.5 | Add request validation (zod schemas) on all API routes | 🟡 | M | Backend Dev |
| 7.6 | Implement basic analytics/telemetry (PostHog or Plausible) for product usage insights | 🟢 | S | DevOps |
| 7.7 | Write API integration tests for all critical endpoints | 🟢 | L | Backend Dev |
| 7.8 | Set up database backup and point-in-time recovery | 🔴 | S | DevOps |
| 7.9 | Security audit: OWASP checklist, file upload validation, content-type enforcement | 🔴 | M | Backend Dev |
| 7.10 | Performance audit: Lighthouse scores, bundle analysis, image optimization | 🟢 | M | Frontend Dev |

---

### Effort Scale Reference

| Label | Estimated Hours |
|---|---|
| XS | < 2 hours |
| S | 2–8 hours |
| M | 1–3 days |
| L | 3–7 days |
| XL | 1–3 weeks |

---

## Getting Started (Development)

```bash
# Clone the repo
git clone https://github.com/x23d8/viecareer.git
cd viecareer
git checkout dev

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — you'll be redirected to `/dashboard`.

> No environment variables are required to run the current prototype. All data is mocked locally in `src/lib/mock-data.ts`.

---

## Contributing

1. Branch from `dev` for all new features: `git checkout -b feat/your-feature-name`
2. Run `npm run lint` and `npm run build` before opening a PR
3. PRs should target `dev`; `main` is the production-stable branch

---

*VieCareer — Built to close the career readiness gap in Vietnam, one interview at a time.*
