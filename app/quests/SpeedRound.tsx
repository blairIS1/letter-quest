"use client";
import { useState, useEffect, useRef } from "react";
import { pickLetters, makeChoices, PHONICS } from "./data";
import BookBuddy from "./BookBuddy";
import { sfxCorrect, sfxWrong, sfxTap, sfxCelebrate } from "./sfx";
import { speak, stopSpeaking } from "./speak";
import Confetti from "./Confetti";
import ProgressBar from "./ProgressBar";

const ROUNDS = 6;
const TIME_LIMIT = 5000; // 5 seconds per letter

export default function SpeedRound({ onComplete }: { onComplete: () => void }) {
  const [letters] = useState(() => pickLetters(ROUNDS));
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(100);
  const [feedback, setFeedback] = useState("");
  const [mood, setMood] = useState<"idle" | "happy" | "scared">("idle");
  const [showConfetti, setShowConfetti] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval>>(undefined);
  const done = idx >= letters.length;

  useEffect(() => { speak("q4_start.mp3"); return () => { stopSpeaking(); clearInterval(timerRef.current); }; }, []);

  // Timer per round
  useEffect(() => {
    if (done || feedback) return;
    setTimeLeft(100);
    const start = Date.now();
    timerRef.current = setInterval(() => {
      const elapsed = Date.now() - start;
      const pct = Math.max(0, 100 - (elapsed / TIME_LIMIT) * 100);
      setTimeLeft(pct);
      if (pct <= 0) {
        clearInterval(timerRef.current);
        setMood("scared");
        setFeedback("⏰ Time's up!");
        setTimeout(() => { setFeedback(""); setMood("idle"); setIdx((i) => i + 1); }, 1200);
      }
    }, 50);
    return () => clearInterval(timerRef.current);
  }, [idx, done, feedback]);

  // Play sound for current letter
  useEffect(() => {
    if (!done && !feedback) speak(`sound_${letters[idx].toLowerCase()}.mp3`);
  }, [idx, done, feedback, letters]);

  if (done) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-6 p-8 fade-in">
        <Confetti active={true} />
        <BookBuddy mood="celebrate" size={120} />
        <h2 className="text-3xl font-bold">⚡ Speed Round Done!</h2>
        <p className="text-xl">{score}/{letters.length} correct!</p>
        <button className="btn btn-success mt-4" onClick={() => { sfxTap(); sfxCelebrate(); stopSpeaking(); onComplete(); }}>
          🏠 Finish!
        </button>
      </div>
    );
  }

  const letter = letters[idx];
  const choices = makeChoices(letter, 4);
  const timerColor = timeLeft > 50 ? "var(--success)" : timeLeft > 25 ? "var(--warn)" : "#ef4444";

  const pick = (choice: string) => {
    clearInterval(timerRef.current);
    if (choice === letter) {
      sfxCorrect(); setMood("happy"); setShowConfetti(true);
      setScore((s) => s + 1);
      setFeedback(`✅ ${PHONICS[letter].emoji} ${letter}!`);
      setTimeout(() => { setFeedback(""); setMood("idle"); setShowConfetti(false); setIdx((i) => i + 1); }, 1000);
    } else {
      sfxWrong(); setMood("scared");
      setFeedback(`It was ${letter}! ${PHONICS[letter].emoji}`);
      setTimeout(() => { setFeedback(""); setMood("idle"); setIdx((i) => i + 1); }, 1200);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-5 p-8 fade-in">
      <Confetti active={showConfetti} />
      <h2 className="text-3xl font-bold">⚡ Quest 4: Speed Round!</h2>
      <BookBuddy mood={mood} size={80} />
      <ProgressBar value={idx + 1} total={letters.length} />

      {/* Timer bar */}
      <div className="w-full max-w-xs">
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${timeLeft}%`, background: timerColor, transition: "width 0.05s linear" }} />
        </div>
      </div>

      <button className="btn text-xl my-2" style={{ background: "rgba(255,255,255,0.1)" }}
        onClick={() => speak(`sound_${letter.toLowerCase()}.mp3`)}>
        🔊 Hear Again
      </button>

      <div className="text-lg min-h-[2em] font-semibold">{feedback}</div>

      {!feedback && (
        <div className="flex gap-4 fade-in">
          {choices.map((c) => (
            <button key={c} className="btn text-3xl" style={{ background: "var(--card)", minWidth: 64 }}
              onClick={() => { sfxTap(); pick(c); }}>
              {c}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
