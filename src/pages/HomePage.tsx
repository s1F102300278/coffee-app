// src/pages/HomePage.tsx
import { useState } from "react";
import { HOME_BEANS } from "../data/homeBeans";
import { BeanDetailPage } from "./BeanDetailPage";
import { beanPhotoSrc } from "../utils/assets";

export function HomePage() {
  const [selectedBeanId, setSelectedBeanId] = useState<string | null>(null);

  // 詳細表示を閉じる
  function closeDetail() {
    setSelectedBeanId(null);
  }

  // ★★★ 豆詳細ページを表示 ★★★
  if (selectedBeanId) {
    return <BeanDetailPage beanId={selectedBeanId} onBack={closeDetail} />;
  }

  // 通常のホーム画面（コア豆のみ）
  return (
    <div style={{ padding: "20px 16px 100px" }}>
      <header className="page-header">
        <h1 className="page-title">ホーム</h1>
        <p className="page-subtitle">今日はどんな一杯にしますか？</p>
      </header>

      {/* コア豆 */}
      <section>
        <h2 className="section-title">コア豆</h2>
        <div className="bean-grid">
          {HOME_BEANS.map((bean) => (
            <div
              key={bean.id}
              onClick={() => setSelectedBeanId(bean.id)}
              className="bean-card"
              style={{
                cursor: "pointer",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 6px 16px rgba(0,0,0,0.12)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.08)";
              }}
            >
              {/* 豆の画像 */}
              <div
                style={{
                  width: "100%",
                  height: 140,
                  background: "#f0f0f0",
                  borderRadius: "12px 12px 0 0",
                  overflow: "hidden",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 16,
                }}
              >
                <img
                  src={beanPhotoSrc(bean.photoFile)}
                  alt={bean.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                  onError={(e) => {
                    // 画像読み込み失敗時は背景色のみ表示
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>

              {/* 豆の名前 */}
              <div
                style={{
                  padding: "12px 8px",
                  fontSize: 14,
                  fontWeight: 700,
                  color: "#1e3932",
                  textAlign: "center",
                  lineHeight: 1.4,
                }}
              >
                {bean.name}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
