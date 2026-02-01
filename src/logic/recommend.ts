// src/logic/recommend.ts

import type { CoffeeBean } from "../data/beans";
import type { Scores } from "./scoring";

export type Recommendation = {
  bean: CoffeeBean;
  score: number; // 小さいほどユーザーに近い（距離）
};

/**
 * 距離（マンハッタン距離）を計算
 * - シンプルで理解しやすい
 * - 1〜5の整数スケールと相性が良い
 */
export function distance(a: Scores, b: Scores): number {
  return (
    Math.abs(a.roast - b.roast) +
    Math.abs(a.acidity - b.acidity) +
    Math.abs(a.body - b.body)
  );
}

/**
 * おすすめ豆を「近い順」に並べる
 * 同点の場合は元の配列順を保って安定させる
 */
export function recommendBeans(
  userScores: Scores,
  beans: readonly CoffeeBean[],
  topN = 2
): Recommendation[] {
  const scored: Recommendation[] = beans.map((bean, idx) => ({
    bean,
    score: distance(userScores, bean),
    // tie-break用にidxを一時的に保持（並びを安定させる）
    // TS的に嫌なのでソート内でクロージャで参照
  }));

  const withIndex = scored.map((r, idx) => ({ ...r, _idx: idx }));

  withIndex.sort((a, b) => {
    if (a.score !== b.score) return a.score - b.score;
    return a._idx - b._idx;
  });

  return withIndex.slice(0, topN).map(({ _idx, ...rest }) => rest);
}

/**
 * 1位・2位を取り出しやすい形で返す（UI向け）
 */
export function recommendTop2(
  userScores: Scores,
  beans: readonly CoffeeBean[]
): { first: CoffeeBean; second: CoffeeBean } | null {
  const recs = recommendBeans(userScores, beans, 2);
  if (recs.length < 2) return null;
  return { first: recs[0].bean, second: recs[1].bean };
}
