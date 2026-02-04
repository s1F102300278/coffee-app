// src/App.tsx
import { useState, useMemo } from "react";
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

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>("home");
  
  // 診断状態を App レベルで管理（ProfilePage で参照するため）
  const [diagnosisAnswers, setDiagnosisAnswers] = useState<Answers>(() => createEmptyAnswers());
  const [hasCompletedDiagnosis, setHasCompletedDiagnosis] = useState(false);

  const scores = useMemo(() => computeScores(diagnosisAnswers), [diagnosisAnswers]);
  const typeId = useMemo(() => classifyType(diagnosisAnswers, scores), [diagnosisAnswers, scores]);
  const typeInfo = useMemo(() => {
    return COFFEE_TYPES.find((t) => t.id === typeId) ?? COFFEE_TYPES[0];
  }, [typeId]);

  // ページコンポーネントを切り替え
  function renderPage() {
    switch (activeTab) {
      case "home":
        return <HomePage />;
      case "profile":
        return (
          <ProfilePage
            onNavigateToDiagnosis={() => setActiveTab("diagnosis")}
            hasCompletedDiagnosis={hasCompletedDiagnosis}
            diagnosisTypeName={typeInfo.name}
          />
        );
      case "diagnosis":
        return <DiagnosisPage />;
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
