// src/data/beanDetails.ts

export type BeanDetail = {
  id: string;
  photoFile: string;
  logoFile: string;
  description: string;
  keyword: string;
  roast: number;
  acidity: number;
  body: number;
  recommended: {
    brewMethodTitle: string;
    brewMethodLines: string[];
    tipsText: string[];
    bestTimes: string[];
    foodPairing: string[];
  };
};

export const BEAN_DETAILS: Record<string, BeanDetail> = {
  "lightnote": {
    id: "lightnote",
    photoFile: "lightnote-blend.jpg",
    logoFile: "lightnote-blend-logo.jpg",
    description:
      "ミルクチョコレートのような風味、モルトを思わせる香ばしさと甘みが特徴の穏やかな味わいのコーヒーです。創業当初から私たちと深いつながりをもつラテンアメリカ産のコーヒーを、軽めの焙煎で仕上げました。",
    keyword: "軽めのコクとミルクチョコレートのような風味",
    roast: 1,
    acidity: 4,
    body: 1,
    recommended: {
      brewMethodTitle: "ペーパードリップ",
      brewMethodLines: [
        "挽き目：中挽き",
        "湯温：92〜96℃",
      ],
      tipsText: [
        "浅煎りの豆は成分が溶け出しにくいため、やや高めの湯温で、最初にしっかり蒸らすことが重要。",
        "注湯は一気に行わず、数回に分けてゆっくり注ぐことで、味の薄さや未抽出を防ぐことができる。",
      ],
      bestTimes: ["朝〜午前中", "勉強・作業前"],
      foodPairing: ["ミルクチョコレート", "煎ったナッツ"],
    },
  },
  "blonde-espresso": {
    id: "blonde-espresso",
    photoFile: "blonde-espresso-roast.jpg",
    logoFile: "blonde-espresso-roast-logo.jpg",
    description:
      "エスプレッソ用に開発されたライトロースト。滑らかな口当たりと、ほのかな甘みが特徴です。通常のエスプレッソよりもマイルドで飲みやすく、ラテやカプチーノにも最適です。",
    keyword: "滑らかで優しいエスプレッソ",
    roast: 1,
    acidity: 3,
    body: 2,
    recommended: {
      brewMethodTitle: "エスプレッソマシン",
      brewMethodLines: [
        "挽き目：細挽き",
        "使用量：18-20g",
        "抽出時間：25-30秒",
      ],
      tipsText: [
        "ライトローストでもエスプレッソの濃厚さを楽しめます。",
        "カフェラテにすると、ミルクの甘みと調和して絶品です。",
      ],
      bestTimes: ["朝食後", "午後のリラックスタイム", "友人との会話時"],
      foodPairing: ["ビスコッティ", "チーズケーキ", "マフィン", "クッキー"],
    },
  },
  "breakfast": {
    id: "breakfast",
    photoFile: "breakfast-blend.jpg",
    logoFile: "breakfast-blend-logo.jpg",
    description:
      "朝にぴったりの明るく活気のあるブレンド。バランスの取れた味わいで、酸味と甘みが調和しています。一日の始まりにエネルギーを与えてくれる、爽やかな一杯です。",
    keyword: "明るく活気のある朝",
    roast: 2,
    acidity: 5,
    body: 2,
    recommended: {
      brewMethodTitle: "ドリップコーヒーメーカー",
      brewMethodLines: [
        "挽き目：中挽き",
        "使用量：水200mlに対して豆12-15g",
      ],
      tipsText: [
        "朝の定番として、毎日飲んでも飽きない味わいです。",
        "トースト類との相性が良く、朝食のお供に最適です。",
      ],
      bestTimes: ["朝食時", "朝のミーティング前", "週末のブランチ"],
      foodPairing: ["トースト", "オムレツ", "パンケーキ", "グラノーラ"],
    },
  },
  "siren": {
    id: "siren",
    photoFile: "siren-blend.jpg",
    logoFile: "siren-blend-logo.jpg",
    description:
      "スターバックスを代表するブレンド。中煎りの豊かな風味と、滑らかな口当たりが特徴です。バランスが良く、どんな場面でも楽しめる万能なコーヒーです。",
    keyword: "バランスの取れた定番の味",
    roast: 3,
    acidity: 4,
    body: 3,
    recommended: {
      brewMethodTitle: "フレンチプレス",
      brewMethodLines: [
        "挽き目：粗挽き",
        "湯温：93-96℃",
        "抽出時間：4分",
      ],
      tipsText: [
        "フレンチプレスで淹れると、豆本来のオイルと風味を楽しめます。",
        "ゆっくりとプレスを押し下げることがコツです。",
      ],
      bestTimes: ["いつでも", "仕事の合間", "リラックスタイム"],
      foodPairing: [
        "チョコレート",
        "ナッツ類",
        "キャラメル系スイーツ",
        "チーズ",
      ],
    },
  },
  "kenya": {
    id: "kenya",
    photoFile: "kenya.jpg",
    logoFile: "kenya-logo.jpg",
    description:
      "ケニア産の高品質なシングルオリジン。明るい酸味と、グレープフルーツのような爽やかなフレーバーが特徴です。クリアで複雑な味わいを持つ、個性的なコーヒーです。",
    keyword: "明るく爽やかなアフリカの風",
    roast: 3,
    acidity: 5,
    body: 3,
    recommended: {
      brewMethodTitle: "ハンドドリップ（V60）",
      brewMethodLines: [
        "挽き目：中細挽き",
        "湯温：90-93℃",
        "抽出時間：3分程度",
      ],
      tipsText: [
        "明るい酸味を楽しむため、抽出温度は高めがおすすめです。",
        "フルーツのような香りを引き出すため、丁寧に淹れましょう。",
      ],
      bestTimes: ["午前中", "集中作業の前", "気分転換"],
      foodPairing: [
        "ベリー系スイーツ",
        "レモンケーキ",
        "軽めのサラダ",
        "フルーツ",
      ],
    },
  },
  "pike-place": {
    id: "pike-place",
    photoFile: "pike-place-roast.jpg",
    logoFile: "pike-place-roast-logo.jpg",
    description:
      "スターバックス1号店の名を冠したブレンド。滑らかでバランスの取れた味わいが特徴です。ココアのような風味と、穏やかな酸味が調和した、毎日飲みたくなるコーヒーです。",
    keyword: "滑らかでバランスの良い毎日の一杯",
    roast: 3,
    acidity: 3,
    body: 3,
    recommended: {
      brewMethodTitle: "ドリップコーヒー",
      brewMethodLines: [
        "挽き目：中挽き",
        "湯温：90-93℃",
      ],
      tipsText: [
        "最もバランスが良く、誰にでも楽しめる味わいです。",
        "朝から夜まで、いつでも美味しく飲めます。",
      ],
      bestTimes: ["いつでも", "仕事中", "会議の休憩"],
      foodPairing: ["あらゆる食事", "サンドイッチ", "ケーキ類", "クッキー"],
    },
  },
  "guatemala": {
    id: "guatemala",
    photoFile: "guatemala-antigua.jpg",
    logoFile: "guatemala-antigua-logo.jpg",
    description:
      "グアテマラのアンティグア地方で育まれた高品質豆。チョコレートのような深い風味と、ほのかなスパイシーさが特徴です。複雑で洗練された味わいを楽しめます。",
    keyword: "チョコレートのような深い風味",
    roast: 4,
    acidity: 3,
    body: 4,
    recommended: {
      brewMethodTitle: "サイフォン",
      brewMethodLines: [
        "挽き目：中挽き",
        "抽出時間：1-2分",
      ],
      tipsText: [
        "サイフォンで淹れると、香りが一層引き立ちます。",
        "ゆっくりと味わいながら飲むのがおすすめです。",
      ],
      bestTimes: ["午後", "デザートタイム", "特別な時間"],
      foodPairing: [
        "ダークチョコレート",
        "ティラミス",
        "ナッツタルト",
        "チーズ",
      ],
    },
  },
  "house": {
    id: "house",
    photoFile: "house-blend.jpg",
    logoFile: "house-blend-logo.jpg",
    description:
      "スターバックスを代表するブレンド。中深煎りの豊かな風味と、バランスの取れた味わいが特徴です。ナッツやココアのような香ばしさがあり、幅広い層に愛されています。",
    keyword: "豊かで香ばしい定番の味",
    roast: 3,
    acidity: 4,
    body: 3,
    recommended: {
      brewMethodTitle: "ドリップコーヒー",
      brewMethodLines: [
        "挽き目：中挽き",
        "湯温：91-94℃",
      ],
      tipsText: [
        "最もスタンダードで、失敗しにくいブレンドです。",
        "ミルクを加えても美味しく楽しめます。",
      ],
      bestTimes: ["いつでも", "朝食", "午後の休憩"],
      foodPairing: ["焼き菓子", "マフィン", "ドーナツ", "朝食メニュー全般"],
    },
  },
  "decaf-house": {
    id: "decaf-house",
    photoFile: "decaf-house-blend.jpg",
    logoFile: "decaf-house-blend-logo.jpg",
    description:
      "ハウスブレンドのデカフェ版。カフェインを気にせず、豊かな風味を楽しめます。通常版と変わらない味わいで、夜でも安心して飲めるコーヒーです。",
    keyword: "夜でも安心の豊かな味わい",
    roast: 3,
    acidity: 3,
    body: 3,
    recommended: {
      brewMethodTitle: "ドリップコーヒー",
      brewMethodLines: [
        "挽き目：中挽き",
        "湯温：91-94℃",
      ],
      tipsText: [
        "カフェインを気にせず、いつでも楽しめます。",
        "就寝前でも安心して飲めるのが魅力です。",
      ],
      bestTimes: ["夜", "就寝前", "カフェインを控えたい時"],
      foodPairing: ["夜のデザート", "チョコレート", "クッキー", "ケーキ"],
    },
  },
  "colombia": {
    id: "colombia",
    photoFile: "colombia.jpg",
    logoFile: "colombia-logo.jpg",
    description:
      "コロンビア産のシングルオリジン。ナッツのような風味と、バランスの取れた酸味が特徴です。柔らかな口当たりで、飲みやすく親しみやすいコーヒーです。",
    keyword: "ナッツのような優しい風味",
    roast: 3,
    acidity: 4,
    body: 3,
    recommended: {
      brewMethodTitle: "ペーパードリップ",
      brewMethodLines: [
        "挽き目：中挽き",
        "湯温：90-93℃",
        "抽出時間：3-4分",
      ],
      tipsText: [
        "ナッツのような風味を引き出すため、丁寧に淹れましょう。",
        "ミルクを少し加えると、さらにまろやかになります。",
      ],
      bestTimes: ["午後", "リラックスタイム", "読書のお供"],
      foodPairing: [
        "ナッツ系スイーツ",
        "キャラメル",
        "バナナブレッド",
        "クッキー",
      ],
    },
  },
  "tokyo": {
    id: "tokyo",
    photoFile: "tokyo-roast.jpg",
    logoFile: "tokyo-roast-logo.jpg",
    description:
      "東京限定のブレンド。深煎りの力強い味わいと、スモーキーな香りが特徴です。濃厚でコクがあり、ミルクとの相性も抜群です。",
    keyword: "力強く濃厚な東京の味",
    roast: 3,
    acidity: 3,
    body: 3,
    recommended: {
      brewMethodTitle: "エスプレッソ / カフェラテ",
      brewMethodLines: [
        "挽き目：細挽き",
        "抽出方法：エスプレッソ",
      ],
      tipsText: [
        "深煎りの力強さを楽しむなら、エスプレッソがおすすめです。",
        "ミルクを加えると、まろやかで濃厚なラテになります。",
      ],
      bestTimes: ["午後", "集中したい時", "エネルギーチャージ"],
      foodPairing: [
        "ティラミス",
        "チョコレートケーキ",
        "和菓子",
        "ビターなスイーツ",
      ],
    },
  },
  "sumatra": {
    id: "sumatra",
    photoFile: "sumatra.jpg",
    logoFile: "sumatra-logo.jpg",
    description:
      "インドネシア・スマトラ島産のシングルオリジン。アーシーで力強い風味と、ハーブのような独特な香りが特徴です。濃厚でコクがあり、個性的な味わいを楽しめます。",
    keyword: "力強くアーシーな大地の味",
    roast: 4,
    acidity: 1,
    body: 5,
    recommended: {
      brewMethodTitle: "フレンチプレス",
      brewMethodLines: [
        "挽き目：粗挽き",
        "湯温：93-96℃",
        "抽出時間：4-5分",
      ],
      tipsText: [
        "フレンチプレスで淹れると、オイリーで濃厚な味わいになります。",
        "ゆっくり楽しむのに最適なコーヒーです。",
      ],
      bestTimes: ["朝", "集中作業の前", "深夜作業"],
      foodPairing: [
        "ダークチョコレート",
        "ハードチーズ",
        "ナッツ類",
        "スパイシーな料理",
      ],
    },
  },
  "komodo": {
    id: "komodo",
    photoFile: "komodo-dragon-blend.jpg",
    logoFile: "komodo-dragon-blend-logo.jpg",
    description:
      "インドネシアとアジア太平洋地域のブレンド。複雑で力強い風味と、ハーブのようなアロマが特徴です。深煎りの濃厚さと、スパイシーな余韻を楽しめます。",
    keyword: "複雑で力強いドラゴンの息吹",
    roast: 4,
    acidity: 2,
    body: 4,
    recommended: {
      brewMethodTitle: "コールドブリュー",
      brewMethodLines: [
        "挽き目：粗挽き",
        "抽出時間：冷水で12-24時間",
      ],
      tipsText: [
        "コールドブリューにすると、まろやかで濃厚な味わいになります。",
        "アイスコーヒーとしても最高です。",
      ],
      bestTimes: ["夏", "午後", "リフレッシュしたい時"],
      foodPairing: [
        "ビターなスイーツ",
        "チョコレート",
        "焼き菓子",
        "ナッツ",
      ],
    },
  },
  "espresso": {
    id: "espresso",
    photoFile: "espresso-roast.jpg",
    logoFile: "espresso-roast-logo.jpg",
    description:
      "エスプレッソ用に開発された深煎りブレンド。力強く濃厚な味わいと、キャラメルのような甘みが特徴です。エスプレッソはもちろん、ラテやカプチーノにも最適です。",
    keyword: "力強く濃厚なエスプレッソ",
    roast: 4,
    acidity: 2,
    body: 4,
    recommended: {
      brewMethodTitle: "エスプレッソマシン",
      brewMethodLines: [
        "挽き目：極細挽き",
        "使用量：18-20g",
        "抽出時間：25-30秒",
      ],
      tipsText: [
        "濃厚なクレマを楽しむため、新鮮な豆を使いましょう。",
        "ミルクを加えると、リッチなラテになります。",
      ],
      bestTimes: ["朝", "午後", "集中したい時"],
      foodPairing: [
        "ビスコッティ",
        "チョコレート",
        "ティラミス",
        "パンナコッタ",
      ],
    },
  },
  "italian": {
    id: "italian",
    photoFile: "italian-roast.jpg",
    logoFile: "italian-roast-logo.jpg",
    description:
      "最も深煎りのブレンド。力強く、スモーキーで濃厚な味わいが特徴です。ビターでコクがあり、ミルクと合わせると絶品です。本格的なイタリアンスタイルを楽しめます。",
    keyword: "スモーキーで濃厚なイタリアの伝統",
    roast: 5,
    acidity: 1,
    body: 5,
    recommended: {
      brewMethodTitle: "エスプレッソ / カプチーノ",
      brewMethodLines: [
        "挽き目：極細挽き",
        "抽出方法：高圧抽出",
      ],
      tipsText: [
        "深煎りの力強さを最大限に楽しむなら、エスプレッソがおすすめです。",
        "カプチーノにすると、ミルクの甘みと調和します。",
      ],
      bestTimes: ["朝食後", "午後", "デザートタイム"],
      foodPairing: [
        "ティラミス",
        "パンナコッタ",
        "ビスケット",
        "ダークチョコレート",
      ],
    },
  },
  "french": {
    id: "french",
    photoFile: "french-roast.jpg",
    logoFile: "french-roast-logo.jpg",
    description:
      "極深煎りのブレンド。スモーキーで力強い味わいと、ビターな余韻が特徴です。濃厚でコクがあり、深い焙煎の香ばしさを存分に楽しめます。",
    keyword: "スモーキーで力強いフレンチスタイル",
    roast: 5,
    acidity: 1,
    body: 4,
    recommended: {
      brewMethodTitle: "フレンチプレス",
      brewMethodLines: [
        "挽き目：粗挽き",
        "湯温：93-96℃",
        "抽出時間：4-5分",
      ],
      tipsText: [
        "極深煎りの香ばしさを楽しむなら、フレンチプレスがおすすめです。",
        "ゆっくりと時間をかけて味わいましょう。",
      ],
      bestTimes: ["朝", "深夜", "集中作業"],
      foodPairing: [
        "ダークチョコレート",
        "ハードチーズ",
        "ビターなスイーツ",
        "ナッツ",
      ],
    },
  },
};
