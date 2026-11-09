import data from "@/content/commits.json";

type ProjectCommits = { total: number; first: string | null; last: string | null; weeks: Record<string, number> };
const projects = data.projects as Record<string, ProjectCommits>;

export const commitsCollectedAt = data.collectedAt;

/** Segundas-feiras de todas as semanas de 2026 até a data da coleta. */
export function weeksOf2026(): string[] {
  const out: string[] = [];
  const d = new Date(Date.UTC(2025, 11, 29)); // segunda-feira da semana de 01/01/2026
  const end = new Date(`${data.collectedAt}T00:00:00Z`);
  while (d <= end) {
    out.push(d.toISOString().slice(0, 10));
    d.setUTCDate(d.getUTCDate() + 7);
  }
  return out;
}

export function weeklyTotals(): number[] {
  return weeksOf2026().map((w) => Object.values(projects).reduce((sum, p) => sum + (p.weeks[w] ?? 0), 0));
}

export function commitMatrix() {
  const weeks = weeksOf2026();
  return {
    weeks,
    rows: Object.entries(projects).map(([slug, p]) => ({
      slug,
      total: p.total,
      values: weeks.map((w) => p.weeks[w] ?? 0),
    })),
  };
}

export const totalCommits = () => Object.values(projects).reduce((s, p) => s + p.total, 0);
export const commitsOf = (slug: string) => projects[slug]?.total;
