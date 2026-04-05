"use client";

export const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export type TrainingData = Record<string, number>;

export const PHONICS: Record<string, { sound: string; word: string; emoji: string }> = {
  A: { sound: "ah", word: "Apple", emoji: "🍎" },
  B: { sound: "buh", word: "Ball", emoji: "⚽" },
  C: { sound: "kuh", word: "Cat", emoji: "🐱" },
  D: { sound: "duh", word: "Dog", emoji: "🐕" },
  E: { sound: "eh", word: "Egg", emoji: "🥚" },
  F: { sound: "fuh", word: "Fish", emoji: "🐟" },
  G: { sound: "guh", word: "Goat", emoji: "🐐" },
  H: { sound: "huh", word: "Hat", emoji: "🎩" },
  I: { sound: "ih", word: "Ice", emoji: "🧊" },
  J: { sound: "juh", word: "Jam", emoji: "🫙" },
  K: { sound: "kuh", word: "Kite", emoji: "🪁" },
  L: { sound: "luh", word: "Lion", emoji: "🦁" },
  M: { sound: "muh", word: "Moon", emoji: "🌙" },
  N: { sound: "nuh", word: "Nest", emoji: "🪺" },
  O: { sound: "oh", word: "Orange", emoji: "🍊" },
  P: { sound: "puh", word: "Pig", emoji: "🐷" },
  Q: { sound: "kwuh", word: "Queen", emoji: "👑" },
  R: { sound: "ruh", word: "Rain", emoji: "🌧️" },
  S: { sound: "sss", word: "Sun", emoji: "☀️" },
  T: { sound: "tuh", word: "Tree", emoji: "🌳" },
  U: { sound: "uh", word: "Umbrella", emoji: "☂️" },
  V: { sound: "vvv", word: "Van", emoji: "🚐" },
  W: { sound: "wuh", word: "Water", emoji: "💧" },
  X: { sound: "ks", word: "Box", emoji: "📦" },
  Y: { sound: "yuh", word: "Yak", emoji: "🐂" },
  Z: { sound: "zzz", word: "Zebra", emoji: "🦓" },
};

// Word packs — loaded from public/words/*.json
export type WordEntry = { word: string; emoji: string };

export const WORD_PACKS = [
  { id: "animals", name: "🐾 Animals", emoji: "🐾" },
  { id: "food", name: "🍎 Food", emoji: "🍎" },
  { id: "things", name: "🔧 Things", emoji: "🔧" },
  { id: "nature", name: "🌍 Nature", emoji: "🌍" },
  { id: "cars", name: "🚗 Cars", emoji: "🚗" },
  { id: "rockets", name: "🚀 Rockets", emoji: "🚀" },
];

// Detect basePath for loading JSON
function getBasePath(): string {
  if (typeof window === "undefined") return "";
  const match = window.location.pathname.match(/^\/([^/]+)/);
  if (!match || match[1] === "_next") return "";
  return "/" + match[1];
}

export async function loadWordPack(packId: string): Promise<WordEntry[]> {
  const res = await fetch(`${getBasePath()}/words/${packId}.json`);
  return res.json();
}

// Pick words for a spelling round from a loaded pack
export function pickSpellWords(words: WordEntry[], n: number, maxLen = 5): WordEntry[] {
  const pool = words.filter((w) => w.word.length <= maxLen);
  return [...pool].sort(() => Math.random() - 0.5).slice(0, n);
}

export function pickLetters(n: number, training?: TrainingData): string[] {
  const pool = [...LETTERS];
  if (training) {
    const weak = pool.filter((l) => (training[l] || 0) < 2);
    pool.push(...weak, ...weak);
  }
  const shuffled = pool.sort(() => Math.random() - 0.5);
  const seen = new Set<string>();
  const result: string[] = [];
  for (const l of shuffled) {
    if (!seen.has(l)) { seen.add(l); result.push(l); }
    if (result.length >= n) break;
  }
  return result;
}

export function makeChoices(correct: string, count: number): string[] {
  const others = LETTERS.filter((l) => l !== correct).sort(() => Math.random() - 0.5).slice(0, count - 1);
  return [correct, ...others].sort(() => Math.random() - 0.5);
}
