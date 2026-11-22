"use client";
import Image from "next/image";
import { CSSProperties, MouseEvent, ReactNode, useCallback, useEffect, useMemo, useRef, useState } from "react";
import Background from "./Background";
import Terminal from "./Terminal";
import BootIntro from "./BootIntro";
import SkillMap from "./SkillMap";
import Windows, { Win, nextWindow } from "./Windows";
import { COUNTRIES, EMAIL, FALLBACK_REPOS, GITHUB, GITHUB_USER, LANG_COLORS, Lang, SKILL_COUNT, STATUS, TlCat, t } from "@/lib/data";
import { CV_PATH } from "@/lib/site";

/* ------------------------------------------------------------------ */
/* helpers                                                             */
/* ------------------------------------------------------------------ */
const SECTIONS = ["about", "skills", "resume", "projects", "github", "certs", "gallery", "contact"] as const;
const PHOTOS = [
  { src: "/pic1.jpeg", w: 780, h: 1040 },
  { src: "/pic2.jpeg", w: 609, h: 1080 },
  { src: "/pic3.jpeg", w: 1280, h: 950 },
  { src: "/pic4.jpeg", w: 1080, h: 1080 },
  { src: "/pic5.jpeg", w: 1126, h: 1126 },
  { src: "/pic6.jpeg", w: 756, h: 1008 },
  { src: "/pic7.jpeg", w: 467, h: 1000 },
];

const L = <T extends { en: unknown; ar: unknown }>(o: T, lang: Lang) => o[lang] as T["en"];

function tilt(e: MouseEvent<HTMLElement>, max = 9) {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  const px = (e.clientX - r.left) / r.width;
  const py = (e.clientY - r.top) / r.height;
  el.style.setProperty("--ry", `${(px - 0.5) * max * 2}deg`);
  el.style.setProperty("--rx", `${(0.5 - py) * max * 2}deg`);
  el.style.setProperty("--gx", `${px * 100}%`);
  el.style.setProperty("--gy", `${py * 100}%`);
}
function untilt(e: MouseEvent<HTMLElement>) {
  e.currentTarget.style.setProperty("--ry", "0deg");
  e.currentTarget.style.setProperty("--rx", "0deg");
}
function ripple(e: MouseEvent<HTMLElement>) {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  const s = document.createElement("span");
  const size = Math.max(r.width, r.height);
  s.className = "rip";
  s.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX - r.left - size / 2}px;top:${e.clientY - r.top - size / 2}px`;
  el.appendChild(s);
  setTimeout(() => s.remove(), 650);
}

function Counter({ to, plain }: { to: number; plain?: boolean }) {
  const [v, setV] = useState(0);
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current!;
    let raf = 0;
    const io = new IntersectionObserver(
      ([en]) => {
        if (!en.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (n: number) => {
          const p = Math.min((n - start) / 1400, 1);
          setV(Math.round((1 - Math.pow(1 - p, 3)) * to));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.6 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to]);
  return <b ref={ref}>{plain ? v || "" : v}</b>;
}

function Typer({ words }: { words: string[] }) {
  const [text, setText] = useState("");
  useEffect(() => {
    let i = 0,
      j = 0,
      del = false,
      timer: ReturnType<typeof setTimeout>;
    const step = () => {
      const w = words[i % words.length];
      j += del ? -1 : 1;
      setText(w.slice(0, j));
      let d = del ? 35 : 80;
      if (!del && j === w.length) {
        del = true;
        d = 1400;
      } else if (del && j === 0) {
        del = false;
        i++;
        d = 350;
      }
      timer = setTimeout(step, d);
    };
    timer = setTimeout(step, 400);
    return () => clearTimeout(timer);
  }, [words]);
  return (
    <div className="role" aria-live="off">
      <span style={{ color: "var(--ok)" }}>&gt;</span>
      <span>{text}</span>
      <span className="caret" />
    </div>
  );
}

function SectionHead({ tag, title, sub }: { tag: string; title: string; sub?: string }) {
  return (
    <div className="sec-head rv">
      <div className="sec-tag">{tag}</div>
      <h2 className="sec-title">
        <span className="grad">{title}</span>
      </h2>
      {sub && <p className="sec-sub">{sub}</p>}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* main                                                                */
/* ------------------------------------------------------------------ */
type Repo = { name: string; language: string | null; description: string | null; html_url?: string; stargazers_count?: number; pushed_at?: string; fork?: boolean };

export default function Portfolio() {
  const [lang, setLangState] = useState<Lang>("en");
  const [theme, setThemeState] = useState<"dark" | "light">("dark");
  const [menu, setMenu] = useState(false);
  const [active, setActive] = useState<string>("");
  const [showTop, setShowTop] = useState(false);
  const [cat, setCat] = useState("web");
  const [skill, setSkill] = useState<{ c: string; n: string } | null>(null);
  const [tl, setTl] = useState(0);
  const [tlFilter, setTlFilter] = useState<"all" | TlCat>("all");
  const [skView, setSkView] = useState<"map" | "list">("map");
  const [pFilter, setPFilter] = useState("all");
  const [wins, setWins] = useState<Win[]>([]);
  const [flipped, setFlipped] = useState<string | null>(null);
  const [cvOk, setCvOk] = useState(false);
  const [bootN, setBootN] = useState(0);
  const [gFilter, setGFilter] = useState("all");
  const [lb, setLb] = useState<number | null>(null);
  const [pal, setPal] = useState(false);
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(0);
  const [toast, setToast] = useState("");
  const [repos, setRepos] = useState<Repo[] | null>(null);
  const [ghFail, setGhFail] = useState(false);
  const [form, setForm] = useState({ name: "", mail: "", msg: "" });
  const [formMsg, setFormMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [matrix, setMatrix] = useState(false);
  const ar = lang === "ar";

  /* ---- persistence ---- */
  // The inline script in app/layout.tsx already set <html lang/dir> before paint.
  // We read that here so the first client render matches it (no LTR→RTL flash).
  const [ready, setReady] = useState(false);
  /* eslint-disable react-hooks/set-state-in-effect -- reading browser-only state after hydration */
  useEffect(() => {
    const d = document.documentElement;
    let l: Lang = d.lang === "ar" ? "ar" : "en";
    try {
      const s = localStorage.getItem("lang");
      if (s === "ar" || s === "en") l = s;
    } catch {}
    setLangState(l);
    const attr = d.getAttribute("data-theme");
    if (attr === "light" || attr === "dark") setThemeState(attr);
    if (window.matchMedia("(max-width: 760px)").matches) setSkView("list");
    setReady(true);
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  /* ---- CV: enable the button only when the PDF exists ---- */
  useEffect(() => {
    const ctrl = new AbortController();
    fetch(CV_PATH, { method: "HEAD", signal: ctrl.signal })
      .then((r) => setCvOk(r.ok && (r.headers.get("content-type") || "").includes("pdf")))
      .catch(() => {});
    return () => ctrl.abort();
  }, []);
  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem("lang", l);
    } catch {}
  }, []);
  const setTheme = useCallback((th: "dark" | "light") => {
    setThemeState(th);
    try {
      localStorage.setItem("theme", th);
    } catch {}
  }, []);
  useEffect(() => {
    if (!ready) return;
    const d = document.documentElement;
    d.lang = lang;
    d.dir = ar ? "rtl" : "ltr";
    d.removeAttribute("data-lpend");
  }, [lang, ar, ready]);
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const flash = useCallback((m: string) => {
    setToast(m);
    setTimeout(() => setToast(""), 2200);
  }, []);

  const go = useCallback((id: string) => {
    setMenu(false);
    setPal(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  /* ---- scroll progress, cursor glow, active section ---- */
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = root.current!;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        el.style.setProperty("--p", String(max > 0 ? window.scrollY / max : 0));
        setShowTop(window.scrollY > 700);
      });
    };
    const onMove = (e: PointerEvent) => {
      el.style.setProperty("--mx", e.clientX + "px");
      el.style.setProperty("--my", e.clientY + "px");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  /* ---- reveal on scroll (also picks up elements rendered later) ---- */
  const revealIO = useRef<IntersectionObserver | null>(null);
  useEffect(() => {
    revealIO.current = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            revealIO.current?.unobserve(e.target);
          }
        }),
      { threshold: 0.08 }
    );
    return () => revealIO.current?.disconnect();
  }, []);
  useEffect(() => {
    root.current?.querySelectorAll(".rv:not(.in)").forEach((n) => revealIO.current?.observe(n));
  });

  /* ---- GitHub live ---- */
  useEffect(() => {
    const ctrl = new AbortController();
    fetch(`https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=pushed`, { signal: ctrl.signal })
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((d: Repo[]) => setRepos(d))
      .catch(() => {
        if (!ctrl.signal.aborted) setGhFail(true);
      });
    return () => ctrl.abort();
  }, []);
  const shownRepos: Repo[] = useMemo(() => {
    const base = repos ?? (ghFail ? (FALLBACK_REPOS as Repo[]) : []);
    return base.filter((r) => !r.fork && r.name.toLowerCase() !== GITHUB_USER.toLowerCase()).slice(0, 9);
  }, [repos, ghFail]);
  const langMix = useMemo(() => {
    const m: Record<string, number> = {};
    shownRepos.forEach((r) => r.language && (m[r.language] = (m[r.language] || 0) + 1));
    return Object.entries(m).sort((a, b) => b[1] - a[1]);
  }, [shownRepos]);

  /* ---- keyboard: palette, esc, lightbox, konami ---- */
  const palItems = useMemo(() => {
    const items: { k: string; label: string; hint: string; run: () => void }[] = [
      ...SECTIONS.map((s) => ({
        k: s,
        label: (ar ? "اذهب إلى " : "Go to ") + L(t.nav[s as keyof typeof t.nav], lang),
        hint: "#" + s,
        run: () => go(s),
      })),
      ...t.projects.items.map((p) => ({
        k: "p-" + p.id,
        label: (ar ? "افتح دراسة الحالة: " : "Open case study: ") + L(p.title, lang),
        hint: L(STATUS[p.status].label, lang),
        run: () => openProject(p.id),
      })),
      { k: "terminal", label: ar ? "افتح التيرمنال" : "Open terminal", hint: "#terminal", run: () => go("terminal") },
      { k: "cv", label: L(t.hero.cv, lang), hint: "PDF", run: () => downloadCv() },
      { k: "boot", label: ar ? "أعد تشغيل مقدمة النظام" : "Replay boot intro", hint: "boot", run: () => setBootN((n) => n + 1) },
      { k: "theme", label: ar ? "تبديل المظهر" : "Toggle theme", hint: theme, run: () => setTheme(theme === "dark" ? "light" : "dark") },
      { k: "lang", label: ar ? "Switch to English" : "التبديل إلى العربية", hint: ar ? "EN" : "AR", run: () => setLang(ar ? "en" : "ar") },
      { k: "mail", label: ar ? "انسخ البريد" : "Copy email", hint: EMAIL, run: () => copyMail() },
      { k: "gh", label: ar ? "افتح GitHub" : "Open GitHub", hint: "↗", run: () => window.open(GITHUB, "_blank") },
    ];
    const s = q.trim().toLowerCase();
    return s ? items.filter((i) => (i.label + i.hint).toLowerCase().includes(s)) : items;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q, lang, theme, ar, go]);

  const escRef = useRef({ pal, lb: lb !== null, wins });
  useEffect(() => {
    escRef.current = { pal, lb: lb !== null, wins };
  });
  useEffect(() => {
    const seq = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
    let pos = 0;
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      const typing = tag === "INPUT" || tag === "TEXTAREA";
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPal((p) => !p);
        setQ("");
        setSel(0);
        return;
      }
      if (e.key === "Escape") {
        // close the top-most layer only: palette → lightbox → top window
        if (escRef.current.pal) setPal(false);
        else if (escRef.current.lb) setLb(null);
        else {
          const open = escRef.current.wins.filter((w) => !w.min);
          if (open.length) {
            const top = open.reduce((a, b) => (a.z > b.z ? a : b));
            setWins((ws) => ws.filter((w) => w.id !== top.id));
          }
        }
        setMenu(false);
      }
      if (typing) return;
      pos = e.key.toLowerCase() === seq[pos].toLowerCase() ? pos + 1 : e.key === seq[0] ? 1 : 0;
      if (pos === seq.length) {
        pos = 0;
        setMatrix(true);
        setTimeout(() => setMatrix(false), 6000);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // lock page scroll for overlays; windows are full-screen sheets on phones, so lock there too
  const winOpen = wins.some((w) => !w.min);
  useEffect(() => {
    const phone = window.matchMedia("(max-width: 760px)").matches;
    document.body.style.overflow = lb !== null || pal || (winOpen && phone) ? "hidden" : "";
  }, [lb, pal, winOpen]);

  /* ---- magnetic buttons (pointer devices only, no reduced motion) ---- */
  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (prefers-reduced-motion: no-preference)").matches) return;
    let cur: HTMLElement | null = null;
    const reset = () => {
      if (cur) cur.style.transform = "";
      cur = null;
    };
    const onMove = (e: PointerEvent) => {
      const el = (e.target as HTMLElement)?.closest?.<HTMLElement>(".mag") ?? null;
      if (el !== cur) reset();
      if (!el) return;
      cur = el;
      const r = el.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) / r.width;
      const dy = (e.clientY - (r.top + r.height / 2)) / r.height;
      el.style.transform = `translate(${dx * 10}px, ${dy * 8}px)`;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("blur", reset);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("blur", reset);
    };
  }, []);

  /* ---- gallery list ---- */
  const gList = useMemo(
    () => PHOTOS.map((p, i) => ({ ...p, i, cat: t.gallery.cats[i], cap: t.gallery.caps[i] })).filter((p) => gFilter === "all" || p.cat === gFilter),
    [gFilter]
  );
  const lbStep = useCallback(
    (d: number) => setLb((cur) => (cur === null ? cur : (cur + d + gList.length) % gList.length)),
    [gList.length]
  );
  useEffect(() => {
    if (lb === null) return;
    const onKey = (e: KeyboardEvent) => {
      const prev = ar ? "ArrowRight" : "ArrowLeft";
      const next = ar ? "ArrowLeft" : "ArrowRight";
      if (e.key === next) lbStep(1);
      if (e.key === prev) lbStep(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lb, lbStep, ar]);
  const touchX = useRef(0);

  /* ---- windows & CV ---- */
  function openProject(id: string) {
    setPal(false);
    setWins((ws) => nextWindow(ws, id, document.documentElement.dir === "rtl"));
  }
  function downloadCv() {
    if (!cvOk) return flash(L(t.hero.cvSoon, lang));
    const a = document.createElement("a");
    a.href = CV_PATH;
    a.download = "Mohammed-Humaidhah-CV.pdf";
    a.click();
  }

  /* ---- contact ---- */
  function copyMail() {
    navigator.clipboard
      ?.writeText(EMAIL)
      .then(() => flash(L(t.contact.copied, lang)))
      .catch(() => flash(EMAIL));
  }
  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.mail.trim() || !form.msg.trim()) return setFormMsg({ ok: false, text: L(t.contact.required, lang) });
    if (!/^\S+@\S+\.\S+$/.test(form.mail)) return setFormMsg({ ok: false, text: L(t.contact.invalid, lang) });
    setFormMsg({ ok: true, text: L(t.contact.opened, lang) });
    const subject = encodeURIComponent(`Portfolio message from ${form.name}`);
    const body = encodeURIComponent(`${form.msg}\n\n— ${form.name} (${form.mail})`);
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
  }

  /* ---- derived ---- */
  const skillCat = t.skills.cats.find((c) => c.id === cat)!;
  const selSkill = skill && skill.c === cat ? skillCat.items.find((i) => i.n === skill.n) : null;
  const pItems = t.projects.items.filter((p) => pFilter === "all" || p.cats.includes(pFilter));
  const tlItems = t.resume.items.filter((it) => tlFilter === "all" || it.cat === tlFilter);
  const usedIn = selSkill && "p" in selSkill && selSkill.p ? t.projects.items.filter((p) => selSkill.p!.includes(p.id)) : [];
  const stats = [
    { v: t.stats.started.v, label: t.stats.started.label, plain: true },
    { v: repos ? repos.length : t.stats.repos.v, label: t.stats.repos.label },
    { v: SKILL_COUNT, label: t.stats.skills.label },
    { v: COUNTRIES.length, label: t.stats.countries.label },
  ];
  const openSkill = (c: string, n: string) => {
    setCat(c);
    setSkill({ c, n });
    go("skills");
  };

  const chips: { l: string; tip: string; r: number; c: string; n: string }[] = [
    { l: "TS", tip: "TypeScript", r: 0, c: "web", n: "TypeScript" },
    { l: "JS", tip: "JavaScript", r: 72, c: "web", n: "HTML / CSS / JS" },
    { l: "Py", tip: "Python", r: 144, c: "ai", n: "Python" },
    { l: "C++", tip: "C++", r: 216, c: "mobile", n: "C++" },
    { l: "Git", tip: "Git & GitHub", r: 288, c: "sys", n: "Git & GitHub" },
  ];
  const chips2: typeof chips = [
    { l: "▲", tip: "Next.js", r: 30, c: "web", n: "Next.js" },
    { l: "ESP", tip: "ESP32", r: 150, c: "iot", n: "ESP32" },
    { l: "🐧", tip: "Debian Linux", r: 270, c: "sys", n: "Debian Linux" },
  ];

  return (
    <div ref={root} style={{ position: "relative" }}>
      <BootIntro lang={lang} replay={bootN} />
      <div className="progress" />
      <div className="cursor-glow" />
      <Background />

      {/* ---------------- header ---------------- */}
      <header className="header">
        <div className="wrap header-in">
          <button className="logo" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Home" dir="ltr">
            <i>&gt;</i>mohammed<span className="sub" style={{ color: "var(--muted)" }}>@portfolio</span>
            <span className="blink" />
          </button>
          <nav className={`nav ${menu ? "open" : ""}`}>
            {SECTIONS.map((s) => (
              <a
                key={s}
                href={`#${s}`}
                className={active === s ? "on" : ""}
                onClick={(e) => {
                  e.preventDefault();
                  go(s);
                }}
              >
                {L(t.nav[s as keyof typeof t.nav], lang)}
              </a>
            ))}
          </nav>
          <div className="tools">
            <button className="ibtn hide-m" onClick={() => setPal(true)} aria-label="Command palette">
              ⌘ <span className="kbd">Ctrl K</span>
            </button>
            <button className="ibtn" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} aria-label={L(t.ui.theme, lang)} title={L(t.ui.theme, lang)}>
              {theme === "dark" ? "☀️" : "🌙"}
            </button>
            <button className="ibtn" onClick={() => setLang(ar ? "en" : "ar")} aria-label={L(t.ui.lang, lang)} title={L(t.ui.lang, lang)}>
              {ar ? "EN" : "ع"}
            </button>
            <button className="ibtn burger" onClick={() => setMenu((m) => !m)} aria-label="Menu">
              {menu ? "✕" : "☰"}
            </button>
          </div>
        </div>
      </header>

      <main style={{ position: "relative", zIndex: 1 }}>
        {/* ---------------- hero ---------------- */}
        <section className="hero" id="top">
          <div className="aurora" aria-hidden="true">
            <i />
            <i />
            <i />
          </div>
          <div className="wrap hero-grid" style={{ width: "100%" }}>
            <div>
              <span className="badge rv">
                <span className="dot" />
                {ar ? "متاح للتعاون والتدريب" : "open to collaborate & intern"}
              </span>
              <h1 className="h1 rv" style={{ "--d": "80ms" } as CSSProperties}>
                {L(t.hero.hi, lang)} <span className="grad grad-anim">{L(t.hero.name, lang)}</span>
                <span className="alias">{L(t.hero.alias, lang)}</span>
              </h1>
              <div className="rv" style={{ "--d": "160ms" } as CSSProperties}>
                <Typer words={t.hero.roles[lang]} />
              </div>
              <p className="lead rv" style={{ "--d": "240ms" } as CSSProperties}>
                {L(t.hero.intro, lang)}
              </p>
              <div className="cta rv" style={{ "--d": "320ms" } as CSSProperties}>
                <button
                  className="btn btn-p mag"
                  onClick={(e) => {
                    ripple(e);
                    go("projects");
                  }}
                >
                  {L(t.hero.cta1, lang)} →
                </button>
                <button
                  className="btn btn-g mag"
                  onClick={(e) => {
                    ripple(e);
                    go("contact");
                  }}
                >
                  ✉ {L(t.hero.cta2, lang)}
                </button>
                <button
                  className="btn btn-g mono"
                  onClick={(e) => {
                    ripple(e);
                    go("terminal");
                  }}
                >
                  &gt;_ {L(t.hero.cta3, lang)}
                </button>
                <a
                  className={`btn btn-g mag cv-btn ${cvOk ? "" : "soon"}`}
                  href={CV_PATH}
                  download="Mohammed-Humaidhah-CV.pdf"
                  onClick={(e) => {
                    ripple(e);
                    if (!cvOk) {
                      e.preventDefault();
                      flash(L(t.hero.cvSoon, lang));
                    }
                  }}
                  aria-disabled={!cvOk}
                >
                  ⤓ {L(t.hero.cv, lang)}
                </a>
              </div>
              <div className="hint rv" style={{ "--d": "400ms" } as CSSProperties}>
                {L(t.hero.hint, lang)}
              </div>
              <div className="stats rv" style={{ "--d": "480ms" } as CSSProperties}>
                {stats.map((s, i) => (
                  <div key={i} className="stat glass">
                    <span className="grad">
                      <Counter to={s.v} plain={s.plain} />
                    </span>
                    <span>{L(s.label, lang)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="hero-photo-col rv" style={{ "--d": "200ms" } as CSSProperties}>
              <div className="photo-stage">
                {[
                  { arr: chips, cls: "orbit" },
                  { arr: chips2, cls: "orbit rev" },
                ].map((o) => (
                  <div key={o.cls} className={o.cls}>
                    {o.arr.map((c) => (
                      <div key={c.tip} className="arm" style={{ "--r": `${c.r}deg` } as CSSProperties}>
                        <button className="chip3d" data-tip={c.tip} onClick={() => openSkill(c.c, c.n)} aria-label={c.tip}>
                          {c.l}
                        </button>
                      </div>
                    ))}
                  </div>
                ))}
                <div className="photo-card" onMouseMove={(e) => tilt(e, 12)} onMouseLeave={untilt}>
                  <div className="inner">
                    <Image src="/mohammed-humaidhah.jpg" alt="Mohammed Humaidhah" fill priority sizes="380px" style={{ objectFit: "cover" }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="scroll-ind hide-m">
            {L(t.hero.scroll, lang)}
            <i />
          </div>
        </section>

        {/* ---------------- about ---------------- */}
        <section id="about" className="section">
          <div className="wrap">
            <SectionHead tag={t.about.sub.en} title={L(t.about.title, lang)} />
            <div className="about-grid">
              <div className="about-card glass rv">
                <div className="codebar" dir="ltr">
                  <i style={{ background: "#fb7185" }} />
                  <i style={{ background: "#fbbf24" }} />
                  <i style={{ background: "#34d399" }} />
                  <span style={{ marginInlineStart: 8 }}>about.md</span>
                </div>
                <p>{L(t.about.p1, lang)}</p>
                <p>
                  {L(t.about.p2a, lang)}{" "}
                  <b onClick={() => go("resume")} title="→ Journey">
                    Abu Hilal Sky
                  </b>
                  {L(t.about.p2b, lang)}
                </p>
                <p>{L(t.about.p3, lang)}</p>
              </div>
              <div className="facts glass rv" style={{ "--d": "120ms" } as CSSProperties}>
                {[
                  [t.about.study, t.about.studyV],
                  [t.about.goal, t.about.goalV],
                  [t.about.focus, t.about.focusV],
                  [t.about.base, t.about.baseV],
                  [t.about.from, t.about.fromV],
                ].map(([k, v], i) => (
                  <div className="fact" key={i}>
                    <span>{L(k as typeof t.about.goal, lang)}</span>
                    <strong>{L(v as typeof t.about.goal, lang)}</strong>
                  </div>
                ))}
              </div>
            </div>
            <div className="about-grid about-extra">
              <div className="glass langs rv">
                <div className="sec-tag">
                  {L(t.about.langsTitle, lang)} <span className="m-note">· {L(t.about.langsNote, lang)}</span>
                </div>
                {t.about.langs.map((l, i) => (
                  <div className="lang-row" key={l.n.en}>
                    <div className="lang-top">
                      <strong>{L(l.n, lang)}</strong>
                      {L(l.tag, lang) && <small>{L(l.tag, lang)}</small>}
                    </div>
                    <div className="lang-bar" role="meter" aria-valuemin={0} aria-valuemax={5} aria-valuenow={l.lv} aria-label={L(l.n, lang)}>
                      {Array.from({ length: 5 }).map((_, k) => (
                        <i key={k} className={k < l.lv ? "on" : ""} style={{ "--d": `${i * 120 + k * 70}ms` } as CSSProperties} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="glass courses rv" style={{ "--d": "120ms" } as CSSProperties}>
                <div className="sec-tag">{L(t.about.coursesTitle, lang)}</div>
                <div className="tags">
                  {t.about.courses.map((c) => (
                    <span className="tag course" key={c.en}>
                      {L(c, lang)}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------- skills ---------------- */}
        <section id="skills" className="section">
          <div className="wrap">
            <SectionHead tag="// stack.json" title={L(t.skills.title, lang)} sub={L(skView === "map" ? t.skills.mapSub : t.skills.sub, lang)} />
            <div className="seg view-toggle rv" role="tablist">
              {(["map", "list"] as const).map((v) => (
                <button key={v} role="tab" aria-selected={skView === v} className={skView === v ? "on" : ""} onClick={() => setSkView(v)}>
                  {v === "map" ? "◉ " : "☰ "}
                  {L(v === "map" ? t.skills.viewMap : t.skills.viewList, lang)}
                </button>
              ))}
            </div>
            {skView === "map" && (
              <SkillMap
                lang={lang}
                cat={cat}
                skill={skill && skill.c === cat ? skill.n : null}
                onCat={(c) => {
                  if (c !== cat) {
                    setCat(c);
                    setSkill(null);
                  }
                }}
                onSkill={(c, n) => {
                  setCat(c);
                  setSkill({ c, n });
                }}
              />
            )}
            <div className="tabs rv" hidden={skView === "map"}>
              {t.skills.cats.map((c) => (
                <button
                  key={c.id}
                  className={`tab ${cat === c.id ? "on" : ""}`}
                  onClick={() => {
                    setCat(c.id);
                    setSkill(null);
                  }}
                >
                  {c.icon} {L(c.name, lang)}
                </button>
              ))}
            </div>
            <div className={`skill-box rv ${skView === "map" ? "map-mode" : ""}`}>
              <div className="skills-grid glass" key={cat} hidden={skView === "map"}>
                {skillCat.items.map((s, i) => (
                  <button
                    key={s.n}
                    className={`skill ${selSkill?.n === s.n ? "on" : ""}`}
                    style={{ "--d": `${i * 60}ms` } as CSSProperties}
                    onMouseEnter={() => setSkill({ c: cat, n: s.n })}
                    onClick={() => setSkill({ c: cat, n: s.n })}
                  >
                    {s.n}
                  </button>
                ))}
              </div>
              <div className="skill-info glass">
                <div className="tipline">{selSkill ? `$ man ${selSkill.n.toLowerCase().replace(/[^a-z0-9]+/g, "-")}` : `// ${L(t.skills.tip, lang)}`}</div>
                <div className="big grad">{selSkill ? selSkill.n : skillCat.icon}</div>
                <p>{selSkill ? L(selSkill.d, lang) : L(skView === "map" ? t.skills.mapSub : t.skills.sub, lang)}</p>
                {usedIn.length > 0 && (
                  <div className="used-in">
                    <small>{L(t.skills.usedIn, lang)}:</small>
                    {usedIn.map((p) => (
                      <button key={p.id} className="mini" onClick={() => openProject(p.id)}>
                        {p.icon} {L(p.title, lang)} ↗
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ---------------- journey ---------------- */}
        <section id="resume" className="section">
          <div className="wrap" style={{ maxWidth: 880 }}>
            <SectionHead tag="// git log --journey" title={L(t.resume.title, lang)} sub={L(t.resume.sub, lang)} />
            <div className="tabs rv">
              {t.resume.filters.map((f) => (
                <button
                  key={f.id}
                  className={`tab ${tlFilter === f.id ? "on" : ""}`}
                  onClick={() => {
                    setTlFilter(f.id);
                    setTl(0);
                  }}
                >
                  {L(f.label, lang)}
                  <span className="cnt">{f.id === "all" ? t.resume.items.length : t.resume.items.filter((x) => x.cat === f.id).length}</span>
                </button>
              ))}
            </div>
            <div className="timeline" key={tlFilter}>
              {tlItems.map((it, i) => (
                <div
                  key={it.title.en}
                  role="button"
                  className={`tl-item glass rv tl-${it.cat} ${tl === i ? "open" : ""}`}
                  style={{ "--d": `${Math.min(i, 6) * 70}ms` } as CSSProperties}
                  onClick={() => setTl(tl === i ? -1 : i)}
                  tabIndex={0}
                  onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), setTl(tl === i ? -1 : i))}
                  aria-expanded={tl === i}
                >
                  <span className="tl-hint">+</span>
                  <div className="tl-when">{L(it.when, lang)}</div>
                  <h3>
                    <span>{it.icon}</span> {L(it.title, lang)}
                  </h3>
                  <div className="tl-org">{L(it.org, lang)}</div>
                  <div className="tl-more">
                    <p>{L(it.desc, lang)}</p>
                    <div className="tags">
                      {it.tags.map((g) => (
                        <span className="tag" key={g}>
                          {g}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- projects ---------------- */}
        <section id="projects" className="section">
          <div className="wrap">
            <SectionHead tag="// projects/" title={L(t.projects.title, lang)} sub={L(t.projects.sub, lang)} />
            <div className="tabs rv">
              {t.projects.filters.map((f) => (
                <button key={f.id} className={`tab ${pFilter === f.id ? "on" : ""}`} onClick={() => setPFilter(f.id)}>
                  {L(f.label, lang)}
                </button>
              ))}
            </div>
            <div className="p-grid" key={pFilter}>
              {pItems.map((p, i) => (
                <button
                  key={p.id}
                  className={`pcard glass tilt rv st-${p.status}`}
                  style={{ "--d": `${i * 90}ms` } as CSSProperties}
                  onMouseMove={(e) => tilt(e, 7)}
                  onMouseLeave={untilt}
                  onClick={() => openProject(p.id)}
                >
                  <div className="pcard-top">
                    <div className="pico">{p.icon}</div>
                    <span className={`status s-${STATUS[p.status].tone}`}>
                      <i />
                      {L(STATUS[p.status].label, lang)}
                    </span>
                  </div>
                  <h3>{L(p.title, lang)}</h3>
                  <p>{L(p.short, lang)}</p>
                  <div className="tags" style={{ marginTop: 2 }}>
                    {p.tags.slice(0, 3).map((g) => (
                      <span key={g} className="tag">
                        {g}
                      </span>
                    ))}
                  </div>
                  <span className="go">{L(t.projects.open, lang)} →</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- github ---------------- */}
        <section id="github" className="section">
          <div className="wrap">
            <SectionHead tag={`// api.github.com/users/${GITHUB_USER}`} title={L(t.gh.title, lang)} sub={L(t.gh.sub, lang)} />
            {ghFail && (
              <p className="mono rv" style={{ color: "var(--warn)", fontSize: 13, marginBottom: 14 }}>
                ⚠ {L(t.gh.fail, lang)}
              </p>
            )}
            {langMix.length > 0 && (
              <div className="glass rv" style={{ padding: 22, marginBottom: 20 }}>
                <div className="sec-tag">{L(t.gh.langs, lang)}</div>
                <div className="langbar" dir="ltr">
                  {langMix.map(([l, n]) => (
                    <i key={l} title={l} style={{ flex: n, background: LANG_COLORS[l] || "var(--a1)" }} />
                  ))}
                </div>
                <div className="legend">
                  {langMix.map(([l, n]) => (
                    <span key={l}>
                      <span className="lang-dot" style={{ background: LANG_COLORS[l] || "var(--a1)" }} />
                      {l} · {n}
                    </span>
                  ))}
                </div>
              </div>
            )}
            <div className="gh-grid">
              {!repos && !ghFail && Array.from({ length: 6 }).map((_, i) => <div className="skel" key={i} aria-label={L(t.gh.loading, lang)} />)}
              {shownRepos.map((r, i) => (
                <a
                  key={r.name}
                  className="repo glass tilt rv"
                  style={{ "--d": `${i * 60}ms` } as CSSProperties}
                  href={r.html_url || `${GITHUB}/${r.name}`}
                  target="_blank"
                  rel="noreferrer"
                  onMouseMove={(e) => tilt(e, 5)}
                  onMouseLeave={untilt}
                >
                  <h4>
                    <span style={{ color: "var(--a1)" }}>⌥</span> {r.name}
                  </h4>
                  <p>{r.description || (r.language ? `${r.language} project` : "—")}</p>
                  <div className="repo-foot" dir="ltr">
                    <span>
                      {r.language && <span className="lang-dot" style={{ background: LANG_COLORS[r.language] || "var(--a1)" }} />}
                      {r.language || "—"}
                    </span>
                    <span>
                      {r.stargazers_count ? `★ ${r.stargazers_count} · ` : ""}
                      {r.pushed_at ? new Date(r.pushed_at).toLocaleDateString("en-GB", { month: "short", year: "numeric" }) : "↗"}
                    </span>
                  </div>
                </a>
              ))}
            </div>
            <div style={{ marginTop: 26 }} className="rv">
              <a className="btn btn-g" href={GITHUB} target="_blank" rel="noreferrer" onClick={ripple}>
                {L(t.gh.profile, lang)} ↗
              </a>
            </div>
          </div>
        </section>

        {/* ---------------- certificates ---------------- */}
        <section id="certs" className="section">
          <div className="wrap">
            <SectionHead tag="// ~/certificates" title={L(t.certs.title, lang)} sub={L(t.certs.sub, lang)} />
            <div className="cert-wall">
              {t.certs.items.map((c, i) => (
                <button
                  key={c.id}
                  className={`cert rv ${flipped === c.id ? "flip" : ""}`}
                  style={{ "--d": `${i * 70}ms` } as CSSProperties}
                  onClick={() => setFlipped(flipped === c.id ? null : c.id)}
                  aria-pressed={flipped === c.id}
                >
                  <span className="cert-in">
                    <span className="cert-f glass">
                      <span className="cert-ic">{c.icon}</span>
                      <small className="cert-kind">{L(c.kind, lang)}</small>
                      <strong>{L(c.title, lang)}</strong>
                      {c.score && <span className="cert-score grad">{c.score}</span>}
                    </span>
                    <span className="cert-b glass">
                      <small className="cert-kind">{L(c.kind, lang)}</small>
                      <strong>{L(c.org, lang)}</strong>
                      <span className="mono cert-when">{L(c.when, lang)}</span>
                      {c.score && <span className="cert-score grad">{c.score}</span>}
                    </span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- terminal ---------------- */}
        <section id="terminal" className="section">
          <div className="wrap" style={{ maxWidth: 860 }}>
            <SectionHead
              tag="// try me"
              title={ar ? "تيرمنال تفاعلي" : "Interactive Terminal"}
              sub={ar ? "اكتب help أو اضغط على الأزرار. جرّب: sudo hire-me" : "Type help or tap the buttons. Try: sudo hire-me"}
            />
            <div className="rv">
              <Terminal
                lang={lang}
                go={go}
                setTheme={setTheme}
                setLang={setLang}
                hire={() => {
                  go("contact");
                  flash(ar ? "تم! أرسل لي رسالة 😉" : "Granted! Send me a message 😉");
                }}
                openProject={openProject}
                cv={downloadCv}
                boot={() => setBootN((n) => n + 1)}
              />
            </div>
          </div>
        </section>

        {/* ---------------- gallery ---------------- */}
        <section id="gallery" className="section">
          <div className="wrap">
            <SectionHead tag="// ~/pictures" title={L(t.gallery.title, lang)} sub={L(t.gallery.sub, lang)} />
            <div className="tabs rv">
              {t.gallery.filters.map((f) => (
                <button key={f.id} className={`tab ${gFilter === f.id ? "on" : ""}`} onClick={() => setGFilter(f.id)}>
                  {L(f.label, lang)}
                </button>
              ))}
            </div>
            <div className="masonry" key={gFilter}>
              {gList.map((p, idx) => (
                <button key={p.src} className="shot" style={{ "--d": `${idx * 70}ms` } as CSSProperties} onClick={() => setLb(idx)}>
                  <Image src={p.src} alt={L(p.cap, lang)} width={p.w} height={p.h} sizes="(max-width: 700px) 50vw, 25vw" />
                  <span className="cap">{L(p.cap, lang)}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- contact ---------------- */}
        <section id="contact" className="section">
          <div className="wrap">
            <SectionHead tag="// contact.sh" title={L(t.contact.title, lang)} sub={L(t.contact.sub, lang)} />
            <div className="contact-grid">
              <form className="form glass rv" onSubmit={submit} noValidate>
                {(
                  [
                    ["name", t.contact.name, "text"],
                    ["mail", t.contact.mail, "email"],
                  ] as const
                ).map(([k, lab, type]) => (
                  <div className="field" key={k}>
                    <input
                      type={type}
                      placeholder=" "
                      value={form[k]}
                      onChange={(e) => setForm({ ...form, [k]: e.target.value })}
                      id={`f-${k}`}
                      autoComplete={k === "name" ? "name" : "email"}
                    />
                    <label htmlFor={`f-${k}`}>{L(lab, lang)}</label>
                  </div>
                ))}
                <div className="field">
                  <textarea placeholder=" " value={form.msg} onChange={(e) => setForm({ ...form, msg: e.target.value })} id="f-msg" />
                  <label htmlFor="f-msg">{L(t.contact.msg, lang)}</label>
                </div>
                <div className="msg" style={{ color: formMsg?.ok ? "var(--ok)" : "var(--bad)" }} role="status">
                  {formMsg?.text}
                </div>
                <button className="btn btn-p mag" type="submit" onClick={ripple}>
                  {L(t.contact.send, lang)} ➤
                </button>
              </form>
              <div className="links glass rv" style={{ "--d": "120ms" } as CSSProperties}>
                <button className="link-row" onClick={copyMail}>
                  <span className="ic">✉️</span>
                  <span>
                    <strong>{EMAIL}</strong>
                    <small>{L(t.contact.copy, lang)}</small>
                  </span>
                </button>
                <a className="link-row" href={GITHUB} target="_blank" rel="noreferrer">
                  <span className="ic">🐙</span>
                  <span>
                    <strong>github.com/{GITHUB_USER}</strong>
                    <small>{L(t.gh.view, lang)} ↗</small>
                  </span>
                </a>
                <button className="link-row" onClick={downloadCv}>
                  <span className="ic">📄</span>
                  <span>
                    <strong>{L(t.hero.cv, lang)}</strong>
                    <small>{cvOk ? "PDF ⤓" : L(t.hero.cvSoon, lang)}</small>
                  </span>
                </button>
                <button className="link-row" onClick={() => go("terminal")}>
                  <span className="ic mono">&gt;_</span>
                  <span>
                    <strong>sudo hire-me</strong>
                    <small>{L(t.hero.cta3, lang)}</small>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="foot" style={{ position: "relative", zIndex: 1 }}>
        <div className="wrap foot-in">
          <span>
            © 2026 Mohammed Abdullah Hussein Humaidhah. {L(t.contact.rights, lang)}
          </span>
          <span className="mono" dir="ltr">
            <span className="dot" style={{ display: "inline-block", marginInlineEnd: 8 }} />
            Next.js · React · TypeScript — Yemen 🇾🇪 → Indonesia 🇮🇩
          </span>
        </div>
      </footer>

      <button className={`ibtn totop ${showTop ? "show" : ""}`} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label={L(t.ui.top, lang)}>
        ↑
      </button>

      {/* ---------------- project windows (case studies) ---------------- */}
      <Windows wins={wins} setWins={setWins} lang={lang} />

      {/* ---------------- lightbox ---------------- */}
      {lb !== null && gList[lb] && (
        <div
          className="lb"
          onClick={() => setLb(null)}
          onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            const dx = e.changedTouches[0].clientX - touchX.current;
            if (Math.abs(dx) > 50) lbStep(dx < 0 ? 1 : -1);
          }}
          role="dialog"
          aria-modal="true"
        >
          <button className="ibtn x" onClick={() => setLb(null)} aria-label="Close">
            ✕
          </button>
          <button
            className="ibtn nv prev"
            onClick={(e) => {
              e.stopPropagation();
              lbStep(-1);
            }}
            aria-label="Previous"
          >
            ‹
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img key={gList[lb].src} src={gList[lb].src} alt={L(gList[lb].cap, lang)} onClick={(e) => e.stopPropagation()} />
          <button
            className="ibtn nv next"
            onClick={(e) => {
              e.stopPropagation();
              lbStep(1);
            }}
            aria-label="Next"
          >
            ›
          </button>
          <div className="lb-cap">
            {L(gList[lb].cap, lang)}
            <small>
              {lb + 1} / {gList.length}
            </small>
          </div>
        </div>
      )}

      {/* ---------------- command palette ---------------- */}
      {pal && (
        <div className="overlay" style={{ alignItems: "start" }} onClick={() => setPal(false)} role="dialog" aria-modal="true">
          <div className="pal" onClick={(e) => e.stopPropagation()}>
            <input
              autoFocus
              value={q}
              placeholder={L(t.ui.cmdPlaceholder, lang)}
              onChange={(e) => {
                setQ(e.target.value);
                setSel(0);
              }}
              onKeyDown={(e) => {
                if (e.key === "ArrowDown") {
                  e.preventDefault();
                  setSel((s) => Math.min(s + 1, palItems.length - 1));
                }
                if (e.key === "ArrowUp") {
                  e.preventDefault();
                  setSel((s) => Math.max(s - 1, 0));
                }
                if (e.key === "Enter" && palItems[sel]) {
                  palItems[sel].run();
                  setPal(false);
                }
              }}
            />
            <ul>
              {palItems.length === 0 && <li style={{ padding: 16, color: "var(--muted)" }}>{L(t.ui.cmdNone, lang)}</li>}
              {palItems.map((it, i) => (
                <li key={it.k}>
                  <button
                    className={i === sel ? "sel" : ""}
                    onMouseEnter={() => setSel(i)}
                    onClick={() => {
                      it.run();
                      setPal(false);
                    }}
                  >
                    {it.label}
                    <small>{it.hint}</small>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {toast && <div className="toast">{toast}</div>}
      {matrix && <MatrixRain />}
    </div>
  );
}

/* konami easter egg */
function MatrixRain(): ReactNode {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const cv = ref.current!;
    const ctx = cv.getContext("2d")!;
    cv.width = window.innerWidth;
    cv.height = window.innerHeight;
    const cols = Math.floor(cv.width / 16);
    const drops = Array(cols).fill(0).map(() => Math.random() * -50);
    const chars = "01アイウエオカキクケコ{}<>/;=+*#MOHAMMED";
    const id = setInterval(() => {
      ctx.fillStyle = "rgba(0,0,0,.08)";
      ctx.fillRect(0, 0, cv.width, cv.height);
      ctx.fillStyle = "#34d399";
      ctx.font = "15px monospace";
      drops.forEach((y, i) => {
        ctx.fillText(chars[Math.floor(Math.random() * chars.length)], i * 16, y * 16);
        drops[i] = y * 16 > cv.height && Math.random() > 0.975 ? 0 : y + 1;
      });
    }, 45);
    return () => clearInterval(id);
  }, []);
  return <canvas ref={ref} className="matrix" />;
}
