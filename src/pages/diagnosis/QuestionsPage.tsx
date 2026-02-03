// src/pages/diagnosis/QuestionsPage.tsx
import { useMemo } from "react";
import { QUESTIONS } from "../../data/questions";
import { FiveStepMeter } from "../../components/FiveStepMeter";
import type { Answers } from "../../logic/scoring";
import { computeScores } from "../../logic/scoring";

type ChoiceId = "A" | "B" | "C";

type QuestionsPageProps = {
  answers: Answers;
  onAnswerChange: (qid: keyof Answers, choice: ChoiceId) => void;
  onBack: () => void;
};

function labelForAxis(axis: "roast" | "acidity" | "body") {
  if (axis === "roast") return { left: "LIGHT", right: "DARK", name: "ロースト" };
  if (axis === "acidity") return { left: "LOW", right: "HIGH", name: "酸味" };
  return { left: "LIGHT", right: "FULL", name: "コク" };
}

export function QuestionsPage({ answers, onAnswerChange, onBack }: QuestionsPageProps) {
  const progressText = useMemo(() => {
    const answered = Object.values(answers).filter((v) => v != null).length;
    return `${answered}/${QUESTIONS.length}`;
  }, [answers]);

  const allAnswered = useMemo(() => {
    return Object.values(answers).every((v) => v != null);
  }, [answers]);

  const scores = useMemo(() => computeScores(answers), [answers]);

  return (
    <div style={{ padding: "20px 16px 100px" }}>
      <div style={{ marginBottom: 20 }}>
        <button onClick={onBack} className="back-button">
          <span style={{ fontSize: 18 }}>←</span>
          <span>戻る</span>
        </button>
      </div>

      <header style={{ marginBottom: 24 }}>
        <h1 className="page-title">コーヒー診断</h1>
        <p className="page-subtitle">
          6つの質問に答えてください（進捗: {progressText}）
        </p>
      </header>

      {/* 全質問を一覧表示 */}
      <div style={{ display: "grid", gap: 16 }}>
        {QUESTIONS.map((q, qi) => (
          <div key={q.id} className="question-card">
            <div style={{ fontSize: 13, color: "#6b7280", marginBottom: 8 }}>
              質問 {qi + 1}/{QUESTIONS.length}
            </div>
            <div style={{ fontSize: 18, fontWeight: 700, color: "#1e3932", marginBottom: 16 }}>
              {q.prompt}
            </div>

            <div style={{ display: "grid", gap: 10 }}>
              {q.choices.map((c) => {
                const selected = answers[q.id] === c.id;
                return (
                  <button
                    key={c.id}
                    onClick={() => onAnswerChange(q.id, c.id)}
                    className={selected ? "choice-button selected" : "choice-button"}
                  >
                    <span style={{ fontWeight: 700, marginRight: 8 }}>{c.id}</span>
                    <span>{c.text}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* すべて回答済みなら「結果を見る」ボタン */}
      {allAnswered && (
        <div style={{ marginTop: 32, position: "sticky", bottom: 90 }}>
          <button
            onClick={onBack}
            style={{
              width: "100%",
              padding: "16px",
              borderRadius: 50,
              border: "none",
              background: "#00754a",
              color: "white",
              fontSize: 16,
              fontWeight: 700,
              cursor: "pointer",
              boxShadow: "0 4px 12px rgba(0, 117, 74, 0.3)",
            }}
          >
            結果を見る
          </button>
        </div>
      )}

      {/* 味わいの傾向表示（回答済みなら） */}
      {allAnswered && (
        <div style={{ marginTop: 32 }}>
          <div
            style={{
              background: "white",
              borderRadius: 20,
              padding: 24,
              boxShadow: "0 2px 12px rgba(0, 0, 0, 0.08)",
            }}
          >
            <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: "#1e3932" }}>
              あなたの味わいの傾向
            </h3>
            {(["roast", "acidity", "body"] as const).map((axis) => {
              const meta = labelForAxis(axis);
              return (
                <FiveStepMeter
                  key={axis}
                  label={meta.name}
                  left={meta.left}
                  right={meta.right}
                  value={scores[axis]}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
