// src/utils/assets.ts
// 画像パスのヘルパー関数

/**
 * 豆の写真パスを返す
 * @param filename - 例: "Pike-Place-Roast.jpg"
 */
export function beanPhotoSrc(filename: string): string {
  return `/Whole-Bean-photo/${filename}`;
}

/**
 * 豆のロゴパスを返す
 * @param filename - 例: "Pike-Place-Roast.jpg"
 */
export function beanLogoSrc(filename: string): string {
  return `/Whole-Bean-logo/${filename}`;
}

/**
 * 豆IDからバッジファイル名プレフィックスへのマッピング
 */
const BEAN_ID_TO_BADGE_PREFIX: Record<string, string> = {
  "lightnote": "lightnote-blend",
  "blonde-espresso": "blonde-espresso-roast",
  "breakfast": "breakfast-blend", // 修正：正しいファイル名に変更
  "siren": "siren-blend",
  "kenya": "kenya",
  "pike-place": "pike-place-roast",
  "guatemala": "guatemala-antigua",
  "house": "house-blend",
  "decaf-house": "decaf-house-blend",
  "colombia": "colombia",
  "tokyo": "tokyo-roast",
  "sumatra": "sumatra",
  "komodo": "comodo-dragon-blend",
  "caffe-verona": "caffe-verona",
  "espresso": "espresso-raost",
  "italian": "italin-roast",
  "french": "french-roast",
};

/**
 * バッジ画像パスを返す
 * @param beanId - 豆のID（例: "lightnote", "pike-place"）
 * @param level - 1: Bronze, 2: Silver, 3: Gold
 */
export function badgeSrc(beanId: string, level: 1 | 2 | 3): string {
  const levelMap = {
    1: "bronze",
    2: "silver",
    3: "gold",
  };
  
  const prefix = BEAN_ID_TO_BADGE_PREFIX[beanId];
  if (!prefix) {
    console.warn(`Badge prefix not found for beanId: ${beanId}`);
    return "";
  }
  
  return `/Bean-Collection-${levelMap[level]}/${prefix}-${levelMap[level]}.png`;
}
