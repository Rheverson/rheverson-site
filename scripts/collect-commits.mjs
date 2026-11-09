// Coleta datas de commit (somente datas — nenhuma mensagem, autor ou código)
// dos repositórios apresentados no portfólio e agrega por semana ISO.
// Uso: node scripts/collect-commits.mjs   (requer `gh` autenticado)
import { execFileSync } from "node:child_process";
import { writeFileSync } from "node:fs";

/** slug do caso → repositório. Repositórios privados só fornecem datas. */
const REPOS = {
  planejapp: "Rheverson/planejapp",
  tudoparaeventos: "Rheverson/tudoparaeventos",
  kluska: "Rheverson/kluska-ecommerce",
  "propensao-compra": "Rheverson/sigpel-propensao-compra",
  "lucroradar-ai": "Rheverson/lucroradar-ai",
};

function commitDates(repo) {
  const out = execFileSync(
    "gh",
    ["api", "--paginate", `repos/${repo}/commits?per_page=100`, "--jq", ".[].commit.author.date"],
    { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 },
  );
  return out.split(/\r?\n/).filter(Boolean);
}

/** Segunda-feira (UTC) da semana da data, em YYYY-MM-DD. */
function weekStart(iso) {
  const d = new Date(iso);
  const day = (d.getUTCDay() + 6) % 7;
  d.setUTCDate(d.getUTCDate() - day);
  return d.toISOString().slice(0, 10);
}

const projects = {};
for (const [slug, repo] of Object.entries(REPOS)) {
  const dates = commitDates(repo);
  const weeks = {};
  for (const date of dates) {
    const w = weekStart(date);
    weeks[w] = (weeks[w] ?? 0) + 1;
  }
  const sorted = dates.slice().sort();
  projects[slug] = {
    total: dates.length,
    first: sorted[0]?.slice(0, 10) ?? null,
    last: sorted.at(-1)?.slice(0, 10) ?? null,
    weeks,
  };
  console.log(`${slug}: ${dates.length} commits`);
}

writeFileSync(
  new URL("../src/content/commits.json", import.meta.url),
  JSON.stringify({ collectedAt: new Date().toISOString().slice(0, 10), projects }, null, 2) + "\n",
);
