// ============================================================
// data.js — 地理データ(このゲームの「問題集」にあたるファイル)
// 役割: ブロックの種別マスタ・47都道府県・地形と都道府県の対応を定義する。
// ★このファイルはレビュー・編集の対象です。地図帳と照合して間違いがあれば直してください。
// ============================================================
//
// 【データの基準】(設計書 4.3)
// ・河川の対応県は「本流が流れる都道府県」のみ(支流だけの県は含めない)
// ・平野・盆地・山地は「その地形が位置する/広がる都道府県」
// ・確信が持てない対応は収録しない(数より正確性)
//
// 【編集のしかた】
// ・地形を足す: features に1ブロック追加(下の形式をまねる)
// ・新しい種別(湖・半島など)を足す: featureTypes に1行追加してから、
//   その種別の項目を features に追加するだけ。プログラムの変更は不要。
// ・編集したら tools/generate-table.mjs を実行して「データ確認表.md」を作り直す。

const GEO_DATA = {

  // ── 種別マスタ ─────────────────────────────
  // ★新しい種別はここに1行足すだけで追加できます(色・凡例・消去時の文も自動で反映)
  //   color: ブロックの背景色 / icon: 凡例に出す記号 / factTemplate: 消去時に出す文のひな形
  featureTypes: [
    { id: "river",    label: "河川",       color: "#4a90d9", icon: "〜", factTemplate: "{pref}を流れる" },
    { id: "plain",    label: "平野",       color: "#8bc34a", icon: "▱",  factTemplate: "{pref}に広がる" },
    { id: "basin",    label: "盆地",       color: "#f5a623", icon: "◡",  factTemplate: "{pref}にある" },
    { id: "plateau",  label: "台地",       color: "#9575cd", icon: "凸", factTemplate: "{pref}に広がる" },
    { id: "mountain", label: "山地・山脈", color: "#8d6e63", icon: "△",  factTemplate: "{pref}に連なる" }
    // 追加例: { id: "lake", label: "湖", color: "#26c6da", icon: "○", factTemplate: "{pref}にある" }
  ],

  // ── 47都道府県 ─────────────────────────────
  // id はローマ字。features の prefectures にはこの id を書く。
  // region: hokkaido / tohoku / kanto / chubu / kinki / chugoku / shikoku / kyushu
  prefectures: [
    { id: "hokkaido",  name: "北海道",   kana: "ほっかいどう",   region: "hokkaido" },
    { id: "aomori",    name: "青森県",   kana: "あおもりけん",   region: "tohoku" },
    { id: "iwate",     name: "岩手県",   kana: "いわてけん",     region: "tohoku" },
    { id: "miyagi",    name: "宮城県",   kana: "みやぎけん",     region: "tohoku" },
    { id: "akita",     name: "秋田県",   kana: "あきたけん",     region: "tohoku" },
    { id: "yamagata",  name: "山形県",   kana: "やまがたけん",   region: "tohoku" },
    { id: "fukushima", name: "福島県",   kana: "ふくしまけん",   region: "tohoku" },
    { id: "ibaraki",   name: "茨城県",   kana: "いばらきけん",   region: "kanto" },
    { id: "tochigi",   name: "栃木県",   kana: "とちぎけん",     region: "kanto" },
    { id: "gunma",     name: "群馬県",   kana: "ぐんまけん",     region: "kanto" },
    { id: "saitama",   name: "埼玉県",   kana: "さいたまけん",   region: "kanto" },
    { id: "chiba",     name: "千葉県",   kana: "ちばけん",       region: "kanto" },
    { id: "tokyo",     name: "東京都",   kana: "とうきょうと",   region: "kanto" },
    { id: "kanagawa",  name: "神奈川県", kana: "かながわけん",   region: "kanto" },
    { id: "niigata",   name: "新潟県",   kana: "にいがたけん",   region: "chubu" },
    { id: "toyama",    name: "富山県",   kana: "とやまけん",     region: "chubu" },
    { id: "ishikawa",  name: "石川県",   kana: "いしかわけん",   region: "chubu" },
    { id: "fukui",     name: "福井県",   kana: "ふくいけん",     region: "chubu" },
    { id: "yamanashi", name: "山梨県",   kana: "やまなしけん",   region: "chubu" },
    { id: "nagano",    name: "長野県",   kana: "ながのけん",     region: "chubu" },
    { id: "gifu",      name: "岐阜県",   kana: "ぎふけん",       region: "chubu" },
    { id: "shizuoka",  name: "静岡県",   kana: "しずおかけん",   region: "chubu" },
    { id: "aichi",     name: "愛知県",   kana: "あいちけん",     region: "chubu" },
    { id: "mie",       name: "三重県",   kana: "みえけん",       region: "kinki" },
    { id: "shiga",     name: "滋賀県",   kana: "しがけん",       region: "kinki" },
    { id: "kyoto",     name: "京都府",   kana: "きょうとふ",     region: "kinki" },
    { id: "osaka",     name: "大阪府",   kana: "おおさかふ",     region: "kinki" },
    { id: "hyogo",     name: "兵庫県",   kana: "ひょうごけん",   region: "kinki" },
    { id: "nara",      name: "奈良県",   kana: "ならけん",       region: "kinki" },
    { id: "wakayama",  name: "和歌山県", kana: "わかやまけん",   region: "kinki" },
    { id: "tottori",   name: "鳥取県",   kana: "とっとりけん",   region: "chugoku" },
    { id: "shimane",   name: "島根県",   kana: "しまねけん",     region: "chugoku" },
    { id: "okayama",   name: "岡山県",   kana: "おかやまけん",   region: "chugoku" },
    { id: "hiroshima", name: "広島県",   kana: "ひろしまけん",   region: "chugoku" },
    { id: "yamaguchi", name: "山口県",   kana: "やまぐちけん",   region: "chugoku" },
    { id: "tokushima", name: "徳島県",   kana: "とくしまけん",   region: "shikoku" },
    { id: "kagawa",    name: "香川県",   kana: "かがわけん",     region: "shikoku" },
    { id: "ehime",     name: "愛媛県",   kana: "えひめけん",     region: "shikoku" },
    { id: "kochi",     name: "高知県",   kana: "こうちけん",     region: "shikoku" },
    { id: "fukuoka",   name: "福岡県",   kana: "ふくおかけん",   region: "kyushu" },
    { id: "saga",      name: "佐賀県",   kana: "さがけん",       region: "kyushu" },
    { id: "nagasaki",  name: "長崎県",   kana: "ながさきけん",   region: "kyushu" },
    { id: "kumamoto",  name: "熊本県",   kana: "くまもとけん",   region: "kyushu" },
    { id: "oita",      name: "大分県",   kana: "おおいたけん",   region: "kyushu" },
    { id: "miyazaki",  name: "宮崎県",   kana: "みやざきけん",   region: "kyushu" },
    { id: "kagoshima", name: "鹿児島県", kana: "かごしまけん",   region: "kyushu" },
    { id: "okinawa",   name: "沖縄県",   kana: "おきなわけん",   region: "kyushu" }
  ],

  // ── 地形データ ─────────────────────────────
  // type には featureTypes の id を書く。
  // prefectures には上の都道府県 id を書く(1つでも複数でもよい)。
  // note は消去時のファクト表示・データ確認表の備考に使う(なくてもよい)。
  features: [

    // ===== 河川(本流が流れる都道府県のみ) =====
    { id: "ishikari", name: "石狩川", kana: "いしかりがわ", type: "river",
      prefectures: ["hokkaido"],
      note: "北海道最長の川。石狩平野を流れる。" },
    { id: "kitakami", name: "北上川", kana: "きたかみがわ", type: "river",
      prefectures: ["iwate", "miyagi"],
      note: "東北地方最長の川。" },
    { id: "omono", name: "雄物川", kana: "おものがわ", type: "river",
      prefectures: ["akita"],
      note: "秋田平野を流れて日本海にそそぐ。" },
    { id: "mogami", name: "最上川", kana: "もがみがわ", type: "river",
      prefectures: ["yamagata"],
      note: "日本三大急流の一つ。庄内平野を流れる。" },
    // 阿賀野川: 本流は福島県(阿賀川と呼ばれる)→新潟県。只見川などは支流なので群馬県等は含めない。
    { id: "agano", name: "阿賀野川", kana: "あがのがわ", type: "river",
      prefectures: ["fukushima", "niigata"],
      note: "福島県では阿賀川と呼ばれる。" },
    // 信濃川: 本流は長野県(千曲川と呼ばれる)→新潟県。
    { id: "shinano", name: "信濃川", kana: "しなのがわ", type: "river",
      prefectures: ["nagano", "niigata"],
      note: "日本一長い川。長野県では千曲川と呼ばれる。" },
    // 利根川: 本流は群馬県(水源)→埼玉県境→茨城県・千葉県境→太平洋。渡良瀬川・鬼怒川は支流なので栃木県は含めない。
    { id: "tone", name: "利根川", kana: "とねがわ", type: "river",
      prefectures: ["gunma", "saitama", "ibaraki", "chiba"],
      note: "流域面積日本一。坂東太郎と呼ばれる。" },
    { id: "arakawa", name: "荒川", kana: "あらかわ", type: "river",
      prefectures: ["saitama", "tokyo"],
      note: "秩父山地から東京湾へ流れる。" },
    // 多摩川: 水源は山梨県(上流は丹波川と呼ばれる)→東京都→下流は東京都と神奈川県の境。
    { id: "tamagawa", name: "多摩川", kana: "たまがわ", type: "river",
      prefectures: ["yamanashi", "tokyo", "kanagawa"],
      note: "下流は東京都と神奈川県の境を流れる。" },
    { id: "fujikawa", name: "富士川", kana: "ふじかわ", type: "river",
      prefectures: ["yamanashi", "shizuoka"],
      note: "日本三大急流の一つ。" },
    { id: "tenryu", name: "天竜川", kana: "てんりゅうがわ", type: "river",
      prefectures: ["nagano", "shizuoka"],
      note: "諏訪湖から流れ出て太平洋にそそぐ。" },
    // 木曽川: 長野県(水源)→岐阜県→愛知県境→三重県で伊勢湾へ。木曽三川の一つ。
    { id: "kiso", name: "木曽川", kana: "きそがわ", type: "river",
      prefectures: ["nagano", "gifu", "aichi", "mie"],
      note: "木曽三川の一つ。下流に輪中で知られる濃尾平野が広がる。" },
    { id: "nagara", name: "長良川", kana: "ながらがわ", type: "river",
      prefectures: ["gifu", "mie"],
      note: "木曽三川の一つ。鵜飼いで有名。" },
    { id: "ibi", name: "揖斐川", kana: "いびがわ", type: "river",
      prefectures: ["gifu", "mie"],
      note: "木曽三川の一つ。" },
    // 淀川: 琵琶湖(滋賀県・瀬田川)→京都府(宇治川)→大阪府(淀川)。
    { id: "yodo", name: "淀川", kana: "よどがわ", type: "river",
      prefectures: ["shiga", "kyoto", "osaka"],
      note: "琵琶湖から流れ出て大阪湾にそそぐ。" },
    { id: "yoshino", name: "吉野川", kana: "よしのがわ", type: "river",
      prefectures: ["kochi", "tokushima"],
      note: "四国三郎と呼ばれる。" },
    { id: "shimanto", name: "四万十川", kana: "しまんとがわ", type: "river",
      prefectures: ["kochi"],
      note: "「日本最後の清流」と呼ばれる。" },
    // 筑後川: 熊本県・大分県の山地から福岡県・佐賀県の境を流れて有明海へ。筑紫次郎。
    { id: "chikugo", name: "筑後川", kana: "ちくごがわ", type: "river",
      prefectures: ["kumamoto", "oita", "fukuoka", "saga"],
      note: "九州一の大河。筑紫次郎と呼ばれる。" },
    { id: "kuma", name: "球磨川", kana: "くまがわ", type: "river",
      prefectures: ["kumamoto"],
      note: "日本三大急流の一つ。" },

    // ===== 平野 =====
    { id: "ishikari_p", name: "石狩平野", kana: "いしかりへいや", type: "plain",
      prefectures: ["hokkaido"],
      note: "泥炭地を客土で改良し、稲作がさかん。" },
    { id: "tokachi_p", name: "十勝平野", kana: "とかちへいや", type: "plain",
      prefectures: ["hokkaido"],
      note: "畑作・酪農がさかん。" },
    { id: "sendai_p", name: "仙台平野", kana: "せんだいへいや", type: "plain",
      prefectures: ["miyagi"],
      note: "稲作がさかん。" },
    { id: "shonai_p", name: "庄内平野", kana: "しょうないへいや", type: "plain",
      prefectures: ["yamagata"],
      note: "最上川の下流。日本有数の米どころ。" },
    { id: "echigo_p", name: "越後平野", kana: "えちごへいや", type: "plain",
      prefectures: ["niigata"],
      note: "信濃川・阿賀野川の下流。日本有数の米どころ。" },
    { id: "kanto_p", name: "関東平野", kana: "かんとうへいや", type: "plain",
      prefectures: ["ibaraki", "tochigi", "gunma", "saitama", "chiba", "tokyo", "kanagawa"],
      note: "日本一広い平野。関東ロームにおおわれる。" },
    { id: "nobi_p", name: "濃尾平野", kana: "のうびへいや", type: "plain",
      prefectures: ["gifu", "aichi"],
      note: "木曽三川の下流。輪中で知られる。" },
    { id: "osaka_p", name: "大阪平野", kana: "おおさかへいや", type: "plain",
      prefectures: ["osaka"],
      note: "淀川の下流に広がる。" },
    { id: "sanuki_p", name: "讃岐平野", kana: "さぬきへいや", type: "plain",
      prefectures: ["kagawa"],
      note: "雨が少なく、ため池が多い。" },
    { id: "kochi_p", name: "高知平野", kana: "こうちへいや", type: "plain",
      prefectures: ["kochi"],
      note: "野菜の促成栽培がさかん。" },
    { id: "tsukushi_p", name: "筑紫平野", kana: "つくしへいや", type: "plain",
      prefectures: ["fukuoka", "saga"],
      note: "筑後川の下流。クリーク(水路)が発達。" },
    { id: "miyazaki_p", name: "宮崎平野", kana: "みやざきへいや", type: "plain",
      prefectures: ["miyazaki"],
      note: "野菜の促成栽培がさかん。" },

    // ===== 盆地 =====
    { id: "kamikawa_b", name: "上川盆地", kana: "かみかわぼんち", type: "basin",
      prefectures: ["hokkaido"],
      note: "旭川市がある。稲作がさかん。" },
    { id: "kitakami_b", name: "北上盆地", kana: "きたかみぼんち", type: "basin",
      prefectures: ["iwate"],
      note: "北上川が流れ、盛岡市がある。" },
    { id: "yamagata_b", name: "山形盆地", kana: "やまがたぼんち", type: "basin",
      prefectures: ["yamagata"],
      note: "さくらんぼの栽培がさかん。" },
    { id: "kofu_b", name: "甲府盆地", kana: "こうふぼんち", type: "basin",
      prefectures: ["yamanashi"],
      note: "扇状地が発達。ぶどう・ももの栽培がさかん。" },
    { id: "nagano_b", name: "長野盆地", kana: "ながのぼんち", type: "basin",
      prefectures: ["nagano"],
      note: "善光寺平とも呼ばれる。りんごの栽培がさかん。" },
    { id: "matsumoto_b", name: "松本盆地", kana: "まつもとぼんち", type: "basin",
      prefectures: ["nagano"],
      note: "松本市がある。" },
    { id: "kyoto_b", name: "京都盆地", kana: "きょうとぼんち", type: "basin",
      prefectures: ["kyoto"],
      note: "京都市がある。" },
    { id: "nara_b", name: "奈良盆地", kana: "ならぼんち", type: "basin",
      prefectures: ["nara"],
      note: "奈良市がある。" },

    // ===== 台地 =====
    { id: "konsen_d", name: "根釧台地", kana: "こんせんだいち", type: "plateau",
      prefectures: ["hokkaido"],
      note: "北海道の東部。酪農がさかん。" },
    { id: "shimousa_d", name: "下総台地", kana: "しもうさだいち", type: "plateau",
      prefectures: ["chiba"],
      note: "千葉県の北部。らっかせいなどの畑作がさかん。" },
    // 武蔵野台地: 荒川と多摩川にはさまれた台地。東京都と埼玉県にまたがる。
    { id: "musashino_d", name: "武蔵野台地", kana: "むさしのだいち", type: "plateau",
      prefectures: ["tokyo", "saitama"],
      note: "荒川と多摩川の間に広がる。" },
    // 牧ノ原: 「牧之原」とも書く。静岡県の大井川下流西側の台地。
    { id: "makinohara_d", name: "牧ノ原", kana: "まきのはら", type: "plateau",
      prefectures: ["shizuoka"],
      note: "「牧之原」とも書く。茶の栽培が日本一さかん。" },
    { id: "shirasu_d", name: "シラス台地", kana: "しらすだいち", type: "plateau",
      prefectures: ["kagoshima", "miyazaki"],
      note: "火山灰が積もってできた台地。水もちが悪く、畑作や畜産がさかん。" },

    // ===== 山地・山脈 =====
    { id: "hidaka_m", name: "日高山脈", kana: "ひだかさんみゃく", type: "mountain",
      prefectures: ["hokkaido"],
      note: "北海道の背骨と呼ばれる。" },
    // 奥羽山脈: 東北地方を南北につらぬく。東北6県すべてにかかる。
    { id: "ou_m", name: "奥羽山脈", kana: "おううさんみゃく", type: "mountain",
      prefectures: ["aomori", "iwate", "akita", "miyagi", "yamagata", "fukushima"],
      note: "東北地方を南北につらぬく、日本一長い山脈。" },
    { id: "echigo_m", name: "越後山脈", kana: "えちごさんみゃく", type: "mountain",
      prefectures: ["niigata", "fukushima", "gunma"],
      note: "冬に雪が多い。" },
    // 関東山地: 関東平野の西側。神奈川県の丹沢山地は別扱いとし含めない。
    { id: "kanto_m", name: "関東山地", kana: "かんとうさんち", type: "mountain",
      prefectures: ["gunma", "saitama", "tokyo", "yamanashi", "nagano"],
      note: "関東平野の西側に連なる。" },
    { id: "hida_m", name: "飛騨山脈", kana: "ひださんみゃく", type: "mountain",
      prefectures: ["toyama", "gifu", "nagano"],
      note: "北アルプスと呼ばれる。日本アルプスの一つ。" },
    { id: "kiso_m", name: "木曽山脈", kana: "きそさんみゃく", type: "mountain",
      prefectures: ["nagano"],
      note: "中央アルプスと呼ばれる。日本アルプスの一つ。" },
    { id: "akaishi_m", name: "赤石山脈", kana: "あかいしさんみゃく", type: "mountain",
      prefectures: ["nagano", "yamanashi", "shizuoka"],
      note: "南アルプスと呼ばれる。日本アルプスの一つ。" },
    { id: "kii_m", name: "紀伊山地", kana: "きいさんち", type: "mountain",
      prefectures: ["wakayama", "nara", "mie"],
      note: "吉野すぎなど林業がさかん。" },
    // 中国山地: 中国地方を東西に走る。兵庫県西部にもかかるが、標準的な範囲として中国5県とする。
    { id: "chugoku_m", name: "中国山地", kana: "ちゅうごくさんち", type: "mountain",
      prefectures: ["tottori", "shimane", "okayama", "hiroshima", "yamaguchi"],
      note: "なだらかな山地。" },
    { id: "shikoku_m", name: "四国山地", kana: "しこくさんち", type: "mountain",
      prefectures: ["tokushima", "ehime", "kochi"],
      note: "けわしい山地。" },
    { id: "kyushu_m", name: "九州山地", kana: "きゅうしゅうさんち", type: "mountain",
      prefectures: ["kumamoto", "oita", "miyazaki"],
      note: "けわしい山地。" },
    { id: "shirakami_m", name: "白神山地", kana: "しらかみさんち", type: "mountain",
      prefectures: ["aomori", "akita"],
      note: "ぶなの原生林。世界自然遺産。" }
  ],

  // ── 地図記号ずかん ─────────────────────────
  // タイトル画面の「地図記号ずかん」とレベル「地図記号」の出題に使われる。
  // 参考: 国土地理院「地図記号一覧」 https://www.gsi.go.jp/kohokocho/map-sign-tizukigou-2022-itiran.html
  // name / kana / note(意味・由来)は自由に編集してよい。
  // svg は記号の絵(編集はむずかしいので、直したいときは依頼すること)。
  mapSymbols: [
    { id: "ta", name: "田", kana: "た",
      note: "稲をかり取ったあとの株の形",
      svg: "<path d='M17 11v26M31 11v26'/>" },
    { id: "hatake", name: "畑", kana: "はたけ",
      note: "植物のふた葉の形",
      svg: "<path d='M13 11l11 26 11-26'/>" },
    { id: "kajuen", name: "果樹園", kana: "かじゅえん",
      note: "りんごなどの果物の実の形",
      svg: "<circle cx='24' cy='24' r='11'/>" },
    { id: "chabatake", name: "茶畑", kana: "ちゃばたけ",
      note: "茶の実を半分に切った中の形",
      svg: "<circle cx='24' cy='14' r='3.5' fill='#223' stroke='none'/><circle cx='15' cy='31' r='3.5' fill='#223' stroke='none'/><circle cx='33' cy='31' r='3.5' fill='#223' stroke='none'/>" },
    { id: "shinyoju", name: "針葉樹林", kana: "しんようじゅりん",
      note: "すぎなどのとがった木を横から見た形",
      svg: "<path d='M24 7v33M24 7L13 28M24 7l11 21'/>" },
    { id: "koyoju", name: "広葉樹林", kana: "こうようじゅりん",
      note: "葉の広い丸い木を横から見た形",
      svg: "<circle cx='24' cy='19' r='11'/><path d='M24 30v10'/>" },
    { id: "shogakko", name: "小・中学校", kana: "しょう・ちゅうがっこう",
      note: "「文」の字",
      svg: "<text x='24' y='35' font-size='32' text-anchor='middle' fill='#223' stroke='none' font-weight='bold'>文</text>" },
    { id: "kotogakko", name: "高等学校", kana: "こうとうがっこう",
      note: "「文」の字を丸で囲んだ形",
      svg: "<circle cx='24' cy='24' r='20'/><text x='24' y='32' font-size='23' text-anchor='middle' fill='#223' stroke='none' font-weight='bold'>文</text>" },
    { id: "yubinkyoku", name: "郵便局", kana: "ゆうびんきょく",
      note: "昔の逓信省(ていしんしょう)の「テ」から作られた「〒」",
      svg: "<circle cx='24' cy='24' r='20'/><text x='24' y='32' font-size='22' text-anchor='middle' fill='#223' stroke='none' font-weight='bold'>〒</text>" },
    { id: "jinja", name: "神社", kana: "じんじゃ",
      note: "鳥居の形",
      svg: "<path d='M8 13h32M13 22h22M16 13v26M32 13v26'/>" },
    { id: "jiin", name: "寺院", kana: "じいん",
      note: "寺でよく使われる「卍(まんじ)」の印",
      svg: "<text x='24' y='36' font-size='34' text-anchor='middle' fill='#223' stroke='none'>卍</text>" },
    { id: "byoin", name: "病院", kana: "びょういん",
      note: "旧陸軍の衛生隊の記章(十字)の形",
      svg: "<path d='M12 10h24v13c0 9-7 13-12 15-5-2-12-6-12-15z'/><path d='M24 16v14M17 23h14'/>" },
    { id: "koban", name: "交番", kana: "こうばん",
      note: "警棒を2本交差させた形",
      svg: "<path d='M14 13l20 22M34 13l-20 22'/>" },
    { id: "keisatsu", name: "警察署", kana: "けいさつしょ",
      note: "交番の記号を丸で囲んだ形",
      svg: "<circle cx='24' cy='24' r='20'/><path d='M17 16l14 16M31 16l-14 16'/>" },
    { id: "shobo", name: "消防署", kana: "しょうぼうしょ",
      note: "昔の消火道具「さすまた」の形",
      svg: "<path d='M24 40V19M24 19c-5 0-9-5-10-11M24 19c5 0 9-5 10-11'/>" },
    { id: "shiyakusho", name: "市役所", kana: "しやくしょ",
      note: "二重丸。東京都の区役所も同じ記号",
      svg: "<circle cx='24' cy='24' r='17'/><circle cx='24' cy='24' r='8'/>" },
    { id: "yakuba", name: "町・村役場", kana: "まち・むらやくば",
      note: "丸(市役所は二重丸)",
      svg: "<circle cx='24' cy='24' r='13'/>" },
    { id: "onsen", name: "温泉", kana: "おんせん",
      note: "湯つぼと湯気の形",
      svg: "<path d='M11 31c0 8 26 8 26 0M16 26c-2-5 2-7 0-13M24 27c-2-5 2-7 0-13M32 26c-2-5 2-7 0-13'/>" },
    { id: "toshokan", name: "図書館", kana: "としょかん",
      note: "開いた本の形",
      svg: "<path d='M10 14q7-4 14 0q7-4 14 0v18q-7-4-14 0q-7-4-14 0zM24 14v18'/>" },
    { id: "hakubutsukan", name: "博物館・美術館", kana: "はくぶつかん・びじゅつかん",
      note: "柱のある建物の形",
      svg: "<path d='M24 8L8 17h32zM12 17v14M24 17v14M36 17v14M8 34h32'/>" },
    { id: "todai", name: "灯台", kana: "とうだい",
      note: "灯台を上から見た形と、四方八方に広がる光のようす",
      svg: "<circle cx='24' cy='24' r='3.5' fill='#223' stroke='none'/><path d='M24 17V6M24 31v11M17 24H6M31 24h11M19 19l-6-6M29 19l6-6M19 29l-6 6M29 29l6 6'/>" }
  ]
};

// Node.js(データ確認表の生成スクリプト)から読めるようにするための行。編集しないでください。
if (typeof module !== "undefined" && module.exports) { module.exports = GEO_DATA; }
