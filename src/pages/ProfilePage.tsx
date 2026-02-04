// src/pages/ProfilePage.tsx
import { useState } from "react";
import { useProfile, AVAILABLE_ICONS } from "../hooks/useProfile";
import { useBeanPoints, getBadgeLevel } from "../hooks/useBeanPoints";
import { HOME_BEANS } from "../data/homeBeans";

type ProfilePageProps = {
  onNavigateToDiagnosis: () => void;
  hasCompletedDiagnosis: boolean;
  diagnosisTypeName: string;
};

export function ProfilePage({
  onNavigateToDiagnosis,
  hasCompletedDiagnosis,
  diagnosisTypeName,
}: ProfilePageProps) {
  const { username, selectedIcon, iconId, setIconId } = useProfile();
  const { getPoints } = useBeanPoints();
  const [isSelectingIcon, setIsSelectingIcon] = useState(false);

  // コレクション実績を集計
  const totalPoints = HOME_BEANS.reduce((sum, bean) => sum + getPoints(bean.id), 0);
  const badgeCounts = {
    lv1: 0, // 30pt以上
    lv2: 0, // 50pt以上
    lv3: 0, // 100pt以上
  };

  HOME_BEANS.forEach((bean) => {
    const points = getPoints(bean.id);
    const level = getBadgeLevel(points);
    if (level === 1) badgeCounts.lv1++;
    if (level === 2) badgeCounts.lv2++;
    if (level === 3) badgeCounts.lv3++;
  });

  return (
    <div style={{ padding: "20px 16px 100px" }}>
      <header className="page-header">
        <h1 className="page-title">プロフィール</h1>
        <p className="page-subtitle">あなたのコーヒー体験</p>
      </header>

      {/* ユーザー基本情報カード */}
      <section style={{ marginBottom: 16 }}>
        <div
          style={{
            background: "white",
            borderRadius: 20,
            padding: 24,
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            {/* アイコン */}
            <div
              onClick={() => setIsSelectingIcon(!isSelectingIcon)}
              style={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                background: selectedIcon.color,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 40,
                cursor: "pointer",
                border: "3px solid #f3f4f6",
                flexShrink: 0,
              }}
            >
              {selectedIcon.emoji}
            </div>

            {/* ユーザー名 */}
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 20, fontWeight: 700, color: "#1e3932" }}>
                {username}
              </div>
              <div style={{ fontSize: 13, color: "#6b7280", marginTop: 4 }}>
                アイコンをタップして変更
              </div>
            </div>
          </div>

          {/* アイコン選択 */}
          {isSelectingIcon && (
            <div
              style={{
                marginTop: 16,
                paddingTop: 16,
                borderTop: "1px solid #e5e7eb",
              }}
            >
              <div style={{ fontSize: 14, fontWeight: 600, color: "#1e3932", marginBottom: 12 }}>
                アイコンを選択
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
                {AVAILABLE_ICONS.map((icon) => (
                  <div
                    key={icon.id}
                    onClick={() => {
                      setIconId(icon.id);
                      setIsSelectingIcon(false);
                    }}
                    style={{
                      width: "100%",
                      aspectRatio: "1",
                      borderRadius: "50%",
                      background: icon.color,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 32,
                      cursor: "pointer",
                      border: iconId === icon.id ? "3px solid #00754a" : "3px solid #f3f4f6",
                      transition: "all 0.2s",
                    }}
                  >
                    {icon.emoji}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 診断結果カード */}
      <section style={{ marginBottom: 16 }}>
        <div
          onClick={onNavigateToDiagnosis}
          style={{
            background: "white",
            borderRadius: 20,
            padding: 24,
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
            cursor: "pointer",
            transition: "all 0.2s",
          }}
          className="profile-card-hover"
        >
          <h2
            style={{
              fontSize: 18,
              fontWeight: 700,
              color: "#1e3932",
              marginBottom: 12,
            }}
          >
            診断結果
          </h2>

          {hasCompletedDiagnosis ? (
            <div>
              <div
                style={{
                  fontSize: 14,
                  color: "#6b7280",
                  marginBottom: 8,
                }}
              >
                あなたのタイプ
              </div>
              <div
                style={{
                  fontSize: 20,
                  fontWeight: 700,
                  color: "#00754a",
                  marginBottom: 8,
                }}
              >
                {diagnosisTypeName}
              </div>
              <div
                style={{
                  fontSize: 13,
                  color: "#00754a",
                  textAlign: "right",
                }}
              >
                タップして詳細を見る →
              </div>
            </div>
          ) : (
            <div
              style={{
                padding: 16,
                background: "#f9fafb",
                borderRadius: 12,
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 24, marginBottom: 8, opacity: 0.3 }}>☕</div>
              <div style={{ fontSize: 14, color: "#6b7280", marginBottom: 4 }}>
                診断未実施
              </div>
              <div style={{ fontSize: 13, color: "#00754a" }}>
                タップして診断する →
              </div>
            </div>
          )}
        </div>
      </section>

      {/* コレクション実績カード */}
      <section style={{ marginBottom: 16 }}>
        <div
          style={{
            background: "white",
            borderRadius: 20,
            padding: 24,
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
          }}
        >
          <h2
            style={{
              fontSize: 18,
              fontWeight: 700,
              color: "#1e3932",
              marginBottom: 16,
            }}
          >
            コレクション実績
          </h2>

          {/* 総ポイント */}
          <div
            style={{
              marginBottom: 16,
              padding: 16,
              background: "#ecfdf5",
              borderRadius: 12,
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 13, color: "#047857", marginBottom: 4 }}>
              獲得総ポイント
            </div>
            <div style={{ fontSize: 32, fontWeight: 800, color: "#00754a" }}>
              {totalPoints}
              <span style={{ fontSize: 18, fontWeight: 600, marginLeft: 4 }}>pt</span>
            </div>
          </div>

          {/* バッジ数 */}
          <div>
            <div style={{ fontSize: 14, fontWeight: 600, color: "#1e3932", marginBottom: 12 }}>
              獲得バッジ
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
              {/* Lv3 */}
              <div
                style={{
                  padding: 12,
                  background: "#f0fdf4",
                  borderRadius: 12,
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: 24, marginBottom: 4 }}>⭐⭐⭐</div>
                <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 2 }}>Lv3</div>
                <div style={{ fontSize: 20, fontWeight: 700, color: "#00754a" }}>
                  {badgeCounts.lv3}
                </div>
              </div>

              {/* Lv2 */}
              <div
                style={{
                  padding: 12,
                  background: "#eff6ff",
                  borderRadius: 12,
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: 24, marginBottom: 4 }}>⭐⭐</div>
                <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 2 }}>Lv2</div>
                <div style={{ fontSize: 20, fontWeight: 700, color: "#1e40af" }}>
                  {badgeCounts.lv2}
                </div>
              </div>

              {/* Lv1 */}
              <div
                style={{
                  padding: 12,
                  background: "#fef3c7",
                  borderRadius: 12,
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: 24, marginBottom: 4 }}>⭐</div>
                <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 2 }}>Lv1</div>
                <div style={{ fontSize: 20, fontWeight: 700, color: "#92400e" }}>
                  {badgeCounts.lv1}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
