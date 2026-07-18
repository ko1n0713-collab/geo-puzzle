// ============================================================
// config.js — ゲームの調整値(速さ・点数・レベルなど)
// 役割: ゲームの手ざわりを決める数値を1か所に集めたファイル。
// ★ここから下は自由に編集してOKです。保存してページを開き直すと反映されます。
// ============================================================

const CONFIG = {

  // ── 盤面の大きさ ──────────────────────────
  COLS: 6,   // 横のマス数
  ROWS: 12,  // 縦のマス数(見えている部分)

  // ── 落下の速さ・操作の手ざわり ─────────────
  LOCK_DELAY_MS: 300,    // 着地してから固定されるまでの猶予(ミリ秒)。大きくすると置き直しやすい
  SOFT_DROP_MS: 50,      // ▼(下キー)を押している間の落下間隔。小さくすると速く落ちる
  MOVE_REPEAT_MS: 170,   // ◀▶ボタンを押しっぱなしにしたときの連続移動の間隔
  FALL_ANIM_MS: 110,     // ブロックが1マス動くアニメーションの時間。大きくするとゆっくり動いて見える
  GRAVITY_STEP_MS: 160,  // 固定後にブロックが落ちるアニメーションの時間

  // ── スコア ─────────────────────────────────
  BASE_SCORE: 100,                    // 消したブロック1個あたりの基本点
  CHAIN_MULTIPLIER: [1, 2, 4, 8, 16], // 連鎖倍率(1連鎖, 2連鎖, 3連鎖, ...)。5連鎖以降は最後の値を使う
  MULTI_BONUS: 50,                    // 一度に3個以上消したとき (個数-2)×この値 を加点

  // ── 消去の演出 ─────────────────────────────
  CLEAR_FLASH_MS: 160,    // 消える前に光る時間
  CLEAR_ANIM_MS: 380,     // 縮んで消えるアニメーションの時間
  FACT_DURATION_MS: 2600, // 消去時の豆知識(ファクト)1件を表示する時間
  CHAIN_POPUP_MS: 900,    // 「2れんさ!」の表示時間

  // ── 速度の漸増(チャレンジ中にだんだん速くなる) ──
  SPEEDUP_EVERY_PIECES: 10, // 何個ピースを置くごとに1段階速くなるか
  SPEEDUP_FACTOR: 0.95,     // 1段階ごとの速度倍率(0.95なら5%ずつ速くなる。1にすると速くならない)
  MIN_SPEED_MS: 300,        // これ以上は速くならない下限(ミリ秒)

  // ── はやさ設定(タイトル画面で選べる。数字が大きいほどゆっくり) ──
  SPEED_OPTIONS: [
    { label: "ゆっくり", mul: 1.4 },  // レベルの速さ×1.4倍の時間をかけて落ちる
    { label: "ふつう",   mul: 1.0 },
    { label: "はやい",   mul: 0.75 }
  ],
  DEFAULT_SPEED_OPTION: 1,  // 最初に選ばれているはやさ(0=ゆっくり, 1=ふつう, 2=はやい)

  // ── ピースの出かた ─────────────────────────
  // 県どうし・地形どうしは消えないので、半々(1.0)がいちばん消えやすい。
  // 県ブロックを増やしたいときは大きく(例 1.5)、減らしたいときは小さく(例 0.8)する
  PREF_RATIO: 1.0,  // 地形ブロック1に対して県ブロックが出る割合

  // 新しいブロックのうち、この割合は「いま盤面にあるブロックの正解相手」から選ばれる。
  // 収録数が多いレベル(Lv7など)でも、置いたブロックの相手がちゃんと流れてくるようにする仕組み。
  // 大きくするほど消しやすい。0にすると完全ランダム(むずかしい)
  PARTNER_BIAS: 0.5,

  // ── 時間制(チャレンジモード) ──────────────
  // 練習モードは時間制なし(ゆっくり学べる)。チャレンジのみ持ち時間があり、0でゲームオーバー
  TIME_LIMIT_ENABLED: true,   // false にすると時間制なし(前と同じ)
  TIME_LIMIT_SEC: 90,         // ゲーム開始時の持ち時間(秒)
  TIME_BONUS_PER_BLOCK: 1.5,  // ブロックを1個消すごとに増える秒数
  TIME_MAX_SEC: 180,           // 時間の上限(秒)。これ以上は増えない

  // ── 開始レベル ─────────────────────────────
  START_LEVEL: 1,   // タイトル画面で最初に選ばれているレベル(画面からも変更できる)

  // ── レベル定義 ─────────────────────────────
  // pool の書きかた(4通り):
  //   (a) 地形idの配列       例: ["tone", "arakawa"]
  //   (b) "all"              地形データ全部(後から足した項目・種別も自動で出る)
  //   (c) { types: [...] }   種別指定  例: { types: ["lake"] } でその種別の全項目
  //   (d) "mapSymbols"       地図記号モード(記号ブロック×意味ブロックの一致で消える)
  // 県ブロックは、そのレベルの地形の対応県から自動的に作られる(正解相手のいない県は出ない)
  // speedMs: 1マス落ちるまでの時間(ミリ秒)。小さくすると速い
  // hint: ヒント(落下中ペアの正解相手が光る)は「れんしゅうモード」専用になったため、この値は現在つかっていません
  LEVELS: [
    // Lv1: 全国の川と平野ぜんぶ(種別指定なので、川・平野を追加すると自動で出題される)
    { name: "川と平野",
      pool: { types: ["river", "plain"] },
      speedMs: 1500, hint: true },

    // Lv2: 全国の盆地・台地・山地・山脈ぜんぶ
    { name: "盆地・台地・山地",
      pool: { types: ["basin", "plateau", "mountain"] },
      speedMs: 1500, hint: true },

    // Lv3: 地図記号(記号の絵ブロックと名前ブロックをとなりに置くと消える)
    { name: "地図記号",
      pool: "mapSymbols",
      speedMs: 1500, hint: true },

    { name: "東日本ミックス",
      pool: ["ishikari", "kitakami", "omono", "mogami", "agano", "shinano",
             "tone", "arakawa", "tamagawa", "fujikawa", "tenryu", "kiso", "nagara", "ibi",
             "ishikari_p", "tokachi_p", "sendai_p", "shonai_p", "echigo_p", "kanto_p", "nobi_p",
             "kamikawa_b", "kitakami_b", "yamagata_b", "kofu_b", "nagano_b", "matsumoto_b",
             "konsen_d", "shimousa_d", "musashino_d", "makinohara_d",
             "hidaka_m", "ou_m", "echigo_m", "kanto_m", "hida_m", "kiso_m", "akaishi_m", "shirakami_m"],
      speedMs: 1100, hint: false },

    { name: "西日本ミックス",
      pool: ["yodo", "yoshino", "shimanto", "chikugo", "kuma",
             "osaka_p", "sanuki_p", "kochi_p", "tsukushi_p", "miyazaki_p",
             "kyoto_b", "nara_b", "shirasu_d",
             "kii_m", "chugoku_m", "shikoku_m", "kyushu_m"],
      speedMs: 1100, hint: false },

    { name: "全国オールスター",
      pool: "all",
      speedMs: 800, hint: false }
  ],

  // ── 効果音 ─────────────────────────────────
  SOUND_DEFAULT_ON: true,   // 最初から音を鳴らすか(画面のボタンでいつでも切りかえOK)
  SOUND_VOLUME: 0.18,       // 音の大きさ(0〜1)。うるさければ小さくする

  // ── 起死回生アイテム「ちしきのちから」──────
  // クイズに正解すると、盤面の下のほうの行がまとめて消える
  QUIZ_ITEM_START: 1,          // ゲーム開始時に持っている個数
  QUIZ_ITEM_EVERY_BLOCKS: 30,  // ブロックを何個消すごとに1個ふえるか
  QUIZ_ITEM_MAX: 2,            // 一度に持てる最大数
  QUIZ_CLEAR_ROWS: 3,          // 正解したとき下から何行消えるか
  // 🧠ブロック: ときどき落ちてきて、正解ペアをとなりで消すと回収できる(アイテム+1)
  ITEM_BLOCK_CHANCE: 0.05,     // ブロック1個が🧠になる確率(0.05=5%。持てる上限に達していると出ない)

  // ── 達成バッジ(目標)─────────────────────
  // 集めるとタイトルの「🏅 バッジ」に飾られる。条件を満たすと自動で獲得。
  // type の種類:
  //   "collectCount" … 覚えた組み合わせの数が value 以上
  //   "chain"        … 1ゲームの最大連鎖が value 以上
  //   "multi"        … 一度に消した数が value 以上
  //   "score"        … スコアが value 以上
  //   "quizCount"    … ちしきのちからのクイズに value 回正解
  //   "collectAll"   … target を全部集めた(target: "mapSymbols" / 種別id("river"等) / "all")
  // ★ここも自由に増やせる(名前・絵文字・条件を足すだけ)
  BADGES: [
    { id: "first",    name: "はじめの一歩", icon: "🌱", type: "collectCount", value: 1,     desc: "はじめて正しい組み合わせを消す" },
    { id: "chain3",   name: "れんさ名人",   icon: "🔥", type: "chain",        value: 3,     desc: "1ゲームで3れんさを出す" },
    { id: "chain5",   name: "れんさの達人", icon: "⚡", type: "chain",        value: 5,     desc: "1ゲームで5れんさを出す" },
    { id: "multi5",   name: "いっきに消し", icon: "💥", type: "multi",        value: 5,     desc: "一度に5こ以上消す" },
    { id: "score1k",  name: "スコア1000",  icon: "⭐", type: "score",        value: 1000,  desc: "スコア1000をこえる" },
    { id: "score5k",  name: "スコア5000",  icon: "🌟", type: "score",        value: 5000,  desc: "スコア5000をこえる" },
    { id: "score10k", name: "スコア王",     icon: "👑", type: "score",        value: 10000, desc: "スコア10000をこえる" },
    { id: "collect10", name: "ずかん見習い", icon: "📗", type: "collectCount", value: 10,    desc: "10種類おぼえる" },
    { id: "collect30", name: "ずかん博士",   icon: "📘", type: "collectCount", value: 30,    desc: "30種類おぼえる" },
    { id: "quiz10",   name: "クイズ王",     icon: "🧠", type: "quizCount",    value: 10,    desc: "ちしきのちからのクイズに10回せいかいする" },
    { id: "rivers",   name: "川はかせ",     icon: "🌊", type: "collectAll",   target: "river",      desc: "すべての川を消す" },
    { id: "plains",   name: "平野はかせ",   icon: "🌾", type: "collectAll",   target: "plain",      desc: "すべての平野を消す" },
    { id: "mountains", name: "山はかせ",    icon: "⛰️", type: "collectAll",   target: "mountain",   desc: "すべての山地・山脈を消す" },
    { id: "symbols",  name: "記号マスター", icon: "🗺️", type: "collectAll",   target: "mapSymbols", desc: "すべての地図記号を消す" },
    { id: "master",   name: "ものしり博士", icon: "🎓", type: "collectAll",   target: "all",        desc: "すべての組み合わせを集める" }
  ],

  // ── 保存データ ─────────────────────────────
  STORAGE_PREFIX: "geopuzzle_"  // localStorage のキーの頭につける文字
};

// Node.js から読めるようにするための行。編集しないでください。
if (typeof module !== "undefined" && module.exports) { module.exports = CONFIG; }
