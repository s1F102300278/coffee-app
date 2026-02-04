// src/data/types.ts
import type { TypeId } from "./diagnosisSpec";

export type CoffeeType = {
  id: TypeId;
  name: string;
  catch: string;
  reason: string;
};

export const COFFEE_TYPES = [
  {
    id: "BALANCE",
    name: "バランスタイプ",
    catch: "迷ったらこれ。どんな日にも寄り添う味。",
    reason:
      "味のバランスや安定感を大事にする傾向があり、強すぎない苦味や酸味の“ちょうどよさ”があなたに合っています。",
  },
  {
    id: "MOOD",
    name: "気分タイプ",
    catch: "今日はどんな一杯にする？直感で選ぶのが正解。",
    reason:
      "その日の気分やシーンで選び方が変わりやすく、軽やかさ・すっきり感など“今ほしい感覚”を優先するタイプです。",
  },
  {
    id: "AROMA",
    name: "香り重視タイプ",
    catch: "一口目の香りを、いちばん大切に。",
    reason:
      "味だけでなく香りや余韻を重視し、コーヒーの時間そのものを丁寧に楽しむ傾向があります。",
  },
  {
    id: "SPICE",
    name: "ひとクセタイプ",
    catch: "印象に残る一杯が好き。ちょっと攻めたい。",
    reason:
      "コクや個性、飲みごたえなど“わかりやすい特徴”に惹かれやすく、記憶に残る味を求めるタイプです。",
  },
] as const satisfies readonly CoffeeType[];
