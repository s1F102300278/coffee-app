// src/data/diagnosisSpec.ts
// JSONを直接TypeScriptデータとして定義

export type TypeId = "BALANCE" | "MOOD" | "AROMA" | "SPICE";
export type TagId =
  | "calm" | "balance" | "light" | "refresh" | "aroma" | "fruity" | "nutty" | "rich"
  | "cocoa" | "caramel" | "citrus" | "berry" | "floral" | "herbal" | "spice" | "smoky" | "sweet" | "dark";
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
    tags: ["light", "refresh", "aroma", "cocoa", "calm"],
  },
  {
    name: "ブロンドエスプレッソロースト",
    typeMembership: ["MOOD"],
    tags: ["light", "refresh", "caramel", "citrus", "balance"],
  },
  {
    name: "ブレックファーストブレンド",
    typeMembership: ["MOOD"],
    tags: ["refresh", "light", "citrus", "calm", "balance"],
  },
  {
    name: "サイレンブレンド",
    typeMembership: ["MOOD", "AROMA"],
    tags: ["aroma", "fruity", "floral", "citrus", "balance"],
  },
  {
    name: "ケニア",
    typeMembership: ["AROMA", "SPICE"],
    tags: ["fruity", "berry", "citrus", "refresh", "rich"],
  },
  {
    name: "パイクプレイスロースト",
    typeMembership: ["BALANCE"],
    tags: ["balance", "calm", "nutty", "cocoa"],
  },
  {
    name: "グアテマラアンティグア",
    typeMembership: ["AROMA"],
    tags: ["aroma", "nutty", "cocoa", "spice", "balance"],
  },
  {
    name: "ハウスブレンド",
    typeMembership: ["BALANCE"],
    tags: ["nutty", "balance", "cocoa", "caramel", "calm"],
  },
  {
    name: "ディカフェハウスブレンド",
    typeMembership: ["BALANCE"],
    tags: ["calm", "balance", "nutty", "cocoa", "light"],
  },
  {
    name: "コロンビア",
    typeMembership: ["BALANCE"],
    tags: ["nutty", "balance", "herbal", "citrus", "calm"],
  },
  {
    name: "TOKYOロースト",
    typeMembership: ["BALANCE"],
    tags: ["calm", "balance", "spice", "herbal", "rich"],
  },
  {
    name: "スマトラ",
    typeMembership: ["SPICE"],
    tags: ["rich", "nutty", "herbal", "dark", "smoky"],
  },
  {
    name: "コモドドラゴンブレンド",
    typeMembership: ["SPICE"],
    tags: ["rich", "nutty", "herbal", "spice", "dark"],
  },
  {
    name: "カフェベロナ",
    typeMembership: ["SPICE"],
    tags: ["rich", "cocoa", "caramel", "dark", "nutty"],
  },
  {
    name: "エスプレッソロースト",
    typeMembership: ["SPICE"],
    tags: ["rich", "caramel", "dark", "cocoa", "balance"],
  },
  {
    name: "イタリアンロースト",
    typeMembership: ["SPICE"],
    tags: ["dark", "smoky", "cocoa", "rich", "caramel"],
  },
  {
    name: "フレンチロースト",
    typeMembership: ["SPICE"],
    tags: ["dark", "smoky", "rich", "caramel", "cocoa"],
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
  "カフェベロナ",
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
  w?: 1 | 2;
}

export interface QuestionSpec {
  id: string;
  q: string; // 質問文
  options: QuestionOption[];
}

// Route A（上級者向け）
export const ROUTE_A_QUESTIONS: QuestionSpec[] = [
  // ---- タイプ基礎（序盤：離脱しない） ----
  {
    id: "A-1",
    q: "コーヒーを飲む時間帯で一番多いのは？",
    options: [
      { t: "朝", type: "MOOD", tag: "refresh" },
      { t: "昼", type: "BALANCE", tag: "balance" },
      { t: "夜", type: "AROMA", tag: "calm" },
      { t: "時間は決まっていない", type: "MOOD", tag: "light" },
    ],
  },
  {
    id: "A-2",
    q: "スタバで注文するとき、近いのは？",
    options: [
      { t: "だいたいいつも同じ", type: "BALANCE", tag: "balance" },
      { t: "気分で変える", type: "MOOD", tag: "light" },
      { t: "限定があればそれ", type: "SPICE", tag: "rich" },
      { t: "そのとき一番気になるもの", type: "AROMA", tag: "aroma" },
    ],
  },
  {
    id: "A-3",
    q: "自宅でコーヒーを飲むときは？",
    options: [
      { t: "ブラックが多い", type: "AROMA", tag: "aroma" },
      { t: "ミルクを入れることが多い", type: "BALANCE", tag: "calm" },
      { t: "気分で変える", type: "MOOD", tag: "light" },
      { t: "自宅ではあまり飲まない", type: "MOOD", tag: "refresh" },
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

  // ---- 具体質問（豆精度：フード/甘味/香り） ----
  {
    id: "A-5",
    q: "この中で好きな焼き菓子は？",
    options: [
      { t: "シュガードーナツ", type: "MOOD", tag: "sweet" , w: 2 },
      { t: "チョコレートチャンクスコーン", type: "SPICE", tag: "cocoa", w: 2  },
      { t: "アメリカンワッフル", type: "BALANCE", tag: "nutty", w: 2  },
      { t: "シナモンロール", type: "SPICE", tag: "spice", w: 2  },
    ],
  },
  {
    id: "A-6",
    q: "この中で好きなケーキは？",
    options: [
      { t: "ニューヨークチーズケーキ", type: "BALANCE", tag: "nutty" , w: 2 },
      { t: "チョコレートタルト", type: "SPICE", tag: "cocoa" , w: 2 },
      { t: "オレンジケーキ", type: "AROMA", tag: "citrus", w: 2  },
      { t: "抹茶のロールケーキ", type: "AROMA", tag: "herbal", w: 2  },
    ],
  },
  {
    id: "A-7",
    q: "この中で好きなケーキは？②",
    options: [
      { t: "ピーチ＆ミルクケーキ", type: "MOOD", tag: "sweet" , w: 2 },
      { t: "抹茶ティラミス", type: "AROMA", tag: "herbal" , w: 2 },
      { t: "ホワイトモカケーキ", type: "MOOD", tag: "caramel" , w: 2 },
      { t: "手しぼり栗のモンブラン", type: "BALANCE", tag: "nutty", w: 2  },
    ],
  },
  {
    id: "A-8",
    q: "この中で好きな石窯フィローネは？",
    options: [
      { t: "ハム＆マリボーチーズの石窯フィローネ", type: "BALANCE", tag: "balance" , w: 2 },
      { t: "ヴィーナソーセージ石窯フィローネ", type: "SPICE", tag: "rich", w: 2  },
      { t: "キーマカレー石窯フィローネ", type: "SPICE", tag: "spice", w: 2  },
      { t: "バジルチキン＆トマトモッツァレラ石窯フィローネ", type: "AROMA", tag: "refresh" , w: 2 },
    ],
  },
  {
    id: "A-9",
    q: "この中で好きなフラペチーノは？",
    options: [
      { t: "ダークモカフラペチーノ", type: "SPICE", tag: "cocoa" , w: 2 },
      { t: "抹茶クリームフラペチーノ", type: "AROMA", tag: "herbal" , w: 2 },
      { t: "キャラメルフラペチーノ", type: "MOOD", tag: "caramel" , w: 2 },
      { t: "コーヒーフラペチーノ", type: "BALANCE", tag: "balance" , w: 2 },
    ],
  },
  {
    id: "A-10",
    q: "この中で好きなフルーツは？",
    options: [
      { t: "イチゴ", type: "AROMA", tag: "berry", w: 2  },
      { t: "バナナ", type: "BALANCE", tag: "calm", w: 2  },
      { t: "ピーチ", type: "MOOD", tag: "fruity", w: 2  },
      { t: "オレンジ", type: "AROMA", tag: "citrus" , w: 2 },
    ],
  },

  // ---- 味の方向（飲み慣れ向けの好み分解） ----
  {
    id: "A-11",
    q: "苦味の強いコーヒーは？",
    options: [
      { t: "好き", type: "SPICE", tag: "dark" },
      { t: "どちらかといえば好き", type: "SPICE", tag: "rich" },
      { t: "あまり得意ではない", type: "MOOD", tag: "light" },
      { t: "苦手", type: "MOOD", tag: "light" },
    ],
  },
  {
    id: "A-12",
    q: "酸味のあるコーヒーは？",
    options: [
      { t: "好き", type: "AROMA", tag: "fruity" },
      { t: "気分次第", type: "MOOD", tag: "citrus" },
      { t: "少し苦手", type: "BALANCE", tag: "balance" },
      { t: "できれば避けたい", type: "BALANCE", tag: "calm" },
    ],
  },
  {
    id: "A-13",
    q: "香りのある飲み物は？",
    options: [
      { t: "香りが命だと思う", type: "AROMA", tag: "aroma" },
      { t: "香りがいいと嬉しい", type: "AROMA", tag: "floral" },
      { t: "そこまで気にしない", type: "BALANCE", tag: "balance" },
      { t: "香りより味のインパクト", type: "SPICE", tag: "rich" },
    ],
  },
  {
    id: "A-14",
    q: "好きな“甘さ”はどれに近い？",
    options: [
      { t: "控えめが好き", type: "BALANCE", tag: "calm" },
      { t: "ちょっと甘いのが好き", type: "MOOD", tag: "sweet" },
      { t: "キャラメルっぽい甘さが好き", type: "MOOD", tag: "caramel" },
      { t: "甘さよりビター", type: "SPICE", tag: "dark" },
    ],
  },
  {
    id: "A-15",
    q: "コーヒーの後味は？",
    options: [
      { t: "すっきりキレる", type: "MOOD", tag: "refresh" },
      { t: "ほどよく残る", type: "BALANCE", tag: "balance" },
      { t: "香りの余韻が残る", type: "AROMA", tag: "aroma" },
      { t: "重い余韻が好き", type: "SPICE", tag: "rich" },
    ],
  },

  // ---- 具体質問②（豆の差が出る） ----
  {
    id: "A-16",
    q: "この中で惹かれる香りは？",
    options: [
      { t: "チョコ・ココア", type: "SPICE", tag: "cocoa" },
      { t: "キャラメル", type: "MOOD", tag: "caramel" },
      { t: "柑橘（オレンジ系）", type: "AROMA", tag: "citrus" },
      { t: "ハーブ/抹茶っぽい", type: "AROMA", tag: "herbal" },
    ],
  },
  {
    id: "A-17",
    q: "この中ならどんな気分の一杯がいい？",
    options: [
      { t: "落ち着きたい", type: "BALANCE", tag: "calm" },
      { t: "気分転換したい", type: "MOOD", tag: "refresh" },
      { t: "香りに癒されたい", type: "AROMA", tag: "aroma" },
      { t: "ガツンといきたい", type: "SPICE", tag: "rich" },
    ],
  },
  {
    id: "A-18",
    q: "この中で好きな“印象”は？",
    options: [
      { t: "やさしい・丸い", type: "BALANCE", tag: "calm" },
      { t: "軽い・飲みやすい", type: "MOOD", tag: "light" },
      { t: "華やか・フルーティ", type: "AROMA", tag: "fruity" },
      { t: "濃い・ビター", type: "SPICE", tag: "dark" },
    ],
  },

  // ---- ブレ防止（似たことを別角度で） ----
  {
    id: "A-19",
    q: "スタバでドリンクを選ぶ基準は？",
    options: [
      { t: "迷ったら定番", type: "BALANCE", tag: "balance" },
      { t: "その日の気分優先", type: "MOOD", tag: "light" },
      { t: "香りや余韻の説明を見る", type: "AROMA", tag: "aroma" },
      { t: "濃さ・インパクト優先", type: "SPICE", tag: "rich" },
    ],
  },
  {
    id: "A-20",
    q: "深煎りのコーヒーについて",
    options: [
      { t: "大好き", type: "SPICE", tag: "dark" },
      { t: "気分で飲む", type: "MOOD", tag: "rich" },
      { t: "あまり飲まない", type: "BALANCE", tag: "balance" },
      { t: "苦手", type: "AROMA", tag: "light" },
    ],
  },
  {
    id: "A-21",
    q: "浅め（軽やか）なコーヒーについて",
    options: [
      { t: "大好き", type: "AROMA", tag: "light" },
      { t: "たまに飲む", type: "MOOD", tag: "refresh" },
      { t: "あまり飲まない", type: "BALANCE", tag: "balance" },
      { t: "物足りない", type: "SPICE", tag: "rich" },
    ],
  },
  {
    id: "A-22",
    q: "新しいメニューを見ると？",
    options: [
      { t: "まずは定番で安心", type: "BALANCE", tag: "calm" },
      { t: "気分に合えば挑戦", type: "MOOD", tag: "refresh" },
      { t: "香りが面白そうなら即", type: "AROMA", tag: "aroma" },
      { t: "クセ強そうなら即", type: "SPICE", tag: "rich" },
    ],
  },

  // ---- 具体質問③（甘/香/食事の分岐を強める） ----
  {
    id: "A-23",
    q: "この中でコーヒーと一緒に食べたいのは？",
    options: [
      { t: "チョコ系スイーツ", type: "SPICE", tag: "cocoa", w: 2  },
      { t: "チーズ系スイーツ", type: "BALANCE", tag: "nutty" , w: 2 },
      { t: "フルーツ系スイーツ", type: "AROMA", tag: "fruity", w: 2  },
      { t: "甘めのドーナツ系", type: "MOOD", tag: "sweet", w: 2  },
    ],
  },
  {
    id: "A-24",
    q: "食事のあとに飲むならどれがいい？",
    options: [
      { t: "すっきりして口直し", type: "MOOD", tag: "refresh" },
      { t: "落ち着く定番", type: "BALANCE", tag: "calm" },
      { t: "香りで余韻を楽しむ", type: "AROMA", tag: "aroma" },
      { t: "濃くて満足感", type: "SPICE", tag: "rich" },
    ],
  },

  // ---- タイプ締め（後半：納得感を作る） ----
  {
    id: "A-25",
    q: "同じ豆をリピートすることは？",
    options: [
      { t: "よくある", type: "BALANCE", tag: "balance" },
      { t: "たまにある", type: "BALANCE", tag: "calm" },
      { t: "あまりない", type: "MOOD", tag: "light" },
      { t: "ほとんどしない", type: "SPICE", tag: "rich" },
    ],
  },
  {
    id: "A-26",
    q: "コーヒーを飲んだあとに欲しい感覚は？",
    options: [
      { t: "ほっとする", type: "BALANCE", tag: "calm" },
      { t: "すっきりする", type: "MOOD", tag: "refresh" },
      { t: "余韻を楽しむ", type: "AROMA", tag: "aroma" },
      { t: "記憶に残る", type: "SPICE", tag: "rich" },
    ],
  },
  {
    id: "A-27",
    q: "あなたの“コーヒー観”に近いのは？",
    options: [
      { t: "生活の一部（安定）", type: "BALANCE", tag: "balance" },
      { t: "気分を変えるスイッチ", type: "MOOD", tag: "refresh" },
      { t: "香りを楽しむ時間", type: "AROMA", tag: "aroma" },
      { t: "自分に刺さる体験", type: "SPICE", tag: "rich" },
    ],
  },
  {
    id: "A-28",
    q: "“惹かれる説明文”はどれ？",
    options: [
      { t: "なめらか・やさしい", type: "BALANCE", tag: "calm" },
      { t: "軽やか・すっきり", type: "MOOD", tag: "light" },
      { t: "華やか・果実感", type: "AROMA", tag: "fruity" },
      { t: "濃厚・スモーキー", type: "SPICE", tag: "smoky" },
    ],
  },
  {
    id: "A-29",
    q: "いま一番大事にしたいのは？",
    options: [
      { t: "ちょうどよさ", type: "BALANCE", tag: "balance" },
      { t: "すっきり感", type: "MOOD", tag: "refresh" },
      { t: "香り", type: "AROMA", tag: "aroma" },
      { t: "濃さ・個性", type: "SPICE", tag: "rich" },
    ],
  },

  // ---- タイブレーク（最終問） ----
  {
    id: "A-30",
    q: "今のあなたに一番近いのは？",
    options: [
      { t: "安心できる一杯がいい", type: "BALANCE", tag: "calm" },
      { t: "気分で選びたい", type: "MOOD", tag: "light" },
      { t: "香りを楽しみたい", type: "AROMA", tag: "aroma" },
      { t: "少しクセが欲しい", type: "SPICE", tag: "rich" },
    ],
  },
];


// Route B（初心者向け）
export const ROUTE_B_QUESTIONS: QuestionSpec[] = [
  // ---- タイプ基礎（序盤） ----
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
      { t: "落ち着いてゆっくり", type: "BALANCE", tag: "calm" },
      { t: "気分転換", type: "MOOD", tag: "refresh" },
      { t: "香りのある時間", type: "AROMA", tag: "aroma" },
      { t: "ワイワイ楽しく", type: "SPICE", tag: "rich" },
    ],
  },

  // ---- 具体質問（早めに入れて答えやすく） ----
  {
    id: "B-3",
    q: "この中で好きな焼き菓子は？",
    options: [
      { t: "シュガードーナツ", type: "MOOD", tag: "sweet", w: 2  },
      { t: "チョコレートチャンクスコーン", type: "SPICE", tag: "cocoa", w: 2  },
      { t: "アメリカンワッフル", type: "BALANCE", tag: "nutty" , w: 2 },
      { t: "シナモンロール", type: "SPICE", tag: "spice" , w: 2 },
    ],
  },
  {
    id: "B-4",
    q: "この中で好きなケーキは？",
    options: [
      { t: "ニューヨークチーズケーキ", type: "BALANCE", tag: "nutty" , w: 2 },
      { t: "チョコレートタルト", type: "SPICE", tag: "cocoa", w: 2  },
      { t: "オレンジケーキ", type: "AROMA", tag: "citrus", w: 2  },
      { t: "抹茶のロールケーキ", type: "AROMA", tag: "herbal" , w: 2 },
    ],
  },
  {
    id: "B-5",
    q: "この中で好きなフラペチーノは？",
    options: [
      { t: "ダークモカフラペチーノ", type: "SPICE", tag: "cocoa", w: 2  },
      { t: "抹茶クリームフラペチーノ", type: "AROMA", tag: "herbal" , w: 2 },
      { t: "キャラメルフラペチーノ", type: "MOOD", tag: "caramel", w: 2  },
      { t: "コーヒーフラペチーノ", type: "BALANCE", tag: "balance", w: 2  },
    ],
  },
  {
    id: "B-6",
    q: "この中で好きなフルーツは？",
    options: [
      { t: "イチゴ", type: "AROMA", tag: "berry", w: 2  },
      { t: "バナナ", type: "BALANCE", tag: "calm" , w: 2 },
      { t: "ピーチ", type: "MOOD", tag: "fruity", w: 2  },
      { t: "オレンジ", type: "AROMA", tag: "citrus" , w: 2 },
    ],
  },

  // ---- 初心者向けの味の自己申告（やさしく） ----
  {
    id: "B-7",
    q: "苦い味について",
    options: [
      { t: "好き", type: "SPICE", tag: "dark" },
      { t: "少しなら", type: "BALANCE", tag: "balance" },
      { t: "苦手", type: "MOOD", tag: "light" },
      { t: "できれば避けたい", type: "MOOD", tag: "light" },
    ],
  },
  {
    id: "B-8",
    q: "フルーティな味の印象は？",
    options: [
      { t: "好き", type: "AROMA", tag: "fruity" },
      { t: "興味がある", type: "AROMA", tag: "citrus" },
      { t: "よく分からない", type: "BALANCE", tag: "balance" },
      { t: "あまり惹かれない", type: "SPICE", tag: "rich" },
    ],
  },

  // ---- 具体質問②（食事系でrich/spiceを拾う） ----
  {
    id: "B-9",
    q: "この中で好きな石窯フィローネは？",
    options: [
      { t: "ハム＆マリボーチーズの石窯フィローネ", type: "BALANCE", tag: "balance", w: 2  },
      { t: "ヴィーナソーセージ石窯フィローネ", type: "SPICE", tag: "rich", w: 2  },
      { t: "キーマカレー石窯フィローネ", type: "SPICE", tag: "spice", w: 2  },
      { t: "バジルチキン＆トマトモッツァレラ石窯フィローネ", type: "AROMA", tag: "refresh", w: 2  },
    ],
  },
  {
    id: "B-10",
    q: "甘いものは？",
    options: [
      { t: "大好き", type: "MOOD", tag: "sweet" },
      { t: "ほどほど", type: "BALANCE", tag: "balance" },
      { t: "たまに", type: "AROMA", tag: "light" },
      { t: "あまり食べない", type: "SPICE", tag: "dark" },
    ],
  },

  // ---- ブレ防止（別角度） ----
  {
    id: "B-11",
    q: "香りのあるものは？",
    options: [
      { t: "とても好き", type: "AROMA", tag: "aroma" },
      { t: "好き", type: "AROMA", tag: "floral" },
      { t: "あまり気にしない", type: "BALANCE", tag: "balance" },
      { t: "苦手", type: "MOOD", tag: "light" },
    ],
  },
  {
    id: "B-12",
    q: "気分転換したいときは？",
    options: [
      { t: "甘いもの", type: "MOOD", tag: "sweet" },
      { t: "散歩", type: "MOOD", tag: "refresh" },
      { t: "音楽", type: "AROMA", tag: "calm" },
      { t: "何か飲む", type: "BALANCE", tag: "balance" },
    ],
  },
  {
    id: "B-13",
    q: "落ち着く場所は？",
    options: [
      { t: "家", type: "BALANCE", tag: "calm" },
      { t: "カフェ", type: "AROMA", tag: "aroma" },
      { t: "自然", type: "AROMA", tag: "refresh" },
      { t: "特にない", type: "MOOD", tag: "light" },
    ],
  },

  // ---- 具体質問③（香り/甘み/ビターの方向） ----
  {
    id: "B-14",
    q: "この中で惹かれる香りは？",
    options: [
      { t: "チョコ・ココア", type: "SPICE", tag: "cocoa" },
      { t: "キャラメル", type: "MOOD", tag: "caramel" },
      { t: "柑橘（オレンジ系）", type: "AROMA", tag: "citrus" },
      { t: "ハーブ/抹茶っぽい", type: "AROMA", tag: "herbal" },
    ],
  },
  {
    id: "B-15",
    q: "好きな“甘さ”はどれに近い？",
    options: [
      { t: "控えめが好き", type: "BALANCE", tag: "calm" },
      { t: "ちょっと甘いのが好き", type: "MOOD", tag: "sweet" },
      { t: "キャラメルっぽい甘さが好き", type: "MOOD", tag: "caramel" },
      { t: "甘さよりビター", type: "SPICE", tag: "dark" },
    ],
  },

  // ---- タイプを固める（中盤〜後半） ----
  {
    id: "B-16",
    q: "どんな時間にコーヒーを飲みたい？",
    options: [
      { t: "朝", type: "MOOD", tag: "refresh" },
      { t: "昼", type: "BALANCE", tag: "balance" },
      { t: "夜", type: "AROMA", tag: "calm" },
      { t: "まだ決まっていない", type: "MOOD", tag: "light" },
    ],
  },
  {
    id: "B-17",
    q: "新しいものに出会うと？",
    options: [
      { t: "ワクワクする", type: "SPICE", tag: "rich" },
      { t: "少し様子を見る", type: "BALANCE", tag: "balance" },
      { t: "人のおすすめ次第", type: "BALANCE", tag: "calm" },
      { t: "あまり選ばない", type: "MOOD", tag: "light" },
    ],
  },
  {
    id: "B-18",
    q: "休日はどちら派？",
    options: [
      { t: "のんびり", type: "BALANCE", tag: "calm" },
      { t: "予定ぎっしり", type: "SPICE", tag: "rich" },
      { t: "気分次第", type: "MOOD", tag: "light" },
      { t: "まだ決めない", type: "MOOD", tag: "balance" },
    ],
  },
  {
    id: "B-19",
    q: "選択肢が多いときは？",
    options: [
      { t: "じっくり選ぶ", type: "BALANCE", tag: "balance" },
      { t: "直感", type: "MOOD", tag: "light" },
      { t: "人に任せる", type: "BALANCE", tag: "calm" },
      { t: "迷ってしまう", type: "AROMA", tag: "aroma" },
    ],
  },

  // ---- 具体質問④（最後に豆差をもう一回） ----
  {
    id: "B-20",
    q: "この中でコーヒーと一緒に食べたいのは？",
    options: [
      { t: "チョコ系スイーツ", type: "SPICE", tag: "cocoa" , w: 2 },
      { t: "チーズ系スイーツ", type: "BALANCE", tag: "nutty", w: 2  },
      { t: "フルーツ系スイーツ", type: "AROMA", tag: "fruity" , w: 2 },
      { t: "甘めのドーナツ系", type: "MOOD", tag: "sweet", w: 2  },
    ],
  },
  {
    id: "B-21",
    q: "食事のあとに飲むならどれがいい？",
    options: [
      { t: "すっきりして口直し", type: "MOOD", tag: "refresh" },
      { t: "落ち着く定番", type: "BALANCE", tag: "calm" },
      { t: "香りで余韻を楽しむ", type: "AROMA", tag: "aroma" },
      { t: "濃くて満足感", type: "SPICE", tag: "rich" },
    ],
  },

  // ---- 最終調整（タイプ・納得感） ----
  {
    id: "B-22",
    q: "「大人っぽい」と感じるのは？",
    options: [
      { t: "落ち着いた空間", type: "BALANCE", tag: "calm" },
      { t: "静かな時間", type: "AROMA", tag: "aroma" },
      { t: "香りのあるもの", type: "AROMA", tag: "floral" },
      { t: "ちょっとクセのあるもの", type: "SPICE", tag: "rich" },
    ],
  },
  {
    id: "B-23",
    q: "飲み物に求めるのは？",
    options: [
      { t: "飲みやすさ", type: "BALANCE", tag: "balance" },
      { t: "気分の変化", type: "MOOD", tag: "refresh" },
      { t: "香り", type: "AROMA", tag: "aroma" },
      { t: "印象", type: "SPICE", tag: "rich" },
    ],
  },
  {
    id: "B-24",
    q: "朝の過ごし方は？",
    options: [
      { t: "ゆっくり", type: "BALANCE", tag: "calm" },
      { t: "バタバタ", type: "MOOD", tag: "refresh" },
      { t: "その日次第", type: "MOOD", tag: "light" },
      { t: "朝は苦手", type: "AROMA", tag: "calm" },
    ],
  },
  {
    id: "B-25",
    q: "初めてのことに挑戦するときは？",
    options: [
      { t: "ワクワク", type: "SPICE", tag: "rich" },
      { t: "少し不安", type: "BALANCE", tag: "calm" },
      { t: "誰かと一緒なら", type: "BALANCE", tag: "balance" },
      { t: "あまりしない", type: "MOOD", tag: "light" },
    ],
  },
  {
    id: "B-26",
    q: "コーヒーを飲むなら、どんな気分で？",
    options: [
      { t: "落ち着きたい", type: "BALANCE", tag: "calm" },
      { t: "すっきりしたい", type: "MOOD", tag: "refresh" },
      { t: "香りを楽しみたい", type: "AROMA", tag: "aroma" },
      { t: "ちょっと刺激", type: "SPICE", tag: "rich" },
    ],
  },
  {
    id: "B-27",
    q: "季節で惹かれるのは？",
    options: [
      { t: "春", type: "AROMA", tag: "floral" },
      { t: "夏", type: "MOOD", tag: "refresh" },
      { t: "秋", type: "BALANCE", tag: "nutty" },
      { t: "冬", type: "SPICE", tag: "dark" },
    ],
  },
  {
    id: "B-28",
    q: "「これは自分らしい」と思うのは？",
    options: [
      { t: "安心感", type: "BALANCE", tag: "balance" },
      { t: "気分", type: "MOOD", tag: "light" },
      { t: "雰囲気", type: "AROMA", tag: "aroma" },
      { t: "個性", type: "SPICE", tag: "rich" },
    ],
  },
  {
    id: "B-29",
    q: "いま一番大事にしたいのは？",
    options: [
      { t: "ちょうどよさ", type: "BALANCE", tag: "balance" },
      { t: "すっきり感", type: "MOOD", tag: "refresh" },
      { t: "香り", type: "AROMA", tag: "aroma" },
      { t: "濃さ・個性", type: "SPICE", tag: "rich" },
    ],
  },

  // ---- タイブレーク（最終問） ----
  {
    id: "B-30",
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
