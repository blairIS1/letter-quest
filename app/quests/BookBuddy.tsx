"use client";
import { getSelectedColor } from "./scores";

type Mood = "idle" | "happy" | "thinking" | "scared" | "celebrate";

export default function BookBuddy({ mood = "idle", size = 100, color }: { mood?: Mood; size?: number; color?: string }) {
  const w = size;
  const h = size;
  const bodyColor = mood === "celebrate" ? "#fbbf24" : (color || getSelectedColor());
  const bodyAnim = mood === "celebrate" ? "bounce 0.5s ease-in-out infinite" : mood === "happy" ? "wiggle 0.6s ease-in-out" : "none";
  const eyeR = mood === "scared" ? 6 : mood === "happy" || mood === "celebrate" ? 2.5 : 4;

  return (
    <svg width={w} height={h} viewBox="0 0 80 100" fill="none">
      <defs>
        <linearGradient id="rainbow" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#f87171" /><stop offset="25%" stopColor="#fbbf24" />
          <stop offset="50%" stopColor="#4ade80" /><stop offset="75%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#a78bfa" />
        </linearGradient>
      </defs>
      <style>{`
        @keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}
        @keyframes wiggle{0%,100%{transform:rotate(0)}25%{transform:rotate(-4deg)}75%{transform:rotate(4deg)}}
      `}</style>
      <g style={{ transformOrigin: "40px 50px", animation: bodyAnim }}>
        {/* Pencil body */}
        <rect x="22" y="20" width="36" height="55" rx="5" fill={bodyColor} />
        {/* Pencil stripe */}
        <rect x="22" y="20" width="36" height="10" rx="5" fill="rgba(0,0,0,0.15)" />
        {/* Pencil tip */}
        <polygon points="22,75 58,75 40,92" fill="#fde68a" />
        <polygon points="34,85 46,85 40,92" fill="#1e293b" />
        {/* Eraser top */}
        <rect x="24" y="14" width="32" height="8" rx="4" fill="#f472b6" />
        <rect x="22" y="19" width="36" height="4" rx="1" fill="#94a3b8" />
        {/* Face area — white circle */}
        <circle cx="40" cy="48" r="16" fill="white" opacity="0.9" />
        {/* Eyes */}
        <ellipse cx="34" cy="45" rx="3" ry={eyeR} fill="#1e293b">
          {mood === "idle" && <animate attributeName="ry" values={`${eyeR};1;${eyeR}`} dur="3s" repeatCount="indefinite" begin="2s" />}
        </ellipse>
        <ellipse cx="46" cy="45" rx="3" ry={eyeR} fill="#1e293b">
          {mood === "idle" && <animate attributeName="ry" values={`${eyeR};1;${eyeR}`} dur="3s" repeatCount="indefinite" begin="2s" />}
        </ellipse>
        {/* Eye shine */}
        <circle cx="35.5" cy="43" r="1.2" fill="white" />
        <circle cx="47.5" cy="43" r="1.2" fill="white" />
        {/* Scared eyes */}
        {mood === "scared" && <>
          <text x="30" y="49" fontSize="8" fill="#ef4444">!</text>
          <text x="44" y="49" fontSize="8" fill="#ef4444">!</text>
        </>}
        {/* Celebrate stars in eyes */}
        {mood === "celebrate" && <>
          <text x="30" y="48" fontSize="7" fill="#fbbf24">★</text>
          <text x="43" y="48" fontSize="7" fill="#fbbf24">★</text>
        </>}
        {/* Mouth */}
        {(mood === "happy" || mood === "celebrate") && <path d="M34 54 Q40 60 46 54" stroke="#1e293b" strokeWidth="2" fill="none" strokeLinecap="round" />}
        {mood === "scared" && <ellipse cx="40" cy="55" rx="4" ry="3" fill="#1e293b" />}
        {mood === "idle" && <path d="M36 54 Q40 57 44 54" stroke="#1e293b" strokeWidth="1.5" fill="none" strokeLinecap="round" />}
        {mood === "thinking" && <>
          <path d="M36 55 L44 55" stroke="#1e293b" strokeWidth="1.5" strokeLinecap="round" />
          <text x="52" y="40" fontSize="10" fill="#94a3b8">?</text>
        </>}
        {/* Cheek blush */}
        {(mood === "happy" || mood === "celebrate") && <>
          <circle cx="27" cy="52" r="4" fill="#f87171" opacity="0.25" />
          <circle cx="53" cy="52" r="4" fill="#f87171" opacity="0.25" />
        </>}
        {/* Little arms */}
        <path d="M20 45 Q14 42 12 48" stroke={bodyColor} strokeWidth="3" strokeLinecap="round" fill="none" />
        <path d="M60 45 Q66 42 68 48" stroke={bodyColor} strokeWidth="3" strokeLinecap="round" fill="none" />
        {mood === "celebrate" && <>
          <path d="M20 45 Q12 35 8 30" stroke={bodyColor} strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M60 45 Q68 35 72 30" stroke={bodyColor} strokeWidth="3" strokeLinecap="round" fill="none" />
        </>}
        {/* Little feet */}
        <ellipse cx="32" cy="76" rx="5" ry="2.5" fill={bodyColor} opacity="0.7" />
        <ellipse cx="48" cy="76" rx="5" ry="2.5" fill={bodyColor} opacity="0.7" />
      </g>
      {/* Celebrate sparkles */}
      {mood === "celebrate" && <>
        <text x="2" y="15" fontSize="12">✨</text>
        <text x="62" y="12" fontSize="12">✨</text>
        <text x="8" y="90" fontSize="10">⭐</text>
        <text x="64" y="88" fontSize="10">⭐</text>
      </>}
    </svg>
  );
}
