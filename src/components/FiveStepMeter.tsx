// src/components/FiveStepMeter.tsx

function clamp1to5(n: number): number {
  if (n < 1) return 1;
  if (n > 5) return 5;
  return n;
}

type FiveStepMeterProps = {
  label: string;
  left: string;
  right: string;
  value: number; // 1-5
};

/** 5段階メーター（簡易版：点＋現在位置） */
export function FiveStepMeter(props: FiveStepMeterProps) {
  const v = clamp1to5(props.value);

  return (
    <div style={{ marginTop: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ fontWeight: 700 }}>{props.label}</div>
        <div style={{ fontSize: 12, opacity: 0.7 }}>
          {props.left} ↔ {props.right}
        </div>
      </div>

      <div
        style={{
          position: "relative",
          marginTop: 10,
          padding: "10px 6px",
          borderRadius: 12,
          border: "1px solid rgba(255,255,255,0.15)",
          background: "rgba(255,255,255,0.03)",
        }}
      >
        {/* dots */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: 8,
            alignItems: "center",
          }}
        >
          {Array.from({ length: 5 }).map((_, i) => {
            const idx = i + 1;
            const active = idx === v;
            return (
              <div
                key={idx}
                style={{
                  height: 10,
                  borderRadius: 999,
                  border: "1px solid rgba(255,255,255,0.35)",
                  background: active ? "rgba(255,255,255,0.75)" : "transparent",
                }}
                title={`${idx}/5`}
              />
            );
          })}
        </div>

        <div
          style={{
            marginTop: 8,
            display: "flex",
            justifyContent: "space-between",
            fontSize: 12,
            opacity: 0.7,
          }}
        >
          <span>1</span>
          <span>5</span>
        </div>
      </div>
    </div>
  );
}
