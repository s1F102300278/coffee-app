// src/data/homeBeans.ts
// ホーム画面用の豆データ（既存の beans.ts は変更しない）

export type HomeBean = {
  id: string;
  name: string;
  imageColor: string; // 仮画像として背景色を使用
  category: "core";
};

export const HOME_BEANS: HomeBean[] = [
  // コア豆のみ（既存 beans.ts のデータと重複してもOK。ホーム表示用として独立管理）
  {
    id: "breakfast",
    name: "ブレックファースト",
    imageColor: "#DEB887",
    category: "core",
  },
  {
    id: "siren",
    name: "サイレン",
    imageColor: "#8B4513",
    category: "core",
  },
  {
    id: "guatemala",
    name: "グアテマラ",
    imageColor: "#654321",
    category: "core",
  },
  {
    id: "tokyo",
    name: "TOKYO",
    imageColor: "#2F4F4F",
    category: "core",
  },
] as const;
