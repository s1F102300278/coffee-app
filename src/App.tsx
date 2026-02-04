// src/App.tsx
import { useState, useMemo, useEffect } from "react";
import "./App.css";

import { HomePage } from "./pages/HomePage";
import { ProfilePage } from "./pages/ProfilePage";
import { DiagnosisPage } from "./pages/DiagnosisPage";
import { CollectionPage } from "./pages/CollectionPage";
import { SettingsPage } from "./pages/SettingsPage";
import { TabBar, type TabId } from "./components/TabBar";

const STORAGE_KEY_DIAGNOSIS = "coffee-app-diagnosis-result";

type StoredDiagnosis = {
  typeId?: string;
  typeName?: string;
  addedToProfile?: boolean;
  timestamp?: string;
};

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>("home");

  // ProfilePage で使う状態
  const [diagnosisAddedToProfile, setDiagnosisAddedToProfile] = useState(false);
  const [storedDiagnosisTypeName, setStoredDiagnosisTypeName] = useState<string>("未診断");

  // 初回マウント時にlocalStorageから診断結果を読み込む
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_DIAGNOSIS);
      if (!stored) return;

      const result = JSON.parse(stored) as StoredDiagnosis;
      setDiagnosisAddedToProfile(!!result.addedToProfile);
      setStoredDiagnosisTypeName(result.typeName || "未診断");
    } catch (err) {
      console.error("Failed to load diagnosis result:", err);
    }
  }, []);

  // プロフィールに追加された時の処理
  const handleDiagnosisAddedToProfile = () => {
    setDiagnosisAddedToProfile(true);

    // 追加直後のlocalStorageを読み直してタイプ名も最新化
    try {
      const stored = localStorage.getItem(STORAGE_KEY_DIAGNOSIS);
      if (stored) {
        const result = JSON.parse(stored) as StoredDiagnosis;
        setStoredDiagnosisTypeName(result.typeName || "未診断");
      }
    } catch {
      // 無視
    }

  };

  // ProfilePage に渡す表示名（localStorage優先）
  const diagnosisTypeName = useMemo(() => {
    return storedDiagnosisTypeName;
  }, [storedDiagnosisTypeName]);

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
