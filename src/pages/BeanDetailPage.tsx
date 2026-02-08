// src/pages/BeanDetailPage.tsx
import { beanPhotoSrc, beanLogoSrc } from "../utils/assets";
import { BEAN_DETAILS } from "../data/beanDetails";
import { COFFEE_BEANS } from "../data/beans";

type BeanDetailPageProps = {
  beanId: string;
  onBack: () => void;
};

export function BeanDetailPage({ beanId, onBack }: BeanDetailPageProps) {
  const beanDetail = BEAN_DETAILS[beanId];
  const beanInfo = COFFEE_BEANS.find((b) => b.id === beanId);

  if (!beanDetail || !beanInfo) {
    return (
      <div style={{ padding: "20px" }}>
        <button onClick={onBack} className="back-button">
          ← 戻る
        </button>
        <p>豆の情報が見つかりません（ID: {beanId}）</p>
      </div>
    );
  }

  // スリーレター取得（名前の頭文字3文字を大文字に）
  const getThreeLetterCode = (name: string): string => {
    // カタカナを削除して英語部分を抽出
    const cleaned = name.replace(/[ぁ-んァ-ヶー]/g, '').trim();
    if (cleaned.length >= 3) {
      return cleaned.substring(0, 3).toUpperCase();
    }
    // フォールバック: 名前の最初の3文字
    return name.substring(0, 3);
  };

  const threeLetterCode = getThreeLetterCode(beanInfo.name);

  // ローストレベル表示用のラベル
  const getRoastLabel = (level: number): string => {
    if (level === 1) return "STARBUCKS® BLONDE ROAST";
    if (level === 2) return "STARBUCKS® BLONDE ROAST";
    if (level === 3) return "STARBUCKS® MEDIUM ROAST";
    if (level === 4) return "STARBUCKS® DARK ROAST";
    return "STARBUCKS® DARK ROAST";
  };

  // メーター描画関数
  const renderMeter = (value: number, label: string, minLabel: string, maxLabel: string) => (
    <div style={{ marginBottom: 20 }}>
      <div
        style={{
          fontSize: 14,
          color: "#1e3932",
          marginBottom: 8,
          fontWeight: 700,
        }}
      >
        {label}
      </div>
      <div style={{ position: "relative", paddingTop: 8 }}>
        <div
          style={{
            width: "100%",
            height: 2,
            background: "#e5e7eb",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: -4,
              left: `${((value - 1) / 4) * 100}%`,
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: "#1e3932",
              transform: "translateX(-50%)",
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 8,
            fontSize: 11,
            color: "#6b7280",
            textTransform: "uppercase",
          }}
        >
          <span>{minLabel}</span>
          <span>{maxLabel}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ padding: "20px 16px 100px", background: "#f7f7f7" }}>
      {/* 戻るボタン */}
      <div style={{ marginBottom: 20 }}>
        <button
          onClick={onBack}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: "none",
            border: "none",
            color: "#1e3932",
            fontSize: 16,
            fontWeight: 600,
            cursor: "pointer",
            padding: 0,
          }}
        >
          <span style={{ fontSize: 18 }}>←</span>
          <span>戻る</span>
        </button>
      </div>

      {/* 写真・ロゴ・スリーレターのコンテナ（画像通りのレイアウト） */}
      <div
        style={{
          background: "#d9d9d9",
          borderRadius: 16,
          padding: 24,
          marginBottom: 24,
          position: "relative",
        }}
      >
        {/* 左側：ロゴとスリーレター */}
        <div
          style={{
            position: "absolute",
            left: 24,
            top: 24,
            display: "flex",
            flexDirection: "column",
            gap: 8,
            alignItems: "center",
          }}
        >
          {/* ロゴ */}
          <div
            style={{
              width: 100,
              height: 100,
              background: "white",
              borderRadius: 12,
              border: "3px solid #c5a572",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 8,
            }}
          >
            <img
              src={beanLogoSrc(beanDetail.logoFile)}
              alt={`${beanInfo.name} ロゴ`}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
              onError={(e) => {
                console.error(`Logo image failed to load: ${beanDetail.logoFile}`);
                e.currentTarget.style.display = "none";
              }}
            />
          </div>

          {/* スリーレター */}
          <div
            style={{
              fontSize: 28,
              fontWeight: 900,
              color: "#1e3932",
              letterSpacing: "0.05em",
            }}
          >
            {threeLetterCode}
          </div>
        </div>

        {/* 右側：豆写真 */}
        <div
          style={{
            marginLeft: 120,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: 300,
          }}
        >
          <img
            src={beanPhotoSrc(beanDetail.photoFile)}
            alt={beanInfo.name}
            style={{
              width: "100%",
              maxWidth: 250,
              height: "auto",
              objectFit: "contain",
            }}
            onError={(e) => {
              console.error(`Photo image failed to load: ${beanDetail.photoFile}`);
              e.currentTarget.style.display = "none";
            }}
          />
        </div>
      </div>

      {/* 豆名 */}
      <h1
        style={{
          fontSize: 24,
          fontWeight: 800,
          color: "#1e3932",
          marginBottom: 4,
          borderBottom: "2px solid #1e3932",
          paddingBottom: 8,
        }}
      >
        {beanInfo.name}
      </h1>

      {/* 説明文 */}
      <p
        style={{
          fontSize: 13,
          color: "#1e3932",
          lineHeight: 1.7,
          marginBottom: 32,
          marginTop: 16,
        }}
      >
        {beanDetail.description}
      </p>

      {/* ローストレベル */}
      <div style={{ marginBottom: 24 }}>
        <div
          style={{
            fontSize: 14,
            color: "#1e3932",
            marginBottom: 8,
            fontWeight: 700,
          }}
        >
          ローストレベル
        </div>
        <div
          style={{
            fontSize: 12,
            color: "#00754a",
            marginBottom: 12,
            fontWeight: 600,
          }}
        >
          {getRoastLabel(beanDetail.roast)}
        </div>
        {renderMeter(beanDetail.roast, "ローストについて", "LIGHT", "DARK")}
      </div>

      {/* 酸味 */}
      {renderMeter(beanDetail.acidity, "酸味", "LOW", "HIGH")}

      {/* コク */}
      {renderMeter(beanDetail.body, "コク", "LIGHT", "FULL")}

      {/* キーワード */}
      <div
        style={{
          background: "white",
          borderRadius: 16,
          padding: 24,
          marginBottom: 32,
          marginTop: 32,
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: 14,
            color: "#1e3932",
            marginBottom: 16,
            fontWeight: 700,
          }}
        >
          キーワード
        </div>
        <div
          style={{
            fontSize: 16,
            color: "#1e3932",
            fontWeight: 700,
            lineHeight: 1.6,
            border: "2px solid #1e3932",
            borderRadius: 12,
            padding: "16px 20px",
            display: "inline-block",
            minWidth: "80%",
          }}
        >
          「{beanDetail.keyword}」
        </div>
      </div>

      {/* おすすめの飲み方 */}
      <h2
        style={{
          fontSize: 18,
          fontWeight: 800,
          color: "#1e3932",
          marginBottom: 16,
          textAlign: "center",
        }}
      >
        おすすめの飲み方
      </h2>

      {/* 抽出方法 */}
      <div
        style={{
          background: "#a8d5ba",
          borderRadius: 16,
          padding: 20,
          marginBottom: 12,
        }}
      >
        <h3
          style={{
            fontSize: 15,
            fontWeight: 700,
            color: "#1e3932",
            marginBottom: 12,
            textAlign: "center",
          }}
        >
          抽出方法
        </h3>
        <div style={{ fontSize: 16, fontWeight: 700, color: "#1e3932", marginBottom: 12 }}>
          ◎{beanDetail.recommended.brewMethodTitle}
        </div>
        <div style={{ color: "#1e3932" }}>
          {beanDetail.recommended.brewMethodLines.map((line, i) => (
            <div key={i} style={{ fontSize: 14, lineHeight: 1.8, marginBottom: 4 }}>
              ・{line}
            </div>
          ))}
        </div>
      </div>

      {/* 淹れ方のコツ */}
      <div
        style={{
          background: "#a8d5ba",
          borderRadius: 16,
          padding: 20,
          marginBottom: 12,
        }}
      >
        <h3
          style={{
            fontSize: 15,
            fontWeight: 700,
            color: "#1e3932",
            marginBottom: 12,
            textAlign: "center",
          }}
        >
          淹れ方のコツ
        </h3>
        {beanDetail.recommended.tipsText.map((tip, i) => (
          <p
            key={i}
            style={{
              fontSize: 13,
              color: "#1e3932",
              lineHeight: 1.7,
              marginBottom: i < beanDetail.recommended.tipsText.length - 1 ? 12 : 0,
            }}
          >
            {tip}
          </p>
        ))}
      </div>

      {/* 時間帯・場面 */}
      <div
        style={{
          background: "#a8d5ba",
          borderRadius: 16,
          padding: 20,
          marginBottom: 12,
        }}
      >
        <h3
          style={{
            fontSize: 15,
            fontWeight: 700,
            color: "#1e3932",
            marginBottom: 12,
            textAlign: "center",
          }}
        >
          おすすめの時間帯・場面
        </h3>
        <div>
          {beanDetail.recommended.bestTimes.map((time, i) => (
            <div
              key={i}
              style={{
                fontSize: 14,
                color: "#1e3932",
                lineHeight: 1.8,
                marginBottom: 4,
              }}
            >
              ◎{time}
            </div>
          ))}
        </div>
      </div>

      {/* フードペアリング */}
      <div
        style={{
          background: "#a8d5ba",
          borderRadius: 16,
          padding: 20,
          marginBottom: 24,
        }}
      >
        <h3
          style={{
            fontSize: 15,
            fontWeight: 700,
            color: "#1e3932",
            marginBottom: 12,
            textAlign: "center",
          }}
        >
          フードペアリング
        </h3>
        <div>
          {beanDetail.recommended.foodPairing.map((food, i) => (
            <div
              key={i}
              style={{
                fontSize: 14,
                color: "#1e3932",
                lineHeight: 1.8,
                marginBottom: 4,
              }}
            >
              ◎{food}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
