// src/data/questions.ts

export type Choice = {
  id: "A" | "B" | "C";
  text: string;
};

export type Question = {
  id: "q1" | "q2" | "q3" | "q4" | "q5" | "q6";
  prompt: string;
  choices: [Choice, Choice, Choice];
};

export const QUESTIONS: Question[] = [
  {
    id: "q1",
    prompt: "今日の気分に一番近いのは？",
    choices: [
      { id: "A", text: "すっきり軽く飲みたい" },
      { id: "B", text: "バランスよく楽しみたい" },
      { id: "C", text: "しっかり飲みごたえがほしい" },
    ],
  },
  {
    id: "q2",
    prompt: "コーヒーを飲むシーンは？",
    choices: [
      { id: "A", text: "朝・作業前" },
      { id: "B", text: "午後のひと息" },
      { id: "C", text: "夜・ゆっくり" },
    ],
  },
  {
    id: "q3",
    prompt: "酸味について、正直どう思いますか？",
    choices: [
      { id: "A", text: "できれば控えめがいい" },
      { id: "B", text: "少しあると好き" },
      { id: "C", text: "フルーティなのが好き" },
    ],
  },
  {
    id: "q4",
    prompt: "よく選ぶ飲み物は？",
    choices: [
      { id: "A", text: "紅茶・緑茶" },
      { id: "B", text: "カフェラテ" },
      { id: "C", text: "ブラックコーヒー" },
    ],
  },
  {
    id: "q5",
    prompt: "コーヒーに求めるのは？",
    choices: [
      { id: "A", text: "飲みやすさ" },
      { id: "B", text: "香り" },
      { id: "C", text: "余韻・コク" },
    ],
  },
  {
    id: "q6",
    prompt: "新しい味への挑戦は？",
    choices: [
      { id: "A", text: "安定がいちばん" },
      { id: "B", text: "気になったら試す" },
      { id: "C", text: "むしろ冒険したい" },
    ],
  },
] as const;
