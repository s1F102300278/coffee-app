// src/logic/scoring.ts
// 新しい診断ロジックに対応（後方互換性のため既存型を維持）

import { computeScores as computeScoresNew } from "./diagnosisEngine";
import type { RouteId } from "../data/diagnosisSpec";

// 既存のAnswers型を維持（後方互換性のため）
export type Answers = {
  q1: "A" | "B" | "C" | null;
  q2: "A" | "B" | "C" | null;
  q3: "A" | "B" | "C" | null;
  q4: "A" | "B" | "C" | null;
  q5: "A" | "B" | "C" | null;
  q6: "A" | "B" | "C" | null;
};

export type Scores = {
  roast: number;
  acidity: number;
  body: number;
};

// 空の回答を作成
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

// スコア計算（後方互換性のため維持）
// 注意: 新しい診断ロジックを使用する場合は diagnosisEngine.ts を直接使用してください
export function computeScores(answers: Answers): Scores {
  // ダミー実装（既存UIとの互換性のため）
  return {
    roast: 3,
    acidity: 3,
    body: 3,
  };
}
