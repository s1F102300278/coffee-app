// src/components/BeanCard.tsx
interface BeanCardProps {
  rankLabel: "1位" | "2位";
  beanName: string;
  imageSrc?: string;
  onClick: () => void;
}

export function BeanCard({ rankLabel, beanName, imageSrc, onClick }: BeanCardProps) {
  return (
    <div
      onClick={onClick}
      style={{
        background: "white",
        borderRadius: 16,
        padding: 16,
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
        cursor: "pointer",
        transition: "all 0.2s",
        display: "flex",
        alignItems: "center",
        gap: 16,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.12)";
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.08)";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {/* 画像部分 */}
      <div
        style={{
          width: 80,
          height: 80,
          borderRadius: 12,
          background: imageSrc ? "white" : (rankLabel === "1位" ? "#00754a" : "#6b7280"),
          border: imageSrc ? "2px solid #e5e7eb" : "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 40,
          flexShrink: 0,
          padding: imageSrc ? 8 : 0,
        }}
      >
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={beanName}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
            onError={(e) => {
              console.error(`Failed to load bean logo: ${imageSrc}`);
              e.currentTarget.style.display = "none";
            }}
          />
        ) : (
          "☕"
        )}
      </div>

      {/* テキスト部分 */}
      <div style={{ flex: 1 }}>
        <div
          style={{
            fontSize: 12,
            color: "#6b7280",
            marginBottom: 4,
            fontWeight: 600,
          }}
        >
          {rankLabel}
        </div>
        <div
          style={{
            fontSize: 18,
            fontWeight: 700,
            color: "#1e3932",
            marginBottom: 4,
          }}
        >
          {beanName}
        </div>
        <div
          style={{
            fontSize: 13,
            color: "#00754a",
          }}
        >
          詳しく見る →
        </div>
      </div>
    </div>
  );
}
