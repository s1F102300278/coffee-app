// src/components/BeanBadge.tsx
import { getBadgeLevel } from "../hooks/useBeanPoints";

type BeanBadgeProps = {
  points: number;
};

export function BeanBadge({ points }: BeanBadgeProps) {
  const level = getBadgeLevel(points);

  // レベルごとの色設定
  const getBadgeStyle = () => {
    if (level === 0) {
      return {
        background: "#e5e7eb",
        color: "#9ca3af",
        icon: "🔒",
        label: "未所持",
      };
    }
    if (level === 1) {
      return {
        background: "#fef3c7",
        color: "#92400e",
        icon: "⭐",
        label: "Lv1",
      };
    }
    if (level === 2) {
      return {
        background: "#dbeafe",
        color: "#1e40af",
        icon: "⭐⭐",
        label: "Lv2",
      };
    }
    // level === 3
    return {
      background: "#00754a",
      color: "white",
      icon: "⭐⭐⭐",
      label: "Lv3",
    };
  };

  const style = getBadgeStyle();

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "6px 12px",
        borderRadius: 50,
        background: style.background,
        color: style.color,
        fontSize: 13,
        fontWeight: 700,
      }}
    >
      <span style={{ fontSize: 14 }}>{style.icon}</span>
      <span>{style.label}</span>
    </div>
  );
}
