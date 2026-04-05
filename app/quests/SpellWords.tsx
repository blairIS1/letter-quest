"use client";
import { useState, useEffect } from "react";
import { pickSpellWords } from "./data";
import BookBuddy from "./BookBuddy";
import { sfxCorrect, sfxWrong, sfxTap } from "./sfx";
import { speak, stopSpeaking } from "./speak";
import Confetti from "./Confetti";
import ProgressBar from "./ProgressBar";

export default function SpellWords({ onComplete }: { onComplete: () => void }) {
  const [words] = useState(() => [...pickSpellWords(4, 3), ...pickSpellWords(2, 4)]);
  const [wIdx, setWIdx] = useState(0);
  const [pos, setPos] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [mood, setMood] = useState<"idle" | "happy" | "scared">("idle");
  const [showConfetti, setShowConfetti] = useState(false);
  const done = wIdx >= words.length;

  useEffect(() => { speak("q3_start.mp3"); return () => stopSpeaking(); }, []);

  if (done) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-6 p-8 fade-in">
        <Confetti active={true} />
        <BookBuddy mood="celebrate" size={120} />
        <h2 className="text-3xl font-bold">🎉 Spelling star!</h2>
        <button className="btn btn-success mt-4" onClick={() => { sfxTap(); stopSpeaking(); onComplete(); }}>Next Quest →</button>
      </div>
    );
  }

  const current = words[wIdx];
  const letters = current.word.split("");
  const target = letters[pos];
  const distractors = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").filter((l) => !letters.includes(l)).sort(() => Math.random() - 0.5).slice(0, 3);
  const remaining = letters.slice(pos);
  const choices = [...new Set([...remaining, ...distractors])].sort(() => Math.random() - 0.5).slice(0, 6);

  const pick = (choice: string) => {
    if (choice === target) {
      sfxCorrect();
      if (pos + 1 >= letters.length) {
        setMood("happy"); setShowConfetti(true);
        setFeedback(`✅ ${current.emoji} ${current.word}!`);
        speak("q3_correct.mp3").then(() => {
          setFeedback(""); setMood("idle"); setShowConfetti(false);
          setPos(0); setWIdx((i) => i + 1);
        });
      } else {
        setPos((p) => p + 1);
      }
    } else {
      sfxWrong(); setMood("scared");
      setFeedback(`Oops! Next letter is ${target} 😅`);
      speak("q3_wrong.mp3").then(() => { setFeedback(""); setMood("idle"); });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-5 p-8 fade-in">
      <Confetti active={showConfetti} />
      <h2 className="text-3xl font-bold">✏️ Quest 3: Spell It!</h2>
      <BookBuddy mood={mood} size={80} />
      <ProgressBar value={wIdx + 1} total={words.length} />

      <div className="text-5xl my-2">{current.emoji}</div>

      <div className="flex gap-2">
        {letters.map((l, i) => (
          <div key={i} className="text-3xl font-bold w-12 h-12 flex items-center justify-center rounded-lg"
            style={{ background: i < pos ? "var(--success)" : "var(--card)", color: i < pos ? "#0f172a" : "rgba(255,255,255,0.3)" }}>
            {i < pos ? l : "_"}
          </div>
        ))}
      </div>

      <div className="text-lg min-h-[2em] font-semibold">{feedback}</div>

      {!feedback && (
        <div className="flex flex-wrap justify-center gap-3 fade-in">
          {choices.map((c, i) => (
            <button key={`${c}-${i}`} className="btn text-2xl" style={{ background: "var(--card)", minWidth: 56 }}
              onClick={() => { sfxTap(); pick(c); }}>
              {c}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
