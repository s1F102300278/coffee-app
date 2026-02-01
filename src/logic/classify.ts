// src/logic/classify.ts

import type { CoffeeTypeId } from "../data/types";
import type { Answers, Scores } from "./scoring";
import { countBAnswers, distanceFromCenter } from "./scoring";

/**
 * 8タイプへの分類（必ず1つに決まる）
 * 優先順位は仕様どおり：
 * 1) 自由タイプ
 * 2) まろやかラテ
 * 3) フルーティ冒険
 * 4) 大人ビター
 * 5) しっかりコク派
 * 6) すっきりモーニング
 * 7) 香り重視
 * 8) それ以外はバランス安心
 */
export function classifyType(answers: Answers, scores: Scores): CoffeeTypeId {
  const bCount = countBAnswers(answers);
  const centerDist = distanceFromCenter(scores);

  // 1) 気分で変える自由タイプ：
  // - Bが多い（中間寄り） + スコアが中央付近
  if (bCount >= 3 && centerDist <= 2) {
    return "free";
  }

  // 2) まろやかラテタイプ：
  // - Q4がカフェラテ（B） + 酸味控えめ
  if (answers.q4 === "B" && scores.acidity <= 3) {
    return "latte";
  }

  // 3) フルーティ冒険タイプ：
  // - 酸味高め + 浅め〜中煎り
  if (scores.acidity >= 4 && scores.roast <= 3) {
    return "fruity";
  }

  // 4) 大人ビタータイプ：
  // - 深煎り + 酸味かなり低め
  if (scores.roast >= 4 && scores.acidity <= 2) {
    return "bitter";
  }

  // 5) しっかりコク派タイプ：
  // - コク強め + 中〜深煎り
  if (scores.body >= 4 && scores.roast >= 3) {
    return "rich";
  }

  // 6) すっきりモーニングタイプ：
  // - 浅め + 軽め
  if (scores.roast <= 2 && scores.body <= 3) {
    return "morning";
  }

  // 7) 香り重視タイプ：
  // - Q5が香り（B）を選んだ
  //   or 中庸寄りだけど完全な真ん中ではない
  const isNearMiddle =
    scores.roast === 3 || scores.acidity === 3 || scores.body === 3;
  const isExactlyCenter =
    scores.roast === 3 && scores.acidity === 3 && scores.body === 3;

  if (answers.q5 === "B" || (isNearMiddle && !isExactlyCenter)) {
    return "aroma";
  }

  // 8) それ以外はバランス安心タイプ
  return "balance";
}

/**
 * UI用：タイプ判定の簡易説明（デバッグ/将来の調整に便利）
 * 必須ではないが、今後の調整時に助かるので用意。
 */
export function classifyDebugInfo(answers: Answers, scores: Scores): string[] {
  const out: string[] = [];
  out.push(`scores: roast=${scores.roast}, acidity=${scores.acidity}, body=${scores.body}`);
  out.push(`B answers: ${countBAnswers(answers)}`);
  out.push(`center distance: ${distanceFromCenter(scores)}`);
  out.push(`q4=${answers.q4 ?? "null"}, q5=${answers.q5 ?? "null"}`);
  return out;
}
