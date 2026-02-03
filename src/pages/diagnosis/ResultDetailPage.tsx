// src/pages/diagnosis/ResultDetailPage.tsx
import type { CoffeeType } from "../../data/types";
import type { CoffeeBean } from "../../data/beans";

type ResultDetailPageProps = {
  typeInfo: CoffeeType;
  firstBean: CoffeeBean;
  secondBean: CoffeeBean;
  onBack: () => void;
};

export function ResultDetailPage({ typeInfo, firstBean, secondBean, onBack }: ResultDetailPageProps) {
  return (
    <div style={{ padding: "20px 16px 100px" }}>
      <div style={{ marginBottom: 20 }}>
        <button onClick={onBack} className="back-button">
          <span style={{ fontSize: 18 }}>←</span>
          <span>戻る</span>
        </button>
      </div>

      <div className="detail-card">
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 14, color: "#6b7280", marginBottom: 8 }}>あなたのタイプ</div>
          <h1 style={{ fontSize: 26, fontWeight: 700, color: "#1e3932", marginBottom: 12 }}>
            {typeInfo.name}
          </h1>
          <p style={{ fontSize: 16, color: "#1e3932", fontWeight: 600, marginBottom: 16 }}>
            {typeInfo.catch}
          </p>
          <p style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.6 }}>
            {typeInfo.reason}
          </p>
        </div>

        <div style={{ borderTop: "1px solid #e5e7eb", paddingTop: 24 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: "#1e3932", marginBottom: 16 }}>
            おすすめの豆
          </h2>

          <div style={{ display: "grid", gap: 16 }}>
            <div
              style={{
                background: "#f9fafb",
                borderRadius: 16,
                padding: 16,
              }}
            >
              <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 4 }}>1位</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: "#1e3932", marginBottom: 8 }}>
                {firstBean.name}
              </div>
              <p style={{ fontSize: 14, color: "#6b7280" }}>{firstBean.note}</p>
            </div>

            <div
              style={{
                background: "#f9fafb",
                borderRadius: 16,
                padding: 16,
              }}
            >
              <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 4 }}>2位</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: "#1e3932", marginBottom: 8 }}>
                {secondBean.name}
              </div>
              <p style={{ fontSize: 14, color: "#6b7280" }}>{secondBean.note}</p>
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 16, textAlign: "center", fontSize: 13, color: "#9ca3af" }}>
        ※ 詳細ページは後で拡張予定です
      </div>
    </div>
  );
}
