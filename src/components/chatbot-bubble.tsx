"use client";

import React, { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import { Sparkles, X, Send, ChevronDown } from "lucide-react";

// ---------------------------------------------------------------------------
// Nudges
// ---------------------------------------------------------------------------
const NUDGES = [
  "Keep track with the roadmap, John 🗺️",
  "Review what you've done so far 📋",
  "Ready for your next mock interview? 🎯",
  "Your JRI score can still improve! 📈",
  "Don't forget your Daily Focus goal 💡",
];

// ---------------------------------------------------------------------------
// Rule-based engine
// ---------------------------------------------------------------------------
type Rule = { pattern: RegExp; response: string };

const RULES: Rule[] = [
  {
    pattern: /road[\s-]?map|what should i (learn|study)|where (do i |to )?start|learning path|study plan/i,
    response: `Alright bestie 🚀 here's your **career glow-up roadmap**:

**🧩 Phase 1 – Foundation** ("don't panic, take it slow")
- Master HTML, CSS, JavaScript basics
- Understand Git (no more "why did my code disappear??" 💀)
- Build small projects: landing page, todo app

**⚡ Phase 2 – Level Up** (time to cook 🔥)
- Learn ReactJS: components, hooks, state management
- API calling with fetch / axios
- UI/UX basics — make it look good, not just run 😭

**🧠 Phase 3 – Real-World Skills**
- Team workflow: GitHub, pull requests, merge conflicts 💀
- Testing & debugging (console.log is your best friend fr)
- Performance optimization — no one likes a slow app

**💼 Phase 4 – Career Mode**
- Build a portfolio (projects + clean UI = instant rizz)
- Practice interview questions
- Apply for internships / jobs

👉 **Final boss:** Become a Frontend Dev with real-world experience 💯`,
  },
  {
    pattern: /\b(job|position|role|career|apply|suitable|fit for|good for|ready for)\b/i,
    response: `Based on your current stats 📊 (not bad at all 👀), you're ready for:

**🎯 Recommended Roles:**

- **Intern Front-End Developer at FPT IS**
- **Frontend ReactJS Developer**

**💬 Why you fit:**
- You know React (or at least survived it 😭)
- You've built real projects (not just tutorial copy-paste… right? 👀)
- You're ready to learn — I mean *suffer* — in real projects

👉 **Verdict: Intern-level Frontend Dev — 100% valid 🎯**`,
  },
  {
    pattern: /scar(ed|y)|nerv(ous|ous about)|anxious|afraid|fear(ful)?|worried about (interview|presenting)/i,
    response: `First of all… SAME 💀

But here's how to not flop:

- **Practice common questions** — Google is free bro
- **Prepare your project stories:** how you built it, what broke, how you fixed it
- **Fake confidence** — yes, it works 💅
- **If you don't know** → say it honestly + explain your thinking out loud

👉 Interviewers don't expect a genius. They want *someone who doesn't give up after 5 minutes* 🔥`,
  },
  {
    pattern: /\b(fail|failed|failing|reject(ed)?|didn.?t pass|didn.?t make it|not selected)\b/i,
    response: `Congrats 🎉 you just unlocked:

**🧠 Character Development Arc**

- You gain +100 experience points
- You learn exactly which questions you need to prep
- You come back stronger (anime training arc fr 🔥)

👉 Failing an interview **≠** you're bad
👉 It just means: **not yet, bro**

Every rejection is the game telling you to grind a bit more 🎮`,
  },
  {
    pattern: /what (kind of |type of )?(questions?|things?).*(ask|expect|prepare)|interview questions?|what.*(they|do they).*(ask|want)/i,
    response: `Expect a combo meal 🍔:

**💻 Technical:**
- What is React? (explain like I'm 5)
- Difference between state & props
- How does an API work
- JS basics: closure, async/await, \`this\` keyword

**🧠 Behavioral:**
- "Tell me about yourself" (a.k.a. sell yourself time)
- Your biggest challenge
- A team conflict you resolved (yes, the drama 💀)
- Why this company?

👉 **Tip:** If you can explain it to a 5-year-old → you win 🏆`,
  },
  {
    pattern: /stand[\s-]?out|differentiat(e|ing)|impress|get noticed|be (different|unique|better)/i,
    response: `Easy formula for standing out 😎:

- Have **real projects** (not 20 todo app clones please 😭)
- **Clean UI** — recruiters genuinely love pretty things
- **Explain clearly + confidently**, even if you're shaking inside
- Show a **learning mindset** — not "I know everything" energy

👉 **Bonus:** If you make the interviewer smile = instant +10 points 😎✨`,
  },
  {
    pattern: /\b(advice|tip|tips|suggest(ion)?|recommend|final|last|what should i do|help me|guide me)\b/i,
    response: `Okay bestie, real talk 🫂:

- **Don't overthink** — done > perfect
- **Don't compare yourself** to seniors (they were juniors once too 💀)
- Just be **slightly better than yesterday** — that's literally it

👉 Career is not a speedrun. It's an **open-world game** 🎮

You got this. If not… we pretend we got this 💀✨`,
  },
  {
    pattern: /\b(resume|cv|cover letter|portfolio|profile)\b/i,
    response: `CV time 📄 let's make it slap:

- **1 page max** — no recruiter wants to read a novel
- **Lead with projects**, not just your education
- Use numbers: *"Reduced load time by 40%"* > *"Improved performance"*
- **Clean layout > fancy design** — ATS can't read your fancy tables 😭

👉 Rule of thumb: If your grandma can't understand what you did → rewrite it 👵`,
  },
  {
    pattern: /mock[\s-]?interview|practice (interview|session)|ai interview|simulate|coding (test|challenge|feedback)/i,
    response: `Oh you want to practice? Let's GO 🎯

On **VieCareer** you can:
- 🎤 **AI Mock Interview** — real questions, real pressure, zero judgment
- 💻 **AI Code Feedback** — submit your code, get roasted (nicely 😅)
- 📄 **Resume Analysis** — AI tells you exactly what's weak

👉 Hit **"Start Interview"** on your dashboard. No excuses now 😤`,
  },
  {
    pattern: /^(hi+|hey+|hello+|yo+|sup|what.?s up|howdy|hiya)\b/i,
    response: `Yo! 👋 What's good?

I'm **VieBot** — your AI career bestie 🤖✨

You can ask me about:
- 🗺️ Your **learning roadmap**
- 💼 **Job positions** you're ready for
- 🎤 **Interview tips** and prep
- 📄 **Resume & portfolio** advice
- 😤 What to do when you feel like giving up

What are we cooking today? 🔥`,
  },
];

const FALLBACK = `Hmm, that's a tough one ngl 🤔

I'm still expanding my knowledge every day (just like you bestie 💪).

Try asking me about:
- Your **roadmap** 🗺️
- **Job positions** you're suitable for 💼
- **Interview tips** 🎤
- How to **stand out** ✨
- **Resume** advice 📄

Or just tell me what's on your mind 🫂`;

function getRuleBasedResponse(input: string): string {
  for (const rule of RULES) {
    if (rule.pattern.test(input)) return rule.response;
  }
  return FALLBACK;
}

// ---------------------------------------------------------------------------
// Markdown renderer
// ---------------------------------------------------------------------------
function BotMessage({ text }: { text: string }) {
  return (
    <ReactMarkdown
      components={{
        p: ({ children }) => <p className="mb-1 last:mb-0">{children}</p>,
        strong: ({ children }) => <strong className="font-bold text-[#191A23]">{children}</strong>,
        em: ({ children }) => <em className="italic text-[#191A23]/80">{children}</em>,
        ul: ({ children }) => <ul className="mt-1 mb-1 space-y-0.5 pl-3">{children}</ul>,
        ol: ({ children }) => <ol className="mt-1 mb-1 space-y-0.5 pl-3 list-decimal">{children}</ol>,
        li: ({ children }) => (
          <li className="flex gap-1.5 leading-snug">
            <span className="text-[#5378EF] mt-[3px] shrink-0">•</span>
            <span>{children}</span>
          </li>
        ),
        code: ({ children }) => (
          <code className="bg-[#F3F3F3] text-[#5378EF] text-[11px] px-1.5 py-0.5 rounded font-mono">
            {children}
          </code>
        ),
        h1: ({ children }) => <p className="font-bold text-[#191A23] mb-0.5">{children}</p>,
        h2: ({ children }) => <p className="font-bold text-[#191A23] mb-0.5">{children}</p>,
        h3: ({ children }) => <p className="font-semibold text-[#191A23] mb-0.5">{children}</p>,
        blockquote: ({ children }) => (
          <blockquote className="border-l-2 border-[#5378EF] pl-2 text-[#191A23]/70 italic">
            {children}
          </blockquote>
        ),
      }}
    >
      {text}
    </ReactMarkdown>
  );
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
type Message = { role: "ai" | "user"; text: string };

const INITIAL_MESSAGE: Message = {
  role: "ai",
  text: "Yo John! 👋 I'm **VieBot** — your AI career bestie at VieCareer 🤖✨\n\nAsk me anything: roadmap, job fit, interview tips, or just vibe about your career 🚀",
};

export function ChatbotBubble() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [nudge] = useState(() => NUDGES[Math.floor(Math.random() * NUDGES.length)]);
  const [nudgeVisible, setNudgeVisible] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setNudgeVisible(true), 1200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (open) setNudgeVisible(false);
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [open, messages]);

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    setMessages((prev) => [...prev, { role: "user", text: trimmed }]);
    setInput("");
    setLoading(true);

    setTimeout(() => {
      const response = getRuleBasedResponse(trimmed);
      setMessages((prev) => [...prev, { role: "ai", text: response }]);
      setLoading(false);
    }, 600);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Chat Panel */}
      {open && (
        <div className="w-[360px] h-[480px] bg-white border-2 border-[#191A23] shadow-[6px_6px_0_#191A23] rounded-2xl flex flex-col overflow-hidden animate-fade-in-up">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#191A23] shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-[#5378EF] rounded-lg flex items-center justify-center">
                <Sparkles className="w-3.5 h-3.5 text-white" />
              </div>
              <div>
                <p className="text-white text-sm font-bold leading-none">VieBot</p>
                <p className="text-white/40 text-[10px] mt-0.5">Your AI career bestie 🤖</p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            >
              <ChevronDown className="w-4 h-4 text-white" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-[#F8F9FF]">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                {msg.role === "ai" && (
                  <div className="w-6 h-6 bg-[#5378EF] rounded-full flex items-center justify-center mr-2 shrink-0 mt-0.5">
                    <Sparkles className="w-3 h-3 text-white" />
                  </div>
                )}
                <div
                  className={`max-w-[78%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-[#191A23] text-white rounded-br-sm"
                      : "bg-white border border-[#191A23]/10 text-[#191A23] rounded-bl-sm shadow-sm"
                  }`}
                >
                  {msg.role === "ai" ? <BotMessage text={msg.text} /> : msg.text}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {loading && (
              <div className="flex justify-start">
                <div className="w-6 h-6 bg-[#5378EF] rounded-full flex items-center justify-center mr-2 shrink-0 mt-0.5">
                  <Sparkles className="w-3 h-3 text-white" />
                </div>
                <div className="bg-white border border-[#191A23]/10 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-[#5378EF] rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-1.5 h-1.5 bg-[#5378EF] rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-1.5 h-1.5 bg-[#5378EF] rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="px-3 py-3 border-t-2 border-[#191A23]/10 bg-white shrink-0 flex items-center gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask me anything..."
              className="flex-1 text-sm px-3 py-2 rounded-full border-2 border-[#191A23]/10 bg-[#F3F3F3] text-[#191A23] placeholder:text-[#191A23]/40 outline-none focus:border-[#5378EF] transition-colors"
            />
            <button
              onClick={handleSend}
              disabled={loading}
              className="w-9 h-9 bg-[#5378EF] hover:bg-[#4060d0] disabled:opacity-50 rounded-full flex items-center justify-center transition-colors shrink-0"
            >
              <Send className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      )}

      {/* Nudge Tooltip */}
      {nudgeVisible && !open && (
        <div className="flex items-center gap-2 bg-white border-2 border-[#191A23] shadow-[3px_3px_0_#191A23] rounded-2xl rounded-br-sm px-4 py-2.5 max-w-[260px] animate-fade-in-up">
          <Sparkles className="w-3.5 h-3.5 text-[#5378EF] shrink-0" />
          <p className="text-[#191A23] text-sm font-medium leading-snug">{nudge}</p>
          <button
            onClick={() => setNudgeVisible(false)}
            className="ml-1 text-[#191A23]/30 hover:text-[#191A23]/60 transition-colors shrink-0"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Bubble Button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-14 h-14 bg-[#5378EF] hover:bg-[#4060d0] rounded-full flex items-center justify-center shadow-[3px_3px_0_#191A23] border-2 border-[#191A23] transition-all active:scale-95 relative"
      >
        <Sparkles className="w-6 h-6 text-white" />
        {!open && (
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-white animate-pulse" />
        )}
      </button>
    </div>
  );
}
