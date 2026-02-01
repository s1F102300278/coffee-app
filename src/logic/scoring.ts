// src/logic/scoring.ts

import type { Question } from "../data/questions";

/**
 * 1〜6問の回答を保持する型。
 * 未回答は null。
 */
export type Answers = Record<Question["id"], "A" | "B" | "C" | null>;

export type Scores = {
  roast: number;   // 1 (LIGHT) - 5 (DARK)
  acidity: number; // 1 (LOW)   - 5 (HIGH)
  body: number;    // 1 (LIGHT) - 5 (FULL)
};

type Delta = Partial<Scores>;

/**
 * 質問ごとのスコア変化量（後から調整しやすいように設定として分離）
 */
const DELTAS: Record<Question["id"], Record<"A" | "B" | "C", Delta>> = {
  q1: {
    A: { body: -1 },
    B: {},
    C: { body: +1 },
  },
  q2: {
    A: { roast: -1 },
    B: {},
    C: { roast: +1 },
  },
  q3: {
    A: { acidity: -2 },
    B: {},
    C: { acidity: +2 },
  },
  q4: {
    A: { acidity: +1, roast: -1 },
    B: { body: +1, acidity: -1 },
    C: { body: +1 },
  },
  q5: {
    A: { body: -1 },
    B: { roast: -1, acidity: +1 },
    C: { body: +1, roast: +1 },
  },
  q6: {
    A: { acidity: -1 },
    B: {},
    C: { acidity: +1, roast: -1 },
  },
};

/** 1〜5に収める */
export function clamp1to5(n: number): number {
  if (n < 1) return 1;
  if (n > 5) return 5;
  return n;
}

/**
 * 回答から3軸スコアを計算する
 * - 初期値はすべて3
 * - 各回答に応じて増減
 * - 最後に1〜5へクランプ
 */
export function computeScores(answers: Answers): Scores {
  let roast = 3;
  let acidity = 3;
  let body = 3;

  (Object.keys(answers) as Question["id"][]).forEach((qid) => {
    const choice = answers[qid];
    if (!choice) return;

    const d = DELTAS[qid][choice];
    roast += d.roast ?? 0;
    acidity += d.acidity ?? 0;
    body += d.body ?? 0;
  });

  return {
    roast: clamp1to5(roast),
    acidity: clamp1to5(acidity),
    body: clamp1to5(body),
  };
}

/**
 * B回答数（「中間・様子見」寄りの傾向）を数える
 * 自由タイプ判定などに使用
 */
export function countBAnswers(answers: Answers): number {
  return (Object.values(answers) as (string | null)[]).filter((v) => v === "B")
    .length;
}

/**
 * 中央(3)からのズレの合計（小さいほど中庸）
 * 自由タイプ判定などに使用
 */
export function distanceFromCenter(scores: Scores): number {
  return (
    Math.abs(scores.roast - 3) +
    Math.abs(scores.acidity - 3) +
    Math.abs(scores.body - 3)
  );
}

/**
 * 初期状態の空回答セット（UIで使う）
 */
export function createEmptyAnswers(): Answers {
  return {
    q1: null,
    q2: null,
    q3: null,
    q4: null,
    q5: null,
    q6: null,
  };
}
