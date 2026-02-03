// src/App.tsx
import { useMemo, useState } from "react";
import "./App.css";
import { FiveStepMeter } from "./components/FiveStepMeter";

import { QUESTIONS } from "./data/questions";
import { COFFEE_TYPES } from "./data/types";
import { COFFEE_BEANS } from "./data/beans";

import {
  computeScores,
  createEmptyAnswers,
  type Answers,
} from "./logic/scoring";
import { classifyType } from "./logic/classify";
import { recommendTop2 } from "./logic/recommend";

type ChoiceId = "A" | "B" | "C";

function labelForAxis(axis: "roast" | "acidity" | "body") {
  if (axis === "roast") return { left: "LIGHT", right: "DARK", name: "ロースト" };
  if (axis === "acidity") return { left: "LOW", right: "HIGH", name: "酸味" };
  return { left: "LIGHT", right: "FULL", name: "コク" };
}

export default function App() {
  const [answers, setAnswers] = useState<Answers>(() => createEmptyAnswers());
  const [expanded, setExpanded] = useState(false);

  // 現在の質問番号（未回答があればそこ、なければ最後）
  const currentIndex = useMemo(() => {
    const idx = QUESTIONS.findIndex((q) => answers[q.id] == null);
    return idx === -1 ? QUESTIONS.length - 1 : idx;
  }, [answers]);

  const progressText = useMemo(() => {
    const answered = Object.values(answers).filter((v) => v != null).length;
    return `${answered}/${QUESTIONS.length}`;
  }, [answers]);

  const scores = useMemo(() => computeScores(answers), [answers]);
  const typeId = useMemo(() => classifyType(answers, scores), [answers, scores]);

  const typeInfo = useMemo(() => {
    return COFFEE_TYPES.find((t) => t.id === typeId) ?? COFFEE_TYPES[0];
  }, [typeId]);

  const top2 = useMemo(() => recommendTop2(scores, COFFEE_BEANS), [scores]);

  function setAnswer(qid: keyof Answers, choice: ChoiceId) {
    setAnswers((prev) => ({ ...prev, [qid]: choice }));
    // 診断中にUIが暴れないよう、詳細は閉じる
    setExpanded(false);
  }

  function resetAll() {
    setAnswers(createEmptyAnswers());
    setExpanded(false);
  }

  const currentQ = QUESTIONS[currentIndex];

  return (
    <div
      style={{
        maxWidth: 820,
        margin: "0 auto",
        padding: "24px 16px 64px",
      }}
    >
      <header style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 12, opacity: 0.7 }}>おすすめコーヒー診断</div>
        <h1 style={{ fontSize: 22, marginTop: 8, marginBottom: 6 }}>
          今日はどんな一杯にする？
        </h1>
        <div style={{ fontSize: 13, opacity: 0.75 }}>
          6つの質問に答えるだけ。気分で何度でも変わります。
        </div>
      </header>

      {/* Result Card */}
      <section
        style={{
          border: "1px solid rgba(255,255,255,0.15)",
          borderRadius: 16,
          padding: 16,
          background: "rgba(255,255,255,0.03)",
        }}
      >
        <div style={{ display: "flex", gap: 12, alignItems: "baseline" }}>
          <div style={{ fontSize: 12, opacity: 0.7 }}>診断結果</div>
          <div style={{ fontSize: 12, opacity: 0.7 }}>進捗: {progressText}</div>
        </div>

        <div style={{ marginTop: 10, fontSize: 20, fontWeight: 800 }}>
          あなたは「{typeInfo.name}」
        </div>

        <div style={{ marginTop: 6, fontSize: 14, opacity: 0.9 }}>
          {typeInfo.catch}
        </div>

        <div style={{ marginTop: 10, fontSize: 13, lineHeight: 1.65, opacity: 0.85 }}>
          {typeInfo.reason}
        </div>

        <div style={{ marginTop: 14, display: "grid", gap: 10 }}>
          <div style={{ fontWeight: 700 }}>おすすめ</div>

          {top2 ? (
            <div style={{ display: "grid", gap: 10 }}>
              <div
                style={{
                  border: "1px solid rgba(255,255,255,0.15)",
                  borderRadius: 14,
                  padding: 12,
                }}
              >
                <div style={{ fontSize: 12, opacity: 0.7 }}>1位</div>
                <div style={{ fontSize: 16, fontWeight: 800, marginTop: 4 }}>
                  {top2.first.name}
                </div>
                <div style={{ fontSize: 13, opacity: 0.8, marginTop: 4 }}>
                  {top2.first.note}
                </div>
              </div>

              <div
                style={{
                  border: "1px solid rgba(255,255,255,0.15)",
                  borderRadius: 14,
                  padding: 12,
                }}
              >
                <div style={{ fontSize: 12, opacity: 0.7 }}>2位</div>
                <div style={{ fontSize: 16, fontWeight: 800, marginTop: 4 }}>
                  {top2.second.name}
                </div>
                <div style={{ fontSize: 13, opacity: 0.8, marginTop: 4 }}>
                  {top2.second.note}
                </div>
              </div>
            </div>
          ) : (
            <div style={{ fontSize: 13, opacity: 0.7 }}>
              豆データが不足しています。
            </div>
          )}
        </div>

        <div style={{ marginTop: 14, display: "flex", gap: 10, flexWrap: "wrap" }}>
          <button
            onClick={() => setExpanded((v) => !v)}
            style={{
              padding: "10px 12px",
              borderRadius: 12,
              border: "1px solid rgba(255,255,255,0.2)",
              background: "transparent",
              cursor: "pointer",
            }}
          >
            味わいを詳しく見る
          </button>

          <button
            onClick={resetAll}
            style={{
              padding: "10px 12px",
              borderRadius: 12,
              border: "1px solid rgba(255,255,255,0.2)",
              background: "transparent",
              cursor: "pointer",
              opacity: 0.85,
            }}
          >
            リセット
          </button>
        </div>

        {/* Accordion */}
        {expanded && (
          <div
            style={{
              marginTop: 14,
              borderTop: "1px solid rgba(255,255,255,0.12)",
              paddingTop: 14,
            }}
          >
            <div style={{ fontSize: 13, opacity: 0.8 }}>
              今の回答から見る「味わいの傾向」です。
            </div>

            {(["roast", "acidity", "body"] as const).map((axis) => {
              const meta = labelForAxis(axis);
              return (
                <FiveStepMeter
                  key={axis}
                  label={meta.name}
                  left={meta.left}
                  right={meta.right}
                  value={scores[axis]}
                />
              );
            })}
          </div>
        )}
      </section>

      {/* Questions */}
      <section style={{ marginTop: 18 }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
          <div style={{ fontWeight: 800, fontSize: 16 }}>質問</div>
          <div style={{ fontSize: 12, opacity: 0.7 }}>いまは {progressText}</div>
        </div>

        <div
          style={{
            marginTop: 10,
            border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: 16,
            padding: 16,
            background: "rgba(255,255,255,0.02)",
          }}
        >
          <div style={{ fontSize: 13, opacity: 0.8 }}>
            店員：いまの気分、教えてください ☕
          </div>

          <div style={{ marginTop: 10, fontSize: 18, fontWeight: 800 }}>
            {currentQ.prompt}
          </div>

          <div style={{ marginTop: 12, display: "grid", gap: 10 }}>
            {currentQ.choices.map((c) => {
              const selected = answers[currentQ.id] === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => setAnswer(currentQ.id, c.id)}
                  style={{
                    textAlign: "left",
                    padding: "12px 12px",
                    borderRadius: 14,
                    border: selected
                      ? "1px solid rgba(255,255,255,0.55)"
                      : "1px solid rgba(255,255,255,0.18)",
                    background: selected
                      ? "rgba(255,255,255,0.10)"
                      : "rgba(0,0,0,0)",
                    cursor: "pointer",
                  }}
                >
                  <div style={{ fontWeight: 800 }}>{c.id}</div>
                  <div style={{ marginTop: 4, opacity: 0.9 }}>{c.text}</div>
                </button>
              );
            })}
          </div>

          <div style={{ marginTop: 14, fontSize: 12, opacity: 0.7 }}>
            ※後から選び直してOK（結果もすぐ変わります）
          </div>
        </div>

        {/* すべての質問を一覧で編集できる（後から選び直しやすい） */}
        <details style={{ marginTop: 12 }}>
          <summary style={{ cursor: "pointer", opacity: 0.85 }}>
            すべての質問を一覧で見る（選び直し）
          </summary>

          <div style={{ marginTop: 10, display: "grid", gap: 10 }}>
            {QUESTIONS.map((q, qi) => (
              <div
                key={q.id}
                style={{
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: 14,
                  padding: 12,
                }}
              >
                <div style={{ fontSize: 12, opacity: 0.7 }}>
                  Q{qi + 1}
                </div>
                <div style={{ marginTop: 6, fontWeight: 800 }}>{q.prompt}</div>

                <div style={{ marginTop: 10, display: "grid", gap: 8 }}>
                  {q.choices.map((c) => {
                    const selected = answers[q.id] === c.id;
                    return (
                      <button
                        key={c.id}
                        onClick={() => setAnswer(q.id, c.id)}
                        style={{
                          textAlign: "left",
                          padding: "10px 12px",
                          borderRadius: 12,
                          border: selected
                            ? "1px solid rgba(255,255,255,0.55)"
                            : "1px solid rgba(255,255,255,0.16)",
                          background: selected
                            ? "rgba(255,255,255,0.10)"
                            : "transparent",
                          cursor: "pointer",
                        }}
                      >
                        <strong>{c.id}</strong>　{c.text}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </details>
      </section>

      <footer style={{ marginTop: 22, fontSize: 12, opacity: 0.6 }}>
        ※割引・特典・クーポンなどは扱いません。診断体験を楽しむためのアプリです。
      </footer>
    </div>
  );
}
