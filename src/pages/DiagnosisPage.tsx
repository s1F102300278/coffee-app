// src/pages/DiagnosisPage.tsx
import { useMemo, useState, useEffect } from "react";
import { QuestionsPage } from "./diagnosis/QuestionsPage";

import type { RouteId } from "../data/diagnosisSpec";
import { Q0_SPEC, determineRoute } from "../data/diagnosisSpec";

import type {UserAnswers } from "../logic/diagnosisEngine";
import { diagnose } from "../logic/diagnosisEngine";

import { addProfileDiagnosis } from "../utils/storage";



type DiagnosisView =
  | "main"
  | "q0"
  | "questions"
  | "result"
  | "detail"
  | "resultStored"
  | "detailStored";


const STORAGE_KEY_DIAGNOSIS = "coffee-app-diagnosis-result";

type StoredDiagnosis = {
  typeId?: string;
  typeName?: string;
  typeCatch?: string;
  typeReason?: string;
  firstBeanName?: string;
  secondBeanName?: string;
  timestamp?: string;
  addedToProfile?: boolean;
};


type DiagnosisPageProps = {
  onDiagnosisAddedToProfile?: () => void;
};

export function DiagnosisPage({ onDiagnosisAddedToProfile }: DiagnosisPageProps) {
  const [currentView, setCurrentView] = useState<DiagnosisView>("main");
  const [hasCompletedDiagnosis, setHasCompletedDiagnosis] = useState(false);
  const [isAddedToProfile, setIsAddedToProfile] = useState(false);

  const STORAGE_KEY_PROFILE = "coffee_profile_diagnoses";
  const [storedDiagnosis, setStoredDiagnosis] = useState<StoredDiagnosis | null>(null);



  // ✅ 新エンジン用の回答形式（質問ID -> 選択肢 index 0-3）
  const [answers, setAnswers] = useState<UserAnswers>({});

  const [q0Index, setQ0Index] = useState<number | null>(null);

  // q0Index からルートを決定（Q0未回答の間は routeA 仮）
  const route: RouteId = useMemo(() => {
    return determineRoute(q0Index ?? 0);
  }, [q0Index]);

  // ✅ 新エンジンの結果を一発で作る
  const diagnosisResult = useMemo(() => {
  if (q0Index === null) return null;
  try {
    return diagnose(answers, route);
  } catch {
    return null;
  }
}, [answers, route, q0Index]);


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

  useEffect(() => {
  if (currentView !== "main") return;

  try {
    const stored = localStorage.getItem(STORAGE_KEY_DIAGNOSIS);
    if (!stored) {
      setStoredDiagnosis(null);
      return;
    }
    setStoredDiagnosis(JSON.parse(stored) as StoredDiagnosis);
  } catch (err) {
    console.error("Failed to load stored diagnosis:", err);
    setStoredDiagnosis(null);
  }
}, [currentView]);


  // ✅ QuestionsPage からは（qid, choiceIndex）で受け取りたい
  function setAnswer(questionId: string, choiceIndex: number) {
    setAnswers((prev) => ({ ...prev, [questionId]: choiceIndex }));
  }

  function startDiagnosis() {
  setCurrentView("q0");
}


  function viewResult() {
    setHasCompletedDiagnosis(true);
    setCurrentView("result");
  }

  function backToMain() {
  setCurrentView("main");
  setIsAddedToProfile(false);
  setQ0Index(null);
  setAnswers({});
}


  function submitQ0(index: number) {
  setQ0Index(index);
  setCurrentView("questions");
}


  function handleAddToProfile() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY_DIAGNOSIS);
    if (!stored) return;

    const result = JSON.parse(stored);

    // ① 既存処理：診断結果に「追加済み」フラグ
    result.addedToProfile = true;
    localStorage.setItem(STORAGE_KEY_DIAGNOSIS, JSON.stringify(result));

    // ② ★ここが追加ポイント：プロフィール用リストに保存
    const profileStored = localStorage.getItem(STORAGE_KEY_PROFILE);
    const profileList = profileStored ? JSON.parse(profileStored) : [];

    profileList.unshift({
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      diagnosis: result,
    });

    localStorage.setItem(
      STORAGE_KEY_PROFILE,
      JSON.stringify(profileList)
    );

    // ③ UI更新
    setIsAddedToProfile(true);
    //onDiagnosisAddedToProfile?.();

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

  // Q0（頻度質問）画面
if (currentView === "q0") {
  return (
    <div style={{ padding: "20px 16px 100px" }}>
      <div style={{ marginBottom: 20 }}>
        <button onClick={backToMain} className="back-button">
          <span style={{ fontSize: 18 }}>←</span>
          <span>戻る</span>
        </button>
      </div>

      <header style={{ marginBottom: 24 }}>
        <h1 className="page-title">コーヒー診断</h1>
        <p className="page-subtitle">まずは普段のことを教えてください</p>
      </header>

      <div className="question-card">
        <div
          style={{
            fontSize: 18,
            fontWeight: 700,
            color: "#1e3932",
            marginBottom: 16,
          }}
        >
          {Q0_SPEC.question}
        </div>

        <div style={{ display: "grid", gap: 10 }}>
          {Q0_SPEC.options.map((text, idx) => {
            const selected = q0Index === idx;
            return (
              <button
                key={idx}
                onClick={() => submitQ0(idx)}
                className={selected ? "choice-button selected" : "choice-button"}
              >
                <span>{text}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// 詳細画面表示中
if (currentView === "detail" && diagnosisResult && typeInfo && top1 && top2) {
  return (
    <div style={{ padding: "20px 16px 100px" }}>
      <header className="page-header">
        <h1 className="page-title">診断結果の詳細</h1>
        <p className="page-subtitle">あなたに合う理由</p>
      </header>

      <div className="detail-card">
        {/* セクション1：タイプ詳細 */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 14, color: "#6b7280", marginBottom: 8 }}>
            あなたのコーヒータイプ
          </div>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: "#1e3932", marginBottom: 12 }}>
            {typeInfo.displayName}
          </h2>
          <p style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.7 }}>
            {typeInfo.descriptionLong}
          </p>
        </div>

        {/* セクション2：1位 */}
        <div style={{ borderTop: "1px solid #e5e7eb", paddingTop: 20, marginTop: 20 }}>
          <div style={{ fontSize: 14, color: "#6b7280", marginBottom: 8 }}>
            おすすめのコーヒー豆 1位
          </div>
          <div style={{ fontSize: 18, fontWeight: 800, color: "#1e3932", marginBottom: 10 }}>
            {top1.name}
          </div>
          <p style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.7 }}>
            {typeInfo.beanReasonTop1}
          </p>
        </div>

        {/* セクション3：2位 */}
        <div style={{ borderTop: "1px solid #e5e7eb", paddingTop: 20, marginTop: 20 }}>
          <div style={{ fontSize: 14, color: "#6b7280", marginBottom: 8 }}>
            おすすめのコーヒー豆 2位
          </div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#1e3932", marginBottom: 10 }}>
            {top2.name}
          </div>
          <p style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.7 }}>
            {typeInfo.beanReasonTop2}
          </p>
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

        <button onClick={() => setCurrentView("result")} className="diagnosis-close-button">
          結果に戻る
        </button>
      </div>
    </div>
  );
}

if (currentView === "resultStored" && storedDiagnosis) {
  return (
    <div style={{ padding: "20px 16px 100px" }}>
      <header className="page-header">
        <h1 className="page-title">診断結果</h1>
        <p className="page-subtitle">あなたにぴったりのコーヒー</p>
      </header>

      <div className="detail-card">
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 14, color: "#6b7280", marginBottom: 8 }}>あなたのタイプ</div>
          <h2 style={{ fontSize: 26, fontWeight: 700, color: "#1e3932", marginBottom: 12 }}>
            {storedDiagnosis.typeName || "—"}
          </h2>
          <p style={{ fontSize: 16, color: "#1e3932", fontWeight: 600, marginBottom: 16 }}>
            {storedDiagnosis.typeCatch || ""}
          </p>
        </div>

        <div style={{ borderTop: "1px solid #e5e7eb", paddingTop: 24 }}>
          <h3 style={{ fontSize: 20, fontWeight: 700, color: "#1e3932", marginBottom: 16 }}>
            おすすめの豆
          </h3>

          <div style={{ display: "grid", gap: 16 }}>
            <div style={{ background: "#f9fafb", borderRadius: 16, padding: 16 }}>
              <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 4 }}>1位</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: "#1e3932" }}>
                {storedDiagnosis.firstBeanName || "—"}
              </div>
            </div>

            <div style={{ background: "#f9fafb", borderRadius: 16, padding: 16 }}>
              <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 4 }}>2位</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: "#1e3932" }}>
                {storedDiagnosis.secondBeanName || "—"}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 24, display: "grid", gap: 12 }}>
        <button
          onClick={() => setCurrentView("detailStored")}
          className="profile-add-button"
          style={{ background: "white", border: "1px solid #e5e7eb", color: "#1e3932" }}
        >
          詳細をみる
        </button>

        <button onClick={backToMain} className="diagnosis-close-button">
          戻る
        </button>
      </div>
    </div>
  );
}

if (currentView === "detailStored" && storedDiagnosis) {
  return (
    <div style={{ padding: "20px 16px 100px" }}>
      <header className="page-header">
        <h1 className="page-title">診断結果の詳細</h1>
        <p className="page-subtitle">あなたに合う理由</p>
      </header>

      <div className="detail-card">
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 14, color: "#6b7280", marginBottom: 8 }}>
            あなたのコーヒータイプ
          </div>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: "#1e3932", marginBottom: 12 }}>
            {storedDiagnosis.typeName || "—"}
          </h2>
          <p style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.7 }}>
            {storedDiagnosis.typeReason || ""}
          </p>
        </div>

        <div style={{ borderTop: "1px solid #e5e7eb", paddingTop: 20, marginTop: 20 }}>
          <div style={{ fontSize: 14, color: "#6b7280", marginBottom: 8 }}>
            おすすめのコーヒー豆 1位
          </div>
          <div style={{ fontSize: 18, fontWeight: 800, color: "#1e3932" }}>
            {storedDiagnosis.firstBeanName || "—"}
          </div>
        </div>

        <div style={{ borderTop: "1px solid #e5e7eb", paddingTop: 20, marginTop: 20 }}>
          <div style={{ fontSize: 14, color: "#6b7280", marginBottom: 8 }}>
            おすすめのコーヒー豆 2位
          </div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#1e3932" }}>
            {storedDiagnosis.secondBeanName || "—"}
          </div>
        </div>
      </div>

      <div style={{ marginTop: 24, display: "grid", gap: 12 }}>
        <button onClick={() => setCurrentView("resultStored")} className="diagnosis-close-button">
          結果に戻る
        </button>
        <button onClick={backToMain} className="diagnosis-close-button">
          戻る
        </button>
      </div>
    </div>
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
    onClick={() => setCurrentView("detail")}
    className="profile-add-button"
    style={{ background: "white", border: "1px solid #e5e7eb", color: "#1e3932" }}
  >
    詳細をみる
  </button>

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

    {/* ✅ 前回の診断結果カード */}
    {storedDiagnosis?.typeName && (
      <div
        style={{
          background: "white",
          borderRadius: 20,
          padding: 20,
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
          marginBottom: 16,
        }}
      >
        <div style={{ fontSize: 14, color: "#6b7280", marginBottom: 8 }}>
          前回の診断結果
        </div>

        <div style={{ fontSize: 18, fontWeight: 800, color: "#1e3932", marginBottom: 8 }}>
          {storedDiagnosis.typeName}
        </div>

        <div style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.6 }}>
          🥇 {storedDiagnosis.firstBeanName || "—"}<br />
          🥈 {storedDiagnosis.secondBeanName || "—"}
        </div>

        <div style={{ marginTop: 14, display: "grid", gap: 10 }}>
          <button
            onClick={() => setCurrentView("resultStored")}
            className="profile-add-button"
            style={{ background: "white", border: "1px solid #e5e7eb", color: "#1e3932" }}
          >
            結果を見る
          </button>
          <button
            onClick={() => setCurrentView("detailStored")}
            className="profile-add-button"
            style={{ background: "white", border: "1px solid #e5e7eb", color: "#1e3932" }}
          >
            詳細をみる
          </button>
        </div>
      </div>
    )}

    <button onClick={startDiagnosis} className="diagnosis-start-button">
      おすすめコーヒー診断開始
    </button>
  </div>
);

}
