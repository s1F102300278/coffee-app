// src/data/beans.ts

export type CoffeeBean = {
  id: string;
  name: string;
  roast: number;   // 1 (LIGHT) - 5 (DARK)
  acidity: number; // 1 (LOW)   - 5 (HIGH)
  body: number;    // 1 (LIGHT) - 5 (FULL)
  note: string;
};

export const COFFEE_BEANS: CoffeeBean[] = [
  {
    id: "breakfast",
    name: "ブレックファースト",
    roast: 2,
    acidity: 5,
    body: 2,
    note: "すっきりとした酸味で、朝の一杯にぴったり。",
  },
  {
    id: "siren",
    name: "サイレン",
    roast: 3,
    acidity: 4,
    body: 3,
    note: "バランスがよく、どんなシーンでも楽しめる味わい。",
  },
  {
    id: "guatemala",
    name: "グアテマラ",
    roast: 4,
    acidity: 3,
    body: 4,
    note: "コクと甘みのある、しっかりとした飲みごたえ。",
  },
  {
    id: "tokyo",
    name: "TOKYO",
    roast: 3,
    acidity: 3,
    body: 3,
    note: "ほどよい苦味とバランスの取れた定番の味。",
  },
] as const;
