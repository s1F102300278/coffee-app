// src/data/diagnosisSpec.ts
// JSONを直接TypeScriptデータとして定義

export type TypeId = "BALANCE" | "MOOD" | "AROMA" | "SPICE";
export type TagId = "calm" | "balance" | "light" | "refresh" | "aroma" | "fruity" | "nutty" | "rich";
export type RouteId = "routeA" | "routeB";

// ========== タイプ定義 ==========
export interface CoffeeTypeSpec {
  displayName: string;
  coreTags: TagId[];
  descriptionShort: string;
  descriptionLong: string;
  beanReasonTop1: string;
  beanReasonTop2: string;
}

export const COFFEE_TYPE_SPECS: Record<TypeId, CoffeeTypeSpec> = {
  BALANCE: {
    displayName: "バランスタイプ",
    coreTags: ["balance", "calm"],
    descriptionShort: "安定感のある味わいで、どんなシーンにも自然になじむタイプです。",
    descriptionLong: `あなたは、コーヒーに極端な刺激よりも「ちょうどよさ」や「安心感」を求めるタイプです。苦すぎず、軽すぎず、気づけば何度も手に取ってしまうような一杯があなたの日常にしっくりと馴染みます。特別なこだわりがなくても、結果的に"失敗しない選択"ができるのが、このタイプの特徴です。`,

    beanReasonTop1: "バランスのよい味わいと、毎日でも飲みやすい安定感が特徴。あなたが大切にしている「安心して選べる一杯」という感覚に最も合ったコーヒーです。",
    beanReasonTop2: "落ち着いた味わいで、少し気分を同じタイプ内で変えたいときにおすすめ。1位よりも控えめですが、ゆったり過ごしたい時間に向いています。",
  },
  MOOD: {
    displayName: "気分タイプ",
    coreTags: ["light", "refresh"],
    descriptionShort: "その日の気分や流れに合わせて、直感でコーヒーを選ぶタイプです。",
    descriptionLong: "あなたは、その日の気分やコンディションを大切にするタイプ。「今日はこれが飲みたい」という感覚を信じて、コーヒーを選ぶことが多いのではないでしょうか。軽やかさやすっきり感を求める傾向があり、気分転換やリズムを切り替えたいときにコーヒーを上手に取り入れています。",
    beanReasonTop1: "軽やかで飲みやすく、今の気分にすっと寄り添ってくれる一杯。あなたの「直感で選ぶスタイル」にぴったり合うコーヒーです。",
    beanReasonTop2: "朝や気分を切り替えたいときに向いた一杯。1位ほど軽やかではありませんが、シーンを選ばず楽しめます。",
  },
  AROMA: {
    displayName: "香り重視タイプ",
    coreTags: ["aroma", "fruity"],
    descriptionShort: "味だけでなく、香りや余韻を大切にするタイプです。",
    descriptionLong: "あなたは、コーヒーを「飲み物」だけでなく、時間や空気を楽しむものとして捉えるタイプです。立ち上がる香りや、飲んだあとの余韻に心が落ち着いたり、気分が整ったりすることを無意識のうちに大切にしています。慌ただしい日常の中でも、コーヒーの時間を丁寧に楽しめるのがこのタイプの魅力です。",
    beanReasonTop1: "華やかな香りと、飲んだあとまで続く余韻が特徴の一杯。あなたが重視する「香りを楽しむ時間」に最もフィットするコーヒーです。",
    beanReasonTop2: "落ち着いた香りと、やさしい味わいが楽しめる一杯。1位ほど華やかではありませんが、ゆっくり過ごしたい時間に向いています。",
  },
  SPICE: {
    displayName: "ひとクセタイプ",
    coreTags: ["rich", "nutty"],
    descriptionShort: "印象に残る味わいを求める、個性派タイプです。",
    descriptionLong: "あなたは、コーヒーに「分かりやすい個性」や「記憶に残る体験」を求めるタイプです。少しクセがあっても、「これだ」と思える一杯に出会えたときの満足感を大切にしています。定番よりも、自分の感覚に刺さるかどうかを重視するのがこのタイプの特徴です。",
    beanReasonTop1: "しっかりとしたコクと、一口で印象に残る味わいが特徴。あなたの「物足りなさを感じたくない」という感覚に応えてくれる一杯です。",
    beanReasonTop2: "1位ほどのインパクトはありませんが、違った方向性で個性を楽しめる一杯。気分を変えたいときにおすすめです。",
  },
};

// ========== 豆定義 ==========
export interface BeanSpec {
  name: string;
  typeMembership: TypeId[];
  tags: TagId[];
}

export const BEAN_SPECS: BeanSpec[] = [
  {
    name: "ライトノートブレンド",
    typeMembership: ["MOOD", "AROMA"],
    tags: ["light", "refresh", "aroma"],
  },
  {
    name: "ブロンドエスプレッソロースト",
    typeMembership: ["MOOD"],
    tags: ["light", "refresh"],
  },
  {
    name: "ブレックファーストブレンド",
    typeMembership: ["MOOD"],
    tags: ["refresh", "light"],
  },
  {
    name: "サイレンブレンド",
    typeMembership: ["MOOD", "AROMA"],
    tags: ["aroma", "fruity"],
  },
  {
    name: "ケニア",
    typeMembership: ["AROMA", "SPICE"],
    tags: ["fruity", "aroma"],
  },
  {
    name: "パイクプレイスロースト",
    typeMembership: ["BALANCE"],
    tags: ["balance", "calm"],
  },
  {
    name: "グアテマラアンティグア",
    typeMembership: ["AROMA"],
    tags: ["aroma", "nutty"],
  },
  {
    name: "ハウスブレンド",
    typeMembership: ["BALANCE"],
    tags: ["nutty", "balance"],
  },
  {
    name: "ディカフェハウスブレンド",
    typeMembership: ["BALANCE"],
    tags: ["calm", "balance"],
  },
  {
    name: "コロンビア",
    typeMembership: ["BALANCE"],
    tags: ["nutty", "balance"],
  },
  {
    name: "TOKYOロースト",
    typeMembership: ["BALANCE"],
    tags: ["calm", "balance"],
  },
  {
    name: "スマトラ",
    typeMembership: ["SPICE"],
    tags: ["rich", "nutty"],
  },
  {
    name: "コモドドラゴンブレンド",
    typeMembership: ["SPICE"],
    tags: ["rich", "nutty"],
  },
  {
    name: "エスプレッソロースト",
    typeMembership: ["SPICE"],
    tags: ["rich", "nutty"],
  },
  {
    name: "イタリアンロースト",
    typeMembership: ["SPICE"],
    tags: ["rich", "nutty"],
  },
  {
    name: "フレンチロースト",
    typeMembership: ["SPICE"],
    tags: ["rich", "nutty"],
  },
];

// ========== 優先順位定義 ==========
export const BEAN_PRIORITY: Record<TypeId, string[]> = {
  BALANCE: [
    "パイクプレイスロースト",
    "ハウスブレンド",
    "TOKYOロースト",
    "コロンビア",
    "ディカフェハウスブレンド",
  ],
  MOOD: [
    "ライトノートブレンド",
    "ブレックファーストブレンド",
    "ブロンドエスプレッソロースト",
    "サイレンブレンド",
  ],
  AROMA: [
    "サイレンブレンド",
    "グアテマラアンティグア",
    "ケニア",
    "ライトノートブレンド",
  ],
  SPICE: [
    "スマトラ",
    "コモドドラゴンブレンド",
    "フレンチロースト",
    "イタリアンロースト",
    "エスプレッソロースト",
  ],
};

// ========== 質問定義 ==========
export interface QuestionOption {
  t: string; // 選択肢のテキスト
  type: TypeId;
  tag?: TagId;
}

export interface QuestionSpec {
  id: string;
  q: string; // 質問文
  options: QuestionOption[];
}

// Route A（上級者向け）
export const ROUTE_A_QUESTIONS: QuestionSpec[] = [
  {
    id: "A-1",
    q: "コーヒーを飲む時間帯で一番多いのは？",
    options: [
      { t: "朝", type: "MOOD" },
      { t: "昼", type: "BALANCE" },
      { t: "夜", type: "AROMA" },
      { t: "時間は決まっていない", type: "MOOD" },
    ],
  },
  {
    id: "A-2",
    q: "スタバで注文するとき、近いのは？",
    options: [
      { t: "だいたいいつも同じ", type: "BALANCE" },
      { t: "気分で変える", type: "MOOD" },
      { t: "限定があればそれ", type: "SPICE" },
      { t: "そのとき一番気になるもの", type: "SPICE" },
    ],
  },
  {
    id: "A-3",
    q: "自宅でコーヒーを飲むときは？",
    options: [
      { t: "ブラックが多い", type: "AROMA" },
      { t: "ミルクを入れることが多い", type: "BALANCE" },
      { t: "気分で変える", type: "MOOD" },
      { t: "自宅ではあまり飲まない", type: "MOOD" },
    ],
  },
  {
    id: "A-4",
    q: "コーヒーに求めるのは？",
    options: [
      { t: "落ち着き", type: "BALANCE", tag: "calm" },
      { t: "目覚め・集中", type: "MOOD", tag: "refresh" },
      { t: "香り", type: "AROMA", tag: "aroma" },
      { t: "印象に残る味", type: "SPICE", tag: "rich" },
    ],
  },
  {
    id: "A-5",
    q: "「飲みやすいコーヒー」と聞いて思い浮かぶのは？",
    options: [
      { t: "バランスがいい", type: "BALANCE" },
      { t: "苦くない", type: "MOOD" },
      { t: "クセがない", type: "BALANCE" },
      { t: "香りがやさしい", type: "AROMA" },
    ],
  },
  {
    id: "A-6",
    q: "フードと一緒に飲むなら？",
    options: [
      { t: "甘いもの（チョコ・ケーキ）", type: "AROMA", tag: "nutty" },
      { t: "パン・軽食", type: "BALANCE", tag: "balance" },
      { t: "食事のあと", type: "BALANCE", tag: "rich" },
      { t: "単体で楽しむ", type: "AROMA", tag: "aroma" },
    ],
  },
  {
    id: "A-7",
    q: "新しい豆を試すときの気持ちは？",
    options: [
      { t: "ワクワクする", type: "SPICE" },
      { t: "少し慎重", type: "BALANCE" },
      { t: "失敗したくない", type: "BALANCE" },
      { t: "そのとき次第", type: "MOOD" },
    ],
  },
  {
    id: "A-8",
    q: "コーヒーの香りについては？",
    options: [
      { t: "とても大事", type: "AROMA", tag: "aroma" },
      { t: "あったら嬉しい", type: "AROMA", tag: "aroma" },
      { t: "そこまで気にしない", type: "BALANCE", tag: "balance" },
      { t: "味のほうが大事", type: "SPICE", tag: "rich" },
    ],
  },
  {
    id: "A-9",
    q: "スタバに行く頻度は？",
    options: [
      { t: "週に何度も", type: "BALANCE" },
      { t: "週1くらい", type: "BALANCE" },
      { t: "月に数回", type: "MOOD" },
      { t: "ほとんど行かない", type: "MOOD" },
    ],
  },
  {
    id: "A-10",
    q: "苦味の強いコーヒーは？",
    options: [
      { t: "好き", type: "SPICE", tag: "rich" },
      { t: "どちらかといえば好き", type: "SPICE", tag: "rich" },
      { t: "あまり得意ではない", type: "MOOD", tag: "light" },
      { t: "苦手", type: "MOOD", tag: "light" },
    ],
  },
  {
    id: "A-11",
    q: "酸味のあるコーヒーは？",
    options: [
      { t: "好き", type: "AROMA", tag: "fruity" },
      { t: "気分次第", type: "MOOD", tag: "fruity" },
      { t: "少し苦手", type: "BALANCE", tag: "balance" },
      { t: "できれば避けたい", type: "BALANCE", tag: "balance" },
    ],
  },
  {
    id: "A-12",
    q: "コーヒーを飲むシーンで多いのは？",
    options: [
      { t: "作業・勉強中", type: "MOOD" },
      { t: "リラックスタイム", type: "AROMA" },
      { t: "移動中・外出先", type: "BALANCE" },
      { t: "特に決まっていない", type: "MOOD" },
    ],
  },
  {
    id: "A-13",
    q: "同じ豆をリピートすることは？",
    options: [
      { t: "よくある", type: "BALANCE" },
      { t: "たまにある", type: "BALANCE" },
      { t: "あまりない", type: "SPICE" },
      { t: "ほとんどしない", type: "SPICE" },
    ],
  },
  {
    id: "A-14",
    q: "「コーヒーらしい味」と聞いて近いのは？",
    options: [
      { t: "しっかりした苦味", type: "SPICE" },
      { t: "香ばしさ", type: "BALANCE" },
      { t: "バランス", type: "BALANCE" },
      { t: "よく分からない", type: "MOOD" },
    ],
  },
  {
    id: "A-15",
    q: "深煎りのコーヒーについて",
    options: [
      { t: "好き", type: "SPICE" },
      { t: "気分で飲む", type: "MOOD" },
      { t: "あまり飲まない", type: "BALANCE" },
      { t: "苦手", type: "MOOD" },
    ],
  },
  {
    id: "A-16",
    q: "浅めのコーヒーについて",
    options: [
      { t: "好き", type: "AROMA" },
      { t: "たまに飲む", type: "MOOD" },
      { t: "あまり飲まない", type: "BALANCE" },
      { t: "苦手", type: "SPICE" },
    ],
  },
  {
    id: "A-17",
    q: "コーヒーを選ぶとき重視するのは？",
    options: [
      { t: "味の安定感", type: "BALANCE", tag: "balance" },
      { t: "その日の気分", type: "MOOD", tag: "light" },
      { t: "香り", type: "AROMA", tag: "aroma" },
      { t: "個性・特徴", type: "SPICE", tag: "rich" },
    ],
  },
  {
    id: "A-18",
    q: "「これは自分向きだな」と感じる瞬間は？",
    options: [
      { t: "落ち着く", type: "BALANCE" },
      { t: "気分が上がる", type: "MOOD" },
      { t: "香りに癒される", type: "AROMA" },
      { t: "印象に残る", type: "SPICE" },
    ],
  },
  {
    id: "A-19",
    q: "コーヒーを飲んだあとに欲しい感覚は？",
    options: [
      { t: "ほっとする", type: "BALANCE", tag: "calm" },
      { t: "すっきりする", type: "MOOD", tag: "refresh" },
      { t: "余韻を楽しむ", type: "AROMA", tag: "aroma" },
      { t: "記憶に残る", type: "SPICE", tag: "rich" },
    ],
  },
  {
    id: "A-20",
    q: "今の自分に一番近いのは？",
    options: [
      { t: "安心できる一杯がいい", type: "BALANCE" },
      { t: "気分で選びたい", type: "MOOD" },
      { t: "香りを楽しみたい", type: "AROMA" },
      { t: "少しクセが欲しい", type: "SPICE" },
    ],
  },
];

// Route B（初心者向け）
export const ROUTE_B_QUESTIONS: QuestionSpec[] = [
  {
    id: "B-1",
    q: "飲み物を選ぶとき、近いのは？",
    options: [
      { t: "いつもの安心", type: "BALANCE", tag: "balance" },
      { t: "その日の気分", type: "MOOD", tag: "light" },
      { t: "見た目・香り", type: "AROMA", tag: "aroma" },
      { t: "ちょっと冒険", type: "SPICE", tag: "rich" },
    ],
  },
  {
    id: "B-2",
    q: "カフェで過ごすなら？",
    options: [
      { t: "落ち着いてゆっくり", type: "AROMA" },
      { t: "気分転換", type: "MOOD" },
      { t: "作業・勉強", type: "MOOD" },
      { t: "友達とワイワイ", type: "SPICE" },
    ],
  },
  {
    id: "B-3",
    q: "甘いものは？",
    options: [
      { t: "大好き", type: "AROMA" },
      { t: "ほどほど", type: "BALANCE" },
      { t: "たまに", type: "MOOD" },
      { t: "あまり食べない", type: "SPICE" },
    ],
  },
  {
    id: "B-4",
    q: "新しいものに出会うと？",
    options: [
      { t: "ワクワクする", type: "SPICE" },
      { t: "少し様子を見る", type: "BALANCE" },
      { t: "人のおすすめ次第", type: "BALANCE" },
      { t: "あまり選ばない", type: "BALANCE" },
    ],
  },
  {
    id: "B-5",
    q: "どんな時間にコーヒーを飲みたい？",
    options: [
      { t: "朝", type: "MOOD" },
      { t: "昼", type: "BALANCE" },
      { t: "夜", type: "AROMA" },
      { t: "まだ決まっていない", type: "MOOD" },
    ],
  },
  {
    id: "B-6",
    q: "香りのあるものは？",
    options: [
      { t: "とても好き", type: "AROMA", tag: "aroma" },
      { t: "好き", type: "AROMA", tag: "aroma" },
      { t: "あまり気にしない", type: "BALANCE", tag: "balance" },
      { t: "苦手", type: "MOOD", tag: "light" },
    ],
  },
  {
    id: "B-7",
    q: "気分転換したいときは？",
    options: [
      { t: "甘いもの", type: "AROMA" },
      { t: "散歩", type: "MOOD" },
      { t: "音楽", type: "AROMA" },
      { t: "何か飲む", type: "BALANCE" },
    ],
  },
  {
    id: "B-8",
    q: "落ち着く場所は？",
    options: [
      { t: "家", type: "BALANCE" },
      { t: "カフェ", type: "AROMA" },
      { t: "自然", type: "AROMA" },
      { t: "特にない", type: "MOOD" },
    ],
  },
  {
    id: "B-9",
    q: "「大人っぽい」と感じるのは？",
    options: [
      { t: "落ち着いた空間", type: "BALANCE" },
      { t: "静かな時間", type: "AROMA" },
      { t: "香りのあるもの", type: "AROMA" },
      { t: "ちょっとクセのあるもの", type: "SPICE" },
    ],
  },
  {
    id: "B-10",
    q: "飲み物に求めるのは？",
    options: [
      { t: "飲みやすさ", type: "BALANCE", tag: "balance" },
      { t: "気分の変化", type: "MOOD", tag: "refresh" },
      { t: "香り", type: "AROMA", tag: "aroma" },
      { t: "印象", type: "SPICE", tag: "rich" },
    ],
  },
  {
    id: "B-11",
    q: "朝の過ごし方は？",
    options: [
      { t: "ゆっくり", type: "AROMA" },
      { t: "バタバタ", type: "MOOD" },
      { t: "その日次第", type: "MOOD" },
      { t: "朝は苦手", type: "BALANCE" },
    ],
  },
  {
    id: "B-12",
    q: "苦い味について",
    options: [
      { t: "好き", type: "SPICE", tag: "rich" },
      { t: "少しなら", type: "BALANCE", tag: "balance" },
      { t: "苦手", type: "MOOD", tag: "light" },
      { t: "できれば避けたい", type: "MOOD", tag: "light" },
    ],
  },
  {
    id: "B-13",
    q: "フルーティな味の印象は？",
    options: [
      { t: "好き", type: "AROMA", tag: "fruity" },
      { t: "興味がある", type: "AROMA", tag: "fruity" },
      { t: "よく分からない", type: "BALANCE", tag: "balance" },
      { t: "あまり惹かれない", type: "SPICE", tag: "rich" },
    ],
  },
  {
    id: "B-14",
    q: "休日はどちら派？",
    options: [
      { t: "のんびり", type: "BALANCE" },
      { t: "予定ぎっしり", type: "SPICE" },
      { t: "気分次第", type: "MOOD" },
      { t: "まだ決めない", type: "MOOD" },
    ],
  },
  {
    id: "B-15",
    q: "選択肢が多いときは？",
    options: [
      { t: "じっくり選ぶ", type: "BALANCE" },
      { t: "直感", type: "MOOD" },
      { t: "人に任せる", type: "BALANCE" },
      { t: "迷ってしまう", type: "AROMA" },
    ],
  },
  {
    id: "B-16",
    q: "コーヒーを飲むなら、どんな気分で？",
    options: [
      { t: "落ち着きたい", type: "BALANCE", tag: "calm" },
      { t: "すっきりしたい", type: "MOOD", tag: "refresh" },
      { t: "香りを楽しみたい", type: "AROMA", tag: "aroma" },
      { t: "ちょっと刺激", type: "SPICE", tag: "rich" },
    ],
  },
  {
    id: "B-17",
    q: "季節で惹かれるのは？",
    options: [
      { t: "春", type: "AROMA" },
      { t: "夏", type: "MOOD" },
      { t: "秋", type: "BALANCE" },
      { t: "冬", type: "SPICE" },
    ],
  },
  {
    id: "B-18",
    q: "「これは自分らしい」と思うのは？",
    options: [
      { t: "安心感", type: "BALANCE" },
      { t: "気分", type: "MOOD" },
      { t: "雰囲気", type: "AROMA" },
      { t: "個性", type: "SPICE" },
    ],
  },
  {
    id: "B-19",
    q: "初めてのことに挑戦するときは？",
    options: [
      { t: "ワクワク", type: "SPICE" },
      { t: "少し不安", type: "BALANCE" },
      { t: "誰かと一緒なら", type: "BALANCE" },
      { t: "あまりしない", type: "BALANCE" },
    ],
  },
  {
    id: "B-20",
    q: "今のあなたに一番近いのは？",
    options: [
      { t: "ちょうどいいが好き", type: "BALANCE", tag: "balance" },
      { t: "気分で選びたい", type: "MOOD", tag: "light" },
      { t: "香りを楽しみたい", type: "AROMA", tag: "aroma" },
      { t: "クセのあるものも気になる", type: "SPICE", tag: "rich" },
    ],
  },
];

// ========== Q0（ルート分岐）==========
export interface Q0Spec {
  question: string;
  options: string[];
}

export const Q0_SPEC: Q0Spec = {
  question: "普段、コーヒーはどれくらい飲みますか？",
  options: [
    "ほぼ毎日飲む",
    "週に4〜5回くらい",
    "週に1〜2回くらい",
    "たまに飲むくらい",
    "ほとんど飲まない",
  ],
};

// Q0の回答インデックスからルートを判定
export function determineRoute(q0Index: number): RouteId {
  // [0,1] -> routeA / [2,3,4] -> routeB
  return [0, 1].includes(q0Index) ? "routeA" : "routeB";
}
