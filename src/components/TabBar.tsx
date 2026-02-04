// src/components/TabBar.tsx

export type TabId = "home" | "profile" | "diagnosis" | "collection" | "settings";

type TabBarProps = {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
};

export function TabBar({ activeTab, onTabChange }: TabBarProps) {
  const tabs: { id: TabId; label: string; icon: string }[] = [
    { id: "home", label: "ホーム", icon: "🏠" },
    { id: "profile", label: "プロフィール", icon: "👤" },
    { id: "diagnosis", label: "診断", icon: "☕" },
    { id: "collection", label: "コレクション", icon: "📚" },
    { id: "settings", label: "設定", icon: "⚙️" },
  ];

  return (
    <nav className="tab-bar">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={activeTab === tab.id ? "tab-button active" : "tab-button"}
        >
          <div className="tab-icon">{tab.icon}</div>
          <div className="tab-label">{tab.label}</div>
        </button>
      ))}
    </nav>
  );
}
