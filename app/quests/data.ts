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

// 100 common words for spelling — only concrete words where emoji clearly matches
export const SPELL_WORDS = [
  // 3-letter words
  { word: "CAT", emoji: "🐱" }, { word: "DOG", emoji: "🐕" }, { word: "SUN", emoji: "☀️" },
  { word: "HAT", emoji: "🎩" }, { word: "BUS", emoji: "🚌" }, { word: "CUP", emoji: "🥤" },
  { word: "BED", emoji: "🛏️" }, { word: "PIG", emoji: "🐷" }, { word: "EGG", emoji: "🥚" },
  { word: "COW", emoji: "🐄" }, { word: "BEE", emoji: "🐝" }, { word: "BAT", emoji: "🦇" },
  { word: "FAN", emoji: "🪭" }, { word: "JAM", emoji: "🫙" }, { word: "MAP", emoji: "🗺️" },
  { word: "PEN", emoji: "🖊️" }, { word: "BOX", emoji: "📦" }, { word: "FOX", emoji: "🦊" },
  { word: "HEN", emoji: "🐔" }, { word: "ANT", emoji: "🐜" }, { word: "OWL", emoji: "🦉" },
  { word: "PIE", emoji: "🥧" }, { word: "KEY", emoji: "🔑" }, { word: "CAR", emoji: "🚗" },
  { word: "JAR", emoji: "🫙" }, { word: "LEG", emoji: "🦵" }, { word: "NET", emoji: "🥅" },
  { word: "MOP", emoji: "🧹" }, { word: "RUG", emoji: "🟫" }, { word: "VAN", emoji: "🚐" },
  // 4-letter words
  { word: "FISH", emoji: "🐟" }, { word: "BIRD", emoji: "🐦" }, { word: "BOOK", emoji: "📖" },
  { word: "TREE", emoji: "🌳" }, { word: "CAKE", emoji: "🎂" }, { word: "FROG", emoji: "🐸" },
  { word: "STAR", emoji: "⭐" }, { word: "MOON", emoji: "🌙" }, { word: "BEAR", emoji: "🐻" },
  { word: "DUCK", emoji: "🦆" }, { word: "LION", emoji: "🦁" }, { word: "BOAT", emoji: "⛵" },
  { word: "BELL", emoji: "🔔" }, { word: "DRUM", emoji: "🥁" }, { word: "LAMP", emoji: "💡" },
  { word: "SOCK", emoji: "🧦" }, { word: "CORN", emoji: "🌽" }, { word: "DOOR", emoji: "🚪" },
  { word: "KING", emoji: "🤴" }, { word: "RING", emoji: "💍" }, { word: "BONE", emoji: "🦴" },
  { word: "LEAF", emoji: "🍃" }, { word: "RAIN", emoji: "🌧️" }, { word: "SNOW", emoji: "❄️" },
  { word: "WOLF", emoji: "🐺" }, { word: "CRAB", emoji: "🦀" }, { word: "SHIP", emoji: "🚢" },
  { word: "BIKE", emoji: "🚲" }, { word: "KITE", emoji: "🪁" }, { word: "ROSE", emoji: "🌹" },
  // 5-letter words
  { word: "APPLE", emoji: "🍎" }, { word: "HOUSE", emoji: "🏠" }, { word: "TRAIN", emoji: "🚂" },
  { word: "MOUSE", emoji: "🐭" }, { word: "HORSE", emoji: "🐴" }, { word: "WHALE", emoji: "🐋" },
  { word: "SNAKE", emoji: "🐍" }, { word: "GRAPE", emoji: "🍇" }, { word: "LEMON", emoji: "🍋" },
  { word: "BREAD", emoji: "🍞" }, { word: "CHAIR", emoji: "🪑" }, { word: "CLOCK", emoji: "🕐" },
  { word: "CLOUD", emoji: "☁️" }, { word: "CROWN", emoji: "👑" }, { word: "EARTH", emoji: "🌍" },
  { word: "FLAME", emoji: "🔥" }, { word: "HEART", emoji: "❤️" }, { word: "KNIFE", emoji: "🔪" },
  { word: "OCEAN", emoji: "🌊" }, { word: "PIANO", emoji: "🎹" }, { word: "PIZZA", emoji: "🍕" },
  { word: "ROBOT", emoji: "🤖" }, { word: "SHARK", emoji: "🦈" }, { word: "TIGER", emoji: "🐯" },
  { word: "TRUCK", emoji: "🚛" }, { word: "ZEBRA", emoji: "🦓" }, { word: "CANDY", emoji: "🍬" },
  { word: "PANDA", emoji: "🐼" }, { word: "MELON", emoji: "🍈" }, { word: "PEACH", emoji: "🍑" },
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
