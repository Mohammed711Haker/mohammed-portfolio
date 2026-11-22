"use client";
import { PointerEvent as RPointerEvent, ReactNode, useEffect, useRef, useState } from "react";
import { GITHUB, Lang, Project, STATUS, t } from "@/lib/data";
import { CloudReplay, EyeTest, FruitArch, ParkingSim, TempAlarm } from "./Demos";

export type Win = { id: string; x: number; y: number; z: number; min: boolean; max: boolean };

const L = <T extends { en: unknown; ar: unknown }>(o: T, lang: Lang) => o[lang] as T["en"];

/* ------------------------------------------------------------------ */
/* window state helpers (used by Portfolio)                            */
/* ------------------------------------------------------------------ */
export function nextWindow(wins: Win[], id: string, rtl: boolean): Win[] {
  const top = Math.max(10, ...wins.map((w) => w.z)) + 1;
  const found = wins.find((w) => w.id === id);
  if (found) return wins.map((w) => (w.id === id ? { ...w, min: false, z: top } : w));
  const n = wins.length % 6;
  const vw = typeof window === "undefined" ? 1200 : window.innerWidth;
  const width = Math.min(780, vw - 40);
  const x = rtl ? Math.max(20, vw - width - 60 - n * 34) : 60 + n * 34;
  return [...wins, { id, x, y: 84 + n * 30, z: top, min: false, max: false }];
}

/* ------------------------------------------------------------------ */
/* one draggable window                                                */
/* ------------------------------------------------------------------ */
function OsWindow({
  w,
  title,
  icon,
  lang,
  onClose,
  onFocus,
  onMin,
  onMax,
  onMove,
  children,
}: {
  w: Win;
  title: string;
  icon: string;
  lang: Lang;
  onClose: () => void;
  onFocus: () => void;
  onMin: () => void;
  onMax: () => void;
  onMove: (x: number, y: number) => void;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const drag = useRef<{ sx: number; sy: number; ox: number; oy: number } | null>(null);

  useEffect(() => {
    ref.current?.focus({ preventScroll: true });
  }, []);

  const down = (e: RPointerEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest("button") || w.max) return;
    if (window.matchMedia("(max-width: 760px)").matches) return;
    drag.current = { sx: e.clientX, sy: e.clientY, ox: w.x, oy: w.y };
    e.currentTarget.setPointerCapture(e.pointerId);
    ref.current?.classList.add("dragging");
  };
  const move = (e: RPointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d || !ref.current) return;
    const x = Math.min(Math.max(d.ox + e.clientX - d.sx, -ref.current.offsetWidth + 120), window.innerWidth - 120);
    const y = Math.min(Math.max(d.oy + e.clientY - d.sy, 8), window.innerHeight - 48);
    ref.current.style.left = `${x}px`;
    ref.current.style.top = `${y}px`;
  };
  const up = () => {
    const el = ref.current;
    if (!drag.current || !el) return;
    drag.current = null;
    el.classList.remove("dragging");
    onMove(parseFloat(el.style.left), parseFloat(el.style.top));
  };

  return (
    <div
      ref={ref}
      className={`win ${w.max ? "max" : ""} ${w.min ? "min" : ""}`}
      style={{ left: w.x, top: w.y, zIndex: 80 + w.z }}
      role="dialog"
      aria-label={title}
      tabIndex={-1}
      onPointerDown={onFocus}
    >
      <div className="win-bar" onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up} onDoubleClick={onMax} dir="ltr">
        <div className="win-dots">
          <button className="d-close" onClick={onClose} aria-label={L(t.projects.close, lang)} title={L(t.projects.close, lang)} />
          <button className="d-min" onClick={onMin} aria-label={L(t.projects.minimize, lang)} title={L(t.projects.minimize, lang)} />
          <button className="d-max" onClick={onMax} aria-label={L(t.projects.maximize, lang)} title={L(t.projects.maximize, lang)} />
        </div>
        <span className="win-title">
          {icon} ~/projects/{title.toLowerCase().replace(/[^a-z0-9+]+/g, "-").replace(/^-|-$/g, "")}
        </span>
        <button className="win-x" onClick={onClose} aria-label={L(t.projects.close, lang)}>
          ✕
        </button>
      </div>
      <div className="win-body">{children}</div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* case-study content                                                  */
/* ------------------------------------------------------------------ */
function CaseStudy({ p, lang }: { p: Project; lang: Lang }) {
  const [step, setStep] = useState(0);
  const steps = p.steps?.[lang];
  useEffect(() => {
    if (!steps) return;
    const id = setInterval(() => setStep((s) => s + 1), 1800);
    return () => clearInterval(id);
  }, [steps]);
  const st = STATUS[p.status];
  const concept = p.status === "concept" || p.status === "idea";

  return (
    <article className="case">
      <header className="case-head">
        <div className="pico">{p.icon}</div>
        <div>
          <h3>{L(p.title, lang)}</h3>
          <span className={`status s-${st.tone}`}>
            <i />
            {L(st.label, lang)}
          </span>
        </div>
      </header>

      <div className="case-grid">
        <section>
          <div className="mh">01 · {L(t.projects.problem, lang)}</div>
          <p className="long">{L(p.problem, lang)}</p>
        </section>
        <section>
          <div className="mh">02 · {L(concept ? t.projects.idea : t.projects.built, lang)}</div>
          <p className="long">{L(p.long, lang)}</p>
          {p.pending && <p className="pending">⏳ {L(t.projects.pending, lang)}</p>}
        </section>
      </div>

      {steps && (
        <>
          <div className="mh">03 · {L(t.projects.how, lang)}</div>
          <div className="flow">
            {steps.map((s, i) => (
              <div key={s} className={`flow-step ${step % steps.length === i ? "on" : ""}`} onClick={() => setStep(i)}>
                <b>{String(i + 1).padStart(2, "0")}</b>
                {s}
              </div>
            ))}
          </div>
        </>
      )}

      {p.demo && (
        <>
          <div className="mh">▶ {L(t.projects.demo, lang)}</div>
          {p.demoNote && <p className="demo-note">{L(p.demoNote, lang)}</p>}
          {p.demo === "parking" && <ParkingSim lang={lang} />}
          {p.demo === "cloud" && <CloudReplay lang={lang} />}
          {p.demo === "vision" && <EyeTest lang={lang} />}
          {p.demo === "temp" && <TempAlarm lang={lang} />}
          {p.demo === "fruit" && <FruitArch lang={lang} />}
        </>
      )}

      {p.shotsPending && (
        <div className="shots-slot" aria-hidden>
          <span>🖼️ {L(t.projects.shots, lang)}</span>
        </div>
      )}

      <div className="mh">{L(t.projects.stack, lang)}</div>
      <div className="tags" style={{ marginTop: 0 }}>
        {p.tags.map((g) => (
          <span className="tag" key={g}>
            {g}
          </span>
        ))}
      </div>

      {p.repos && (
        <>
          <div className="mh">{L(t.projects.code, lang)}</div>
          <div className="repo-links">
            {p.repos.map((r) => (
              <a key={r} className="btn btn-g mono" href={`${GITHUB}/${r}`} target="_blank" rel="noreferrer">
                ⌥ {r} ↗
              </a>
            ))}
          </div>
        </>
      )}
    </article>
  );
}

/* ------------------------------------------------------------------ */
/* manager: renders every open window + the dock                       */
/* ------------------------------------------------------------------ */
export default function Windows({
  wins,
  setWins,
  lang,
}: {
  wins: Win[];
  setWins: (f: (w: Win[]) => Win[]) => void;
  lang: Lang;
}) {
  const top = Math.max(0, ...wins.map((w) => w.z));
  const focus = (id: string) => setWins((ws) => (ws.find((w) => w.id === id)?.z === top ? ws : ws.map((w) => (w.id === id ? { ...w, z: top + 1 } : w))));
  const patch = (id: string, p: Partial<Win>) => setWins((ws) => ws.map((w) => (w.id === id ? { ...w, ...p } : w)));
  const close = (id: string) => setWins((ws) => ws.filter((w) => w.id !== id));

  return (
    <>
      {wins.map((w) => {
        const p = t.projects.items.find((x) => x.id === w.id);
        if (!p) return null;
        return (
          <OsWindow
            key={w.id}
            w={w}
            title={p.title.en}
            icon={p.icon}
            lang={lang}
            onClose={() => close(w.id)}
            onFocus={() => focus(w.id)}
            onMin={() => patch(w.id, { min: true })}
            onMax={() => patch(w.id, { max: !w.max })}
            onMove={(x, y) => patch(w.id, { x, y })}
          >
            <CaseStudy p={p} lang={lang} />
          </OsWindow>
        );
      })}
      {wins.length > 0 && (
        <nav className="dock" aria-label={L(t.projects.dock, lang)}>
          {wins.map((w) => {
            const p = t.projects.items.find((x) => x.id === w.id)!;
            const isTop = w.z === top && !w.min;
            return (
              <button
                key={w.id}
                className={`dock-i ${w.min ? "is-min" : ""} ${isTop ? "is-top" : ""}`}
                onClick={() => (isTop ? patch(w.id, { min: true }) : patch(w.id, { min: false, z: top + 1 }))}
                title={L(p.title, lang)}
              >
                <span>{p.icon}</span>
                <small>{L(p.title, lang)}</small>
              </button>
            );
          })}
        </nav>
      )}
    </>
  );
}
