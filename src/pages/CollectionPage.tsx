// src/pages/CollectionPage.tsx
import { useState, useRef, useCallback } from "react";
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
  const longPressTimerRef = useRef<Record<string, NodeJS.Timeout>>({});

  const showFeedback = useCallback(
    (beanId: string, type: "enjoy" | "buy", action: "add" | "remove") => {
      setFeedback({ beanId, type, action });
      setTimeout(() => setFeedback(null), 600);
    },
    []
  );

  const handleTouchStart = useCallback(
    (beanId: string, type: "enjoy" | "buy", amount: number) => {
      const key = `${beanId}-${type}`;
      longPressTimerRef.current[key] = setTimeout(() => {
        removePoints(beanId, amount);
        showFeedback(beanId, type, "remove");
      }, 1200);
    },
    [removePoints, showFeedback]
  );

  const handleTouchEnd = useCallback(
    (beanId: string, type: "enjoy" | "buy", amount: number) => {
      const key = `${beanId}-${type}`;
      const timer = longPressTimerRef.current[key];

      if (timer) {
        clearTimeout(timer);
        delete longPressTimerRef.current[key];

        addPoints(beanId, amount);
        showFeedback(beanId, type, "add");
      }
    },
    [addPoints, showFeedback]
  );

  const handleTouchCancel = useCallback((beanId: string, type: "enjoy" | "buy") => {
    const key = `${beanId}-${type}`;
    const timer = longPressTimerRef.current[key];
    if (timer) {
      clearTimeout(timer);
      delete longPressTimerRef.current[key];
    }
  }, []);

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
                <button
                  onMouseDown={() => handleTouchStart(bean.id, "enjoy", 1)}
                  onMouseUp={() => handleTouchEnd(bean.id, "enjoy", 1)}
                  onMouseLeave={() => handleTouchCancel(bean.id, "enjoy")}
                  onTouchStart={() => handleTouchStart(bean.id, "enjoy", 1)}
                  onTouchEnd={() => handleTouchEnd(bean.id, "enjoy", 1)}
                  onTouchCancel={() => handleTouchCancel(bean.id, "enjoy")}
                  className="point-button enjoy"
                >
                  <span style={{ fontSize: 16, marginBottom: 2 }}>☕</span>
                  <span style={{ fontSize: 11 }}>楽しんだ</span>
                  <span style={{ fontSize: 12, fontWeight: 700 }}>+1pt</span>
                </button>

                <button
                  onMouseDown={() => handleTouchStart(bean.id, "buy", 10)}
                  onMouseUp={() => handleTouchEnd(bean.id, "buy", 10)}
                  onMouseLeave={() => handleTouchCancel(bean.id, "buy")}
                  onTouchStart={() => handleTouchStart(bean.id, "buy", 10)}
                  onTouchEnd={() => handleTouchEnd(bean.id, "buy", 10)}
                  onTouchCancel={() => handleTouchCancel(bean.id, "buy")}
                  className="point-button buy"
                >
                  <span style={{ fontSize: 16, marginBottom: 2 }}>🛒</span>
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
            <strong>通常タップ：</strong>「楽しんだ」+1pt /「買った」+10pt
          </li>
          <li>
            <strong>長押し（1.2秒）：</strong>「楽しんだ」−1pt /
            「買った」−10pt
          </li>
          <li>30pt以上で Lv1、50pt以上で Lv2、100pt以上で Lv3</li>
          <li>100pt以降もポイントは加算され続けます</li>
        </ul>
      </div>
    </div>
  );
}
