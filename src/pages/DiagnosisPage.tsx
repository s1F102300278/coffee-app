// src/pages/DiagnosisPage.tsx
import { useMemo, useState, useEffect, useRef } from "react";
import { QuestionsPage } from "./diagnosis/QuestionsPage";

import type { RouteId } from "../data/diagnosisSpec";
import { Q0_SPEC, determineRoute } from "../data/diagnosisSpec";

import type { UserAnswers } from "../logic/diagnosisEngine";
import { diagnose } from "../logic/diagnosisEngine";

import { BeanCard } from "../components/BeanCard"; // ←パスが違うならここだけ直してください

type DiagnosisStartView = "main" | "resultStored" | "detailStored";

type DiagnosisPageProps = {
  onDiagnosisAddedToProfile?: () => void;
  startView?: DiagnosisStartView;
  onExit?: () => void; // プロフィール起点で「戻る」を押したとき Profile に戻す
};

type DiagnosisView =
  | "main"
  | "q0"
  | "questions"
  | "result"
  | "detail"
  | "resultStored"
  | "detailStored"
  | "beanDetail";

const STORAGE_KEY_DIAGNOSIS = "coffee-app-diagnosis-result";
const STORAGE_KEY_PROFILE = "coffee_profile_diagnoses";

type StoredDiagnosis = {
  typeId?: string;
  typeName?: string;
  typeCatch?: string;
  typeReason?: string;
  firstBeanName?: string;
  secondBeanName?: string;
  addedToProfile?: boolean;
  timestamp?: string;
};

export function DiagnosisPage({
  onDiagnosisAddedToProfile,
  startView,
  onExit,
}: DiagnosisPageProps) {
  const [currentView, setCurrentView] = useState<DiagnosisView>("main");

  // 新エンジン用回答形式（質問ID -> 選択肢 index）
  const [answers, setAnswers] = useState<UserAnswers>({});
  const [q0Index, setQ0Index] = useState<number | null>(null);

  const [hasCompletedDiagnosis, setHasCompletedDiagnosis] = useState(false);
  const [isAddedToProfile, setIsAddedToProfile] = useState(false);

  // 保存済み結果
  const [storedDiagnosis, setStoredDiagnosis] = useState<StoredDiagnosis | null>(
    null
  );

  // 豆詳細
  const [selectedBeanName, setSelectedBeanName] = useState<string | null>(null);
  const [beanBackView, setBeanBackView] = useState<DiagnosisView>("detail");

  // ✅ startViewの適用が「戻る」を壊す最大原因なので、必ず1回だけ適用する
  const didApplyStartViewRef = useRef(false);

  // q0Index からルート決定（Q0未回答時は暫定 routeA）
  const route: RouteId = useMemo(() => {
    return determineRoute(q0Index ?? 0);
  }, [q0Index]);

  // 診断結果（診断中のみ）
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

  // 保存済み結果を読む関数（共通化）
  function loadStoredDiagnosis() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_DIAGNOSIS);
      if (!raw) {
        setStoredDiagnosis(null);
        return;
      }
      const parsed = JSON.parse(raw) as StoredDiagnosis;
      setStoredDiagnosis(parsed);
    } catch {
      setStoredDiagnosis(null);
    }
  }

  // 初回 & 保存済みビューに入る時に読み込む（落ちないように）
  useEffect(() => {
    loadStoredDiagnosis();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (currentView === "resultStored" || currentView === "detailStored") {
      loadStoredDiagnosis();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentView]);

  // ✅ startViewは「最初の1回だけ」反映する（これが戻る不具合の根本対策）
  useEffect(() => {
    if (!startView) return;
    if (didApplyStartViewRef.current) return;

    setCurrentView(startView);
    didApplyStartViewRef.current = true;
  }, [startView]);

  // 診断結果をlocalStorageに保存（診断完了→result表示の時）
  useEffect(() => {
    if (hasCompletedDiagnosis && currentView === "result" && diagnosisResult) {
      try {
        const stored: StoredDiagnosis = {
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
        // 保存したら state も更新
        setStoredDiagnosis(stored);
      } catch (err) {
        console.error("Failed to save diagnosis result:", err);
      }
    }
  }, [hasCompletedDiagnosis, currentView, diagnosisResult, typeInfo, top1, top2]);

  // ✅ QuestionsPage から (qid, choiceIndex) で受け取る
  function setAnswer(questionId: string, choiceIndex: number) {
    setAnswers((prev) => ({ ...prev, [questionId]: choiceIndex }));
  }

  function startDiagnosis() {
    didApplyStartViewRef.current = true; // startView上書き停止
    setHasCompletedDiagnosis(false);
    setIsAddedToProfile(false);
    setAnswers({});
    setQ0Index(null);
    setCurrentView("q0");
  }

  function submitQ0(index: number) {
    didApplyStartViewRef.current = true;
    setQ0Index(index);
    setCurrentView("questions");
  }

  function viewResult() {
    didApplyStartViewRef.current = true;
    setHasCompletedDiagnosis(true);
    setCurrentView("result");
  }

  function backToMain() {
    didApplyStartViewRef.current = true;
    setCurrentView("main");
    setIsAddedToProfile(false);
    setHasCompletedDiagnosis(false);
    setQ0Index(null);
    setAnswers({});
    setSelectedBeanName(null);
  }

  // ✅ 保存済み(resultStored/detailStored)の「戻る」：プロフィール起点なら profileへ、そうでなければ診断トップへ
  function backFromStored() {
    didApplyStartViewRef.current = true;
    setSelectedBeanName(null);

    if (startView === "detailStored" && onExit) {
      onExit();
      return;
    }
    // 診断トップの「診断結果を見る」起点
    setCurrentView("main");
  }

  // プロフィール追加（保存のみ、ページ遷移しない）
  function handleAddToProfile() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_DIAGNOSIS);
      if (!raw) return;

      const result = JSON.parse(raw) as StoredDiagnosis;
      result.addedToProfile = true;
      localStorage.setItem(STORAGE_KEY_DIAGNOSIS, JSON.stringify(result));
      setIsAddedToProfile(true);
      setStoredDiagnosis(result);

      // プロフィール用リストへも保存
      const profileRaw = localStorage.getItem(STORAGE_KEY_PROFILE);
      const list = profileRaw ? JSON.parse(profileRaw) : [];
      list.unshift({
        id:
          typeof crypto !== "undefined" && "randomUUID" in crypto
            ? crypto.randomUUID()
            : String(Date.now()),
        createdAt: new Date().toISOString(),
        diagnosis: result,
      });
      localStorage.setItem(STORAGE_KEY_PROFILE, JSON.stringify(list));

      onDiagnosisAddedToProfile?.();
    } catch (err) {
      console.error("Failed to add diagnosis to profile:", err);
    }
  }

  // 豆詳細へ
  function openBeanDetail(beanName: string, fromView: DiagnosisView) {
    didApplyStartViewRef.current = true;
    setSelectedBeanName(beanName);
    setBeanBackView(fromView);
    setCurrentView("beanDetail");
  }

  function closeBeanDetail() {
    didApplyStartViewRef.current = true;
    setSelectedBeanName(null);
    setCurrentView(beanBackView);
  }

  // -------------------------
  // 画面：Questions
  // -------------------------
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

  // -------------------------
  // 画面：Q0
  // -------------------------
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
                  className={
                    selected ? "choice-button selected" : "choice-button"
                  }
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

  // -------------------------
  // 画面：診断結果（診断中 result）
  // -------------------------
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

            <div style={{ display: "grid", gap: 12 }}>
              <BeanCard
                rankLabel="1位"
                beanName={top1.name}
                onClick={() => openBeanDetail(top1.name, "result")}
              />
              <BeanCard
                rankLabel="2位"
                beanName={top2.name}
                onClick={() => openBeanDetail(top2.name, "result")}
              />
            </div>
          </div>
        </div>

        <div style={{ marginTop: 24, display: "grid", gap: 12 }}>
          <button
            onClick={() => {
              didApplyStartViewRef.current = true;
              setCurrentView("detail");
            }}
            className="profile-add-button"
          >
            詳細をみる
          </button>

          <button
            onClick={handleAddToProfile}
            disabled={isAddedToProfile}
            className={
              isAddedToProfile
                ? "profile-add-button added"
                : "profile-add-button"
            }
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

  // -------------------------
  // 画面：診断詳細（診断中 detail）
  // -------------------------
  if (currentView === "detail" && diagnosisResult && typeInfo && top1 && top2) {
    return (
      <div style={{ padding: "20px 16px 100px" }}>
        <div style={{ marginBottom: 20 }}>
          <button
            onClick={() => {
              didApplyStartViewRef.current = true;
              setCurrentView("result");
            }}
            className="back-button"
          >
            <span style={{ fontSize: 18 }}>←</span>
            <span>戻る</span>
          </button>
        </div>

        <header className="page-header">
          <h1 className="page-title">診断結果の詳細</h1>
          <p className="page-subtitle">あなたに合う理由</p>
        </header>

        <div className="detail-card">
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 14, color: "#6b7280", marginBottom: 8 }}>
              あなたのコーヒータイプ
            </div>
            <h2
              style={{
                fontSize: 22,
                fontWeight: 800,
                color: "#1e3932",
                marginBottom: 12,
              }}
            >
              {typeInfo.displayName}
            </h2>
            <p style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.7 }}>
              {typeInfo.descriptionLong}
            </p>
          </div>

          <div style={{ borderTop: "1px solid #e5e7eb", paddingTop: 20 }}>
            <div
              style={{
                fontSize: 14,
                color: "#6b7280",
                marginBottom: 12,
                fontWeight: 600,
              }}
            >
              おすすめの豆
            </div>

            <div style={{ display: "grid", gap: 12 }}>
              <BeanCard
                rankLabel="1位"
                beanName={top1.name}
                onClick={() => openBeanDetail(top1.name, "detail")}
              />
              <p style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.7 }}>
                {typeInfo.beanReasonTop1}
              </p>

              <BeanCard
                rankLabel="2位"
                beanName={top2.name}
                onClick={() => openBeanDetail(top2.name, "detail")}
              />
              <p style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.7 }}>
                {typeInfo.beanReasonTop2}
              </p>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 24, display: "grid", gap: 12 }}>
          <button
            onClick={handleAddToProfile}
            disabled={isAddedToProfile}
            className={
              isAddedToProfile
                ? "profile-add-button added"
                : "profile-add-button"
            }
          >
            {isAddedToProfile ? "✓ プロフィールに追加済み" : "プロフィールに追加"}
          </button>
        </div>
      </div>
    );
  }

  // -------------------------
  // 画面：保存済み結果（resultStored）
  // -------------------------
  if (currentView === "resultStored") {
    if (!storedDiagnosis) {
      return (
        <div style={{ padding: "20px 16px 100px" }}>
          <div style={{ marginBottom: 20 }}>
            <button onClick={backFromStored} className="back-button">
              <span style={{ fontSize: 18 }}>←</span>
              <span>戻る</span>
            </button>
          </div>
          <div className="detail-card">
            <p style={{ fontSize: 16, color: "#6b7280" }}>
              保存済みの診断結果がありません
            </p>
          </div>
        </div>
      );
    }

    return (
      <div style={{ padding: "20px 16px 100px" }}>
        <div style={{ marginBottom: 20 }}>
          <button onClick={backFromStored} className="back-button">
            <span style={{ fontSize: 18 }}>←</span>
            <span>戻る</span>
          </button>
        </div>

        <header className="page-header">
          <h1 className="page-title">診断結果</h1>
          <p className="page-subtitle">保存済みの結果</p>
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
              {storedDiagnosis.typeName || "—"}
            </h2>
            <p
              style={{
                fontSize: 16,
                color: "#1e3932",
                fontWeight: 600,
                marginBottom: 16,
              }}
            >
              {storedDiagnosis.typeCatch || ""}
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

            <div style={{ display: "grid", gap: 12 }}>
              {storedDiagnosis.firstBeanName && (
                <BeanCard
                  rankLabel="1位"
                  beanName={storedDiagnosis.firstBeanName}
                  onClick={() =>
                    openBeanDetail(storedDiagnosis.firstBeanName!, "resultStored")
                  }
                />
              )}
              {storedDiagnosis.secondBeanName && (
                <BeanCard
                  rankLabel="2位"
                  beanName={storedDiagnosis.secondBeanName}
                  onClick={() =>
                    openBeanDetail(
                      storedDiagnosis.secondBeanName!,
                      "resultStored"
                    )
                  }
                />
              )}
            </div>
          </div>
        </div>

        <div style={{ marginTop: 24, display: "grid", gap: 12 }}>
          <button
            onClick={() => {
              didApplyStartViewRef.current = true;
              setCurrentView("detailStored");
            }}
            className="profile-add-button"
          >
            詳細をみる
          </button>
        </div>
      </div>
    );
  }

  // -------------------------
  // 画面：detailStored（保存済み詳細）
  // -------------------------
  if (currentView === "detailStored") {
    if (!storedDiagnosis) {
      return (
        <div style={{ padding: "20px 16px 100px" }}>
          <div style={{ marginBottom: 20 }}>
            <button onClick={backFromStored} className="back-button">
              <span style={{ fontSize: 18 }}>←</span>
              <span>戻る</span>
            </button>
          </div>
          <div className="detail-card">
            <p style={{ fontSize: 16, color: "#6b7280" }}>
              保存済みの診断結果がありません
            </p>
          </div>
        </div>
      );
    }

    return (
      <div style={{ padding: "20px 16px 100px" }}>
        <div style={{ marginBottom: 20 }}>
          <button onClick={backFromStored} className="back-button">
            <span style={{ fontSize: 18 }}>←</span>
            <span>戻る</span>
          </button>
        </div>

        <header className="page-header">
          <h1 className="page-title">診断結果の詳細</h1>
          <p className="page-subtitle">あなたに合う理由</p>
        </header>

        <div className="detail-card">
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 14, color: "#6b7280", marginBottom: 8 }}>
              あなたのコーヒータイプ
            </div>
            <h2
              style={{
                fontSize: 22,
                fontWeight: 800,
                color: "#1e3932",
                marginBottom: 12,
              }}
            >
              {storedDiagnosis.typeName || "—"}
            </h2>
            <p style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.7 }}>
              {storedDiagnosis.typeReason || ""}
            </p>
          </div>

          <div
            style={{
              borderTop: "1px solid #e5e7eb",
              paddingTop: 20,
              marginTop: 20,
            }}
          >
            <div
              style={{
                fontSize: 14,
                color: "#6b7280",
                marginBottom: 12,
                fontWeight: 600,
              }}
            >
              おすすめの豆
            </div>
            <div style={{ display: "grid", gap: 12 }}>
              {storedDiagnosis.firstBeanName && (
                <BeanCard
                  rankLabel="1位"
                  beanName={storedDiagnosis.firstBeanName}
                  onClick={() =>
                    openBeanDetail(storedDiagnosis.firstBeanName!, "detailStored")
                  }
                />
              )}
              {storedDiagnosis.secondBeanName && (
                <BeanCard
                  rankLabel="2位"
                  beanName={storedDiagnosis.secondBeanName}
                  onClick={() =>
                    openBeanDetail(
                      storedDiagnosis.secondBeanName!,
                      "detailStored"
                    )
                  }
                />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------
  // 画面：beanDetail
  // -------------------------
  if (currentView === "beanDetail") {
    return (
      <div style={{ padding: "20px 16px 100px" }}>
        <div style={{ marginBottom: 20 }}>
          <button onClick={closeBeanDetail} className="back-button">
            <span style={{ fontSize: 18 }}>←</span>
            <span>戻る</span>
          </button>
        </div>

        <header className="page-header">
          <h1 className="page-title">豆の詳細</h1>
          <p className="page-subtitle">後から内容を追加できます</p>
        </header>

        <div className="detail-card">
          <h2 style={{ fontSize: 22, fontWeight: 800, color: "#1e3932" }}>
            {selectedBeanName || "—"}
          </h2>
          <p style={{ fontSize: 14, color: "#6b7280", marginTop: 12, lineHeight: 1.7 }}>
            ※ここに豆の説明（香り、味わい、相性フードなど）を今後追加できます。
          </p>
        </div>
      </div>
    );
  }

  // -------------------------
  // 画面：main（診断トップ）
  // -------------------------
  return (
    <div style={{ padding: "20px 16px 100px" }}>
      <header className="page-header">
        <h1 className="page-title">コーヒー診断</h1>
        <p className="page-subtitle">あなたにぴったりの一杯を見つけよう</p>
      </header>

      <button onClick={startDiagnosis} className="diagnosis-start-button">
        おすすめコーヒー診断開始
      </button>

      {/* 保存済みの結果があれば表示（診断トップから結果を見る導線） */}
      {storedDiagnosis?.typeName && (
        <div style={{ marginTop: 16, display: "grid", gap: 10 }}>
          <button
            onClick={() => {
              didApplyStartViewRef.current = true;
              setCurrentView("resultStored");
            }}
            className="profile-add-button"
          >
            診断結果を見る
          </button>

          <button
            onClick={() => {
              didApplyStartViewRef.current = true;
              setCurrentView("detailStored");
            }}
            className="profile-add-button"
          >
            診断結果の詳細を見る
          </button>
        </div>
      )}
    </div>
  );
}
