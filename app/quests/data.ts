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

// 100 common sight words for spelling, grouped by length
// Short words (3 letters) are easiest, longer words unlock with practice
export const SPELL_WORDS = [
  // 3-letter words (40)
  { word: "THE", emoji: "👉" }, { word: "AND", emoji: "🤝" }, { word: "CAT", emoji: "🐱" },
  { word: "DOG", emoji: "🐕" }, { word: "SUN", emoji: "☀️" }, { word: "BIG", emoji: "🐘" },
  { word: "RED", emoji: "🔴" }, { word: "HAT", emoji: "🎩" }, { word: "RUN", emoji: "🏃" },
  { word: "CAN", emoji: "🥫" }, { word: "MAN", emoji: "👨" }, { word: "HAS", emoji: "✋" },
  { word: "HIS", emoji: "👦" }, { word: "HER", emoji: "👧" }, { word: "NOT", emoji: "🚫" },
  { word: "BUT", emoji: "👆" }, { word: "YOU", emoji: "🫵" }, { word: "ALL", emoji: "🌍" },
  { word: "ARE", emoji: "👥" }, { word: "WAS", emoji: "⏪" }, { word: "ONE", emoji: "1️⃣" },
  { word: "TWO", emoji: "2️⃣" }, { word: "FOR", emoji: "🎁" }, { word: "GOT", emoji: "🎯" },
  { word: "LET", emoji: "👐" }, { word: "SAY", emoji: "💬" }, { word: "SHE", emoji: "👩" },
  { word: "HIM", emoji: "👦" }, { word: "HOW", emoji: "❓" }, { word: "DID", emoji: "✅" },
  { word: "GET", emoji: "🤲" }, { word: "OLD", emoji: "👴" }, { word: "NEW", emoji: "✨" },
  { word: "NOW", emoji: "⏰" }, { word: "DAY", emoji: "🌅" }, { word: "WAY", emoji: "🛤️" },
  { word: "MAY", emoji: "🌸" }, { word: "BOX", emoji: "📦" }, { word: "FUN", emoji: "🎉" },
  { word: "BUS", emoji: "🚌" },
  // 4-letter words (35)
  { word: "THAT", emoji: "👈" }, { word: "WITH", emoji: "🤝" }, { word: "HAVE", emoji: "🙌" },
  { word: "THIS", emoji: "👇" }, { word: "WILL", emoji: "💪" }, { word: "YOUR", emoji: "🫵" },
  { word: "FROM", emoji: "📤" }, { word: "THEY", emoji: "👥" }, { word: "BEEN", emoji: "✅" },
  { word: "SAID", emoji: "💬" }, { word: "EACH", emoji: "☝️" }, { word: "MAKE", emoji: "🔨" },
  { word: "LIKE", emoji: "❤️" }, { word: "LONG", emoji: "📏" }, { word: "LOOK", emoji: "👀" },
  { word: "MANY", emoji: "🔢" }, { word: "SOME", emoji: "🤏" }, { word: "THEM", emoji: "👥" },
  { word: "THAN", emoji: "⚖️" }, { word: "COME", emoji: "🏠" }, { word: "MADE", emoji: "🏗️" },
  { word: "FIND", emoji: "🔍" }, { word: "BACK", emoji: "🔙" }, { word: "ONLY", emoji: "☝️" },
  { word: "JUST", emoji: "👌" }, { word: "OVER", emoji: "🌈" }, { word: "GOOD", emoji: "👍" },
  { word: "KNOW", emoji: "🧠" }, { word: "TAKE", emoji: "🤲" }, { word: "TREE", emoji: "🌳" },
  { word: "FISH", emoji: "🐟" }, { word: "BIRD", emoji: "🐦" }, { word: "BOOK", emoji: "📖" },
  { word: "PLAY", emoji: "🎮" }, { word: "FOOD", emoji: "🍕" },
  // 5-letter words (25)
  { word: "ABOUT", emoji: "💭" }, { word: "THEIR", emoji: "👥" }, { word: "WHICH", emoji: "🤔" },
  { word: "WOULD", emoji: "💭" }, { word: "THERE", emoji: "👉" }, { word: "THESE", emoji: "👇" },
  { word: "OTHER", emoji: "↔️" }, { word: "COULD", emoji: "💪" }, { word: "AFTER", emoji: "⏩" },
  { word: "FIRST", emoji: "🥇" }, { word: "WATER", emoji: "💧" }, { word: "HOUSE", emoji: "🏠" },
  { word: "GREAT", emoji: "⭐" }, { word: "AGAIN", emoji: "🔄" }, { word: "UNDER", emoji: "⬇️" },
  { word: "NEVER", emoji: "🚫" }, { word: "EVERY", emoji: "📅" }, { word: "EARTH", emoji: "🌍" },
  { word: "LIGHT", emoji: "💡" }, { word: "NIGHT", emoji: "🌙" }, { word: "HAPPY", emoji: "😊" },
  { word: "TRAIN", emoji: "🚂" }, { word: "SMILE", emoji: "😄" }, { word: "MOUSE", emoji: "🐭" },
  { word: "APPLE", emoji: "🍎" },
];

// Pick words for a spelling round, starting with short words
export function pickSpellWords(n: number, maxLen = 5): { word: string; emoji: string }[] {
  const pool = SPELL_WORDS.filter((w) => w.word.length <= maxLen);
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
