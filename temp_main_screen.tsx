  // -------------------------
  // 画面：main（診断トップ）
  // -------------------------
  
  // ✅ timestampを日付形式に変換する関数
  function formatDate(isoString?: string): string {
    if (!isoString) return "";
    try {
      const date = new Date(isoString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}/${month}/${day}`;
    } catch {
      return "";
    }
  }

  return (
    <div style={{ padding: "20px 16px 100px" }}>
      <header className="page-header">
        <h1 className="page-title">コーヒー診断</h1>
        <p className="page-subtitle">あなたにぴったりの一杯を見つけよう</p>
      </header>

      {/* ✅ 前回の診断結果カード（タップで詳細へ遷移） */}
      {storedDiagnosis?.typeName && (
        <div
          onClick={() => {
            didApplyStartViewRef.current = true;
            setCurrentView("detailStored");
          }}
          style={{
            background: "white",
            borderRadius: 20,
            padding: 20,
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
            marginBottom: 16,
            cursor: "pointer",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.12)";
            e.currentTarget.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.08)";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          <div style={{ fontSize: 14, color: "#6b7280", marginBottom: 8 }}>
            前回の診断結果
          </div>

          <div
            style={{
              fontSize: 18,
              fontWeight: 800,
              color: "#1e3932",
              marginBottom: 8,
            }}
          >
            {storedDiagnosis.typeName}
          </div>

          {storedDiagnosis.typeCatch && (
            <div
              style={{
                fontSize: 13,
                color: "#6b7280",
                marginBottom: 12,
                lineHeight: 1.5,
              }}
            >
              {storedDiagnosis.typeCatch}
            </div>
          )}

          <div style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.6 }}>
            {storedDiagnosis.firstBeanName && (
              <div>🥇 {storedDiagnosis.firstBeanName}</div>
            )}
            {storedDiagnosis.secondBeanName && (
              <div>🥈 {storedDiagnosis.secondBeanName}</div>
            )}
          </div>

          {storedDiagnosis.timestamp && (
            <div
              style={{
                fontSize: 12,
                color: "#9ca3af",
                marginTop: 12,
              }}
            >
              診断日: {formatDate(storedDiagnosis.timestamp)}
            </div>
          )}

          <div
            style={{
              fontSize: 13,
              color: "#00754a",
              marginTop: 12,
              fontWeight: 600,
            }}
          >
            タップして詳細を見る →
          </div>
        </div>
      )}

      <button onClick={startDiagnosis} className="diagnosis-start-button">
        おすすめコーヒー診断開始
      </button>
    </div>
  );
}
