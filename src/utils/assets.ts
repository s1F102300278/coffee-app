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
