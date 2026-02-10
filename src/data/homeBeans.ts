// src/data/homeBeans.ts
// ホーム画面用の豆データ（既存の beans.ts は変更しない）

export type HomeBean = {
  id: string;
  name: string;
  imageColor: string;
  photoFile: string; // 豆写真ファイル名
  logoFile: string; // ロゴファイル名
  category: "core";
};

export const HOME_BEANS: HomeBean[] = [
  // コア豆 17種類すべて（IDをbeans.tsと統一）
  {
    id: "lightnote",
    name: "ライトノートブレンド",
    imageColor: "#F5DEB3",
    photoFile: "lightnote-blend.jpg",
    logoFile: "lightnote-blend-logo.jpg",
    category: "core",
  },
  {
    id: "blonde-espresso",
    name: "ブロンドエスプレッソロースト",
    imageColor: "#DEB887",
    photoFile: "blonde-espresso-roast.jpg",
    logoFile: "blonde-espresso-roast-logo.jpg",
    category: "core",
  },
  {
    id: "breakfast",
    name: "ブレックファーストブレンド",
    imageColor: "#D2B48C",
    photoFile: "breakfast-blend.jpg",
    logoFile: "breakfast-blend-logo.jpg",
    category: "core",
  },
  {
    id: "siren",
    name: "サイレンブレンド",
    imageColor: "#BC8F8F",
    photoFile: "siren-blend.jpg",
    logoFile: "siren-blend-logo.jpg",
    category: "core",
  },
  {
    id: "kenya",
    name: "ケニア",
    imageColor: "#CD853F",
    photoFile: "kenya.jpg",
    logoFile: "kenya-logo.jpg",
    category: "core",
  },
  {
    id: "pike-place",
    name: "パイクプレイスロースト",
    imageColor: "#A0826D",
    photoFile: "pike-place-roast.jpg",
    logoFile: "pike-place-roast-logo.jpg",
    category: "core",
  },
  {
    id: "guatemala",
    name: "グアテマラアンティグア",
    imageColor: "#8B7355",
    photoFile: "guatemala-antigua.jpg",
    logoFile: "guatemala-antigua-logo.jpg",
    category: "core",
  },
  {
    id: "house",
    name: "ハウスブレンド",
    imageColor: "#8B4513",
    photoFile: "house-blend.jpg",
    logoFile: "house-blend-logo.jpg",
    category: "core",
  },
  {
    id: "decaf-house",
    name: "ディカフェハウスブレンド",
    imageColor: "#A0522D",
    photoFile: "decaf-house-blend.jpg",
    logoFile: "decaf-house-blend-logo.jpg",
    category: "core",
  },
  {
    id: "colombia",
    name: "コロンビア",
    imageColor: "#8B6914",
    photoFile: "colombia.jpg",
    logoFile: "colombia-logo.jpg",
    category: "core",
  },
  {
    id: "tokyo",
    name: "TOKYOロースト",
    imageColor: "#654321",
    photoFile: "tokyo-roast.jpg",
    logoFile: "tokyo-roast-logo.jpg",
    category: "core",
  },
  {
    id: "sumatra",
    name: "スマトラ",
    imageColor: "#5C4033",
    photoFile: "sumatra.jpg",
    logoFile: "sumatra-logo.jpg",
    category: "core",
  },
  {
    id: "komodo",
    name: "コモドドラゴンブレンド",
    imageColor: "#4E3629",
    photoFile: "komodo-dragon-blend.jpg",
    logoFile: "komodo-dragon-blend-logo.jpg",
    category: "core",
  },
  {
    id: "espresso",
    name: "エスプレッソロースト",
    imageColor: "#3E2723",
    photoFile: "espresso-roast.jpg",
    logoFile: "espresso-roast-logo.jpg",
    category: "core",
  },
  {
    id: "italian",
    name: "イタリアンロースト",
    imageColor: "#2F2520",
    photoFile: "italian-roast.jpg",
    logoFile: "italian-roast-logo.jpg",
    category: "core",
  },
  {
    id: "french",
    name: "フレンチロースト",
    imageColor: "#1C1614",
    photoFile: "french-roast.jpg",
    logoFile: "french-roast-logo.jpg",
    category: "core",
  },
  {
    id: "caffe-verona",
    name: "カフェベロナ",
    imageColor: "#3E2723",
    photoFile: "caffe-verona.jpg",
    logoFile: "caffe-verona-logo.jpg",
    category: "core",
  },
] as const;
