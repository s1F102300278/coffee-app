// src/components/BeanBadge.tsx
import { getBadgeLevel } from "../hooks/useBeanPoints";
import { badgeSrc } from "../utils/assets";

type BeanBadgeProps = {
  beanId: string;
  points: number;
};

export function BeanBadge({ beanId, points }: BeanBadgeProps) {
  const level = getBadgeLevel(points);

  // レベル0（未所持）の場合
  if (level === 0) {
    return (
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          padding: "6px 12px",
          borderRadius: 50,
          background: "#e5e7eb",
          color: "#9ca3af",
          fontSize: 13,
          fontWeight: 700,
        }}
      >
        <span style={{ fontSize: 14 }}>🔒</span>
        <span>未所持</span>
      </div>
    );
  }

  // レベル1, 2, 3の場合（バッジ画像を表示）
  const imageSrc = badgeSrc(beanId, level as 1 | 2 | 3);

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "4px 12px 4px 4px",
        borderRadius: 50,
        background: "white",
        border: "2px solid #e5e7eb",
        fontSize: 13,
        fontWeight: 700,
        color: "#1e3932",
      }}
    >
      <img
        src={imageSrc}
        alt={`Level ${level} Badge`}
        style={{
          width: 32,
          height: 32,
          objectFit: "contain",
        }}
        onError={(e) => {
          console.error(`Failed to load badge image: ${imageSrc}`);
          // フォールバック：星アイコン
          const target = e.currentTarget;
          target.style.display = "none";
          const fallback = document.createElement("span");
          fallback.style.fontSize = "20px";
          fallback.textContent = "⭐".repeat(level);
          target.parentElement?.insertBefore(fallback, target);
        }}
      />
      <span>Lv{level}</span>
    </div>
  );
}
