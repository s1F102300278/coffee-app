import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { COFFEE_BEANS } from "../data/beans";
import { beanLogoSrc, beanPhotoSrc } from "../utils/assets";

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function labelRoast(roast: number) {
  const r = clamp(roast, 1, 5);
  if (r <= 2) return "LIGHT";
  if (r === 3) return "MEDIUM";
  return "DARK";
}

function Meter({ label, value }: { label: string; value: number }) {
  const v = clamp(value, 1, 5);
  return (
    <div style={{ display: "grid", gap: 6 }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, opacity: 0.85 }}>
        <span>{label}</span>
        <span>{v}/5</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 6 }}>
        {Array.from({ length: 5 }).map((_, i) => {
          const on = i < v;
          return (
            <div
              key={i}
              style={{
                height: 10,
                borderRadius: 999,
                background: on ? "#111827" : "#E5E7EB",
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

export function BeanDetailPage() {
  const { id } = useParams<{ id: string }>();

  const bean = useMemo(() => {
    return COFFEE_BEANS.find((b) => b.id === id);
  }, [id]);

  if (!bean) {
    return (
      <div style={{ padding: 24, maxWidth: 900, margin: "0 auto" }}>
        <h2 style={{ fontSize: 20, marginBottom: 8 }}>豆が見つかりませんでした</h2>
        <p style={{ opacity: 0.8, marginBottom: 16 }}>
          URLのIDが間違っているか、データに存在しない可能性があります。
        </p>
        <Link to="/beans" style={{ color: "#2563EB" }}>
          豆一覧に戻る
        </Link>
      </div>
    );
  }

  return (
    <div style={{ padding: 24, maxWidth: 980, margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
        <Link to="/beans" style={{ color: "#2563EB" }}>
          ← 豆一覧へ
        </Link>

        <div style={{ fontSize: 12, opacity: 0.7 }}>
          Roast: <b>{labelRoast(bean.roast)}</b>
        </div>
      </div>

      <div
        style={{
          marginTop: 16,
          display: "grid",
          gridTemplateColumns: "1.2fr 0.8fr",
          gap: 20,
          alignItems: "start",
        }}
      >
        {/* 左：写真 */}
        <div
          style={{
            border: "1px solid #E5E7EB",
            borderRadius: 16,
            overflow: "hidden",
            background: "#fff",
          }}
        >
          <img
            src={beanPhotoSrc(bean.photoFile)}
            alt={`${bean.name} 写真`}
            style={{ width: "100%", display: "block" }}
          />
        </div>

        {/* 右：情報カード */}
        <div
          style={{
            border: "1px solid #E5E7EB",
            borderRadius: 16,
            padding: 16,
            background: "#fff",
          }}
        >
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <img
              src={beanLogoSrc(bean.logoFile)}
              alt={`${bean.name} ロゴ`}
              style={{ width: 56, height: 56, objectFit: "contain" }}
            />
            <div>
              <div style={{ fontSize: 20, fontWeight: 800 }}>{bean.name}</div>
              <div style={{ fontSize: 12, opacity: 0.7 }}>ID: {bean.id}</div>
            </div>
          </div>

          <div style={{ marginTop: 14, display: "grid", gap: 12 }}>
            <Meter label="ロースト" value={bean.roast} />
            <Meter label="酸味" value={bean.acidity} />
            <Meter label="コク" value={bean.body} />
          </div>

          <div style={{ marginTop: 14, padding: 12, borderRadius: 12, background: "#F9FAFB" }}>
            <div style={{ fontSize: 12, opacity: 0.7, marginBottom: 6 }}>ひとこと</div>
            <div style={{ lineHeight: 1.7 }}>{bean.note}</div>
          </div>

          {/* ここは後で、あなたが作ってる「おすすめの飲み方」(抽出/ペアリング等)を足せる領域 */}
          <div style={{ marginTop: 12, fontSize: 12, opacity: 0.7 }}>
            ※おすすめ抽出・フードペアリングもここに追加できます。
          </div>
        </div>
      </div>
    </div>
  );
}
