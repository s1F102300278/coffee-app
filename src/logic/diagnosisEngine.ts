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
  BeanSpec,
  CoffeeTypeSpec,
} from "../data/diagnosisSpec";

// ========== 型定義 ==========
export interface UserAnswers {
  [questionId: string]: number; // 質問IDと選択肢インデックス
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

  // 追加：結果の納得感を上げるための説明情報
  topTags: TagId[];      // 全体で強く出たタグ上位（最大3）
  top1Reason: string;   // Top1豆の理由（自動生成）
  top2Reason: string;   // Top2豆の理由（自動生成）
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
    if (choiceIndex === undefined || choiceIndex >= question.options.length) continue;

    const option = question.options[choiceIndex];

    // Type Score: タイプ判定はブレないように常に +1（重み付けしない）
    typeScores[option.type]++;

    // Tag Score: タグがある場合のみ加算（フード系などは w:2 を付ける）
    if (option.tag) {
      const w = option.w ?? 1;
      tagScores[option.tag] = (tagScores[option.tag] || 0) + w;
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
  const tieBreakerQuestionId = route === "routeA" ? "A-30" : "B-30";

  const maxScore = Math.max(...Object.values(typeScores));
  const topTypes = (Object.keys(typeScores) as TypeId[]).filter(
    (type) => typeScores[type] === maxScore
  );

  if (topTypes.length === 1) return topTypes[0];

  const tieBreakerQuestion = questions.find((q) => q.id === tieBreakerQuestionId);
  if (!tieBreakerQuestion) return fallbackTypePriority(topTypes);

  const tieBreakerChoice = answers[tieBreakerQuestionId];
  if (
    tieBreakerChoice === undefined ||
    tieBreakerChoice >= tieBreakerQuestion.options.length
  ) {
    return fallbackTypePriority(topTypes);
  }

  const decidedType = tieBreakerQuestion.options[tieBreakerChoice].type;
  if (topTypes.includes(decidedType)) return decidedType;

  return fallbackTypePriority(topTypes);
}

function fallbackTypePriority(candidates: TypeId[]): TypeId {
  const priority: TypeId[] = ["BALANCE", "MOOD", "AROMA", "SPICE"];
  for (const type of priority) if (candidates.includes(type)) return type;
  return candidates[0];
}

// ========== 3. 豆スコアリング（ソフト制限：全豆を対象にして同タイプにボーナス） ==========
interface BeanScore {
  bean: BeanSpec;
  tagMatchScore: number;
  uniqueTagMatches: number;
  coreTagMatches: number;
  typeBonus: number;
  priorityIndex: number;
}

function scoreBeans(
  beans: BeanSpec[],
  tagScores: TagScores,
  decidedType: TypeId
): BeanScore[] {
  const typeSpec = COFFEE_TYPE_SPECS[decidedType];
  const priority = BEAN_PRIORITY[decidedType];

  return beans.map((bean) => {
    const tagMatchScore = bean.tags.reduce(
      (sum, tag) => sum + (tagScores[tag] || 0),
      0
    );

    const uniqueTagMatches = bean.tags.filter((tag) => (tagScores[tag] || 0) > 0).length;

    const coreTagMatches = bean.tags.filter((tag) => typeSpec.coreTags.includes(tag)).length;

    // 同タイプの豆は「候補として出やすい」程度にボーナス
    const typeBonus = bean.typeMembership.includes(decidedType) ? 2 : 0;

    const priorityIndex = priority.indexOf(bean.name);

    return {
      bean,
      tagMatchScore,
      uniqueTagMatches,
      coreTagMatches,
      typeBonus,
      priorityIndex: priorityIndex === -1 ? 999 : priorityIndex,
    };
  });
}

// ========== 4. トップ2選出 ==========
function selectTop2(beanScores: BeanScore[]): [BeanSpec, BeanSpec] {
  const sorted = [...beanScores].sort((a, b) => {
    // 1) タグマッチ（最優先）
    if (a.tagMatchScore !== b.tagMatchScore) return b.tagMatchScore - a.tagMatchScore;

    // 2) 同タイプボーナス
    if (a.typeBonus !== b.typeBonus) return b.typeBonus - a.typeBonus;

    // 3) ユニークタグマッチ数
    if (a.uniqueTagMatches !== b.uniqueTagMatches)
      return b.uniqueTagMatches - a.uniqueTagMatches;

    // 4) コアタグマッチ数
    if (a.coreTagMatches !== b.coreTagMatches) return b.coreTagMatches - a.coreTagMatches;

    // 5) 優先順位
    return a.priorityIndex - b.priorityIndex;
  });

  if (sorted.length < 2) throw new Error(`Not enough beans (found ${sorted.length})`);
  return [sorted[0].bean, sorted[1].bean];
}

// ========== 5. 理由の自動生成 ==========
const TAG_LABELS: Record<TagId, string> = {
  calm: "落ち着き",
  balance: "バランス",
  light: "軽やかさ",
  refresh: "すっきり感",
  aroma: "香り",
  fruity: "フルーティ",
  nutty: "香ばしさ",
  rich: "コク",
  cocoa: "ココア/チョコ",
  caramel: "キャラメル",
  citrus: "柑橘",
  berry: "ベリー",
  floral: "華やかさ",
  herbal: "ハーブ/抹茶",
  spice: "スパイス",
  smoky: "スモーキー",
  sweet: "甘み",
  dark: "ビター感",
};

function getTopTags(tagScores: TagScores, limit = 3): TagId[] {
  return (Object.keys(tagScores) as TagId[])
    .filter((t) => (tagScores[t] || 0) > 0)
    .sort((a, b) => (tagScores[b] || 0) - (tagScores[a] || 0))
    .slice(0, limit);
}

function getBeanTopMatchedTags(bean: BeanSpec, tagScores: TagScores, limit = 3): TagId[] {
  return [...bean.tags]
    .filter((t) => (tagScores[t] || 0) > 0)
    .sort((a, b) => (tagScores[b] || 0) - (tagScores[a] || 0))
    .slice(0, limit) as TagId[];
}

function buildBeanReason(bean: BeanSpec, decidedType: TypeId, tagScores: TagScores): string {
  const matched = getBeanTopMatchedTags(bean, tagScores, 3);
  const labels = matched.length ? matched.map((t) => TAG_LABELS[t]).join("・") : "飲みやすさ";
  const typeName = COFFEE_TYPE_SPECS[decidedType].displayName;
  return `あなたの回答では「${labels}」の傾向が強めでした。${bean.name}はその方向性と相性がよく、${typeName}の魅力を気持ちよく楽しめる一杯です。`;
}

// ========== メイン診断関数 ==========
export function diagnose(answers: UserAnswers, route: RouteId): DiagnosisResult {
  const { typeScores, tagScores } = computeScores(answers, route);

  const decidedType = determineType(typeScores, answers, route);
  const typeSpec = COFFEE_TYPE_SPECS[decidedType];

  // 全豆を対象にスコアリング（ソフト制限）
  const beanScores = scoreBeans(BEAN_SPECS, tagScores, decidedType);

  const [top1Bean, top2Bean] = selectTop2(beanScores);

  const topTags = getTopTags(tagScores, 3);

  const top1Reason = buildBeanReason(top1Bean, decidedType, tagScores);
  const top2Reason = buildBeanReason(top2Bean, decidedType, tagScores);

  return {
    decidedType,
    typeSpec,
    top1Bean,
    top2Bean,
    typeScores,
    tagScores,
    topTags,
    top1Reason,
    top2Reason,
  };
}
