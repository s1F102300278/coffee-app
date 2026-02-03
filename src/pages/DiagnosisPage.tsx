// src/pages/DiagnosisPage.tsx
// 既存の診断機能は後でここに移植する（今回は仮表示）

export function DiagnosisPage() {
  return (
    <div style={{ padding: "16px 16px 80px" }}>
      <h1 style={{ fontSize: 24, marginBottom: 16 }}>おすすめコーヒー診断</h1>
      <div
        style={{
          border: "1px solid rgba(255,255,255,0.15)",
          borderRadius: 16,
          padding: 20,
          background: "rgba(255,255,255,0.03)",
        }}
      >
        <p style={{ fontSize: 14, opacity: 0.8 }}>
          ※ 既存の診断機能をここに移植予定
        </p>
        <p style={{ fontSize: 14, opacity: 0.8, marginTop: 8 }}>
          （App.tsx の診断コードは削除せず温存しています）
        </p>
      </div>
    </div>
  );
}
