// src/pages/DiagnosisPage.tsx
import { useMemo, useState, useEffect } from "react";
import { QuestionsPage } from "./diagnosis/QuestionsPage";

import type { RouteId } from "../data/diagnosisSpec";
import type { DiagnosisResult, UserAnswers } from "../logic/diagnosisEngine";
import { diagnose } from "../logic/diagnosisEngine";

type DiagnosisView = "main" | "questions" | "result";

const STORAGE_KEY_DIAGNOSIS = "coffee-app-diagnosis-result";

type DiagnosisPageProps = {
  onDiagnosisAddedToProfile?: () => void;
};

export function DiagnosisPage({ onDiagnosisAddedToProfile }: DiagnosisPageProps) {
  const [currentView, setCurrentView] = useState<DiagnosisView>("main");
  const [hasCompletedDiagnosis, setHasCompletedDiagnosis] = useState(false);
  const [isAddedToProfile, setIsAddedToProfile] = useState(false);

  // ✅ 新エンジン用の回答形式（質問ID -> 選択肢 index 0-3）
  const [answers, setAnswers] = useState<UserAnswers>({});

  // ✅ いまは暫定で routeA 固定（後でQ0を追加して分岐させる）
  const route: RouteId = "routeA";

  // ✅ 新エンジンの結果を一発で作る
  const diagnosisResult: DiagnosisResult | null = useMemo(() => {
    try {
      // まだ回答が少ない段階では結果を出さない（任意）
      // 例：20問すべて回答後にだけ表示したいなら条件を変えてOK
      return diagnose(answers, route);
    } catch {
      return null;
    }
  }, [answers, route]);

  const typeInfo = diagnosisResult?.typeSpec;
  const top1 = diagnosisResult?.top1Bean;
  const top2 = diagnosisResult?.top2Bean;

  // 診断結果をlocalStorageに保存
  useEffect(() => {
    if (hasCompletedDiagnosis && currentView === "result" && diagnosisResult) {
      try {
        const stored = {
          typeId: diagnosisResult.decidedType,
          typeName: typeInfo?.displayName ?? "",
          typeCatch: typeInfo?.descriptionShort ?? "",
          typeReason: typeInfo?.descriptionLong ?? "",
          firstBeanName: top1?.name ?? "",
          secondBeanName: top2?.name ?? "",
          timestamp: new Date().toISOString(),
          addedToProfile: false,
        };
        localStorage.setItem(STORAGE_KEY_DIAGNOSIS, JSON.stringify(stored));
      } catch (err) {
        console.error("Failed to save diagnosis result:", err);
      }
    }
  }, [hasCompletedDiagnosis, currentView, diagnosisResult, typeInfo, top1, top2]);

  // ✅ QuestionsPage からは（qid, choiceIndex）で受け取りたい
  function setAnswer(questionId: string, choiceIndex: number) {
    setAnswers((prev) => ({ ...prev, [questionId]: choiceIndex }));
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
  route={route}
  answers={answers}
  onAnswerChange={setAnswer}
  onViewResult={viewResult}
  onBack={backToMain}
/>

    );
  }

  // 結果画面表示中
  if (currentView === "result" && diagnosisResult && typeInfo && top1 && top2) {
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
              {typeInfo.displayName}
            </h2>
            <p
              style={{
                fontSize: 16,
                color: "#1e3932",
                fontWeight: 600,
                marginBottom: 16,
              }}
            >
              {typeInfo.descriptionShort}
            </p>
            <p style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.6 }}>
              {typeInfo.descriptionLong}
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
                <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 4 }}>
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
                  {top1.name}
                </div>
              </div>

              <div
                style={{
                  background: "#f9fafb",
                  borderRadius: 16,
                  padding: 16,
                }}
              >
                <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 4 }}>
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
                  {top2.name}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 24, display: "grid", gap: 12 }}>
          <button
            onClick={handleAddToProfile}
            disabled={isAddedToProfile}
            className={isAddedToProfile ? "profile-add-button added" : "profile-add-button"}
          >
            {isAddedToProfile ? "✓ プロフィールに追加済み" : "プロフィールに追加"}
          </button>

          <button onClick={backToMain} className="diagnosis-close-button">
            診断を終了
          </button>
        </div>
      </div>
    );
  }

  // メイン画面（診断トップ）
  console.log("DiagnosisPage render", currentView);

  return (
    <div style={{ padding: "20px 16px 100px" }}>
      <header className="page-header">
        <h1 className="page-title">コーヒー診断</h1>
        <p className="page-subtitle">あなたにぴったりの一杯を見つけよう</p>
      </header>

      <button onClick={startDiagnosis} className="diagnosis-start-button">
        おすすめコーヒー診断開始
      </button>
    </div>
  );
}
