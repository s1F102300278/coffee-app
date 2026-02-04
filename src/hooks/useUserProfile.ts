// src/hooks/useUserProfile.ts
import { useState, useEffect } from "react";

const STORAGE_KEY_USERNAME = "coffee-app-username";
const STORAGE_KEY_ICON = "coffee-app-user-icon";

export type UserIconId = "bean1" | "bean2" | "bean3" | "bean4";

export const USER_ICONS: { id: UserIconId; color: string; emoji: string }[] = [
  { id: "bean1", color: "#8B4513", emoji: "☕" },
  { id: "bean2", color: "#654321", emoji: "🫘" },
  { id: "bean3", color: "#00754a", emoji: "🌱" },
  { id: "bean4", color: "#D2691E", emoji: "🍂" },
];

export function useUserProfile() {
  const [username, setUsername] = useState<string>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_USERNAME);
      return stored || "コーヒー好きさん";
    } catch {
      return "コーヒー好きさん";
    }
  });

  const [iconId, setIconId] = useState<UserIconId>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_ICON);
      return (stored as UserIconId) || "bean1";
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

  return { username, setUsername, iconId, setIconId };
}
