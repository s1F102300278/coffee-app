// src/pages/HomePage.tsx
import { useState } from "react";
import { HOME_BEANS } from "../data/homeBeans";

export function HomePage() {
  const [selectedBeanId, setSelectedBeanId] = useState<string | null>(null);

  // 詳細表示を閉じる
  function closeDetail() {
    setSelectedBeanId(null);
  }

  // 詳細表示中の豆を取得
  const selectedBean = HOME_BEANS.find((b) => b.id === selectedBeanId);

  // 詳細画面が開いている場合
  if (selectedBean) {
    return (
      <div style={{ padding: "20px 16px 100px" }}>
        {/* 左上に戻るボタン */}
        <button onClick={closeDetail} className="back-button">
          <span style={{ fontSize: 18 }}>←</span>
          <span>戻る</span>
        </button>

        <div className="detail-card" style={{ marginTop: 20 }}>
          <div
            className="detail-image"
            style={{
              background: selectedBean.imageColor,
            }}
          />
          <h2
            style={{
              fontSize: 24,
              fontWeight: 700,
              color: "#1e3932",
              marginBottom: 12,
            }}
          >
            {selectedBean.name}
          </h2>
          <p style={{ fontSize: 15, color: "#6b7280" }}>
            ※ 詳細ページは後で実装します
          </p>
        </div>
      </div>
    );
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
            >
              <div
                className="bean-image"
                style={{
                  background: bean.imageColor,
                }}
              />
              <div className="bean-name">{bean.name}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
