// src/hooks/useBeanPoints.ts
import { useState, useEffect } from "react";

const STORAGE_KEY = "coffee-app-bean-points";

export type BeanPoints = Record<string, number>;

export function useBeanPoints() {
  const [points, setPoints] = useState<BeanPoints>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(points));
    } catch (err) {
      console.error("Failed to save bean points:", err);
    }
  }, [points]);

  function addPoints(beanId: string, amount: number) {
    setPoints((prev) => ({
      ...prev,
      [beanId]: (prev[beanId] || 0) + amount,
    }));
  }

  function removePoints(beanId: string, amount: number) {
    setPoints((prev) => {
      const currentPoints = prev[beanId] || 0;
      const newPoints = Math.max(0, currentPoints - amount); // 0未満にならないように
      return {
        ...prev,
        [beanId]: newPoints,
      };
    });
  }

  function getPoints(beanId: string): number {
    return points[beanId] || 0;
  }

  return { points, addPoints, removePoints, getPoints };
}

export function getBadgeLevel(points: number): 0 | 1 | 2 | 3 {
  if (points === 0) return 0;
  if (points >= 100) return 3;
  if (points >= 50) return 2;
  if (points >= 30) return 1;
  return 0;
}
