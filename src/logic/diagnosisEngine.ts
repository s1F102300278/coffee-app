// src/logic/diagnosisEngine.ts
// 診断エンジンのメインロジック

import {
  COFFEE_TYPE_SPECS,
  BEAN_SPECS,
  BEAN_PRIORITY,
  ROUTE_A_QUESTIONS,
  ROUTE_B_QUESTIONS,
} from "../data/diagnosisSpec";

import type {
  TypeId,
  TagId,
  RouteId,
  QuestionSpec,
  BeanSpec,
  CoffeeTypeSpec,
} from "../data/diagnosisSpec";


// ========== 型定義 ==========
export interface UserAnswers {
  [questionId: string]: number; // 質問IDと選択肢インデックス（0-3）
}

export interface TypeScores {
  BALANCE: number;
  MOOD: number;
  AROMA: number;
  SPICE: number;
}

export interface TagScores {
  [tagId: string]: number;
}

export interface DiagnosisResult {
  decidedType: TypeId;
  typeSpec: CoffeeTypeSpec;
  top1Bean: BeanSpec;
  top2Bean: BeanSpec;
  typeScores: TypeScores;
  tagScores: TagScores;
}

// ========== 1. スコア計算 ==========
export function computeScores(
  answers: UserAnswers,
  route: RouteId
): { typeScores: TypeScores; tagScores: TagScores } {
  const questions = route === "routeA" ? ROUTE_A_QUESTIONS : ROUTE_B_QUESTIONS;

  const typeScores: TypeScores = {
    BALANCE: 0,
    MOOD: 0,
    AROMA: 0,
    SPICE: 0,
  };

  const tagScores: TagScores = {};

  for (const question of questions) {
    const choiceIndex = answers[question.id];
    if (choiceIndex === undefined || choiceIndex >= question.options.length) {
      continue;
    }

    const option = question.options[choiceIndex];

    // Type Score: 常に加算
    typeScores[option.type]++;

    // Tag Score: オプションがタグを持つ場合のみ加算
    if (option.tag) {
      tagScores[option.tag] = (tagScores[option.tag] || 0) + 1;
    }
  }

  return { typeScores, tagScores };
}

// ========== 2. タイプ判定 ==========
export function determineType(
  typeScores: TypeScores,
  answers: UserAnswers,
  route: RouteId
): TypeId {
  const questions = route === "routeA" ? ROUTE_A_QUESTIONS : ROUTE_B_QUESTIONS;
  const tieBreakerQuestionId = route === "routeA" ? "A-20" : "B-20";

  // 最高スコアのタイプを取得
  const maxScore = Math.max(...Object.values(typeScores));
  const topTypes = (Object.keys(typeScores) as TypeId[]).filter(
    (type) => typeScores[type] === maxScore
  );

  // 同点がない場合
  if (topTypes.length === 1) {
    return topTypes[0];
  }

  // 同点の場合: 最終問（A-20 or B-20）の選択肢で決定
  const tieBreakerQuestion = questions.find(
    (q) => q.id === tieBreakerQuestionId
  );

  if (!tieBreakerQuestion) {
    console.error("Tie breaker question not found");
    return fallbackTypePriority(topTypes);
  }

  const tieBreakerChoice = answers[tieBreakerQuestionId];

  if (
    tieBreakerChoice === undefined ||
    tieBreakerChoice >= tieBreakerQuestion.options.length
  ) {
    console.warn("Tie breaker answer not found, using fallback");
    return fallbackTypePriority(topTypes);
  }

  const decidedType = tieBreakerQuestion.options[tieBreakerChoice].type;

  // 最終問で選ばれたタイプが同点グループに含まれているか確認
  if (topTypes.includes(decidedType)) {
    return decidedType;
  }

  // 含まれていない場合はフォールバック
  console.warn("Tie breaker type not in top types, using fallback");
  return fallbackTypePriority(topTypes);
}

// フォールバック: 固定優先順位 BALANCE > MOOD > AROMA > SPICE
function fallbackTypePriority(candidates: TypeId[]): TypeId {
  const priority: TypeId[] = ["BALANCE", "MOOD", "AROMA", "SPICE"];
  for (const type of priority) {
    if (candidates.includes(type)) {
      return type;
    }
  }
  return candidates[0]; // 安全のため
}

// ========== 3. 豆候補の絞り込み ==========
function getCandidateBeans(decidedType: TypeId): BeanSpec[] {
  return BEAN_SPECS.filter((bean) =>
    bean.typeMembership.includes(decidedType)
  );
}

// ========== 4. 豆スコアリング ==========
interface BeanScore {
  bean: BeanSpec;
  tagMatchScore: number;
  uniqueTagMatches: number;
  coreTagMatches: number;
  priorityIndex: number;
}

function scoreBeans(
  candidates: BeanSpec[],
  tagScores: TagScores,
  decidedType: TypeId
): BeanScore[] {
  const typeSpec = COFFEE_TYPE_SPECS[decidedType];
  const priority = BEAN_PRIORITY[decidedType];

  return candidates.map((bean) => {
    // タグマッチスコア: sum(tagScores[tag] for tag in bean.tags)
    const tagMatchScore = bean.tags.reduce(
      (sum, tag) => sum + (tagScores[tag] || 0),
      0
    );

    // ユニークなタグマッチ数: count of bean.tags where tagScores[tag] > 0
    const uniqueTagMatches = bean.tags.filter(
      (tag) => (tagScores[tag] || 0) > 0
    ).length;

    // コアタグとのマッチ数: count of bean.tags in type.coreTags
    const coreTagMatches = bean.tags.filter((tag) =>
      typeSpec.coreTags.includes(tag)
    ).length;

    // 優先順位インデックス（小さいほど優先）
    const priorityIndex = priority.indexOf(bean.name);

    return {
      bean,
      tagMatchScore,
      uniqueTagMatches,
      coreTagMatches,
      priorityIndex: priorityIndex === -1 ? 999 : priorityIndex,
    };
  });
}

// ========== 5. トップ2選出 ==========
function selectTop2(beanScores: BeanScore[]): [BeanSpec, BeanSpec] {
  // ソート: タグマッチスコア > ユニークタグマッチ > コアタグマッチ > 優先順位
  const sorted = [...beanScores].sort((a, b) => {
    // 1. タグマッチスコアで比較
    if (a.tagMatchScore !== b.tagMatchScore) {
      return b.tagMatchScore - a.tagMatchScore;
    }

    // 2. ユニークタグマッチ数で比較
    if (a.uniqueTagMatches !== b.uniqueTagMatches) {
      return b.uniqueTagMatches - a.uniqueTagMatches;
    }

    // 3. コアタグマッチ数で比較
    if (a.coreTagMatches !== b.coreTagMatches) {
      return b.coreTagMatches - a.coreTagMatches;
    }

    // 4. 優先順位で比較
    return a.priorityIndex - b.priorityIndex;
  });

  if (sorted.length < 2) {
    throw new Error(
      `Not enough beans for this type (found ${sorted.length})`
    );
  }

  return [sorted[0].bean, sorted[1].bean];
}

// ========== メイン診断関数 ==========
export function diagnose(
  answers: UserAnswers,
  route: RouteId
): DiagnosisResult {
  // 1. スコア計算
  const { typeScores, tagScores } = computeScores(answers, route);

  // 2. タイプ判定
  const decidedType = determineType(typeScores, answers, route);
  const typeSpec = COFFEE_TYPE_SPECS[decidedType];

  // 3. 豆候補の絞り込み
  const candidates = getCandidateBeans(decidedType);

  if (candidates.length < 2) {
    throw new Error(
      `Not enough candidate beans for type ${decidedType} (found ${candidates.length})`
    );
  }

  // 4. 豆スコアリング
  const beanScores = scoreBeans(candidates, tagScores, decidedType);

  // 5. トップ2選出
  const [top1Bean, top2Bean] = selectTop2(beanScores);

  // デバッグログ（開発時のみ）
  console.log("=== Diagnosis Result ===");
  console.log("Route:", route);
  console.log("Type Scores:", typeScores);
  console.log("Tag Scores:", tagScores);
  console.log("Decided Type:", decidedType);
  console.log("Top1:", top1Bean.name);
  console.log("Top2:", top2Bean.name);

  return {
    decidedType,
    typeSpec,
    top1Bean,
    top2Bean,
    typeScores,
    tagScores,
  };
}
