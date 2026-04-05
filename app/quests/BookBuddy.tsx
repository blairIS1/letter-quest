"use client";

type Mood = "idle" | "happy" | "thinking" | "scared" | "celebrate";

export default function BookBuddy({ mood = "idle", size = 100 }: { mood?: Mood; size?: number }) {
  const w = size;
  const h = size;
  const bodyColor = mood === "celebrate" ? "#fbbf24" : "#38bdf8";
  const bodyAnim = mood === "celebrate" ? "bounce 0.5s ease-in-out infinite" : mood === "happy" ? "wiggle 0.6s ease-in-out" : "none";
  const eyeR = mood === "scared" ? 5 : mood === "happy" || mood === "celebrate" ? 2 : 3.5;

  return (
    <svg width={w} height={h} viewBox="0 0 80 80" fill="none">
      <style>{`
        @keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}
        @keyframes wiggle{0%,100%{transform:rotate(0)}25%{transform:rotate(-3deg)}75%{transform:rotate(3deg)}}
      `}</style>
      <g style={{ transformOrigin: "40px 40px", animation: bodyAnim }}>
        {/* Book body */}
        <rect x="12" y="15" width="56" height="50" rx="6" fill={bodyColor} />
        {/* Spine */}
        <rect x="12" y="15" width="8" height="50" rx="3" fill="#0f172a" opacity="0.3" />
        {/* Pages */}
        <rect x="22" y="20" width="42" height="40" rx="3" fill="#f1f5f9" opacity="0.9" />
        {/* Eyes */}
        <ellipse cx="34" cy="38" rx="3.5" ry={eyeR} fill="#0f172a">
          {mood === "idle" && <animate attributeName="ry" values={`${eyeR};1;${eyeR}`} dur="3s" repeatCount="indefinite" begin="2s" />}
        </ellipse>
        <ellipse cx="50" cy="38" rx="3.5" ry={eyeR} fill="#0f172a">
          {mood === "idle" && <animate attributeName="ry" values={`${eyeR};1;${eyeR}`} dur="3s" repeatCount="indefinite" begin="2s" />}
        </ellipse>
        {/* Mouth */}
        {(mood === "happy" || mood === "celebrate") && <path d="M36 48 Q42 54 48 48" stroke="#0f172a" strokeWidth="2" fill="none" />}
        {mood === "scared" && <circle cx="42" cy="49" r="3" fill="#0f172a" />}
        {mood === "idle" && <path d="M37 48 Q42 50 47 48" stroke="#0f172a" strokeWidth="1.5" fill="none" />}
        {mood === "thinking" && <path d="M37 49 L47 49" stroke="#0f172a" strokeWidth="1.5" />}
        {/* Cheek blush */}
        {(mood === "happy" || mood === "celebrate") && <>
          <circle cx="28" cy="45" r="3" fill="#f87171" opacity="0.3" />
          <circle cx="56" cy="45" r="3" fill="#f87171" opacity="0.3" />
        </>}
      </g>
      {mood === "celebrate" && <>
        <text x="5" y="12" fontSize="10">✨</text>
        <text x="65" y="10" fontSize="10">✨</text>
      </>}
    </svg>
  );
}
