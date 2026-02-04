// src/logic/recommend.ts
// 新しい診断ロジックに対応（後方互換性のため既存型を維持）

import type { Scores } from "./scoring";
import type { CoffeeBean } from "../data/beans";

// トップ2推薦（後方互換性のため維持）
// 注意: 新しい診断ロジックを使用する場合は diagnosisEngine.ts を直接使用してください
export function recommendTop2(
  scores: Scores,
  beans: CoffeeBean[]
): { first: CoffeeBean; second: CoffeeBean } | null {
  // ダミー実装（既存UIとの互換性のため）
  if (beans.length < 2) return null;
  
  return {
    first: beans[0],
    second: beans[1],
  };
}
