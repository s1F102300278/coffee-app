// src/pages/ProfileEditPage.tsx
import { useState } from "react";
import { useProfile, AVAILABLE_ICONS } from "../hooks/useProfile";
import { beanLogoSrc } from "../utils/assets";

type ProfileEditPageProps = {
  onBack: () => void;
};

export function ProfileEditPage({ onBack }: ProfileEditPageProps) {
  const { username, setUsername, iconId, setIconId, selectedIcon } = useProfile();
  
  // 編集用のローカルstate
  const [editUsername, setEditUsername] = useState(username);
  const [editIconId, setEditIconId] = useState(iconId);
  const [isSelectingIcon, setIsSelectingIcon] = useState(false);

  // 選択中のアイコン情報を取得
  const currentSelectedIcon = AVAILABLE_ICONS.find((i) => i.id === editIconId) || AVAILABLE_ICONS[0];

  // 保存処理
  const handleSave = () => {
    // 空白チェック
    const trimmedName = editUsername.trim();
    if (trimmedName === "") {
      alert("名前を入力してください");
      return;
    }

    console.log("=== Profile Edit Save ===");
    console.log("Before save - username:", username, "iconId:", iconId);
    console.log("Saving - username:", trimmedName, "iconId:", editIconId);

    // 保存
    setUsername(trimmedName);
    setIconId(editIconId);

    // localStorageに直接保存も試みる
    try {
      localStorage.setItem("coffee-app-username", trimmedName);
      localStorage.setItem("coffee-app-icon", editIconId);
      console.log("Saved to localStorage directly");
      console.log("localStorage username:", localStorage.getItem("coffee-app-username"));
      console.log("localStorage icon:", localStorage.getItem("coffee-app-icon"));
    } catch (err) {
      console.error("Failed to save to localStorage:", err);
    }
    
    // 少し待ってから戻る（localStorageへの書き込み完了を保証）
    setTimeout(() => {
      console.log("Calling onBack()");
      onBack();
    }, 100);
  };

  // キャンセル処理
  const handleCancel = () => {
    // 変更を破棄して戻る
    onBack();
  };

  return (
    <div style={{ padding: "20px 16px 100px", background: "#f7f7f7" }}>
      {/* ヘッダー */}
      <header style={{ marginBottom: 24 }}>
        <h1
          style={{
            fontSize: 24,
            fontWeight: 800,
            color: "#1e3932",
            marginBottom: 8,
          }}
        >
          プロフィール編集
        </h1>
        <p style={{ fontSize: 14, color: "#6b7280" }}>
          名前とアイコンを変更できます
        </p>
      </header>

      {/* 編集フォーム */}
      <div
        style={{
          background: "white",
          borderRadius: 20,
          padding: 24,
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
          marginBottom: 16,
        }}
      >
        {/* アイコン編集 */}
        <div style={{ marginBottom: 24 }}>
          <label
            style={{
              display: "block",
              fontSize: 14,
              fontWeight: 600,
              color: "#1e3932",
              marginBottom: 12,
            }}
          >
            アイコン
          </label>

          {/* 現在のアイコン表示 */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              marginBottom: 16,
            }}
          >
            <div
              style={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                background: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "3px solid #00754a",
                flexShrink: 0,
                padding: 8,
                overflow: "hidden",
              }}
            >
              <img
                src={beanLogoSrc(currentSelectedIcon.logoFile)}
                alt={currentSelectedIcon.name}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                }}
                onError={(e) => {
                  console.error(`Failed to load logo: ${currentSelectedIcon.logoFile}`);
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 16, fontWeight: 600, color: "#1e3932", marginBottom: 4 }}>
                {currentSelectedIcon.name}
              </div>
              <button
                onClick={() => setIsSelectingIcon(!isSelectingIcon)}
                style={{
                  background: "none",
                  border: "none",
                  color: "#00754a",
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                  padding: 0,
                }}
              >
                {isSelectingIcon ? "閉じる" : "変更する"}
              </button>
            </div>
          </div>

          {/* アイコン選択グリッド */}
          {isSelectingIcon && (
            <div
              style={{
                padding: 16,
                background: "#f9fafb",
                borderRadius: 12,
              }}
            >
              <div style={{ fontSize: 13, color: "#6b7280", marginBottom: 12 }}>
                アイコンを選択してください
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
                {AVAILABLE_ICONS.map((icon) => (
                  <div
                    key={icon.id}
                    onClick={() => {
                      setEditIconId(icon.id);
                      setIsSelectingIcon(false);
                    }}
                    style={{
                      width: "100%",
                      aspectRatio: "1",
                      borderRadius: "50%",
                      background: "white",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      border: editIconId === icon.id ? "3px solid #00754a" : "3px solid #e5e7eb",
                      transition: "all 0.2s",
                      padding: 6,
                      overflow: "hidden",
                    }}
                    title={icon.name}
                  >
                    <img
                      src={beanLogoSrc(icon.logoFile)}
                      alt={icon.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                      }}
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 名前編集 */}
        <div>
          <label
            htmlFor="username"
            style={{
              display: "block",
              fontSize: 14,
              fontWeight: 600,
              color: "#1e3932",
              marginBottom: 8,
            }}
          >
            名前
          </label>
          <input
            id="username"
            type="text"
            value={editUsername}
            onChange={(e) => setEditUsername(e.target.value)}
            maxLength={20}
            style={{
              width: "100%",
              padding: "12px 16px",
              fontSize: 16,
              border: "2px solid #e5e7eb",
              borderRadius: 12,
              outline: "none",
              transition: "border-color 0.2s",
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "#00754a";
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = "#e5e7eb";
            }}
            placeholder="名前を入力"
          />
          <div style={{ fontSize: 12, color: "#6b7280", marginTop: 6 }}>
            {editUsername.length}/20文字
          </div>
        </div>
      </div>

      {/* ボタン */}
      <div style={{ display: "grid", gap: 12 }}>
        <button
          onClick={handleSave}
          style={{
            width: "100%",
            padding: "16px",
            background: "#00754a",
            color: "white",
            border: "none",
            borderRadius: 12,
            fontSize: 16,
            fontWeight: 700,
            cursor: "pointer",
            transition: "background 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#005a3a";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#00754a";
          }}
        >
          保存
        </button>

        <button
          onClick={handleCancel}
          style={{
            width: "100%",
            padding: "16px",
            background: "white",
            color: "#6b7280",
            border: "2px solid #e5e7eb",
            borderRadius: 12,
            fontSize: 16,
            fontWeight: 700,
            cursor: "pointer",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#f9fafb";
            e.currentTarget.style.borderColor = "#d1d5db";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "white";
            e.currentTarget.style.borderColor = "#e5e7eb";
          }}
        >
          キャンセル
        </button>
      </div>
    </div>
  );
}
