"use client";
import { KeyboardEvent } from "react";
import { Lang, t } from "@/lib/data";

const COL = 178; // column width
const W = COL * t.skills.cats.length;
const CAT_Y = 132;
const SKILL_Y0 = 212;
const ROW = 50;
const H = SKILL_Y0 + Math.max(...t.skills.cats.map((c) => c.items.length)) * ROW;

const act = (fn: () => void) => (e: KeyboardEvent) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    fn();
  }
};

/**
 * Interactive skills map: me → categories → skills.
 * Hover/focus/tap a node to select it; the selected path lights up.
 */
export default function SkillMap({
  lang,
  cat,
  skill,
  onCat,
  onSkill,
}: {
  lang: Lang;
  cat: string;
  skill: string | null;
  onCat: (c: string) => void;
  onSkill: (c: string, n: string) => void;
}) {
  const cx = W / 2;
  return (
    <div className="smap-wrap" dir="ltr">
      <svg className="smap" viewBox={`0 0 ${W} ${H}`} role="group" aria-label={lang === "ar" ? "خريطة المهارات" : "Skills map"}>
        <defs>
          <linearGradient id="sm-g" x1="0" x2="1">
            <stop offset="0" stopColor="var(--a1)" />
            <stop offset="1" stopColor="var(--a2)" />
          </linearGradient>
        </defs>

        {/* edges */}
        {t.skills.cats.map((c, ci) => {
          const x = ci * COL + COL / 2;
          const on = c.id === cat;
          return (
            <g key={c.id} className={`sm-edges ${on ? "on" : ""}`}>
              <path className="sm-e" d={`M${cx},62 C${cx},${CAT_Y - 30} ${x},${62 + 20} ${x},${CAT_Y - 22}`} />
              {c.items.map((s, si) => {
                const y = SKILL_Y0 + si * ROW;
                const hot = on && s.n === skill;
                return <path key={s.n} className={`sm-e ${hot ? "hot" : ""}`} d={`M${x - 52},${CAT_Y + 20} V${y - 8} Q${x - 52},${y} ${x - 44},${y}`} />;
              })}
            </g>
          );
        })}

        {/* root */}
        <g className="sm-root">
          <circle cx={cx} cy={40} r={24} />
          <text x={cx} y={45} textAnchor="middle">
            MH
          </text>
        </g>

        {/* categories + skills */}
        {t.skills.cats.map((c, ci) => {
          const x = ci * COL + COL / 2;
          const on = c.id === cat;
          return (
            <g key={c.id}>
              <g
                className={`sm-cat ${on ? "on" : ""}`}
                tabIndex={0}
                role="button"
                aria-pressed={on}
                onClick={() => onCat(c.id)}
                onMouseEnter={() => onCat(c.id)}
                onKeyDown={act(() => onCat(c.id))}
              >
                <rect x={x - 76} y={CAT_Y - 22} width={152} height={44} rx={14} />
                <text x={x} y={CAT_Y + 5} textAnchor="middle">
                  {c.icon} {c.name[lang]}
                </text>
              </g>
              {c.items.map((s, si) => {
                const y = SKILL_Y0 + si * ROW;
                const hot = on && s.n === skill;
                return (
                  <g
                    key={s.n}
                    className={`sm-skill ${hot ? "hot" : ""} ${s.p?.length ? "has-p" : ""}`}
                    tabIndex={0}
                    role="button"
                    aria-pressed={hot}
                    aria-label={s.n}
                    onClick={() => onSkill(c.id, s.n)}
                    onMouseEnter={() => onSkill(c.id, s.n)}
                    onFocus={() => onSkill(c.id, s.n)}
                    onKeyDown={act(() => onSkill(c.id, s.n))}
                  >
                    <circle cx={x - 38} cy={y} r={hot ? 7 : 5} />
                    <text x={x - 24} y={y + 4}>
                      {s.n}
                    </text>
                  </g>
                );
              })}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
