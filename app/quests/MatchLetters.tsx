"use client";
import { useState, useEffect } from "react";
import { pickLetters, makeChoices } from "./data";
import BookBuddy from "./BookBuddy";
import { sfxCorrect, sfxWrong, sfxTap } from "./sfx";
import { speak, stopSpeaking } from "./speak";
import Confetti from "./Confetti";
import ProgressBar from "./ProgressBar";

const ROUNDS = 8;

export default function MatchLetters({ onComplete }: { onComplete: () => void }) {
  const [letters] = useState(() => pickLetters(ROUNDS));
  const [idx, setIdx] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [mood, setMood] = useState<"idle" | "happy" | "scared">("idle");
  const [showConfetti, setShowConfetti] = useState(false);
  const done = idx >= letters.length;

  useEffect(() => { speak("q1_start.mp3"); return () => stopSpeaking(); }, []);

  if (done) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-6 p-8 fade-in">
        <Confetti active={true} />
        <BookBuddy mood="celebrate" size={120} />
        <h2 className="text-3xl font-bold">🎉 All matched!</h2>
        <button className="btn btn-success mt-4" onClick={() => { sfxTap(); stopSpeaking(); onComplete(); }}>Next Quest →</button>
      </div>
    );
  }

  const letter = letters[idx];
  const choices = makeChoices(letter, 4).map((l) => l.toLowerCase());

  const pick = (choice: string) => {
    if (choice === letter.toLowerCase()) {
      sfxCorrect(); setMood("happy"); setShowConfetti(true);
      setFeedback(`✅ ${letter} = ${letter.toLowerCase()}`);
      speak("q1_correct.mp3").then(() => {
        setFeedback(""); setMood("idle"); setShowConfetti(false);
        setIdx((i) => i + 1);
      });
    } else {
      sfxWrong(); setMood("scared");
      setFeedback("Oops! Try again 😅");
      speak("q1_wrong.mp3").then(() => { setFeedback(""); setMood("idle"); });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-5 p-8 fade-in">
      <Confetti active={showConfetti} />
      <h2 className="text-3xl font-bold">🔤 Quest 1: Match the Letters!</h2>
      <BookBuddy mood={mood} size={80} />
      <p className="opacity-70 text-center">Find the lowercase match!</p>
      <ProgressBar value={idx + 1} total={letters.length} />

      <div className="text-8xl font-bold my-2" style={{ color: "var(--accent)" }}>{letter}</div>

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
