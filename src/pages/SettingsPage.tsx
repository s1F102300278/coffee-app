// src/pages/SettingsPage.tsx

export function SettingsPage() {
  return (
    <div style={{ padding: "20px 16px 100px" }}>
      <header className="page-header">
        <h1 className="page-title">設定</h1>
        <p className="page-subtitle">アプリの情報と設定</p>
      </header>

      {/* アプリ情報カード */}
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
              marginBottom: 12,
            }}
          >
            アプリ情報
          </h2>
          <div style={{ display: "grid", gap: 12 }}>
            <div>
              <div style={{ fontSize: 13, color: "#6b7280", marginBottom: 4 }}>
                アプリ名
              </div>
              <div style={{ fontSize: 15, fontWeight: 600, color: "#1e3932" }}>
                coffee-app
              </div>
            </div>
            <div>
              <div style={{ fontSize: 13, color: "#6b7280", marginBottom: 4 }}>
                説明
              </div>
              <div
                style={{
                  fontSize: 14,
                  color: "#4b5563",
                  lineHeight: 1.6,
                }}
              >
                コーヒーの好みや体験を記録するアプリ。診断機能で自分に合った豆を見つけ、豆コレクションで楽しんだ記録を残せます。
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 表示・体験カード */}
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
              marginBottom: 12,
            }}
          >
            表示・体験
          </h2>
          <div
            style={{
              padding: 16,
              background: "#f9fafb",
              borderRadius: 12,
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 24, marginBottom: 8, opacity: 0.3 }}>
              ⚙️
            </div>
            <p style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.6 }}>
              設定項目が今後追加されます
              <br />
              テーマ設定やフォントサイズなどを予定しています
            </p>
          </div>
        </div>
      </section>

      {/* データ管理カード */}
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
              marginBottom: 12,
            }}
          >
            データ管理
          </h2>
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 12,
              padding: 16,
              background: "#ecfdf5",
              borderRadius: 12,
              border: "1px solid #a7f3d0",
            }}
          >
            <div style={{ fontSize: 20 }}>💾</div>
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: "#065f46",
                  marginBottom: 4,
                }}
              >
                ローカルストレージ
              </div>
              <div style={{ fontSize: 13, color: "#047857", lineHeight: 1.6 }}>
                データはこの端末にのみ保存されています。ログインは不要です。診断結果や豆コレクションのポイントは、このブラウザ内で保持されます。
              </div>
            </div>
          </div>
          <div
            style={{
              marginTop: 12,
              padding: 16,
              background: "#f9fafb",
              borderRadius: 12,
            }}
          >
            <div
              style={{
                fontSize: 13,
                color: "#6b7280",
                lineHeight: 1.6,
                textAlign: "center",
              }}
            >
              将来的にデータのエクスポート・インポート機能を追加予定です
            </div>
          </div>
        </div>
      </section>

      {/* バージョン情報 */}
      <div
        style={{
          marginTop: 32,
          padding: 20,
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: 13, color: "#9ca3af", marginBottom: 4 }}>
          Version
        </div>
        <div style={{ fontSize: 15, fontWeight: 600, color: "#6b7280" }}>
          v0.1.0
        </div>
        <div
          style={{
            marginTop: 12,
            fontSize: 12,
            color: "#9ca3af",
            lineHeight: 1.6,
          }}
        >
          © 2025 coffee-app
          <br />
          スターバックス風のデザインを参考にした学習用アプリです
        </div>
      </div>
    </div>
  );
}
