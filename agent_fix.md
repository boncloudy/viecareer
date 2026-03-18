# Agent Prompt — Fix VieCareer Coding Interview UI

## Stack
- React (functional components + hooks)
- Tailwind CSS v3
- `react-resizable-panels` for panel layout

---

## Context

You are fixing the UI of **VieCareer**, a coding interview platform similar to LeetCode.
The app has three main views:

1. **Interview Editor** — 3-panel layout: problem description | code editor | Mentor AI chat
2. **AI Code Analysis** — shown after the user submits code; displays AI-generated scores and feedback
3. **Analyzing Solution** — a loading state shown while AI processes the submission

Fix the issues below **in order of priority**. After each fix, verify it does not break the layout of the other views. Do not rewrite components from scratch unless instructed — make targeted, minimal changes.

---

## Fix 1 — Scope the loading overlay to the AI panel (not full screen)

**File:** The component rendering the "Analyzing Solution..." loader

**Problem:** The overlay uses `position: fixed` which makes it cover the entire viewport.

**Fix:**
- Change the overlay wrapper from `fixed inset-0` to `absolute inset-0`
- Ensure the parent AI panel container has `relative` set: add `relative` to its Tailwind class list
- The loader must only cover the right-side AI feedback panel, not the editor or problem description

```jsx
// Before
<div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0d1117]">

// After
<div className="absolute inset-0 z-10 flex items-center justify-center bg-[#0d1117] rounded-xl">
```

---

## Fix 2 — Replace fixed panel layout with resizable panels

**File:** The root interview layout component (likely `InterviewLayout.tsx` or `EditorPage.tsx`)

**Problem:** All three panels have hardcoded widths with no drag handles. Users cannot resize or collapse panels.

**Fix:**
- Install `react-resizable-panels`: `npm install react-resizable-panels`
- Replace the current fixed `flex` or `grid` layout with `PanelGroup`, `Panel`, and `PanelResizeHandle`
- Set minimum sizes to prevent panels from collapsing below a usable width
- Add a visible gripper icon on the resize handle

```jsx
import { PanelGroup, Panel, PanelResizeHandle } from 'react-resizable-panels'

<PanelGroup direction="horizontal" className="h-screen w-full">

  {/* Left: Problem description */}
  <Panel defaultSize={25} minSize={15} maxSize={40}>
    <ProblemPanel />
  </Panel>

  <PanelResizeHandle className="w-1 bg-border hover:bg-primary/40 transition-colors cursor-col-resize flex items-center justify-center">
    <div className="w-0.5 h-6 rounded-full bg-muted-foreground/40" />
  </PanelResizeHandle>

  {/* Center: Code editor */}
  <Panel defaultSize={50} minSize={30}>
    <CodeEditorPanel />
  </Panel>

  <PanelResizeHandle className="w-1 bg-border hover:bg-primary/40 transition-colors cursor-col-resize flex items-center justify-center">
    <div className="w-0.5 h-6 rounded-full bg-muted-foreground/40" />
  </PanelResizeHandle>

  {/* Right: Mentor AI */}
  <Panel defaultSize={25} minSize={15} maxSize={40} className="relative">
    <MentorAIPanel />
  </Panel>

</PanelGroup>
```

---

## Fix 3 — Add a terminal/output panel below the code editor

**File:** `CodeEditorPanel.tsx` (or equivalent)

**Problem:** There is no output area. Clicking "Run" has no visible result.

**Fix:**
- Split the center panel vertically into two sub-panels using a nested `PanelGroup direction="vertical"`
- Top sub-panel: code editor (default 65% height)
- Bottom sub-panel: output/terminal area (default 35% height, collapsible)
- The output panel should show stdout, stderr, and test case pass/fail results
- Add a tab bar on the output panel: "Output" | "Test Cases"

```jsx
<PanelGroup direction="vertical" className="h-full">

  <Panel defaultSize={65} minSize={40}>
    <CodeEditor />
  </Panel>

  <PanelResizeHandle className="h-1 bg-border hover:bg-primary/40 transition-colors cursor-row-resize" />

  <Panel defaultSize={35} minSize={20} collapsible>
    <OutputPanel />
  </Panel>

</PanelGroup>
```

**`OutputPanel` component minimum requirements:**
```jsx
// Show one of: idle | running | success | error states
// idle:    "Run your code to see output here"
// running: spinner + "Running..."
// success: green checkmark + stdout text + test case results
// error:   red border + stderr message + line number if available
```

---

## Fix 4 — Keep layout consistent between Interview Editor and AI Analysis views

**File:** The submit handler and AI Analysis page component

**Problem:** Submitting code fully replaces the 3-panel layout with a completely different 2-panel page. This is disorienting.

**Fix:**
- Do NOT navigate to a new route on submit
- Instead, keep the 3-panel layout intact
- Replace only the **right-side Mentor AI panel** content with the AI Code Analysis results
- Add a back/close button inside the AI panel to return to the Mentor AI chat view
- The code editor becomes read-only after submit (add `readOnly` prop) — add a visible `read-only` badge near the editor tab bar so users know

```jsx
// In the right panel, use a state to toggle between views:
const [rightPanelView, setRightPanelView] = useState<'mentor' | 'analysis'>('mentor')

// On submit:
setRightPanelView('analysis')

// In the panel render:
{rightPanelView === 'mentor'
  ? <MentorAIPanel />
  : <AIAnalysisPanel onBack={() => setRightPanelView('mentor')} />
}
```

---

## Fix 5 — Fix score bar label alignment in AI Analysis panel

**File:** `AIAnalysisPanel.tsx` or `ScoreCard.tsx`

**Problem:** Score values (95, 70, 85, 80) are right-aligned at the panel edge, visually disconnected from their bars.

**Fix:**
- Place the score value at the right end of the filled bar, immediately after it
- Use a relative-positioned bar with an absolute score label pinned to the fill edge

```jsx
{scores.map(({ label, value, color }) => (
  <div key={label} className="mb-4">
    <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
      <span>{label}</span>
    </div>
    <div className="relative h-2 w-full rounded-full bg-muted">
      <div
        className={`h-2 rounded-full ${color} transition-all duration-700`}
        style={{ width: `${value}%` }}
      />
      <span
        className="absolute -top-5 text-xs font-medium text-foreground"
        style={{ left: `${value}%`, transform: 'translateX(-100%)' }}
      >
        {value}/100
      </span>
    </div>
  </div>
))}
```

---

## Fix 6 — Add shimmer skeleton to pending loading steps

**File:** `AnalyzingLoader.tsx` (the "Analyzing Solution..." screen)

**Problem:** Steps 2–6 are fully greyed out with no animation, making the UI feel frozen.

**Fix:**

First, add the shimmer animation to `tailwind.config.js`:

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      animation: {
        shimmer: 'shimmer 1.8s infinite linear',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
}
```

Then apply to pending steps:

```jsx
// Pending step
<div className="flex items-center gap-3 opacity-50">
  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-muted via-muted-foreground/20 to-muted bg-[length:200%_100%] animate-shimmer" />
  <div className="h-3 w-36 rounded-md bg-gradient-to-r from-muted via-muted-foreground/20 to-muted bg-[length:200%_100%] animate-shimmer" />
</div>

// Active/processing step (no shimmer, spinner instead)
<div className="flex items-center gap-3">
  <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
  <span className="text-sm font-medium text-foreground">{step.label}</span>
  <span className="ml-auto text-xs text-primary font-medium">PROCESSING</span>
</div>
```

---

## Fix 7 — Improve timer visibility with color warnings

**File:** Header/navbar component

**Problem:** Timer is small and hard to read under time pressure. No visual urgency as time runs out.

**Fix:**

```jsx
import { cn } from '@/lib/utils'

<span className={cn(
  "font-mono text-lg font-semibold tabular-nums min-w-[72px] text-center px-2 py-0.5 rounded transition-colors",
  timeLeft > 60 && "text-foreground",
  timeLeft <= 60 && timeLeft > 30 && "text-amber-400",
  timeLeft <= 30 && "text-red-500 animate-pulse"
)}>
  {formatTime(timeLeft)}
</span>
```

---

## Fix 8 — Add tooltip to AI Feedback badge

**File:** Header component

**Problem:** The badge count ("AI Code Feedback: 4") has no explanation for what the number means.

**Fix:**

```jsx
<div className="relative group">
  <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
    <SparklesIcon className="w-4 h-4" />
    AI Code Feedback: {feedbackCount}
  </button>
  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1.5 rounded-md bg-popover border border-border text-xs text-popover-foreground whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 shadow-md">
    {feedbackCount} AI feedback suggestions available for this problem
  </div>
</div>
```

---

## Fix 9 — Add navigation warning when leaving mid-interview

**File:** Router config or interview layout component

**Problem:** Users can accidentally navigate away mid-interview with no warning.

**Fix:** Use React Router v6 `useBlocker` to intercept navigation while an interview is active:

```jsx
import { useBlocker } from 'react-router-dom'

const blocker = useBlocker(
  ({ currentLocation, nextLocation }) =>
    isInterviewActive &&
    currentLocation.pathname !== nextLocation.pathname
)

{blocker.state === 'blocked' && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
    <div className="bg-card border border-border rounded-xl p-6 w-full max-w-sm shadow-xl">
      <h2 className="text-base font-semibold text-foreground mb-2">Leave interview?</h2>
      <p className="text-sm text-muted-foreground mb-5">
        Your current progress will be lost. Are you sure you want to leave?
      </p>
      <div className="flex gap-3 justify-end">
        <button
          onClick={() => blocker.reset()}
          className="px-4 py-2 rounded-md border border-border text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
        >
          Stay
        </button>
        <button
          onClick={() => blocker.proceed()}
          className="px-4 py-2 rounded-md bg-destructive text-destructive-foreground text-sm font-medium hover:bg-destructive/90 transition-colors"
        >
          Leave
        </button>
      </div>
    </div>
  </div>
)}
```

---

## Fix 10 — Fix button hierarchy on AI Analysis page header

**File:** AI Analysis page header

**Problem:** Export and Share buttons look identical — no visual hierarchy between primary and secondary actions.

**Fix:**

```jsx
<div className="flex items-center gap-2">
  {/* Export = secondary/ghost */}
  <button className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-border text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
    <DownloadIcon className="w-4 h-4" />
    Export
  </button>

  {/* Share = primary/filled */}
  <button className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
    <ShareIcon className="w-4 h-4" />
    Share
  </button>
</div>
```

---

## General Rules for All Fixes

- Use `cn()` (clsx + tailwind-merge) for all conditional class merging — never string concatenation
- Do not use inline `style={{}}` except for dynamic numeric values (bar widths, progress percentages)
- Every interactive element must have `hover:` and `focus-visible:` Tailwind states
- All colors must use Tailwind design tokens (`text-foreground`, `bg-muted`, etc.) — no hardcoded hex values except for brand-specific overrides
- Keep each component under 150 lines — extract sub-components when needed
- After all fixes, test at viewport widths: **1280px**, **1440px**, and **1920px**
