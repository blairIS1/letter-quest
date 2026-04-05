"use client";
import { useState, useEffect } from "react";
import { getIsSpeaking, onSpeakingChange } from "./speak";

export function useSpeaking(): boolean {
  const [speaking, setSpeaking] = useState(false);
  useEffect(() => {
    setSpeaking(getIsSpeaking());
    return onSpeakingChange(() => setSpeaking(getIsSpeaking()));
  }, []);
  return speaking;
}

// No floating skip bar — instead, pass `talking={useSpeaking()}` to your
// character buddy component and render animated speech dots on the character.
//
// Example in CarBuddy.tsx (robot-car-quest):
//   {talking && <>
//     <circle cx="78" cy="4" r="2" fill="#38bdf8">
//       <animate attributeName="opacity" values="0.3;1;0.3" dur="0.6s" repeatCount="indefinite" />
//     </circle>
//     <circle cx="84" cy="2" r="2.5" fill="#38bdf8">
//       <animate attributeName="opacity" values="0.3;1;0.3" dur="0.6s" begin="0.2s" repeatCount="indefinite" />
//     </circle>
//     <circle cx="90" cy="4" r="2" fill="#38bdf8">
//       <animate attributeName="opacity" values="0.3;1;0.3" dur="0.6s" begin="0.4s" repeatCount="indefinite" />
//     </circle>
//   </>}
//
// For emoji-based characters (PixelBuddy, DottieBuddy), use CSS dots:
//   {talking && (
//     <div className="flex gap-1 mt-1">
//       <div className="w-2 h-2 rounded-full bg-accent animate-pulse" style={{ animationDelay: "0ms" }} />
//       <div className="w-2 h-2 rounded-full bg-accent animate-pulse" style={{ animationDelay: "200ms" }} />
//       <div className="w-2 h-2 rounded-full bg-accent animate-pulse" style={{ animationDelay: "400ms" }} />
//     </div>
//   )}
