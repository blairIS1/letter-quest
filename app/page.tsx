"use client";
import { useState, useEffect } from "react";
import MatchLetters from "./quests/MatchLetters";
import LetterSounds from "./quests/LetterSounds";
import SpellWords from "./quests/SpellWords";
import SpeedRound from "./quests/SpeedRound";
import BookBuddy from "./quests/BookBuddy";
import Confetti from "./quests/Confetti";
import SessionTimer, { useSessionTimer } from "./quests/SessionTimer";
import { sfxTap, sfxCelebrate } from "./quests/sfx";
import { speak, stopSpeaking } from "./quests/speak";
import { TrainingData } from "./quests/data";

const QUESTS = ["🔤 Match Letters", "🔊 Letter Sounds", "✏️ Spell Words", "⚡ Speed Round"];

type Phase = "menu" | "q1" | "q2" | "q3" | "q4";

export default function Home() {
  const [phase, setPhase] = useState<Phase>("menu");
  const [completed, setCompleted] = useState([false, false, false, false]);
  const [training, setTraining] = useState<TrainingData>({});
  const [started, setStarted] = useState(false);
  const { expired, dismiss } = useSessionTimer();

  const markDone = (i: number) => setCompleted((p) => { const n = [...p]; n[i] = true; return n; });

  if (expired) return <SessionTimer onDismiss={dismiss} />;

  if (phase === "menu") {
    const phases: Phase[] = ["q1", "q2", "q3", "q4"];
    const collected = completed.filter(Boolean).length;
    const badges = ["🔤", "🔊", "✏️", "⚡"];

    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-6 p-8 fade-in">
        <Confetti active={completed.every(Boolean)} />
        <BookBuddy mood={completed.every(Boolean) ? "celebrate" : "idle"} size={140} />
        <h1 className="text-4xl font-bold text-center">📚 Letter Quest!</h1>
        <p className="text-lg text-center opacity-70 max-w-md">Learn your ABCs through 4 fun quests!</p>

        {!started ? (
          <>
            <div className="rounded-xl p-4 text-center max-w-sm" style={{ background: "rgba(56,189,248,0.1)", border: "1px solid rgba(56,189,248,0.3)" }}>
              <p className="text-lg">📏 Hold your tablet at arm&apos;s length!</p>
              <p className="opacity-60">Not too close — your eyes will thank you! 👀</p>
            </div>
            <button className="btn btn-primary text-xl mt-4" onClick={() => {
              sfxTap(); setStarted(true);
              speak("welcome.mp3");
            }}>▶️ Start!</button>
          </>
        ) : (
          <>
            <div className="flex gap-3">
              {badges.map((b, i) => (
                <span key={i} className="text-3xl" style={{ opacity: completed[i] ? 1 : 0.3, filter: completed[i] ? "none" : "grayscale(1)" }}>{b}</span>
              ))}
            </div>
            <div className="text-sm opacity-60">{collected}/4 quests done</div>

            <div className="flex flex-col gap-3 w-full max-w-sm fade-in">
              {QUESTS.map((name, i) => (
                <button key={i} className="btn btn-primary flex justify-between items-center"
                  style={{ opacity: i === 0 || completed[i - 1] ? 1 : 0.4 }}
                  disabled={i > 0 && !completed[i - 1]}
                  onClick={() => { sfxTap(); stopSpeaking(); setPhase(phases[i]); }}>
                  <span>{name}</span>
                  {completed[i] ? <span>✅</span> : <span className="opacity-40">{badges[i]}</span>}
                </button>
              ))}
            </div>

            {completed.every(Boolean) && (
              <div className="text-xl font-bold text-center fade-in" style={{ color: "var(--success)" }}>
                🎉 All quests complete! You&apos;re a letter master!
              </div>
            )}
          </>
        )}
      </div>
    );
  }

  return (
    <>
      {phase === "q1" && <MatchLetters onComplete={() => { markDone(0); setPhase("q2"); }} />}
      {phase === "q2" && <LetterSounds onComplete={(data) => { setTraining(data); markDone(1); setPhase("q3"); }} />}
      {phase === "q3" && <SpellWords onComplete={() => { markDone(2); setPhase("q4"); }} />}
      {phase === "q4" && <SpeedRound onComplete={() => { markDone(3); sfxCelebrate(); setPhase("menu"); speak("all_done.mp3"); }} />}
    </>
  );
}
