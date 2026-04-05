"use client";
import { useState, useEffect } from "react";
import { pickLetters, makeChoices, PHONICS, TrainingData } from "./data";
import BookBuddy from "./BookBuddy";
import { sfxCorrect, sfxWrong, sfxTap } from "./sfx";
import { speak, stopSpeaking } from "./speak";
import Confetti from "./Confetti";
import ProgressBar from "./ProgressBar";

const ROUNDS = 8;

export default function LetterSounds({ onComplete }: { onComplete: (data: TrainingData) => void }) {
  const [letters] = useState(() => pickLetters(ROUNDS));
  const [idx, setIdx] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [mood, setMood] = useState<"idle" | "happy" | "scared">("idle");
  const [showConfetti, setShowConfetti] = useState(false);
  const [training, setTraining] = useState<TrainingData>({});
  const done = idx >= letters.length;

  useEffect(() => { speak("q2_start.mp3"); return () => stopSpeaking(); }, []);

  useEffect(() => {
    if (!done && !feedback) speak(`sound_${letters[idx].toLowerCase()}.mp3`);
  }, [idx, done, feedback, letters]);

  if (done) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-6 p-8 fade-in">
        <Confetti active={true} />
        <BookBuddy mood="celebrate" size={120} />
        <h2 className="text-3xl font-bold">🎉 You know your sounds!</h2>
        <button className="btn btn-success mt-4" onClick={() => { sfxTap(); stopSpeaking(); onComplete(training); }}>Next Quest →</button>
      </div>
    );
  }

  const letter = letters[idx];
  const phonic = PHONICS[letter];
  const choices = makeChoices(letter, 4);

  const pick = (choice: string) => {
    if (choice === letter) {
      sfxCorrect(); setMood("happy"); setShowConfetti(true);
      setTraining((t) => ({ ...t, [letter]: (t[letter] || 0) + 1 }));
      setFeedback(`✅ ${letter} says "${phonic.sound}" — ${phonic.emoji} ${phonic.word}!`);
      speak("q2_correct.mp3").then(() => {
        setFeedback(""); setMood("idle"); setShowConfetti(false);
        setIdx((i) => i + 1);
      });
    } else {
      sfxWrong(); setMood("scared");
      setFeedback("Oops! Listen again 😅");
      speak("q2_wrong.mp3").then(() => {
        setFeedback(""); setMood("idle");
        speak(`sound_${letter.toLowerCase()}.mp3`);
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-5 p-8 fade-in">
      <Confetti active={showConfetti} />
      <h2 className="text-3xl font-bold">🔊 Quest 2: Letter Sounds!</h2>
      <BookBuddy mood={mood} size={80} />
      <p className="opacity-70 text-center">Listen and tap the right letter!</p>
      <ProgressBar value={idx + 1} total={letters.length} />
      <button className="btn btn-primary text-2xl my-2" onClick={() => speak(`sound_${letter.toLowerCase()}.mp3`)}>
        🔊 Play Sound Again
      </button>
      <div className="text-lg min-h-[2em] font-semibold">{feedback}</div>
      {!feedback && (
        <div className="flex gap-4 fade-in">
          {choices.map((c) => (
            <button key={c} className="btn text-3xl" style={{ background: "var(--card)", minWidth: 64 }}
              onClick={() => { sfxTap(); pick(c); }}>{c}</button>
          ))}
        </div>
      )}
    </div>
  );
}
