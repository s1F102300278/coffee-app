// src/data/beans.ts

export type CoffeeBean = {
  id: string;
  name: string;
  roast: number;   // 1 (LIGHT) - 5 (DARK)
  acidity: number; // 1 (LOW)   - 5 (HIGH)
  body: number;    // 1 (LIGHT) - 5 (FULL)
  note: string;

  // 画像ファイル名（public配下）
  photoFile: string;
  logoFile: string;

  // 詳細情報
  description: string;
  keyword: string;
  recommended: {
    brewMethodTitle: string;
    brewMethodLines: string[];
    tipsText: [string, string]; // 2文
    bestTimes: string[];
    foodPairing: string[];
  };
};

export const COFFEE_BEANS: CoffeeBean[] = [
  {
    id: "lightnote",
    name: "ライトノートブレンド",
    roast: 1,
    acidity: 4,
    body: 1,
    note: "軽やかで透明感のある味わい。すっきり飲みたいときに。",
    photoFile: "Lightnote-Blend.jpg",
    logoFile: "Lightnote-Blend.jpg",
    description: "やわらかな口当たりと、ほのかに感じる甘さが特徴のブレンド。朝の目覚めや午後のリフレッシュに最適で、軽やかな飲み心地が続きます。",
    keyword: "爽やかな朝の一杯",
    recommended: {
      brewMethodTitle: "ペーパードリップ",
      brewMethodLines: ["中挽き", "92°C", "3分"],
      tipsText: ["浅めの焙煎なので、お湯の温度は少し高めがおすすめです。", "ゆっくり注いで香りを引き出しましょう。"],
      bestTimes: ["朝食", "ブランチ", "午後のティータイム"],
      foodPairing: ["フルーツタルト", "ヨーグルト", "クロワッサン"]
    }
  },
  {
    id: "blonde-espresso",
    name: "ブロンドエスプレッソロースト",
    roast: 1,
    acidity: 3,
    body: 2,
    note: "やさしい口当たりで、エスプレッソ初心者にもおすすめ。",
    photoFile: "Blonde-Espresso-Roast.jpg",
    logoFile: "Blonde-Espresso-Roast.jpg",
    description: "軽めのロースト感とマイルドな味わいで、エスプレッソの世界に初めて触れる方にも親しみやすい一杯。ミルクとの相性も抜群です。",
    keyword: "やさしいエスプレッソ体験",
    recommended: {
      brewMethodTitle: "エスプレッソマシン",
      brewMethodLines: ["細挽き", "93°C", "25秒抽出"],
      tipsText: ["ミルクを加えてラテにするのもおすすめです。", "短時間で抽出することで、すっきりした味わいに。"],
      bestTimes: ["朝", "ブランチ", "午後のひととき"],
      foodPairing: ["ビスコッティ", "パンケーキ", "マフィン"]
    }
  },
  {
    id: "breakfast",
    name: "ブレックファーストブレンド",
    roast: 2,
    acidity: 5,
    body: 2,
    note: "すっきりとした酸味で、朝の一杯にぴったり。",
    photoFile: "Breakfast-Blend.jpg",
    logoFile: "Breakfast-Blend.jpg",
    description: "明るい酸味とクリアな味わいが特徴で、一日の始まりを爽やかに演出。軽やかで飲みやすく、朝食と一緒に楽しむのに最適です。",
    keyword: "爽快な目覚めの味",
    recommended: {
      brewMethodTitle: "ドリップコーヒー",
      brewMethodLines: ["中挽き", "90°C", "3〜4分"],
      tipsText: ["酸味を楽しむために、少し低めの温度で抽出しましょう。", "朝食と合わせて、一日の活力を。"],
      bestTimes: ["朝食", "モーニングミーティング"],
      foodPairing: ["トースト", "オムレツ", "フルーツサラダ"]
    }
  },
  {
    id: "siren",
    name: "サイレンブレンド",
    roast: 2,
    acidity: 4,
    body: 3,
    note: "バランスがよく、どんなシーンでも楽しめる味わい。",
    photoFile: "Siren-Blend.jpg",
    logoFile: "Siren-Blend.jpg",
    description: "酸味、苦味、コクのバランスが絶妙で、どのシーンにもマッチする万能ブレンド。初めての方にも、毎日の定番にもおすすめです。",
    keyword: "どんな時も寄り添う一杯",
    recommended: {
      brewMethodTitle: "ペーパードリップ",
      brewMethodLines: ["中挽き", "92°C", "3〜4分"],
      tipsText: ["バランスの良さを活かして、ストレートで楽しむのがおすすめ。", "ミルクを加えても美味しくいただけます。"],
      bestTimes: ["朝", "午後", "夕方"],
      foodPairing: ["サンドイッチ", "クッキー", "チーズケーキ"]
    }
  },
  {
    id: "kenya",
    name: "ケニア",
    roast: 3,
    acidity: 5,
    body: 3,
    note: "明るい酸味が特徴で、個性を楽しみたいときに。",
    photoFile: "Kenya.jpg",
    logoFile: "Kenya.jpg",
    description: "フルーティーで鮮やかな酸味と、複雑な風味が魅力のシングルオリジン。コーヒーの奥深さを味わいたい方にぴったりです。",
    keyword: "鮮烈な酸味の個性派",
    recommended: {
      brewMethodTitle: "フレンチプレス",
      brewMethodLines: ["粗挽き", "93°C", "4分"],
      tipsText: ["豆の個性を引き出すために、少し時間をかけて抽出を。", "ストレートで飲むと、風味の違いがよくわかります。"],
      bestTimes: ["午後", "読書タイム", "リラックス時"],
      foodPairing: ["ベリータルト", "ダークチョコレート", "ナッツ"]
    }
  },
  {
    id: "pike-place",
    name: "パイクプレイスロースト",
    roast: 3,
    acidity: 3,
    body: 3,
    note: "毎日飲んでも飽きにくい、定番の味わい。",
    photoFile: "Pike-Place-Roast.jpg",
    logoFile: "Pike-Place-Roast.jpg",
    description: "スターバックス発祥の地、パイクプレイスマーケットの名を冠したブレンド。なめらかでバランスが良く、毎日楽しめる定番の味わいです。",
    keyword: "毎日の定番、飽きのこない味",
    recommended: {
      brewMethodTitle: "ペーパードリップ",
      brewMethodLines: ["中挽き", "92°C", "3分"],
      tipsText: ["定番の味わいなので、どんな淹れ方でも失敗しにくいです。", "ミルクを足してカフェオレにしても◎"],
      bestTimes: ["朝", "ランチ後", "午後"],
      foodPairing: ["ベーグル", "マフィン", "クッキー"]
    }
  },
  {
    id: "guatemala",
    name: "グアテマラアンティグア",
    roast: 3,
    acidity: 3,
    body: 4,
    note: "コクと甘みのある、しっかりとした飲みごたえ。",
    photoFile: "Guatemala-Antigua.jpg",
    logoFile: "Guatemala-Antigua.jpg",
    description: "チョコレートのような甘みと、深いコクが感じられるシングルオリジン。ゆったりとした時間にじっくり味わいたい一杯です。",
    keyword: "深いコクと甘み",
    recommended: {
      brewMethodTitle: "フレンチプレス",
      brewMethodLines: ["粗挽き", "94°C", "4分"],
      tipsText: ["コクを引き出すために、しっかり蒸らしましょう。", "ミルクチョコと一緒に楽しむと相性抜群です。"],
      bestTimes: ["午後", "リラックスタイム", "デザート後"],
      foodPairing: ["チョコレートケーキ", "キャラメル", "ナッツ"]
    }
  },
  {
    id: "house",
    name: "ハウスブレンド",
    roast: 3,
    acidity: 4,
    body: 3,
    note: "バランスがよく、初めての一杯にも選びやすい。",
    photoFile: "House-Blend.jpg",
    logoFile: "House-Blend.jpg",
    description: "スターバックスを代表する定番ブレンド。酸味と苦味のバランスが良く、どんなシーンにもフィットする万能な味わいです。",
    keyword: "スターバックスの顔",
    recommended: {
      brewMethodTitle: "ドリップコーヒー",
      brewMethodLines: ["中挽き", "92°C", "3〜4分"],
      tipsText: ["定番の味わいは、どんな淹れ方でも安定して美味しい。", "初めての方も、毎日飲みたい方も満足できる一杯です。"],
      bestTimes: ["朝", "昼", "夕方"],
      foodPairing: ["サンドイッチ", "スコーン", "クッキー"]
    }
  },
  {
    id: "decaf-house",
    name: "ディカフェハウスブレンド",
    roast: 3,
    acidity: 3,
    body: 3,
    note: "時間を選ばず楽しめる、やさしい味わい。",
    photoFile: "Decaf-House-Blend.jpg",
    logoFile: "Decaf-House-Blend.jpg",
    description: "カフェインを気にせず楽しめる、ハウスブレンドのディカフェ版。夜のリラックスタイムや、カフェインを控えたい方におすすめです。",
    keyword: "夜も安心の優しい味",
    recommended: {
      brewMethodTitle: "ペーパードリップ",
      brewMethodLines: ["中挽き", "92°C", "3分"],
      tipsText: ["カフェインレスでも味わいはしっかり。夜でも安心です。", "ミルクを加えても美味しくいただけます。"],
      bestTimes: ["夜", "就寝前", "リラックスタイム"],
      foodPairing: ["クッキー", "チーズケーキ", "チョコレート"]
    }
  },
  {
    id: "colombia",
    name: "コロンビア",
    roast: 3,
    acidity: 4,
    body: 3,
    note: "ナッツ感のある、親しみやすいバランス。",
    photoFile: "Colombia.jpg",
    logoFile: "Colombia.jpg",
    description: "ナッツのような香ばしさと、まろやかな口当たりが特徴のシングルオリジン。親しみやすく、毎日飲んでも飽きにくい味わいです。",
    keyword: "香ばしさとまろやかさ",
    recommended: {
      brewMethodTitle: "ペーパードリップ",
      brewMethodLines: ["中挽き", "92°C", "3〜4分"],
      tipsText: ["ナッツの風味を楽しむために、ストレートで味わうのがおすすめ。", "ミルクとの相性も良く、カフェオレにしても◎"],
      bestTimes: ["朝", "午後", "仕事中"],
      foodPairing: ["アーモンドクッキー", "ピーナッツバター", "ドーナツ"]
    }
  },
  {
    id: "tokyo",
    name: "TOKYOロースト",
    roast: 3,
    acidity: 3,
    body: 4,
    note: "ほどよい苦味とバランスの取れた定番の味。",
    photoFile: "TOKYO-Roast.jpg",
    logoFile: "TOKYO-Roast.jpg",
    description: "東京の街をイメージした、バランスの取れた味わい。ほどよい苦味と深みがあり、日本人の味覚に合わせた一杯です。",
    keyword: "東京の街のように洗練された味",
    recommended: {
      brewMethodTitle: "ペーパードリップ",
      brewMethodLines: ["中挽き", "92°C", "3分"],
      tipsText: ["和菓子との相性も良く、日本茶のような楽しみ方もできます。", "ストレートでも、ミルクを加えても美味しい。"],
      bestTimes: ["朝", "午後", "仕事中"],
      foodPairing: ["どら焼き", "羊羹", "抹茶スイーツ"]
    }
  },
  {
    id: "sumatra",
    name: "スマトラ",
    roast: 4,
    acidity: 1,
    body: 5,
    note: "重厚なコクと独特の風味が特徴。",
    photoFile: "Sumatra.jpg",
    logoFile: "Sumatra.jpg",
    description: "インドネシア・スマトラ島産の豆を使用した、力強いコクとアーシーな風味が魅力のシングルオリジン。深い味わいを求める方に。",
    keyword: "大地を感じる力強さ",
    recommended: {
      brewMethodTitle: "フレンチプレス",
      brewMethodLines: ["粗挽き", "94°C", "4分"],
      tipsText: ["重厚なコクを楽しむために、時間をかけて抽出しましょう。", "ミルクを加えてカフェオレにしても美味しいです。"],
      bestTimes: ["午後", "リラックスタイム", "デザート後"],
      foodPairing: ["ダークチョコレート", "チーズケーキ", "ナッツ"]
    }
  },
  {
    id: "komodo",
    name: "コモドドラゴンブレンド",
    roast: 4,
    acidity: 2,
    body: 4,
    note: "スパイス感と力強さのある、印象的な味わい。",
    photoFile: "Komodo-Dragon-Blend.jpg",
    logoFile: "Komodo-Dragon-Blend.jpg",
    description: "インドネシアとアフリカの豆をブレンドした、スパイシーで力強い味わい。個性的なコーヒーを楽しみたい方におすすめです。",
    keyword: "スパイシーで力強い",
    recommended: {
      brewMethodTitle: "フレンチプレス",
      brewMethodLines: ["粗挽き", "94°C", "4分"],
      tipsText: ["スパイス感を楽しむために、ストレートで味わうのがおすすめ。", "冷やしてアイスコーヒーにしても美味しい。"],
      bestTimes: ["午後", "夕方", "リラックスタイム"],
      foodPairing: ["スパイスケーキ", "ジンジャークッキー", "ダークチョコレート"]
    }
  },
  {
    id: "caffe-verona",
    name: "カフェベロナ",
    roast: 4,
    acidity: 1,
    body: 5,
    note: "ダークココアのような風味とローストの甘み。チョコレートと相性ぴったり。",
    photoFile: "Caffe-Verona.jpg",
    logoFile: "Caffe-Verona.jpg",
    description: "ダークココアやカラメルシュガーを思わせる豊かな味わいのコーヒー。チョコレートと相性ぴったりです。人々を魅了するその味わいから、真実の愛のストーリーで知られる街の名前が付けられたロマンスあふれるコーヒーです。",
    keyword: "ダークココアのような風味とローストの甘みと深み",
    recommended: {
      brewMethodTitle: "フレンチプレス",
      brewMethodLines: ["粗挽き", "94°C", "4分"],
      tipsText: ["ダークココアの風味を引き出すために、じっくり抽出しましょう。", "チョコレートと一緒に楽しむと、相性の良さを実感できます。"],
      bestTimes: ["午後", "デザートタイム", "特別な時間"],
      foodPairing: ["ミルクチョコレート", "ダークチョコレート", "カラメル"]
    }
  },
  {
    id: "espresso",
    name: "エスプレッソロースト",
    roast: 5,
    acidity: 2,
    body: 5,
    note: "ミルクとの相性がよく、ラテやカプチーノ向き。",
    photoFile: "Espresso-Roast.jpg",
    logoFile: "Espresso-Roast.jpg",
    description: "エスプレッソ用に深めにローストされたブレンド。ミルクとの相性が抜群で、ラテやカプチーノに最適な濃厚な味わいです。",
    keyword: "ミルクと溶け合う濃厚さ",
    recommended: {
      brewMethodTitle: "エスプレッソマシン",
      brewMethodLines: ["細挽き", "93°C", "25〜30秒"],
      tipsText: ["ミルクを加えてラテやカプチーノにするのがおすすめ。", "短時間で濃厚なエスプレッソを抽出しましょう。"],
      bestTimes: ["朝", "ランチ後", "午後"],
      foodPairing: ["ビスコッティ", "ティラミス", "パンナコッタ"]
    }
  },
  {
    id: "italian",
    name: "イタリアンロースト",
    roast: 6,
    acidity: 1,
    body: 4,
    note: "強い苦味と深いコクを楽しみたい人向け。",
    photoFile: "Italian-Roast.jpg",
    logoFile: "Italian-Roast.jpg",
    description: "深煎りの代表格。強い苦味とスモーキーな風味が特徴で、コーヒーの力強さを存分に味わえる一杯です。",
    keyword: "力強い苦味の極み",
    recommended: {
      brewMethodTitle: "エスプレッソマシン",
      brewMethodLines: ["細挽き", "93°C", "25秒"],
      tipsText: ["濃厚なエスプレッソとして楽しむのがおすすめ。", "ミルクを加えてカフェラテにしても美味しいです。"],
      bestTimes: ["朝", "食後", "集中したいとき"],
      foodPairing: ["ビターチョコレート", "ティラミス", "カンノーリ"]
    }
  },
  {
    id: "french",
    name: "フレンチロースト",
    roast: 6,
    acidity: 1,
    body: 3,
    note: "スモーキーで力強い、深煎り好きの定番。",
    photoFile: "French-Roast.jpg",
    logoFile: "French-Roast.jpg",
    description: "極深煎りのフレンチロースト。スモーキーで力強い味わいは、深煎りコーヒー愛好家の定番として愛され続けています。",
    keyword: "スモーキーな深煎りの王道",
    recommended: {
      brewMethodTitle: "フレンチプレス",
      brewMethodLines: ["粗挽き", "95°C", "4分"],
      tipsText: ["深煎りの風味を引き出すために、高めの温度で抽出を。", "ミルクを加えてカフェオレにするのもおすすめ。"],
      bestTimes: ["朝", "午後", "リラックスタイム"],
      foodPairing: ["ダークチョコレート", "クロワッサン", "チーズケーキ"]
    }
  }
] as const;
