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
      <div style={{ padding: "16px 16px 80px" }}>
        {/* 左上に戻るボタン */}
        <button
          onClick={closeDetail}
          style={{
            padding: "10px 16px",
            borderRadius: 8,
            border: "1px solid rgba(255,255,255,0.2)",
            background: "rgba(255,255,255,0.05)",
            cursor: "pointer",
            marginBottom: 20,
            fontSize: 14,
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <span style={{ fontSize: 16 }}>←</span>
          <span>戻る</span>
        </button>

        <div
          style={{
            border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: 16,
            padding: 20,
            background: "rgba(255,255,255,0.03)",
          }}
        >
          <div
            style={{
              width: "100%",
              height: 200,
              borderRadius: 12,
              background: selectedBean.imageColor,
              marginBottom: 16,
            }}
          />
          <h2 style={{ fontSize: 22, marginBottom: 8 }}>{selectedBean.name}</h2>
          <p style={{ fontSize: 14, opacity: 0.7 }}>
            ※ 詳細ページは後で実装します
          </p>
        </div>
      </div>
    );
  }

  // 通常のホーム画面（コア豆のみ）
  return (
    <div style={{ padding: "16px 16px 80px" }}>
      <header style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 24, marginBottom: 8 }}>ホーム</h1>
        <p style={{ fontSize: 14, opacity: 0.7 }}>
          今日はどんな一杯にしますか？
        </p>
      </header>

      {/* コア豆 */}
      <section>
        <h2 style={{ fontSize: 18, marginBottom: 12, fontWeight: 700 }}>
          コア豆
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 12,
          }}
        >
          {HOME_BEANS.map((bean) => (
            <div
              key={bean.id}
              onClick={() => setSelectedBeanId(bean.id)}
              style={{
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: 12,
                padding: 12,
                cursor: "pointer",
                background: "rgba(255,255,255,0.02)",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: 120,
                  borderRadius: 8,
                  background: bean.imageColor,
                  marginBottom: 8,
                }}
              />
              <div style={{ fontSize: 14, fontWeight: 700 }}>{bean.name}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
