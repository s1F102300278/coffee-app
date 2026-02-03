// src/data/homeBeans.ts
// ホーム画面用の豆データ（既存の beans.ts は変更しない）

export type HomeBean = {
  id: string;
  name: string;
  imageColor: string; // 仮画像として背景色を使用
  category: "core";
};

export const HOME_BEANS: HomeBean[] = [
  // コア豆 16種類すべて
  {
    id: "light-note",
    name: "ライトノートブレンド",
    imageColor: "#F5DEB3",
    category: "core",
  },
  {
    id: "blonde-espresso",
    name: "ブロンドエスプレッソロースト",
    imageColor: "#DEB887",
    category: "core",
  },
  {
    id: "breakfast",
    name: "ブレックファーストブレンド",
    imageColor: "#D2B48C",
    category: "core",
  },
  {
    id: "siren",
    name: "サイレンブレンド",
    imageColor: "#BC8F8F",
    category: "core",
  },
  {
    id: "kenya",
    name: "ケニア",
    imageColor: "#CD853F",
    category: "core",
  },
  {
    id: "pike-place",
    name: "パイクプレイスロースト",
    imageColor: "#A0826D",
    category: "core",
  },
  {
    id: "guatemala",
    name: "グアテマラアンティグア",
    imageColor: "#8B7355",
    category: "core",
  },
  {
    id: "house-blend",
    name: "ハウスブレンド",
    imageColor: "#8B4513",
    category: "core",
  },
  {
    id: "decaf-house",
    name: "ディカフェハウスブレンド",
    imageColor: "#A0522D",
    category: "core",
  },
  {
    id: "colombia",
    name: "コロンビア",
    imageColor: "#8B6914",
    category: "core",
  },
  {
    id: "tokyo",
    name: "TOKYOロースト",
    imageColor: "#654321",
    category: "core",
  },
  {
    id: "sumatra",
    name: "スマトラ",
    imageColor: "#5C4033",
    category: "core",
  },
  {
    id: "komodo-dragon",
    name: "コモドドラゴンブレンド",
    imageColor: "#4E3629",
    category: "core",
  },
  {
    id: "espresso",
    name: "エスプレッソロースト",
    imageColor: "#3E2723",
    category: "core",
  },
  {
    id: "italian",
    name: "イタリアンロースト",
    imageColor: "#2F2520",
    category: "core",
  },
  {
    id: "french",
    name: "フレンチロースト",
    imageColor: "#1C1614",
    category: "core",
  },
] as const;
