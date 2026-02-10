// src/hooks/useProfile.ts
import { useState, useEffect } from "react";
import { HOME_BEANS } from "../data/homeBeans";

const STORAGE_KEY_USERNAME = "coffee-app-username";
const STORAGE_KEY_ICON = "coffee-app-icon";

export type IconId = string; // 豆のIDを使用

export type IconData = {
  id: IconId;
  name: string;
  logoFile: string;
};

// 16種類の豆ロゴをアイコンとして使用
export const AVAILABLE_ICONS: IconData[] = HOME_BEANS.map((bean) => ({
  id: bean.id,
  name: bean.name,
  logoFile: bean.logoFile,
}));

export function useProfile() {
  const [username, setUsername] = useState<string>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_USERNAME);
      return stored || "コーヒー愛好家";
    } catch {
      return "コーヒー愛好家";
    }
  });

  const [iconId, setIconId] = useState<IconId>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_ICON) as IconId;
      return stored && AVAILABLE_ICONS.some((i) => i.id === stored)
        ? stored
        : "lightnote"; // デフォルトはライトノートブレンド
    } catch {
      return "lightnote";
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_USERNAME, username);
    } catch (err) {
      console.error("Failed to save username:", err);
    }
  }, [username]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_ICON, iconId);
    } catch (err) {
      console.error("Failed to save icon:", err);
    }
  }, [iconId]);

  const selectedIcon = AVAILABLE_ICONS.find((i) => i.id === iconId) || AVAILABLE_ICONS[0];

  return {
    username,
    setUsername,
    iconId,
    setIconId,
    selectedIcon,
  };
}
