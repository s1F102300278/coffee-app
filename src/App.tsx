// src/App.tsx
import { useState, useMemo, useEffect } from "react";
import "./App.css";

import { HomePage } from "./pages/HomePage";
import { ProfilePage } from "./pages/ProfilePage";
import { DiagnosisPage } from "./pages/DiagnosisPage";
import { CollectionPage } from "./pages/CollectionPage";
import { SettingsPage } from "./pages/SettingsPage";
import { ProfileEditPage } from "./pages/ProfileEditPage";
import { TabBar, type TabId } from "./components/TabBar";

const STORAGE_KEY_DIAGNOSIS = "coffee-app-diagnosis-result";

type StoredDiagnosis = {
  typeId?: string;
  typeName?: string;
  addedToProfile?: boolean;
  timestamp?: string;
};

type DiagnosisStartView = "main" | "resultStored" | "detailStored";
type AppView = "tabs" | "profileEdit";

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>("home");
  const [appView, setAppView] = useState<AppView>("tabs");
  const [diagnosisStartView, setDiagnosisStartView] =
    useState<DiagnosisStartView>("main");
  
  // プロフィール変更を検知するためのkey（強制再レンダリング用）
  const [profileUpdateKey, setProfileUpdateKey] = useState(0);

  // ProfilePage で使う状態
  const [diagnosisAddedToProfile, setDiagnosisAddedToProfile] =
    useState(false);
  const [storedDiagnosisTypeName, setStoredDiagnosisTypeName] =
    useState<string>("未診断");

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

  // ★診断ページから抜ける処理
  const handleDiagnosisExit = () => {
    // プロフィール起点の場合はプロフィールに戻る
    if (diagnosisStartView === "detailStored" || diagnosisStartView === "resultStored") {
      setActiveTab("profile");
      setDiagnosisStartView("main"); // リセット
    } else {
      // 通常の診断起点の場合はそのまま（mainに戻る）
      setDiagnosisStartView("main");
    }
  };

  // ★プロフィール編集ページへの遷移
  const handleNavigateToProfileEdit = () => {
    setAppView("profileEdit");
  };

  // ★プロフィール編集から戻る（変更を反映）
  const handleBackFromProfileEdit = () => {
    console.log("Profile edit saved, updating key...");
    setAppView("tabs");
    // プロフィール更新を強制的に反映
    setProfileUpdateKey(prev => {
      const newKey = prev + 1;
      console.log(`Profile update key changed: ${prev} -> ${newKey}`);
      return newKey;
    });
    // プロフィールページに遷移
    setActiveTab("profile");
  };

  // ★プロフィール編集ページを表示中
  if (appView === "profileEdit") {
    return (
      <div className="app-container">
        <main className="page-content">
          <ProfileEditPage onBack={handleBackFromProfileEdit} />
        </main>
      </div>
    );
  }

  function renderPage() {
    switch (activeTab) {
      case "home":
        return <HomePage />;

      case "profile":
        return (
          <ProfilePage
            key={profileUpdateKey} // ★keyを追加して強制再レンダリング
            onNavigateToDiagnosis={() => {
              if (diagnosisAddedToProfile) {
                setDiagnosisStartView("detailStored"); // ★詳細を即表示
              } else {
                setDiagnosisStartView("main"); // 未診断なら通常開始
              }
              setActiveTab("diagnosis");
            }}
            hasCompletedDiagnosis={diagnosisAddedToProfile}
            diagnosisTypeName={diagnosisTypeName}
          />
        );

      case "diagnosis":
        return (
          <DiagnosisPage
            onDiagnosisAddedToProfile={handleDiagnosisAddedToProfile}
            startView={diagnosisStartView}
            onExit={handleDiagnosisExit}
          />
        );

      case "collection":
        return <CollectionPage />;

      case "settings":
        return <SettingsPage onNavigateToProfileEdit={handleNavigateToProfileEdit} />;

      default:
        return <HomePage />;
    }
  }

  return (
    <div className="app-container">
      <main className="page-content">{renderPage()}</main>
      <TabBar
        activeTab={activeTab}
        onTabChange={(tab) => {
          // タブで診断を開いた場合は通常開始に戻す
          if (tab === "diagnosis") setDiagnosisStartView("main");
          setActiveTab(tab);
        }}
      />
    </div>
  );
}
