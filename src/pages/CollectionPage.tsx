// src/pages/CollectionPage.tsx
import { useState, useCallback } from "react";
import { HOME_BEANS } from "../data/homeBeans";
import { useBeanPoints, getBadgeLevel } from "../hooks/useBeanPoints";
import { badgeSrc } from "../utils/assets";

type FeedbackState = {
  beanId: string;
  type: "enjoy" | "buy";
  action: "add" | "remove";
} | null;

export function CollectionPage() {
  const { addPoints, removePoints, getPoints } = useBeanPoints();
  const [feedback, setFeedback] = useState<FeedbackState>(null);

  const showFeedback = useCallback(
    (beanId: string, type: "enjoy" | "buy", action: "add" | "remove") => {
      setFeedback({ beanId, type, action });
      setTimeout(() => setFeedback(null), 600);
    },
    []
  );

  const handleAdd = useCallback(
    (beanId: string, type: "enjoy" | "buy", amount: number) => {
      addPoints(beanId, amount);
      showFeedback(beanId, type, "add");
    },
    [addPoints, showFeedback]
  );

  const handleRemove = useCallback(
    (beanId: string, type: "enjoy" | "buy", amount: number, e: React.MouseEvent) => {
      e.stopPropagation(); // 親ボタンのクリックイベントを防止
      removePoints(beanId, amount);
      showFeedback(beanId, type, "remove");
    },
    [removePoints, showFeedback]
  );

  return (
    <div style={{ padding: "20px 16px 100px" }}>
      <header className="page-header">
        <h1 className="page-title">豆コレクション</h1>
        <p className="page-subtitle">コア豆を楽しんでポイントを貯めよう</p>
      </header>

      {/* 豆一覧 */}
      <div className="bean-grid">
        {HOME_BEANS.map((bean) => {
          const currentPoints = getPoints(bean.id);
          const level = getBadgeLevel(currentPoints);
          const isFeedbackActive = feedback?.beanId === bean.id;
          const feedbackAmount =
            feedback?.type === "enjoy" ? 1 : feedback?.type === "buy" ? 10 : 0;
          const feedbackSign = feedback?.action === "add" ? "+" : "−";

          return (
            <div key={bean.id} className="collection-bean-card">
              {/* 豆の画像エリア（バッジ画像を表示） */}
              <div
                className="bean-image"
                style={{
                  position: "relative",
                  background: level === 0 ? bean.imageColor : "transparent",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                }}
              >
                {level > 0 ? (
                  // レベル1以上：バッジ画像を表示
                  <img
                    src={badgeSrc(bean.id, level as 1 | 2 | 3)}
                    alt={`${bean.name} Level ${level} Badge`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                    onError={(e) => {
                      console.error(`Failed to load badge image: ${badgeSrc(bean.id, level as 1 | 2 | 3)}`);
                      // フォールバック：単色背景 + 星
                      e.currentTarget.style.display = "none";
                      const parent = e.currentTarget.parentElement;
                      if (parent) {
                        parent.style.background = bean.imageColor;
                        const fallback = document.createElement("div");
                        fallback.style.fontSize = "48px";
                        fallback.textContent = "⭐".repeat(level);
                        parent.appendChild(fallback);
                      }
                    }}
                  />
                ) : (
                  // レベル0（未所持）：🔒アイコン
                  <div
                    style={{
                      fontSize: 48,
                      opacity: 0.3,
                    }}
                  >
                    🔒
                  </div>
                )}
              </div>

              {/* 豆の情報 */}
              <div style={{ marginBottom: 12 }}>
                <div
                  style={{
                    fontSize: 15,
                    fontWeight: 700,
                    color: "#1e3932",
                    marginBottom: 6,
                  }}
                >
                  {bean.name}
                </div>

                <div style={{ fontSize: 12, color: "#6b7280" }}>
                  {level > 0 ? `Lv${level} - ${currentPoints} pt` : `${currentPoints} pt`}
                </div>
              </div>

              {/* ポイント追加ボタン */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 8,
                  position: "relative",
                }}
              >
                {/* 楽しんだボタン（Drink） */}
                <button
                  onClick={() => handleAdd(bean.id, "enjoy", 1)}
                  className="point-button enjoy"
                  style={{ position: "relative" }}
                >
                  {/* マイナスボタン */}
                  <button
                    onClick={(e) => handleRemove(bean.id, "enjoy", 1, e)}
                    style={{
                      position: "absolute",
                      top: 4,
                      right: 4,
                      width: 24,
                      height: 24,
                      borderRadius: "50%",
                      background: "rgba(0, 0, 0, 0.2)",
                      border: "none",
                      color: "white",
                      fontSize: 16,
                      fontWeight: 700,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: 0,
                      lineHeight: 1,
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "rgba(0, 0, 0, 0.4)";
                      e.currentTarget.style.transform = "scale(1.1)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "rgba(0, 0, 0, 0.2)";
                      e.currentTarget.style.transform = "scale(1)";
                    }}
                  >
                    −
                  </button>

                  <span style={{ fontSize: 16, marginBottom: 2 }}>☕</span>
                  <span style={{ fontSize: 10, fontWeight: 600, color: "#1e3932", marginBottom: 2 }}>Drink</span>
                  <span style={{ fontSize: 11 }}>楽しんだ</span>
                  <span style={{ fontSize: 12, fontWeight: 700 }}>+1pt</span>
                </button>

                {/* 買ったボタン（Buy） */}
                <button
                  onClick={() => handleAdd(bean.id, "buy", 10)}
                  className="point-button buy"
                  style={{ position: "relative" }}
                >
                  {/* マイナスボタン */}
                  <button
                    onClick={(e) => handleRemove(bean.id, "buy", 10, e)}
                    style={{
                      position: "absolute",
                      top: 4,
                      right: 4,
                      width: 24,
                      height: 24,
                      borderRadius: "50%",
                      background: "rgba(0, 0, 0, 0.2)",
                      border: "none",
                      color: "white",
                      fontSize: 16,
                      fontWeight: 700,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: 0,
                      lineHeight: 1,
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "rgba(0, 0, 0, 0.4)";
                      e.currentTarget.style.transform = "scale(1.1)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "rgba(0, 0, 0, 0.2)";
                      e.currentTarget.style.transform = "scale(1)";
                    }}
                  >
                    −
                  </button>

                  <span style={{ fontSize: 16, marginBottom: 2 }}>🛒</span>
                  <span style={{ fontSize: 10, fontWeight: 600, color: "#1e3932", marginBottom: 2 }}>Buy</span>
                  <span style={{ fontSize: 11 }}>買った</span>
                  <span style={{ fontSize: 12, fontWeight: 700 }}>+10pt</span>
                </button>

                {isFeedbackActive && (
                  <div className={`point-feedback ${feedback.action}`}>
                    {feedbackSign}
                    {feedbackAmount}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* 説明 */}
      <div
        style={{
          marginTop: 32,
          padding: 20,
          background: "white",
          borderRadius: 16,
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
        }}
      >
        <h3
          style={{
            fontSize: 16,
            fontWeight: 700,
            color: "#1e3932",
            marginBottom: 12,
          }}
        >
          ポイントについて
        </h3>
        <ul
          style={{
            fontSize: 14,
            color: "#6b7280",
            lineHeight: 1.8,
            paddingLeft: 20,
          }}
        >
          <li>
            <strong>Drinkボタン：</strong>楽しんだ +1pt
          </li>
          <li>
            <strong>Buyボタン：</strong>買った +10pt
          </li>
          <li>
            <strong>右上の「−」ボタン：</strong>ポイントを減らす
          </li>
          <li>30pt以上で Lv1、50pt以上で Lv2、100pt以上で Lv3</li>
          <li>100pt以降もポイントは加算され続けます</li>
        </ul>
      </div>
    </div>
  );
}
