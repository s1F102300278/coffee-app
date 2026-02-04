// src/hooks/useProfile.ts
import { useState, useEffect } from "react";

const STORAGE_KEY_USERNAME = "coffee-app-username";
const STORAGE_KEY_ICON = "coffee-app-icon";

export type IconId = "bean1" | "bean2" | "bean3" | "bean4";

export const AVAILABLE_ICONS: { id: IconId; emoji: string; color: string }[] = [
  { id: "bean1", emoji: "☕", color: "#8B4513" },
  { id: "bean2", emoji: "🫘", color: "#6B4423" },
  { id: "bean3", emoji: "🌰", color: "#A0826D" },
  { id: "bean4", emoji: "🥜", color: "#D2691E" },
];

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
        : "bean1";
    } catch {
      return "bean1";
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
