"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import { Play, Pause, RotateCcw, ChevronRight, ChevronLeft } from "lucide-react";

const NUMS = [2, 7, 11, 15];
const TARGET = 9;

interface Step {
  index: number;
  value: number;
  diff: number;
  hashMapBefore: Record<number, number>;
  hashMapAfter: Record<number, number>;
  lookupResult: "miss" | "hit";
  resultPair: [number, number] | null;
}

function buildAllSteps(): Step[] {
  const steps: Step[] = [];
  const map: Record<number, number> = {};

  for (let i = 0; i < NUMS.length; i++) {
    const diff = TARGET - NUMS[i];
    const hit = diff in map;
    const before = { ...map };
    const pair: [number, number] | null = hit ? [map[diff], i] : null;
    if (!hit) map[NUMS[i]] = i;
    steps.push({
      index: i,
      value: NUMS[i],
      diff,
      hashMapBefore: before,
      hashMapAfter: { ...map },
      lookupResult: hit ? "hit" : "miss",
      resultPair: pair,
    });
    if (hit) break;
  }
  return steps;
}

const ALL_STEPS = buildAllSteps();

export default function AlgorithmDiagram() {
  const [cur, setCur] = useState(-1);
  const [playing, setPlaying] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const tableRef = useRef<HTMLDivElement>(null);

  const total = ALL_STEPS.length;
  const step = cur >= 0 && cur < total ? ALL_STEPS[cur] : null;

  // auto-scroll iteration table
  useEffect(() => {
    if (cur >= 0 && tableRef.current) {
      const row = tableRef.current.querySelector(`[data-row="${cur}"]`);
      row?.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }
  }, [cur]);

  const stopTimer = useCallback(() => {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
    setPlaying(false);
  }, []);

  const goNext = useCallback(() => {
    setCur((p) => (p >= total - 1 ? p : p + 1));
  }, [total]);

  const goPrev = useCallback(() => {
    setCur((p) => Math.max(-1, p - 1));
  }, []);

  const reset = useCallback(() => { stopTimer(); setCur(-1); }, [stopTimer]);

  const togglePlay = useCallback(() => {
    if (playing) { stopTimer(); return; }
    setPlaying(true);
    if (cur >= total - 1) setCur(-1);
    timerRef.current = setInterval(() => {
      setCur((p) => {
        if (p >= total - 1) { stopTimer(); return p; }
        return p + 1;
      });
    }, 1200);
  }, [playing, cur, total, stopTimer]);

  useEffect(() => () => { if (timerRef.current) clearInterval(timerRef.current); }, []);

  // --- layout constants for SVG ---
  const cellW = 120;
  const svgW = 40 + NUMS.length * cellW + 20;
  const arrY = 52;
  const mapY = 170;

  return (
    <div className="flex-1 flex flex-col bg-[#0c1018] overflow-hidden text-slate-300">

      {/* ── Header bar ── */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.06] bg-[#0e1320] shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          <span className="text-xs font-semibold text-white tracking-wide">Two Sum</span>
          <span className="text-[10px] text-slate-500 font-mono truncate">
            nums=[{NUMS.join(",")}]  target={TARGET}
          </span>
        </div>
        <div className="flex items-center gap-3 text-[10px] font-mono shrink-0">
          <span className="text-slate-500">Time <span className="text-slate-300">O(n)</span></span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-500">Space <span className="text-slate-300">O(n)</span></span>
        </div>
      </div>

      {/* ── Main content: SVG + Table side by side ── */}
      <div className="flex-1 flex min-h-0 overflow-hidden">

        {/* LEFT: SVG flow diagram */}
        <div className="flex-1 overflow-auto flex items-start justify-center pt-4 pb-2 px-2">
          <svg viewBox={`0 0 ${svgW} 260`} className="w-full max-w-[560px]" style={{ minHeight: 220 }}>

            {/* Section label: Array */}
            <text x="14" y="20" fill="#475569" fontSize="9" fontFamily="ui-monospace, monospace" fontWeight="600" letterSpacing="0.08em">
              ARRAY
            </text>

            {/* Array cells */}
            {NUMS.map((v, i) => {
              const x = 40 + i * cellW;
              const isActive = step?.index === i;
              const isPast = step !== null && i < step.index;
              const isHit = step?.lookupResult === "hit" && step.resultPair?.includes(i);

              let bg = "#141c2b";
              let border = "#1e293b";
              let txt = "#94a3b8";
              if (isHit) { bg = "#0f2b24"; border = "#2dd4a0"; txt = "#5eead4"; }
              else if (isActive) { bg = "#172033"; border = "#3b82f6"; txt = "#93c5fd"; }
              else if (isPast) { bg = "#111827"; border = "#1e293b"; txt = "#4b5563"; }

              return (
                <g key={i}>
                  {/* connector line */}
                  {i < NUMS.length - 1 && (
                    <line x1={x + 44} y1={arrY + 18} x2={x + cellW - 4} y2={arrY + 18} stroke="#1e293b" strokeWidth="1" />
                  )}
                  {/* cell rect */}
                  <rect x={x} y={arrY} width="48" height="36" rx="6" fill={bg} stroke={border} strokeWidth={isActive || isHit ? 1.5 : 1} />
                  {/* value */}
                  <text x={x + 24} y={arrY + 22} textAnchor="middle" fill={txt} fontSize="15" fontWeight="600" fontFamily="ui-monospace, monospace">
                    {v}
                  </text>
                  {/* index */}
                  <text x={x + 24} y={arrY + 50} textAnchor="middle" fill="#334155" fontSize="9" fontFamily="ui-monospace, monospace">
                    [{i}]
                  </text>
                  {/* pointer */}
                  {isActive && (
                    <g>
                      <line x1={x + 24} y1={arrY - 4} x2={x + 24} y2={arrY - 14} stroke={isHit ? "#2dd4a0" : "#3b82f6"} strokeWidth="1.5" />
                      <polygon points={`${x + 24},${arrY - 2} ${x + 20},${arrY - 8} ${x + 28},${arrY - 8}`} fill={isHit ? "#2dd4a0" : "#3b82f6"} />
                      <text x={x + 24} y={arrY - 20} textAnchor="middle" fill={isHit ? "#2dd4a0" : "#60a5fa"} fontSize="8" fontFamily="ui-monospace, monospace" fontWeight="600">
                        i = {i}
                      </text>
                    </g>
                  )}
                </g>
              );
            })}

            {/* Arrow down to map — show for active non-hit step */}
            {step && step.lookupResult === "miss" && (
              <g>
                <line x1={40 + step.index * cellW + 24} y1={arrY + 38} x2={40 + step.index * cellW + 24} y2={mapY - 8} stroke="#1e293b" strokeWidth="1" strokeDasharray="3 3" />
                <polygon
                  points={`${40 + step.index * cellW + 24},${mapY - 4} ${40 + step.index * cellW + 20},${mapY - 10} ${40 + step.index * cellW + 28},${mapY - 10}`}
                  fill="#334155"
                />
                <text x={40 + step.index * cellW + 34} y={(arrY + 38 + mapY - 8) / 2 + 3} fill="#475569" fontSize="8" fontFamily="ui-monospace, monospace">
                  insert
                </text>
              </g>
            )}

            {/* Hit: lookup arrow from map entry back to source */}
            {step?.lookupResult === "hit" && step.resultPair && (
              <g>
                {/* arc connecting the two paired array nodes */}
                <path
                  d={`M ${40 + step.resultPair[0] * cellW + 24} ${arrY + 38}
                      C ${40 + step.resultPair[0] * cellW + 24} ${arrY + 72},
                        ${40 + step.resultPair[1] * cellW + 24} ${arrY + 72},
                        ${40 + step.resultPair[1] * cellW + 24} ${arrY + 38}`}
                  fill="none" stroke="#2dd4a0" strokeWidth="1.5" strokeDasharray="4 3"
                />
                <text
                  x={(40 + step.resultPair[0] * cellW + 24 + 40 + step.resultPair[1] * cellW + 24) / 2}
                  y={arrY + 80}
                  textAnchor="middle" fill="#2dd4a0" fontSize="9" fontWeight="600" fontFamily="ui-monospace, monospace"
                >
                  sum = {TARGET}
                </text>
              </g>
            )}

            {/* Section label: HashMap */}
            <text x="14" y={mapY - 14} fill="#475569" fontSize="9" fontFamily="ui-monospace, monospace" fontWeight="600" letterSpacing="0.08em">
              HASHMAP
            </text>

            {/* HashMap table */}
            {(() => {
              const entries = step ? Object.entries(step.hashMapAfter) : [];
              if (entries.length === 0) {
                return (
                  <g>
                    <rect x="40" y={mapY} width={Math.max(200, NUMS.length * cellW)} height="34" rx="4" fill="#111827" stroke="#1e293b" strokeWidth="1" />
                    <text x={40 + Math.max(200, NUMS.length * cellW) / 2} y={mapY + 21} textAnchor="middle" fill="#283040" fontSize="10" fontFamily="ui-monospace, monospace">
                      {cur === -1 ? "empty — press play" : "{ }"}
                    </text>
                  </g>
                );
              }
              const entryW = 90;
              const totalW = Math.max(entries.length * entryW + 16, 200);
              return (
                <g>
                  <rect x="40" y={mapY} width={totalW} height="34" rx="4" fill="#111827" stroke="#1e293b" strokeWidth="1" />
                  {entries.map(([val, idx], ei) => {
                    const ex = 52 + ei * entryW;
                    const isNew = step && !step.hashMapBefore[Number(val)] && step.hashMapBefore[Number(val)] !== 0 && step.lookupResult === "miss" && Number(val) === step.value;
                    return (
                      <g key={val}>
                        <text x={ex} y={mapY + 21} fill={isNew ? "#60a5fa" : "#64748b"} fontSize="11" fontWeight="500" fontFamily="ui-monospace, monospace">
                          {val}
                        </text>
                        <text x={ex + 18} y={mapY + 21} fill="#334155" fontSize="10" fontFamily="ui-monospace, monospace">:</text>
                        <text x={ex + 28} y={mapY + 21} fill={isNew ? "#93c5fd" : "#94a3b8"} fontSize="11" fontWeight="500" fontFamily="ui-monospace, monospace">
                          {idx}
                        </text>
                      </g>
                    );
                  })}
                </g>
              );
            })()}

            {/* Result box */}
            {step?.resultPair && (
              <g>
                <rect x="40" y={mapY + 48} width="220" height="30" rx="4" fill="#0f2b24" stroke="#1a4d3e" strokeWidth="1" />
                <text x="54" y={mapY + 67} fill="#5eead4" fontSize="11" fontWeight="600" fontFamily="ui-monospace, monospace">
                  return [{step.resultPair[0]}, {step.resultPair[1]}]
                </text>
              </g>
            )}
          </svg>
        </div>

        {/* RIGHT: Iteration log table */}
        <div className="w-[260px] xl:w-[290px] border-l border-white/[0.06] flex flex-col shrink-0 bg-[#0b0f18]">
          <div className="px-3 py-2 border-b border-white/[0.06] shrink-0">
            <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Iteration Log</span>
          </div>

          {/* Table header */}
          <div className="grid grid-cols-[32px_36px_40px_54px_1fr] gap-0 px-3 py-1.5 border-b border-white/[0.04] text-[9px] font-semibold text-slate-600 uppercase tracking-wider font-mono shrink-0">
            <span>i</span>
            <span>val</span>
            <span>diff</span>
            <span>lookup</span>
            <span>map after</span>
          </div>

          {/* Table rows */}
          <div ref={tableRef} className="flex-1 overflow-y-auto">
            {ALL_STEPS.map((s, idx) => {
              const visible = idx <= cur;
              const active = idx === cur;
              return (
                <div
                  key={idx}
                  data-row={idx}
                  onClick={() => { setCur(idx); stopTimer(); }}
                  className={`grid grid-cols-[32px_36px_40px_54px_1fr] gap-0 px-3 py-2 border-b border-white/[0.03] cursor-pointer transition-colors text-[11px] font-mono
                    ${!visible ? "opacity-20" : active ? "bg-white/[0.04]" : "hover:bg-white/[0.02]"}`}
                >
                  <span className={active ? "text-blue-400 font-semibold" : "text-slate-500"}>{s.index}</span>
                  <span className={active ? "text-white font-semibold" : "text-slate-400"}>{s.value}</span>
                  <span className={active ? "text-slate-200" : "text-slate-500"}>{s.diff}</span>
                  <span className={
                    !visible ? "text-slate-600"
                    : s.lookupResult === "hit" ? "text-emerald-400 font-semibold"
                    : "text-slate-500"
                  }>
                    {s.lookupResult === "hit" ? "HIT" : "MISS"}
                  </span>
                  <span className={active ? "text-slate-300" : "text-slate-600"}>
                    {`{${Object.entries(s.hashMapAfter).map(([k, v]) => `${k}:${v}`).join(", ")}}`}
                  </span>
                </div>
              );
            })}

            {/* Final result row */}
            {cur === total - 1 && ALL_STEPS[total - 1].resultPair && (
              <div className="px-3 py-2.5 border-t border-emerald-500/10 bg-emerald-500/[0.04]">
                <span className="text-[11px] font-mono font-semibold text-emerald-400">
                  return [{ALL_STEPS[total - 1].resultPair![0]}, {ALL_STEPS[total - 1].resultPair![1]}]
                </span>
                <p className="text-[10px] font-mono text-slate-500 mt-1">
                  {NUMS[ALL_STEPS[total - 1].resultPair![0]]} + {NUMS[ALL_STEPS[total - 1].resultPair![1]]} = {TARGET} in {total} iterations
                </p>
              </div>
            )}
          </div>

          {/* Complexity summary at bottom of table */}
          <div className="px-3 py-2.5 border-t border-white/[0.06] shrink-0 space-y-1.5">
            <div className="flex justify-between text-[10px] font-mono">
              <span className="text-slate-600">Iterations</span>
              <span className="text-slate-400">{Math.max(0, cur + 1)} / {NUMS.length}</span>
            </div>
            <div className="flex justify-between text-[10px] font-mono">
              <span className="text-slate-600">Map entries</span>
              <span className="text-slate-400">{step ? Object.keys(step.hashMapAfter).length : 0}</span>
            </div>
            <div className="w-full h-px bg-white/[0.04] my-1" />
            <div className="flex justify-between text-[10px] font-mono">
              <span className="text-slate-600">Time complexity</span>
              <span className="text-slate-300">O(n)</span>
            </div>
            <div className="flex justify-between text-[10px] font-mono">
              <span className="text-slate-600">Space complexity</span>
              <span className="text-slate-300">O(n)</span>
            </div>
            <div className="flex justify-between text-[10px] font-mono">
              <span className="text-slate-600">Lookup per step</span>
              <span className="text-slate-300">O(1) avg</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Step narration ── */}
      <div className="px-4 py-2 border-t border-white/[0.06] bg-[#0e1320] shrink-0">
        <p className="text-[11px] text-slate-400 font-mono leading-relaxed">
          {!step && "Press play to step through the algorithm."}
          {step && step.lookupResult === "miss" && (
            <>
              <span className="text-slate-500">Step {step.index + 1}:</span>{" "}
              <span className="text-slate-300">nums[{step.index}] = {step.value}</span>
              {" → "}diff = {TARGET} − {step.value} = {step.diff}
              {" → "}lookup({step.diff}): <span className="text-slate-500">miss</span>
              {" → "}store <span className="text-blue-400">{`{${step.value}: ${step.index}}`}</span>
            </>
          )}
          {step && step.lookupResult === "hit" && step.resultPair && (
            <>
              <span className="text-slate-500">Step {step.index + 1}:</span>{" "}
              <span className="text-slate-300">nums[{step.index}] = {step.value}</span>
              {" → "}diff = {TARGET} − {step.value} = {step.diff}
              {" → "}lookup({step.diff}): <span className="text-emerald-400">hit at index {step.resultPair[0]}</span>
              {" → "}<span className="text-emerald-400 font-semibold">return [{step.resultPair[0]}, {step.resultPair[1]}]</span>
            </>
          )}
        </p>
      </div>

      {/* ── Controls ── */}
      <div className="flex items-center justify-between px-4 py-2.5 border-t border-white/[0.06] bg-[#0c1018] shrink-0">
        <div className="flex items-center gap-1.5">
          <button onClick={goPrev} disabled={cur <= -1} className="w-7 h-7 rounded bg-white/[0.04] hover:bg-white/[0.08] disabled:opacity-25 disabled:cursor-not-allowed flex items-center justify-center border border-white/[0.06]">
            <ChevronLeft className="w-3.5 h-3.5 text-slate-400" />
          </button>
          <button onClick={togglePlay} className="w-8 h-8 rounded bg-white/[0.04] hover:bg-white/[0.08] flex items-center justify-center border border-white/[0.06]">
            {playing ? <Pause className="w-3.5 h-3.5 text-slate-300" /> : <Play className="w-3.5 h-3.5 text-slate-300 ml-0.5" />}
          </button>
          <button onClick={goNext} disabled={cur >= total - 1} className="w-7 h-7 rounded bg-white/[0.04] hover:bg-white/[0.08] disabled:opacity-25 disabled:cursor-not-allowed flex items-center justify-center border border-white/[0.06]">
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          </button>
          <button onClick={reset} className="w-7 h-7 rounded bg-white/[0.04] hover:bg-white/[0.08] flex items-center justify-center border border-white/[0.06] ml-1">
            <RotateCcw className="w-3 h-3 text-slate-500" />
          </button>
        </div>

        {/* Step dots */}
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            {ALL_STEPS.map((_, i) => (
              <button
                key={i}
                onClick={() => { setCur(i); stopTimer(); }}
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  i === cur ? "bg-slate-300 scale-[1.3]" : i < cur ? "bg-slate-600" : "bg-slate-800"
                }`}
              />
            ))}
          </div>
          <span className="text-[10px] font-mono text-slate-600">{Math.max(0, cur + 1)}/{total}</span>
        </div>
      </div>
    </div>
  );
}
