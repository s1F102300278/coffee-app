// src/pages/DiagnosisPage.tsx
import { useMemo, useState, useEffect } from "react";
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

type ChoiceId = "A" | "B" | "C";
type DiagnosisView = "main" | "questions" | "result";

const STORAGE_KEY_DIAGNOSIS = "coffee-app-diagnosis-result";

type DiagnosisPageProps = {
  onDiagnosisAddedToProfile?: () => void;
};

export function DiagnosisPage({
  onDiagnosisAddedToProfile,
}: DiagnosisPageProps) {
  const [currentView, setCurrentView] = useState<DiagnosisView>("main");
  const [answers, setAnswers] = useState<Answers>(() => createEmptyAnswers());
  const [hasCompletedDiagnosis, setHasCompletedDiagnosis] = useState(false);
  const [isAddedToProfile, setIsAddedToProfile] = useState(false);

  const scores = useMemo(() => computeScores(answers), [answers]);
  const typeId = useMemo(
    () => classifyType(answers, scores),
    [answers, scores]
  );

  const typeInfo = useMemo(() => {
    return COFFEE_TYPES.find((t) => t.id === typeId) ?? COFFEE_TYPES[0];
  }, [typeId]);

  const top2 = useMemo(() => recommendTop2(scores, COFFEE_BEANS), [scores]);

  // 診断結果をlocalStorageに保存
  useEffect(() => {
    if (hasCompletedDiagnosis && currentView === "result") {
      try {
        const diagnosisResult = {
          typeId,
          typeName: typeInfo.name,
          typeCatch: typeInfo.catch,
          typeReason: typeInfo.reason,
          firstBeanName: top2?.first.name || "",
          secondBeanName: top2?.second.name || "",
          timestamp: new Date().toISOString(),
          addedToProfile: false,
        };
        localStorage.setItem(
          STORAGE_KEY_DIAGNOSIS,
          JSON.stringify(diagnosisResult)
        );
      } catch (err) {
        console.error("Failed to save diagnosis result:", err);
      }
    }
  }, [hasCompletedDiagnosis, currentView, typeId, typeInfo, top2]);

  function setAnswer(qid: keyof Answers, choice: ChoiceId) {
    setAnswers((prev) => ({ ...prev, [qid]: choice }));
  }

  function startDiagnosis() {
    setCurrentView("questions");
  }

  function viewResult() {
    setHasCompletedDiagnosis(true);
    setCurrentView("result");
  }

  function backToMain() {
    setCurrentView("main");
    setIsAddedToProfile(false);
  }

  function handleAddToProfile() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_DIAGNOSIS);
      if (stored) {
        const result = JSON.parse(stored);
        result.addedToProfile = true;
        localStorage.setItem(STORAGE_KEY_DIAGNOSIS, JSON.stringify(result));

        setIsAddedToProfile(true);
        onDiagnosisAddedToProfile?.();
      }
    } catch (err) {
      console.error("Failed to add diagnosis to profile:", err);
    }
  }

  // 質問ページ表示中
  if (currentView === "questions") {
    return (
      <QuestionsPage
        answers={answers}
        onAnswerChange={setAnswer}
        onViewResult={viewResult}
        onBack={backToMain}
      />
    );
  }

  // 結果画面表示中
  if (currentView === "result" && top2) {
    return (
      <div style={{ padding: "20px 16px 100px" }}>
        <header className="page-header">
          <h1 className="page-title">診断結果</h1>
          <p className="page-subtitle">あなたにぴったりのコーヒー</p>
        </header>

        <div className="detail-card">
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 14, color: "#6b7280", marginBottom: 8 }}>
              あなたのタイプ
            </div>
            <h2
              style={{
                fontSize: 26,
                fontWeight: 700,
                color: "#1e3932",
                marginBottom: 12,
              }}
            >
              {typeInfo.name}
            </h2>
            <p
              style={{
                fontSize: 16,
                color: "#1e3932",
                fontWeight: 600,
                marginBottom: 16,
              }}
            >
              {typeInfo.catch}
            </p>
            <p style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.6 }}>
              {typeInfo.reason}
            </p>
          </div>

          <div style={{ borderTop: "1px solid #e5e7eb", paddingTop: 24 }}>
            <h3
              style={{
                fontSize: 20,
                fontWeight: 700,
                color: "#1e3932",
                marginBottom: 16,
              }}
            >
              おすすめの豆
            </h3>

            <div style={{ display: "grid", gap: 16 }}>
              <div
                style={{
                  background: "#f9fafb",
                  borderRadius: 16,
                  padding: 16,
                }}
              >
                <div
                  style={{ fontSize: 12, color: "#6b7280", marginBottom: 4 }}
                >
                  1位
                </div>
                <div
                  style={{
                    fontSize: 18,
                    fontWeight: 700,
                    color: "#1e3932",
                    marginBottom: 8,
                  }}
                >
                  {top2.first.name}
                </div>
                <p style={{ fontSize: 14, color: "#6b7280" }}>
                  {top2.first.note}
                </p>
              </div>

              <div
                style={{
                  background: "#f9fafb",
                  borderRadius: 16,
                  padding: 16,
                }}
              >
                <div
                  style={{ fontSize: 12, color: "#6b7280", marginBottom: 4 }}
                >
                  2位
                </div>
                <div
                  style={{
                    fontSize: 18,
                    fontWeight: 700,
                    color: "#1e3932",
                    marginBottom: 8,
                  }}
                >
                  {top2.second.name}
                </div>
                <p style={{ fontSize: 14, color: "#6b7280" }}>
                  {top2.second.note}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* アクションボタン */}
        <div style={{ marginTop: 24, display: "grid", gap: 12 }}>
          {/* プロフィールに追加ボタン */}
          <button
            onClick={handleAddToProfile}
            disabled={isAddedToProfile}
            className={
              isAddedToProfile ? "profile-add-button added" : "profile-add-button"
            }
          >
            {isAddedToProfile ? "✓ プロフィールに追加済み" : "プロフィールに追加"}
          </button>

          {/* 診断終了ボタン */}
          <button onClick={backToMain} className="diagnosis-close-button">
            診断を終了
          </button>
        </div>
      </div>
    );
  }

  // メイン画面（診断トップ）
  return (
    <div style={{ padding: "20px 16px 100px" }}>
      <header className="page-header">
        <h1 className="page-title">コーヒー診断</h1>
        <p className="page-subtitle">あなたにぴったりの一杯を見つけよう</p>
      </header>

      {/* 診断開始ボタン */}
      <button onClick={startDiagnosis} className="diagnosis-start-button">
        おすすめコーヒー診断開始
      </button>

      {/* 診断結果カード（診断済みの場合のみ表示） */}
      {hasCompletedDiagnosis && (
        <div style={{ marginTop: 24 }}>
          <h2 className="section-title">前回の診断結果</h2>
          <div
            style={{
              background: "white",
              borderRadius: 20,
              padding: 20,
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
            }}
          >
            <div style={{ fontSize: 14, color: "#6b7280", marginBottom: 4 }}>
              あなたのタイプ
            </div>
            <div
              style={{
                fontSize: 20,
                fontWeight: 700,
                color: "#1e3932",
                marginBottom: 8,
              }}
            >
              {typeInfo.name}
            </div>
            <p style={{ fontSize: 14, color: "#6b7280" }}>
              {typeInfo.catch}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
