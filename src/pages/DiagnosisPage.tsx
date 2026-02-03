// src/pages/DiagnosisPage.tsx
import { useMemo, useState } from "react";
import { COFFEE_TYPES } from "../data/types";
import { COFFEE_BEANS } from "../data/beans";
import {
  computeScores,
  createEmptyAnswers,
  type Answers,
} from "../logic/scoring";
import { classifyType } from "../logic/classify";
import { recommendTop2 } from "../logic/recommend";
import { QuestionsPage } from "./diagnosis/QuestionsPage";
import { ResultDetailPage } from "./diagnosis/ResultDetailPage";

type ChoiceId = "A" | "B" | "C";
type DiagnosisView = "main" | "questions" | "result-detail";

export function DiagnosisPage() {
  const [currentView, setCurrentView] = useState<DiagnosisView>("main");
  const [answers, setAnswers] = useState<Answers>(() => createEmptyAnswers());
  const [hasCompletedDiagnosis, setHasCompletedDiagnosis] = useState(false);

  const scores = useMemo(() => computeScores(answers), [answers]);
  const typeId = useMemo(() => classifyType(answers, scores), [answers, scores]);

  const typeInfo = useMemo(() => {
    return COFFEE_TYPES.find((t) => t.id === typeId) ?? COFFEE_TYPES[0];
  }, [typeId]);

  const top2 = useMemo(() => recommendTop2(scores, COFFEE_BEANS), [scores]);

  function setAnswer(qid: keyof Answers, choice: ChoiceId) {
    setAnswers((prev) => ({ ...prev, [qid]: choice }));
  }

  function startDiagnosis() {
    setCurrentView("questions");
  }

  function viewResultDetail() {
    if (!hasCompletedDiagnosis) return;
    setCurrentView("result-detail");
  }

  function backToMain() {
    // 質問ページから戻る場合、すべて回答済みなら診断完了とする
    const allAnswered = Object.values(answers).every((v) => v != null);
    if (allAnswered) {
      setHasCompletedDiagnosis(true);
    }
    setCurrentView("main");
  }

  // 質問ページ表示中
  if (currentView === "questions") {
    return (
      <QuestionsPage
        answers={answers}
        onAnswerChange={setAnswer}
        onBack={backToMain}
      />
    );
  }

  // 結果詳細ページ表示中
  if (currentView === "result-detail" && top2 && hasCompletedDiagnosis) {
    return (
      <ResultDetailPage
        typeInfo={typeInfo}
        firstBean={top2.first}
        secondBean={top2.second}
        onBack={backToMain}
      />
    );
  }

  // メイン画面（診断結果表示）
  return (
    <div style={{ padding: "20px 16px 100px" }}>
      <header className="page-header">
        <h1 className="page-title">コーヒー診断</h1>
        <p className="page-subtitle">あなたにぴったりの一杯を見つけよう</p>
      </header>

      {/* 診断開始ボタン */}
      <button
        onClick={startDiagnosis}
        className="diagnosis-start-button"
      >
        おすすめコーヒー診断開始
      </button>

      {/* 診断結果カード */}
      <div style={{ marginTop: 24 }}>
        <h2 className="section-title">診断結果</h2>

        {/* 診断未実施の場合 */}
        {!hasCompletedDiagnosis && (
          <div
            style={{
              background: "#f3f4f6",
              borderRadius: 20,
              padding:  "32px 24px",
              textAlign: "center",
              border: "2px dashed #d1d5db",
            }}
          >
            <div
              style={{
                fontSize: 48,
                marginBottom: 12,
                opacity: 0.3,
              }}
            >
              ☕
            </div>
            <div
              style={{
                fontSize: 18,
                fontWeight: 700,
                color: "#9ca3af",
                marginBottom: 8,
              }}
            >
              診断未実施
            </div>
            <p
              style={{
                fontSize: 14,
                color: "#9ca3af",
                lineHeight: 1.6,
              }}
            >
              上の診断開始ボタンを押して
              <br />
              あなたにぴったりのコーヒーを見つけましょう
            </p>
          </div>
        )}

        {/* 診断実施済みの場合 */}
        {hasCompletedDiagnosis && (
          <div
            onClick={viewResultDetail}
            className="result-card"
          >
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 14, color: "#6b7280", marginBottom: 4 }}>
                あなたのタイプ
              </div>
              <div style={{ fontSize: 22, fontWeight: 700, color: "#1e3932", marginBottom: 8 }}>
                {typeInfo.name}
              </div>
              <p style={{ fontSize: 15, color: "#1e3932", fontWeight: 600 }}>
                {typeInfo.catch}
              </p>
            </div>

            {top2 && (
              <div style={{ borderTop: "1px solid #e5e7eb", paddingTop: 16 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#1e3932", marginBottom: 12 }}>
                  おすすめの豆
                </div>
                <div style={{ display: "grid", gap: 12 }}>
                  <div
                    style={{
                      background: "#f9fafb",
                      borderRadius: 12,
                      padding: 12,
                    }}
                  >
                    <div style={{ fontSize: 11, color: "#6b7280", marginBottom: 2 }}>1位</div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: "#1e3932" }}>
                      {top2.first.name}
                    </div>
                  </div>

                  <div
                    style={{
                      background: "#f9fafb",
                      borderRadius: 12,
                      padding: 12,
                    }}
                  >
                    <div style={{ fontSize: 11, color: "#6b7280", marginBottom: 2 }}>2位</div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: "#1e3932" }}>
                      {top2.second.name}
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div style={{ marginTop: 16, fontSize: 13, color: "#00754a", textAlign: "center" }}>
              タップして詳細を見る →
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
