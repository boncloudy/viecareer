# VieCareer UI Bug Report

> **Platform:** VieCareer — Coding Interview Module  
> **Screens reviewed:** Interview Editor · AI Code Analysis · Analyzing Solution loader  
> **Total issues found:** 12 (4 Critical · 5 Moderate · 3 Minor)

---

## Summary

| Severity | Count |
|----------|-------|
| 🔴 Critical | 4 |
| 🟡 Moderate | 5 |
| 🟢 Minor | 3 |

---

## Screen 1 — Interview Editor

### 🔴 [Critical] No output/terminal panel after running code
- **Description:** The "Run" button exists in the header but there is no visible terminal or output zone below the editor. Running code has nowhere to display results.
- **Expected:** A collapsible output/console panel below the code editor that shows stdout, errors, and test case results on run.
- **Actual:** No feedback is shown to the user after clicking Run.

---

### 🔴 [Critical] Mentor AI panel overlaps editor with no resize control
- **Description:** The AI panel on the right takes a fixed portion of the screen with no drag handle or collapse button. Users cannot reclaim screen space for the code editor.
- **Expected:** A draggable divider between the editor and AI panel, with a collapse toggle, similar to LeetCode's panel system.
- **Actual:** All panels have hardcoded widths — no resize or collapse is possible.
- **Recommended fix:** Implement resizable panels using `react-resizable-panels` with a minimum width per panel (e.g. 200px) and a visible gripper handle.

---

### 🟡 [Moderate] Timer is easy to miss — low visibility in top-right corner
- **Description:** The countdown timer ("00:08") is placed in the top-right corner with low contrast against the dark header. In a timed interview setting, the timer should be immediately readable under stress.
- **Expected:** Prominent timer placement, larger font, and a warning color change (e.g. amber → red) as time runs low.

---

### 🟡 [Moderate] "AI Feedback: 4" badge has no tooltip or context
- **Description:** The badge count in the header has no explanation — users don't know if it means 4 pending suggestions, 4 feedback sessions, or something else.
- **Expected:** A tooltip or label clarifying what the count represents.

---

### 🟢 [Minor] "Companies" tab accessible mid-interview with no navigation warning
- **Description:** Clicking the "Companies" tab during an active interview could cause the user to navigate away unintentionally. There is no confirmation dialog or unsaved-state warning.
- **Expected:** A confirmation prompt ("Leave interview? Your progress may be lost.") before navigating away mid-session.

---

## Screen 2 — AI Code Analysis Results

### 🔴 [Critical] Layout does not match Screen 1 — full page reconstruction on submit
- **Description:** Submitting code causes a complete layout change. The 3-panel layout (description | editor | AI panel) is entirely replaced by a new 2-panel page (code viewer | AI feedback). This feels like navigating to a different product rather than a contextual transition.
- **Expected:** The AI analysis result should open within the existing layout — ideally replacing only the right-side Mentor AI panel — keeping the problem description and editor visible for reference.
- **Actual:** The entire screen is reconstructed. The problem description panel, tab navigation, and header controls disappear.

Specific inconsistencies between Screen 1 and Screen 2:

| Element | Screen 1 (Editor) | Screen 2 (Analysis) |
|---|---|---|
| Layout | 3 columns | 2 columns |
| Left panel | Problem description | Gone |
| Header | Timer + Run + Submit + tabs | Export + Share only |
| Code area | Editable editor | Read-only viewer (no visible indicator) |
| Navigation | Description / Hint / Discussion tabs | Replaced by breadcrumb |

---

### 🔴 [Critical] Score bar labels are spatially disconnected from their bars
- **Description:** The score values (95, 70, 85, 80) are right-aligned at the edge of the panel while their corresponding bars are on the left. Under a quick glance it is hard to match which number belongs to which bar.
- **Expected:** Score values should be embedded at the end of each bar, or placed immediately adjacent to the bar label on the left.

---

### 🟡 [Moderate] Actionable suggestions lack priority or effort indicators
- **Description:** The three numbered suggestions (e.g. "Add type hints", "Handle no-solution case") appear equally weighted. Users cannot tell which fix is most impactful or quickest to apply.
- **Expected:** Each suggestion should include a priority tag (e.g. High / Low) or effort estimate (e.g. "2 min fix").

---

### 🟡 [Moderate] "Detailed Analysis" tab strip duplicates content already visible above
- **Description:** The Correctness tab is active by default and its content largely mirrors the score card shown above it. This creates redundancy and wastes vertical space.
- **Expected:** Consolidate the score card and tab content, or make the tabs reveal genuinely new detail not shown in the score overview.

---

### 🟡 [Moderate] Complexity analysis cards use low-contrast text on dark panels
- **Description:** The descriptive text inside the Time O(n) and Space O(n) cards ("Single pass through the array with hash map lookups") is difficult to read due to insufficient contrast against the dark card background.
- **Expected:** Text contrast should meet WCAG AA minimum (4.5:1 ratio for body text).

---

### 🟢 [Minor] Export and Share buttons have no visual hierarchy
- **Description:** Both "Export" and "Share" are styled similarly. If sharing is the primary CTA, it should use a filled/primary button style, while Export should be ghost or text-only.

---

## Screen 3 — Analyzing Solution (Loading State)

### 🔴 [Critical] Loading overlay renders full-screen instead of scoped to AI panel
- **Description:** The "Analyzing Solution..." loader covers the entire viewport rather than appearing only within the AI Code Analysis panel.
- **Root cause:** The overlay is likely using `position: fixed` (relative to viewport) instead of `position: absolute` inside a `position: relative` parent container — a common "fixed overlay leak" bug.
- **Expected:** The loader should be scoped to the right-side AI feedback panel only, leaving the code editor and problem description accessible.
- **Fix:** Change overlay from `position: fixed` → `position: absolute` and ensure the parent panel has `position: relative`.

---

### 🟡 [Moderate] Pending steps are fully greyed out — UI feels broken during load
- **Description:** Steps 2–6 (Deep Analysis, Performance Review, Quality Assessment, Generating Insights, Finalizing Feedback) are completely greyed out with no animation or skeleton state. This makes the screen feel frozen rather than in progress.
- **Expected:** Upcoming steps should use a subtle shimmer/skeleton animation to communicate that the system is working and content is incoming.

---

### 🟢 [Minor] Progress bar percentage does not match step progress
- **Description:** The progress bar shows 17% while Step 1 of 6 is processing. Mathematically, step 1 of 6 = ~16.6%, which is close, but if the bar tracks real-time processing rather than step count it should be made consistent with the step indicators or explained visually.
- **Expected:** Progress bar and step indicators should be in sync. If the bar reflects time, the step dots should reflect time too — not discrete steps.

---

## Recommended Priority Order

1. 🔴 Fix loading overlay scope (`position: fixed` → `position: absolute`)
2. 🔴 Add resizable panel dividers with collapse toggle
3. 🔴 Add output/terminal panel below the code editor
4. 🔴 Unify layout between interview editor and AI analysis — avoid full page reconstruction on submit
5. 🔴 Fix score bar label alignment in analysis results
6. 🟡 Add shimmer/skeleton to pending loading steps
7. 🟡 Improve timer visibility and add color warning near time limit
8. 🟡 Add priority/effort tags to actionable suggestions
9. 🟡 Fix contrast on complexity analysis card text
10. 🟡 Add tooltip to AI Feedback badge count
11. 🟢 Add navigation warning when leaving mid-interview
12. 🟢 Establish primary/secondary button hierarchy for Export vs Share
