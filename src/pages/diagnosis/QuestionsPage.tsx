// src/pages/diagnosis/QuestionsPage.tsx
import { useMemo } from "react";
import type { RouteId } from "../../data/diagnosisSpec";
import {
  ROUTE_A_QUESTIONS,
  ROUTE_B_QUESTIONS,
} from "../../data/diagnosisSpec";

type QuestionsPageProps = {
  route: RouteId;
  answers: Record<string, number>; // UserAnswers と同形
  onAnswerChange: (questionId: string, choiceIndex: number) => void;
  onViewResult: () => void;
  onBack: () => void;
};

const CHOICE_LABELS = ["A","B","C","D","E","F"] as const;


export function QuestionsPage({
  route,
  answers,
  onAnswerChange,
  onViewResult,
  onBack,
}: QuestionsPageProps) {
  const questions = route === "routeA" ? ROUTE_A_QUESTIONS : ROUTE_B_QUESTIONS;

  const answeredCount = useMemo(() => {
    return questions.filter((q) => answers[q.id] !== undefined).length;
  }, [questions, answers]);

  const progressText = `${answeredCount}/${questions.length}`;

  const allAnswered = useMemo(() => {
    return questions.every((q) => answers[q.id] !== undefined);
  }, [questions, answers]);

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
          質問に答えてください（進捗: {progressText}）
        </p>
      </header>

      {/* 全質問を一覧表示 */}
      <div style={{ display: "grid", gap: 16 }}>
        {questions.map((q, qi) => (
          <div key={q.id} className="question-card">
            <div style={{ fontSize: 13, color: "#6b7280", marginBottom: 8 }}>
              質問 {qi + 1}/{questions.length}
            </div>

            <div
              style={{
                fontSize: 18,
                fontWeight: 700,
                color: "#1e3932",
                marginBottom: 16,
              }}
            >
              {q.q}
            </div>

            <div style={{ display: "grid", gap: 10 }}>
              {q.options.map((opt, idx) => {
                const selected = answers[q.id] === idx;
                return (
                  <button
                    key={`${q.id}-${idx}`}
                    onClick={() => onAnswerChange(q.id, idx)}
                    className={
                      selected ? "choice-button selected" : "choice-button"
                    }
                  >
                    <span style={{ fontWeight: 700, marginRight: 8 }}>
                      {CHOICE_LABELS[idx] ?? ""}
                    </span>
                    <span>{opt.t}</span>
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
            onClick={onViewResult}
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
    </div>
  );
}
