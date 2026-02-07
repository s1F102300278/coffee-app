import { Link } from "react-router-dom";
import { COFFEE_BEANS } from "../data/beans";
import { beanLogoSrc } from "../utils/assets";

export function BeansPage() {
  return (
    <div style={{ padding: 24, maxWidth: 980, margin: "0 auto" }}>
      <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 16 }}>豆一覧</h2>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 14 }}>
        {COFFEE_BEANS.map((b) => (
          <Link
            key={b.id}
            to={`/beans/${b.id}`}
            style={{
              textDecoration: "none",
              color: "inherit",
              border: "1px solid #E5E7EB",
              borderRadius: 16,
              padding: 14,
              background: "#fff",
              display: "flex",
              gap: 12,
              alignItems: "center",
            }}
          >
            <img
              src={beanLogoSrc(b.logoFile)}
              alt={`${b.name} ロゴ`}
              style={{ width: 52, height: 52, objectFit: "contain" }}
            />
            <div style={{ display: "grid", gap: 4 }}>
              <div style={{ fontWeight: 800 }}>{b.name}</div>
              <div style={{ fontSize: 12, opacity: 0.75 }}>{b.note}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
