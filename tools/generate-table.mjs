// ============================================================
// generate-table.mjs — データ確認表の生成スクリプト
// 役割: data.js の内容から「データ確認表.md」を作り直す。
// 使いかた: リポジトリの一番上のフォルダで  node tools/generate-table.mjs
// ============================================================

import { createRequire } from "node:module";
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const require = createRequire(import.meta.url);
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const GEO_DATA = require(join(root, "data.js"));

// ── データの整合性チェック(間違った id があればここで止まる) ──
const typeIds = new Set(GEO_DATA.featureTypes.map(t => t.id));
const prefById = new Map(GEO_DATA.prefectures.map(p => [p.id, p]));
const errors = [];

if (GEO_DATA.prefectures.length !== 47) {
  errors.push(`都道府県の数が ${GEO_DATA.prefectures.length} 件です(47件必要)`);
}
for (const f of GEO_DATA.features) {
  if (!typeIds.has(f.type)) {
    errors.push(`${f.name}: 種別 "${f.type}" が featureTypes にありません`);
  }
  if (!Array.isArray(f.prefectures) || f.prefectures.length === 0) {
    errors.push(`${f.name}: 対応する都道府県がありません`);
  } else {
    for (const pid of f.prefectures) {
      if (!prefById.has(pid)) errors.push(`${f.name}: 都道府県 id "${pid}" が見つかりません`);
    }
  }
}
const seen = new Set();
for (const f of GEO_DATA.features) {
  if (seen.has(f.id)) errors.push(`地形 id "${f.id}" が重複しています`);
  seen.add(f.id);
}
if (errors.length > 0) {
  console.error("★ data.js にエラーがあります。修正してください:");
  for (const e of errors) console.error("  - " + e);
  process.exit(1);
}

// ── 確認表(Markdown)の組み立て ──
const today = new Date().toISOString().slice(0, 10);
let md = `# データ確認表

data.js に収録されている地理データの一覧です。**地図帳と照合して間違いがないか確認してください。**
(このファイルは \`node tools/generate-table.mjs\` で data.js から自動生成されます。直接編集しないでください)

- 生成日: ${today}
- 収録数: ${GEO_DATA.features.length} 項目
- 河川の対応県は「本流が流れる都道府県」だけを載せています(支流だけの県は含めません)。
- 平野・盆地・山地・山脈は「その地形が位置する/広がる都道府県」を載せています。

`;

for (const t of GEO_DATA.featureTypes) {
  const items = GEO_DATA.features.filter(f => f.type === t.id);
  if (items.length === 0) continue;
  md += `## ${t.label}(${items.length}件)\n\n`;
  md += `| 地形名 | よみ | 対応する都道府県 | 備考 |\n|---|---|---|---|\n`;
  for (const f of items) {
    const prefNames = f.prefectures
      .map(pid => prefById.get(pid).name.replace(/[都府県]$/, ""))
      .join("・");
    md += `| ${f.name} | ${f.kana} | ${prefNames} | ${f.note || ""} |\n`;
  }
  md += "\n";
}

// 地図記号ずかんの一覧(記号の絵はゲーム画面で確認する)
if (Array.isArray(GEO_DATA.mapSymbols) && GEO_DATA.mapSymbols.length > 0) {
  md += `## 地図記号ずかん(${GEO_DATA.mapSymbols.length}件)\n\n`;
  md += `記号の絵はゲームのタイトル画面 →「地図記号ずかん」で確認してください。\n\n`;
  md += `| 記号名 | よみ | 意味・由来 |\n|---|---|---|\n`;
  for (const s of GEO_DATA.mapSymbols) {
    md += `| ${s.name} | ${s.kana} | ${s.note || ""} |\n`;
  }
  md += "\n";
}

writeFileSync(join(root, "データ確認表.md"), md);
console.log(`データ確認表.md を作り直しました(${GEO_DATA.features.length} 項目)`);
