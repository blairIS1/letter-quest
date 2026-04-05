"use client";
import { useState, useEffect, useCallback } from "react";

const EYE_BREAK_INTERVAL = 10 * 60 * 1000; // 10 min (shorter for hyperopia)
const EYE_BREAK_DURATION = 20; // seconds

/** Hook: triggers an eye break every 10 minutes. */
export function useEyeBreak() {
  const [active, setActive] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setActive(true), EYE_BREAK_INTERVAL);
    return () => clearInterval(t);
  }, []);

  const dismiss = useCallback(() => { setActive(false); setDismissed(false); }, []);
  return { eyeBreakActive: active && !dismissed, dismissEyeBreak: dismiss };
}

/** Full-screen eye break overlay with 20-second countdown. */
export default function EyeBreak({ onDismiss }: { onDismiss: () => void }) {
  const [countdown, setCountdown] = useState(EYE_BREAK_DURATION);

  useEffect(() => {
    if (countdown <= 0) return;
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-6 p-8 fade-in"
      style={{ background: "var(--bg)" }}>
      <div className="text-7xl">👀</div>
      <h2 className="text-3xl font-bold text-center">Eye Break Time!</h2>
      <p className="text-xl opacity-80 text-center max-w-md">
        Look at something far away — out the window, across the room!
      </p>
      {countdown > 0 ? (
        <div className="text-6xl font-bold" style={{ color: "var(--accent)" }}>{countdown}</div>
      ) : (
        <button className="btn btn-success text-xl" onClick={onDismiss}>
          👍 I&apos;m Ready!
        </button>
      )}
      <p className="text-sm opacity-40">20-20-20 rule: every 10 min, look 20 feet away for 20 seconds</p>
    </div>
  );
}
