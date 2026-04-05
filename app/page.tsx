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
import { TrainingData, WORD_PACKS, WordEntry, loadWordPack } from "./quests/data";
import { recordCompletion, getCompletions, BOOK_COLORS, getSelectedColor, setSelectedColor } from "./quests/scores";

const QUESTS = ["🔤 Match Letters", "🔊 Letter Sounds", "✏️ Spell Words", "⚡ Speed Round"];

type Phase = "menu" | "pick-pack" | "q1" | "q2" | "q3" | "q4";

export default function Home() {
  const [phase, setPhase] = useState<Phase>("menu");
  const [completed, setCompleted] = useState([false, false, false, false]);
  const [training, setTraining] = useState<TrainingData>({});
  const [words, setWords] = useState<WordEntry[]>([]);
  const [completions, setCompletions] = useState(0);
  const [bookColor, setBookColor] = useState("#38bdf8");
  const [started, setStarted] = useState(false);
  const { expired, dismiss } = useSessionTimer();

  useEffect(() => { setCompletions(getCompletions()); setBookColor(getSelectedColor()); }, []);

  const markDone = (i: number) => setCompleted((p) => { const n = [...p]; n[i] = true; return n; });

  if (expired) return <SessionTimer onDismiss={dismiss} />;

  if (phase === "menu") {
    const phases: Phase[] = ["q1", "q2", "q3", "q4"];
    const collected = completed.filter(Boolean).length;
    const badges = ["🔤", "🔊", "✏️", "⚡"];

    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-6 p-8 fade-in">
        <Confetti active={completed.every(Boolean)} />
        <BookBuddy mood={completed.every(Boolean) ? "celebrate" : "idle"} size={140} color={bookColor} />
        <h1 className="text-4xl font-bold text-center">📚 Letter Quest!</h1>
        <p className="text-lg text-center opacity-70 max-w-md">Learn your ABCs through 4 fun quests!</p>

        {!started ? (
          <>
            <div className="rounded-xl p-4 text-center max-w-sm" style={{ background: "rgba(56,189,248,0.1)", border: "1px solid rgba(56,189,248,0.3)" }}>
              <p className="text-lg">📏 Hold your tablet at arm&apos;s length!</p>
              <p className="opacity-60">Not too close — your eyes will thank you! 👀</p>
            </div>
            <button className="btn btn-primary text-xl mt-4" onClick={() => {
              sfxTap(); setStarted(true); speak("welcome.mp3");
            }}>▶️ Start!</button>
          </>
        ) : (
          <>
            {completions > 0 && (
              <div className="flex flex-col items-center gap-2 fade-in">
                <p className="text-sm opacity-60">🏆 Completed {completions} time{completions > 1 ? "s" : ""} — pick your color!</p>
                <div className="flex gap-2 flex-wrap justify-center">
                  {BOOK_COLORS.map((c) => {
                    const unlocked = completions >= c.unlockAt;
                    return (
                      <button key={c.name} title={unlocked ? c.name : `Complete ${c.unlockAt}x to unlock`}
                        className="rounded-full border-2 transition-transform"
                        style={{
                          width: 36, height: 36,
                          background: c.color === "url(#rainbow)" ? "linear-gradient(90deg,#f87171,#fbbf24,#4ade80,#38bdf8,#a78bfa)" : c.color,
                          borderColor: bookColor === c.color ? "white" : "transparent",
                          opacity: unlocked ? 1 : 0.3,
                          cursor: unlocked ? "pointer" : "not-allowed",
                          transform: bookColor === c.color ? "scale(1.2)" : "scale(1)",
                        }}
                        onClick={() => { if (unlocked) { sfxTap(); setBookColor(c.color); setSelectedColor(c.color); } }}
                      >
                        {!unlocked && <span className="text-xs">🔒</span>}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

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
      {phase === "pick-pack" && (
        <div className="flex flex-col items-center justify-center min-h-screen gap-6 p-8 fade-in">
          <BookBuddy mood="happy" size={100} color={bookColor} />
          <h2 className="text-3xl font-bold">📦 Pick a Word Pack!</h2>
          <p className="opacity-70 text-center">Which words do you want to spell?</p>
          <div className="flex flex-col gap-3 w-full max-w-sm">
            {WORD_PACKS.map((pack) => (
              <button key={pack.id} className="btn btn-primary text-xl flex items-center gap-3"
                onClick={async () => {
                  sfxTap();
                  const loaded = await loadWordPack(pack.id);
                  setWords(loaded);
                  setPhase("q3");
                }}>
                <span className="text-2xl">{pack.emoji}</span>
                <span>{pack.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
      {phase === "q1" && <MatchLetters onComplete={() => { markDone(0); setPhase("q2"); }} />}
      {phase === "q2" && <LetterSounds onComplete={(data) => { setTraining(data); markDone(1); setPhase("pick-pack"); }} />}
      {phase === "q3" && words.length > 0 && <SpellWords words={words} onComplete={() => { markDone(2); setPhase("q4"); }} />}
      {phase === "q4" && <SpeedRound onComplete={() => { markDone(3); setCompletions(recordCompletion()); sfxCelebrate(); setPhase("menu"); speak("all_done.mp3"); }} />}
    </>
  );
}
