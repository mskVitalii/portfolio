"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { KeyRound, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const TYPES = ["INTEGER", "VARCHAR(255)", "TEXT", "BOOLEAN", "DATE", "TIMESTAMP"] as const;
type ColumnType = (typeof TYPES)[number];

interface Column {
  id: number;
  name: string;
  type: ColumnType;
  pk: boolean;
  notNull: boolean;
}

const INITIAL_COLUMNS: Column[] = [
  { id: 1, name: "id", type: "INTEGER", pk: true, notNull: true },
  { id: 2, name: "title", type: "VARCHAR(255)", pk: false, notNull: true },
  { id: 3, name: "published_at", type: "TIMESTAMP", pk: false, notNull: false },
];

function ident(raw: string, fallback: string): string {
  const cleaned = raw.trim().toLowerCase().replace(/[^a-z0-9_]+/g, "_").replace(/^_+|_+$/g, "");
  return cleaned || fallback;
}

function toSql(table: string, columns: Column[]): string {
  const pks = columns.filter((c) => c.pk);
  const lines = columns.map((c, i) => {
    const parts = [ident(c.name, `column_${i + 1}`), c.type];
    if (c.pk && pks.length === 1) parts.push("PRIMARY KEY");
    else if (c.notNull) parts.push("NOT NULL");
    return `  ${parts.join(" ")}`;
  });
  if (pks.length > 1) {
    lines.push(`  PRIMARY KEY (${pks.map((c) => ident(c.name, "id")).join(", ")})`);
  }
  return `CREATE TABLE ${ident(table, "new_table")} (\n${lines.join(",\n")}\n);`;
}

// Tiny highlighter — keywords and types only, enough to read the output.
// split() with a capture group puts every match at an odd index.
const KEYWORDS = /\b(CREATE TABLE|PRIMARY KEY|NOT NULL|INTEGER|VARCHAR|TEXT|BOOLEAN|DATE|TIMESTAMP)\b/;
function highlight(sql: string) {
  return sql.split(KEYWORDS).map((part, i) =>
    i % 2 === 1 ? (
      <span key={i} className="text-sky-600 dark:text-sky-400">
        {part}
      </span>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

/** Live "diagram → SQL" demo for the two low-code coursework projects: edit
 * an entity the way you would on their canvas and watch the CREATE TABLE
 * statement regenerate. Like the originals, it only writes SQL — it never
 * runs it. */
export function SqlFromDiagramDemo({ project }: { project: "lightning" | "swe" }) {
  const t = useTranslations("Projects.sqlBuilder");
  const [table, setTable] = useState("articles");
  const [columns, setColumns] = useState<Column[]>(INITIAL_COLUMNS);
  const [nextId, setNextId] = useState(INITIAL_COLUMNS.length + 1);

  function update(id: number, patch: Partial<Column>) {
    setColumns((cols) => cols.map((c) => (c.id === id ? { ...c, ...patch } : c)));
  }

  function addColumn() {
    setColumns((cols) => [...cols, { id: nextId, name: `column_${cols.length + 1}`, type: "TEXT", pk: false, notNull: false }]);
    setNextId((n) => n + 1);
  }

  const sql = toSql(table, columns);

  return (
    <div className="rounded-xl border bg-card p-4 sm:p-6 mb-10">
      <h3 className="font-semibold mb-1">{t(`${project}.title`)}</h3>
      <p className="text-sm text-muted-foreground mb-5">{t(`${project}.description`)}</p>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Entity card, styled like a node on the ER canvas */}
        <div className="rounded-lg border-2 border-primary/50 bg-background shadow-sm">
          <div className="border-b bg-primary/10 px-3 py-2">
            <label className="sr-only" htmlFor={`sql-table-${project}`}>
              {t("tableName")}
            </label>
            <input
              id={`sql-table-${project}`}
              value={table}
              onChange={(e) => setTable(e.target.value)}
              className="w-full bg-transparent font-mono text-sm font-semibold outline-none"
              placeholder={t("tableName")}
            />
          </div>
          <ul className="divide-y">
            {columns.map((c) => (
              <li key={c.id} className="flex flex-wrap items-center gap-1.5 px-3 py-2">
                <input
                  value={c.name}
                  onChange={(e) => update(c.id, { name: e.target.value })}
                  aria-label={t("columnName")}
                  className="min-w-0 flex-1 basis-28 rounded border bg-transparent px-1.5 py-0.5 font-mono text-xs outline-none focus:border-primary"
                />
                <select
                  value={c.type}
                  onChange={(e) => update(c.id, { type: e.target.value as ColumnType })}
                  aria-label={t("type")}
                  className="rounded border bg-background px-1 py-0.5 font-mono text-[11px]"
                >
                  {TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() => update(c.id, { pk: !c.pk })}
                  aria-pressed={c.pk}
                  title={t("pk")}
                  aria-label={t("pk")}
                  className={cn(
                    "rounded border p-1 transition-colors",
                    c.pk ? "border-amber-500 bg-amber-500/15 text-amber-600 dark:text-amber-400" : "text-muted-foreground"
                  )}
                >
                  <KeyRound className="h-3 w-3" />
                </button>
                <button
                  type="button"
                  onClick={() => update(c.id, { notNull: !c.notNull })}
                  aria-pressed={c.notNull}
                  title={t("notNull")}
                  className={cn(
                    "rounded border px-1 py-0.5 font-mono text-[10px] transition-colors",
                    c.notNull ? "border-primary bg-primary/10 text-primary" : "text-muted-foreground"
                  )}
                >
                  NN
                </button>
                <button
                  type="button"
                  onClick={() => setColumns((cols) => cols.filter((x) => x.id !== c.id))}
                  disabled={columns.length === 1}
                  aria-label={t("removeColumn")}
                  className="rounded p-1 text-muted-foreground hover:text-red-500 disabled:opacity-30"
                >
                  <Trash2 className="h-3 w-3" />
                </button>
              </li>
            ))}
          </ul>
          <div className="border-t p-2">
            <Button size="sm" variant="ghost" onClick={addColumn} className="w-full">
              <Plus className="h-4 w-4 mr-1.5" />
              {t("addColumn")}
            </Button>
          </div>
        </div>

        <div>
          <p className="mb-1.5 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">{t("sqlTitle")}</p>
          <pre className="overflow-x-auto rounded-lg border bg-muted/40 p-3 font-mono text-xs leading-relaxed" aria-live="polite">
            {highlight(sql)}
          </pre>
        </div>
      </div>

      <p className="mt-5 border-t pt-4 text-xs leading-relaxed text-muted-foreground">{t(`${project}.note`)}</p>
    </div>
  );
}
