"use client";
import Image from "next/image";
import { CSSProperties, MouseEvent, ReactNode, useCallback, useEffect, useMemo, useRef, useState } from "react";
import Background from "./Background";
import Terminal from "./Terminal";
import { EMAIL, FALLBACK_REPOS, GITHUB, GITHUB_USER, LANG_COLORS, Lang, t } from "@/lib/data";

/* ------------------------------------------------------------------ */
/* helpers                                                             */
/* ------------------------------------------------------------------ */
const SECTIONS = ["about", "skills", "resume", "projects", "github", "gallery", "contact"] as const;
const PHOTOS = [
  { src: "/pic1.jpeg", w: 780, h: 1040 },
  { src: "/pic2.jpeg", w: 609, h: 1080 },
  { src: "/pic3.jpeg", w: 1280, h: 950 },
  { src: "/pic4.jpeg", w: 1080, h: 1080 },
  { src: "/pic5.jpeg", w: 1126, h: 1126 },
  { src: "/pic6.jpeg", w: 756, h: 1008 },
  { src: "/pic7.jpeg", w: 467, h: 1000 },
];

const rnd = () => Math.floor(Math.random() * 4);
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
/* project mini-demos                                                  */
/* ------------------------------------------------------------------ */
function ParkingSim({ lang }: { lang: Lang }) {
  const ar = lang === "ar";
  const [occ, setOcc] = useState<boolean[]>([true, false, true, false, false, true, false, false]);
  const [cm, setCm] = useState<number[]>([14, 160, 11, 150, 175, 19, 142, 188]);
  const [log, setLog] = useState<string[]>(["esp32: boot ok · wifi connected"]);
  const [auto, setAuto] = useState(false);

  const flip = useCallback((i: number) => {
    setOcc((o) => {
      const n = [...o];
      n[i] = !n[i];
      const d = n[i] ? 6 + Math.floor(Math.random() * 18) : 120 + Math.floor(Math.random() * 80);
      setCm((c) => c.map((x, k) => (k === i ? d : x)));
      setLog((l) => [...l.slice(-3), `slot[${i + 1}] ${d}cm → ${n[i] ? "OCCUPIED" : "FREE"}  POST /api/status 200`]);
      return n;
    });
  }, []);

  useEffect(() => {
    if (!auto) return;
    const id = setInterval(() => flip(Math.floor(Math.random() * 8)), 1100);
    return () => clearInterval(id);
  }, [auto, flip]);

  const used = occ.filter(Boolean).length;
  return (
    <div className="sim">
      <div className="sim-top">
        <span>● ESP32 DASHBOARD</span>
        <span>
          {ar ? "فارغ" : "FREE"}: {8 - used}/8
        </span>
      </div>
      <div className="lot">
        {occ.map((o, i) => (
          <button key={i} className={`slot ${o ? "occ" : ""}`} onClick={() => flip(i)} aria-label={`slot ${i + 1}`}>
            {o ? <span className="car">🚗</span> : <span>P{i + 1}</span>}
            <span className="cm">{cm[i]} cm</span>
          </button>
        ))}
      </div>
      <div className="sim-bar">
        <i style={{ width: `${(used / 8) * 100}%`, backgroundSize: `${800 / Math.max(used / 8, 0.1)}% 100%` }} />
      </div>
      <div className="sim-log">
        {log.map((l, i) => (
          <div key={i + l}>$ {l}</div>
        ))}
      </div>
      <div className="sim-actions">
        <button className="mini" onClick={() => flip(Math.floor(Math.random() * 8))}>
          {ar ? "حدث عشوائي" : "random event"}
        </button>
        <button className="mini" onClick={() => setAuto((a) => !a)}>
          {auto ? (ar ? "إيقاف التلقائي" : "stop auto") : ar ? "وضع تلقائي" : "auto mode"}
        </button>
        <button
          className="mini"
          onClick={() => {
            setOcc(Array(8).fill(false));
            setCm(Array(8).fill(160));
            setLog(["reset: all slots free"]);
          }}
        >
          reset
        </button>
      </div>
    </div>
  );
}

const CLOUD_LINES: [string, string][] = [
  ["c", "$ sudo apt update && sudo apt install -y nginx php-fpm"],
  ["m", "Setting up nginx … Setting up php-fpm … done."],
  ["c", "$ sudoedit /etc/nginx/sites-available/default"],
  ["y", "  location ~ \\.php$ {"],
  ["y", "      include snippets/fastcgi-php.conf;"],
  ["y", "      fastcgi_pass unix:/run/php/php-fpm.sock;"],
  ["y", "  }"],
  ["c", "$ sudo nginx -t && sudo systemctl reload nginx"],
  ["p", "nginx: configuration file test is successful"],
  ["c", "$ curl -I http://localhost/info.php"],
  ["p", "HTTP/1.1 200 OK"],
];
function CloudReplay({ lang }: { lang: Lang }) {
  const [n, setN] = useState(CLOUD_LINES.length);
  const [run, setRun] = useState(false);
  useEffect(() => {
    if (!run) return;
    let i = 0;
    const id = setInterval(() => {
      i++;
      setN(i);
      if (i >= CLOUD_LINES.length) {
        clearInterval(id);
        setRun(false);
      }
    }, 520);
    return () => clearInterval(id);
  }, [run]);
  return (
    <div className="term" dir="ltr">
      <div className="term-bar">
        <i style={{ background: "#fb7185" }} />
        <i style={{ background: "#fbbf24" }} />
        <i style={{ background: "#34d399" }} />
        <span style={{ marginInlineStart: 10 }}>debian@lab</span>
      </div>
      <div className="term-body" style={{ height: 250 }}>
        {CLOUD_LINES.slice(0, n).map(([c, s], i) => (
          <div key={i} className={c}>
            {s}
          </div>
        ))}
      </div>
      <div className="term-chips">
        <button
          onClick={() => {
            setN(0);
            setRun(true);
          }}
          disabled={run}
        >
          ▶ {lang === "ar" ? "تشغيل" : "Run"}
        </button>
        <span className="m" style={{ fontFamily: "var(--mono)", fontSize: 11, color: "#94a3b8", alignSelf: "center" }}>
          {lang === "ar" ? "إعادة توضيحية للخطوات" : "illustrative replay of the steps"}
        </span>
      </div>
    </div>
  );
}

const SIZES = [92, 70, 54, 42, 32, 24, 18];
function EyeTest({ lang }: { lang: Lang }) {
  const ar = lang === "ar";
  const [round, setRound] = useState(0);
  const [dir, setDir] = useState(rnd);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const answer = (a: number) => {
    const ok = a === dir;
    const s = score + (ok ? 1 : 0);
    setScore(s);
    if (round + 1 >= SIZES.length || !ok) setDone(true);
    else {
      setRound(round + 1);
      setDir(rnd());
    }
  };
  const restart = () => {
    setRound(0);
    setScore(0);
    setDone(false);
    setDir(rnd());
  };
  const arrows = ["→", "↓", "←", "↑"];
  return (
    <div className="sim" style={{ textAlign: "center" }}>
      <div className="sim-top">
        <span>● VISIONCHECK · {ar ? "تجربة مفاهيمية" : "concept demo"}</span>
        <span>
          {Math.min(round + 1, SIZES.length)}/{SIZES.length}
        </span>
      </div>
      {!done ? (
        <>
          <div style={{ height: 120, display: "grid", placeItems: "center" }}>
            <div
              style={{
                fontSize: SIZES[round],
                fontWeight: 900,
                fontFamily: "Arial, sans-serif",
                color: "#fff",
                transform: `rotate(${dir * 90}deg)`,
                transition: "font-size .3s",
                lineHeight: 1,
              }}
              aria-label="E"
            >
              E
            </div>
          </div>
          <p style={{ fontSize: 13, color: "#94a3b8", margin: "6px 0 12px" }}>
            {ar ? "إلى أين تشير أرجل حرف E؟" : "Which way do the arms of the “E” point?"}
          </p>
          <div className="sim-actions" style={{ justifyContent: "center" }}>
            {arrows.map((a, i) => (
              <button key={a} className="mini" style={{ fontSize: 18, padding: "8px 18px" }} onClick={() => answer(i)}>
                {a}
              </button>
            ))}
          </div>
        </>
      ) : (
        <div style={{ padding: "18px 0" }}>
          <div style={{ fontSize: 34, fontWeight: 800 }}>
            {score}/{SIZES.length}
          </div>
          <p style={{ color: "#94a3b8", fontSize: 13, margin: "8px 0 14px" }}>
            {ar
              ? "هذه تجربة ترفيهية لفكرة المشروع، وليست فحصاً طبياً. استشر أخصائي عيون عند الحاجة."
              : "A playful demo of the idea — not a medical test. See an eye-care professional when in doubt."}
          </p>
          <button className="mini" onClick={restart}>
            ↻ {ar ? "إعادة" : "try again"}
          </button>
        </div>
      )}
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
  const [pFilter, setPFilter] = useState("all");
  const [modal, setModal] = useState<string | null>(null);
  const [step, setStep] = useState(0);
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
  /* eslint-disable react-hooks/set-state-in-effect -- reading browser-only storage after hydration */
  useEffect(() => {
    try {
      const l = localStorage.getItem("lang") as Lang | null;
      if (l === "ar" || l === "en") setLangState(l);
      else if (navigator.language?.startsWith("ar")) setLangState("ar");
    } catch {}
    const attr = document.documentElement.getAttribute("data-theme");
    if (attr === "light" || attr === "dark") setThemeState(attr);
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */
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
    document.documentElement.lang = lang;
    document.documentElement.dir = ar ? "rtl" : "ltr";
  }, [lang, ar]);
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
      { k: "terminal", label: ar ? "افتح التيرمنال" : "Open terminal", hint: "#terminal", run: () => go("terminal") },
      { k: "theme", label: ar ? "تبديل المظهر" : "Toggle theme", hint: theme, run: () => setTheme(theme === "dark" ? "light" : "dark") },
      { k: "lang", label: ar ? "Switch to English" : "التبديل إلى العربية", hint: ar ? "EN" : "AR", run: () => setLang(ar ? "en" : "ar") },
      { k: "mail", label: ar ? "انسخ البريد" : "Copy email", hint: EMAIL, run: () => copyMail() },
      { k: "gh", label: ar ? "افتح GitHub" : "Open GitHub", hint: "↗", run: () => window.open(GITHUB, "_blank") },
    ];
    const s = q.trim().toLowerCase();
    return s ? items.filter((i) => (i.label + i.hint).toLowerCase().includes(s)) : items;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q, lang, theme, ar, go]);

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
        setPal(false);
        setModal(null);
        setLb(null);
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

  useEffect(() => {
    document.body.style.overflow = modal || lb !== null || pal ? "hidden" : "";
  }, [modal, lb, pal]);

  /* ---- project flow auto-advance ---- */
  useEffect(() => {
    if (!modal) return;
    const id = setInterval(() => setStep((s) => s + 1), 1800);
    return () => clearInterval(id);
  }, [modal]);

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
  const pj = t.projects.items.find((p) => p.id === modal);
  const pItems = t.projects.items.filter((p) => pFilter === "all" || p.cat === pFilter);
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
          <div className="wrap hero-grid" style={{ width: "100%" }}>
            <div>
              <span className="badge rv">
                <span className="dot" />
                {ar ? "متاح للتعاون والتدريب" : "open to collaborate & intern"}
              </span>
              <h1 className="h1 rv" style={{ "--d": "80ms" } as CSSProperties}>
                {L(t.hero.hi, lang)} <span className="grad">{L(t.hero.name, lang)}</span>
              </h1>
              <div className="rv" style={{ "--d": "160ms" } as CSSProperties}>
                <Typer words={t.hero.roles[lang]} />
              </div>
              <p className="lead rv" style={{ "--d": "240ms" } as CSSProperties}>
                {L(t.hero.intro, lang)}
              </p>
              <div className="cta rv" style={{ "--d": "320ms" } as CSSProperties}>
                <button
                  className="btn btn-p"
                  onClick={(e) => {
                    ripple(e);
                    go("projects");
                  }}
                >
                  {L(t.hero.cta1, lang)} →
                </button>
                <button
                  className="btn btn-g"
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
              </div>
              <div className="hint rv" style={{ "--d": "400ms" } as CSSProperties}>
                {L(t.hero.hint, lang)}
              </div>
              <div className="stats rv" style={{ "--d": "480ms" } as CSSProperties}>
                {t.stats.map((s, i) => (
                  <div key={i} className="stat glass">
                    <span className="grad">
                      <Counter to={i === 1 && repos ? repos.length : s.v} plain={s.plain} />
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
          </div>
        </section>

        {/* ---------------- skills ---------------- */}
        <section id="skills" className="section">
          <div className="wrap">
            <SectionHead tag="// stack.json" title={L(t.skills.title, lang)} sub={L(t.skills.sub, lang)} />
            <div className="tabs rv">
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
            <div className="skill-box rv">
              <div className="skills-grid glass" key={cat}>
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
                <p>{selSkill ? L(selSkill.d, lang) : L(t.skills.sub, lang)}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------- journey ---------------- */}
        <section id="resume" className="section">
          <div className="wrap" style={{ maxWidth: 880 }}>
            <SectionHead tag="// git log --journey" title={L(t.resume.title, lang)} />
            <div className="timeline">
              {t.resume.items.map((it, i) => (
                <div
                  key={i}
                  role="button"
                  className={`tl-item glass rv ${tl === i ? "open" : ""}`}
                  style={{ "--d": `${i * 100}ms` } as CSSProperties}
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
            <div className="p-grid">
              {pItems.map((p, i) => (
                <button
                  key={p.id}
                  className="pcard glass tilt rv"
                  style={{ "--d": `${i * 90}ms` } as CSSProperties}
                  onMouseMove={(e) => tilt(e, 7)}
                  onMouseLeave={untilt}
                  onClick={() => {
                    setStep(0);
                    setModal(p.id);
                  }}
                >
                  <div className="pico">{p.icon}</div>
                  <h3>{p.title}</h3>
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
                <button className="btn btn-p" type="submit" onClick={ripple}>
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

      {/* ---------------- project modal ---------------- */}
      {pj && (
        <div className="overlay" onClick={() => setModal(null)} role="dialog" aria-modal="true" aria-label={pj.title}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="ibtn x" onClick={() => setModal(null)} aria-label={L(t.projects.close, lang)}>
              ✕
            </button>
            <div className="pico">{pj.icon}</div>
            <h3>{pj.title}</h3>
            <p className="long">{L(pj.long, lang)}</p>

            <div className="mh">{L(t.projects.how, lang)}</div>
            <div className="flow">
              {pj.steps[lang].map((s, i) => (
                <div key={s} className={`flow-step ${step % pj.steps[lang].length === i ? "on" : ""}`} onClick={() => setStep(i)}>
                  <b>{String(i + 1).padStart(2, "0")}</b>
                  {s}
                </div>
              ))}
            </div>

            <div className="mh">demo</div>
            {pj.id === "parking" && <ParkingSim lang={lang} />}
            {pj.id === "cloud" && <CloudReplay lang={lang} />}
            {pj.id === "vision" && <EyeTest lang={lang} />}

            <div className="mh">{L(t.projects.stack, lang)}</div>
            <div className="tags" style={{ marginTop: 0 }}>
              {pj.tags.map((g) => (
                <span className="tag" key={g}>
                  {g}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

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
