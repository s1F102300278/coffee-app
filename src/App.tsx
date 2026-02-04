// src/App.tsx
import { useState, useMemo, useEffect } from "react";
import "./App.css";

import { HomePage } from "./pages/HomePage";
import { ProfilePage } from "./pages/ProfilePage";
import { DiagnosisPage } from "./pages/DiagnosisPage";
import { CollectionPage } from "./pages/CollectionPage";
import { SettingsPage } from "./pages/SettingsPage";
import { TabBar, type TabId } from "./components/TabBar";
import { COFFEE_TYPES } from "./data/types";
import { COFFEE_BEANS } from "./data/beans";
import { computeScores, createEmptyAnswers, type Answers } from "./logic/scoring";
import { classifyType } from "./logic/classify";

const STORAGE_KEY_DIAGNOSIS = "coffee-app-diagnosis-result";

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>("home");
  
  // 診断状態を App レベルで管理（ProfilePage で参照するため）
  const [diagnosisAnswers, setDiagnosisAnswers] = useState<Answers>(() => createEmptyAnswers());
  const [hasCompletedDiagnosis, setHasCompletedDiagnosis] = useState(false);
  const [diagnosisAddedToProfile, setDiagnosisAddedToProfile] = useState(false);

  // 初回マウント時にlocalStorageから診断結果を読み込む
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_DIAGNOSIS);
      if (stored) {
        const result = JSON.parse(stored);
        setHasCompletedDiagnosis(true);
        setDiagnosisAddedToProfile(result.addedToProfile || false);
      }
    } catch (err) {
      console.error("Failed to load diagnosis result:", err);
    }
  }, []);

  const scores = useMemo(() => computeScores(diagnosisAnswers), [diagnosisAnswers]);
  const typeId = useMemo(() => classifyType(diagnosisAnswers, scores), [diagnosisAnswers, scores]);
  const typeInfo = useMemo(() => {
    return COFFEE_TYPES.find((t) => t.id === typeId) ?? COFFEE_TYPES[0];
  }, [typeId]);

  // プロフィールに追加された時の処理
  const handleDiagnosisAddedToProfile = () => {
    setDiagnosisAddedToProfile(true);
    // プロフィールページに自動遷移
    setActiveTab("profile");
  };

  // localStorageから診断結果のタイプ名を取得
  const diagnosisTypeName = useMemo(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_DIAGNOSIS);
      if (stored) {
        const result = JSON.parse(stored);
        return result.typeName || typeInfo.name;
      }
    } catch {
      // エラー時はフォールバック
    }
    return typeInfo.name;
  }, [typeInfo.name]);

  // ページコンポーネントを切り替え
  function renderPage() {
    switch (activeTab) {
      case "home":
        return <HomePage />;
      case "profile":
        return (
          <ProfilePage
            onNavigateToDiagnosis={() => setActiveTab("diagnosis")}
            hasCompletedDiagnosis={diagnosisAddedToProfile}
            diagnosisTypeName={diagnosisTypeName}
          />
        );
      case "diagnosis":
        return <DiagnosisPage onDiagnosisAddedToProfile={handleDiagnosisAddedToProfile} />;
      case "collection":
        return <CollectionPage />;
      case "settings":
        return <SettingsPage />;
      default:
        return <HomePage />;
    }
  }

  return (
    <div className="app-container">
      <main className="page-content">{renderPage()}</main>
      <TabBar activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}
