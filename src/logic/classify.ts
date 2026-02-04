// src/logic/classify.ts
// 旧UI互換のために残すが、ESMで安全に動くようにする

import { computeScores, determineType } from "./diagnosisEngine";
import type { RouteId, TypeId } from "../data/diagnosisSpec";

// 旧UI互換：answers がどんな形でも受ける（A/B/C/D or 0-3）
export function classifyType(
  answers: Record<string, unknown>,
  route: RouteId
): TypeId {
  const userAnswers: Record<string, number> = {};

  for (const [qid, choice] of Object.entries(answers)) {
    if (choice === undefined || choice === null) continue;

    if (choice === "A") userAnswers[qid] = 0;
    else if (choice === "B") userAnswers[qid] = 1;
    else if (choice === "C") userAnswers[qid] = 2;
    else if (choice === "D") userAnswers[qid] = 3;
    else if (typeof choice === "number") userAnswers[qid] = choice;
  }

  const { typeScores } = computeScores(userAnswers, route);
  return determineType(typeScores, userAnswers, route);
}
