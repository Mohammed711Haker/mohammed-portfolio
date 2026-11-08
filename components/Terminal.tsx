"use client";
import { ReactNode, useEffect, useRef, useState } from "react";
import { EMAIL, GITHUB, Lang } from "@/lib/data";

type Entry = { id: number; node: ReactNode };

type Props = {
  lang: Lang;
  go: (id: string) => void;
  setTheme: (t: "dark" | "light") => void;
  setLang: (l: Lang) => void;
  hire: () => void;
};

const CMDS = [
  "help", "about", "whoami", "skills", "projects", "education", "contact", "github",
  "neofetch", "ls", "cat readme.md", "theme dark", "theme light", "lang ar", "lang en",
  "open about", "open projects", "open gallery", "open contact", "ping yemen", "sudo hire-me", "date", "clear",
];

export default function Terminal({ lang, go, setTheme, setLang, hire }: Props) {
  const ar = lang === "ar";
  const [log, setLog] = useState<Entry[]>([]);
  const [val, setVal] = useState("");
  const hist = useRef<string[]>([]);
  const hi = useRef(-1);
  const idc = useRef(0);
  const body = useRef<HTMLDivElement>(null);
  const inp = useRef<HTMLInputElement>(null);

  const push = (node: ReactNode) => setLog((l) => [...l, { id: idc.current++, node }]);

  useEffect(() => {
    push(
      <>
        <span className="c">Welcome to mohammed-os v1.0</span>
        {"\n"}
        <span className="m">
          {ar ? "اكتب " : "Type "}
          <span className="y">help</span>
          {ar ? " لعرض الأوامر، أو اضغط على أحد الأزرار بالأسفل." : " to list commands, or tap a button below."}
        </span>
      </>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    body.current?.scrollTo({ top: body.current.scrollHeight });
  }, [log]);

  const Row = ({ k, v }: { k: string; v: ReactNode }) => (
    <div>
      <span className="c">{k.padEnd(12)}</span>
      {v}
    </div>
  );

  function run(raw: string) {
    const cmd = raw.trim();
    push(
      <>
        <span className="p">visitor@mohammed</span>
        <span className="m">:~$ </span>
        {cmd}
      </>
    );
    if (!cmd) return;
    hist.current.unshift(cmd);
    hi.current = -1;
    const [c, ...rest] = cmd.toLowerCase().split(/\s+/);
    const arg = rest.join(" ");

    switch (c) {
      case "help":
        push(
          <>
            {[
              ["about", "who am I"],
              ["skills", "tech stack"],
              ["projects", "what I build"],
              ["education", "university & experience"],
              ["github", "my repos"],
              ["contact", "reach me"],
              ["open <section>", "scroll to a section"],
              ["theme dark|light", "switch theme"],
              ["lang ar|en", "switch language"],
              ["neofetch", "system info"],
              ["ping yemen", "…try it"],
              ["sudo hire-me", "🙂"],
              ["clear", "clear screen"],
            ].map(([a, b]) => (
              <Row key={a} k={a} v={<span className="m">{b}</span>} />
            ))}
          </>
        );
        break;
      case "about":
      case "whoami":
        push(
          <>
            <span className="y">Mohammed Abdullah Hussein Humaidhah</span>
            {"\n"}
            IT Student · Full-Stack Developer · Entrepreneur{"\n"}
            B.IT @ UIN Salatiga, Indonesia 🇮🇩 — from Yemen 🇾🇪{"\n"}
            <span className="m">Goal: become a cybersecurity specialist & help improve tech in Yemen.</span>
          </>
        );
        break;
      case "skills":
        push(
          <>
            <Row k="web" v="Next.js · TypeScript · Laravel · Supabase · HTML/CSS/JS" />
            <Row k="mobile" v="Flutter · Dart · C++" />
            <Row k="ai" v="Python · Computer Vision · ML basics" />
            <Row k="systems" v="Debian · Nginx · PHP-FPM · Git" />
            <Row k="iot" v="ESP32 · Ultrasonic · Wi-Fi" />
          </>
        );
        break;
      case "projects":
        push(
          <>
            <Row k="visioncheck" v="AI visual-acuity screening concept" />
            <Row k="smart-park" v="ESP32 + ultrasonic parking dashboard" />
            <Row k="cloud-lab" v="Debian + Nginx + PHP-FPM server" />
            <span className="m">→ opening projects…</span>
          </>
        );
        setTimeout(() => go("projects"), 500);
        break;
      case "education":
      case "edu":
        push(
          <>
            <Row k="2024–now" v="B.IT — Universitas Islam Negeri Salatiga" />
            <Row k="ongoing" v="Founder — Abu Hilal Sky (travel & study-abroad)" />
          </>
        );
        break;
      case "contact":
        push(
          <>
            <Row k="email" v={<a className="c" href={`mailto:${EMAIL}`}>{EMAIL}</a>} />
            <Row k="github" v={<a className="c" href={GITHUB} target="_blank" rel="noreferrer">{GITHUB}</a>} />
          </>
        );
        break;
      case "github":
        push(<a className="c" href={GITHUB} target="_blank" rel="noreferrer">{GITHUB}</a>);
        setTimeout(() => go("github"), 400);
        break;
      case "ls":
        push(<span className="c">about/  skills/  projects/  github/  gallery/  contact/  readme.md</span>);
        break;
      case "cat":
        push(
          arg === "readme.md" ? (
            <>
              # Mohammed&apos;s Portfolio{"\n"}Built with Next.js 16, React 19, TypeScript & lots of ☕{"\n"}
              <span className="m">Try: Ctrl+K · click the background · tilt the cards.</span>
            </>
          ) : (
            <span className="e">cat: {arg || "?"}: No such file</span>
          )
        );
        break;
      case "open":
      case "cd": {
        const ids = ["about", "skills", "resume", "projects", "github", "gallery", "contact", "terminal"];
        const alias: Record<string, string> = { education: "resume", experience: "resume", journey: "resume", repos: "github" };
        const id = alias[arg] || arg;
        if (ids.includes(id)) {
          push(<span className="m">→ {id}</span>);
          setTimeout(() => go(id), 300);
        } else push(<span className="e">open: unknown section “{arg}”. Try: {ids.join(", ")}</span>);
        break;
      }
      case "theme":
        if (arg === "dark" || arg === "light") {
          setTheme(arg);
          push(<span className="m">theme → {arg}</span>);
        } else push(<span className="e">usage: theme dark|light</span>);
        break;
      case "lang":
        if (arg === "ar" || arg === "en") {
          setLang(arg);
          push(<span className="m">lang → {arg}</span>);
        } else push(<span className="e">usage: lang ar|en</span>);
        break;
      case "neofetch":
        push(
          <>
            <span className="c">{"   ╭──────────╮   "}</span>
            <span className="p">visitor</span>@<span className="p">mohammed-os</span>
            {"\n"}
            <span className="c">{"   │  M  H    │   "}</span>
            <span className="m">────────────────────</span>
            {"\n"}
            <span className="c">{"   │  { IT }  │   "}</span>OS:      Human 21.x LTS{"\n"}
            <span className="c">{"   ╰──────────╯   "}</span>Shell:   curiosity{"\n"}
            {"                   "}Uptime:  since 2024 (B.IT){"\n"}
            {"                   "}Editor:  VS Code{"\n"}
            {"                   "}Stack:   Next.js · Flutter · Python{"\n"}
            {"                   "}Goal:    cybersecurity 🛡️
          </>
        );
        break;
      case "ping":
        push(
          <>
            PING {arg || "yemen"} (🇾🇪): 56 data bytes{"\n"}
            64 bytes from home: icmp_seq=0 ttl=64 time=love ms{"\n"}
            64 bytes from home: icmp_seq=1 ttl=64 time=missing you ms{"\n"}
            <span className="m">--- 0% packet loss ---</span>
          </>
        );
        break;
      case "sudo":
        if (arg.replace(/\s/g, "") === "hire-me" || arg === "hire me") {
          push(
            <>
              <span className="y">[sudo] password for visitor: ********</span>
              {"\n"}
              <span className="p">✔ Permission granted. Opening contact form…</span>
            </>
          );
          setTimeout(hire, 700);
        } else push(<span className="e">{arg || "sudo"}: permission denied (nice try 😄)</span>);
        break;
      case "date":
        push(new Date().toString());
        break;
      case "echo":
        push(rest.join(" "));
        break;
      case "rm":
        push(<span className="e">rm: I like my files. No. 😅</span>);
        break;
      case "clear":
        setLog([]);
        break;
      default:
        push(
          <span className="e">
            {c}: command not found. Type <span className="y">help</span>.
          </span>
        );
    }
  }

  function onKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      run(val);
      setVal("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (hi.current < hist.current.length - 1) setVal(hist.current[++hi.current]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (hi.current > 0) setVal(hist.current[--hi.current]);
      else {
        hi.current = -1;
        setVal("");
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const m = CMDS.find((c) => val && c.startsWith(val.toLowerCase()));
      if (m) setVal(m);
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      setLog([]);
    }
  }

  return (
    <div className="term" dir="ltr" onClick={() => inp.current?.focus({ preventScroll: true })}>
      <div className="term-bar">
        <i style={{ background: "#fb7185" }} />
        <i style={{ background: "#fbbf24" }} />
        <i style={{ background: "#34d399" }} />
        <span style={{ marginInlineStart: 10 }}>visitor@mohammed — zsh — 80×24</span>
      </div>
      <div className="term-body" ref={body}>
        {log.map((e) => (
          <div key={e.id}>{e.node}</div>
        ))}
        <div className="term-in">
          <span className="p">visitor@mohammed</span>
          <span className="m">:~$</span>
          <input
            ref={inp}
            value={val}
            onChange={(e) => setVal(e.target.value)}
            onKeyDown={onKey}
            spellCheck={false}
            autoCapitalize="off"
            autoComplete="off"
            aria-label="terminal input"
          />
        </div>
      </div>
      <div className="term-chips">
        {["help", "about", "skills", "projects", "neofetch", "sudo hire-me", "clear"].map((c) => (
          <button key={c} onClick={() => run(c)}>
            {c}
          </button>
        ))}
      </div>
    </div>
  );
}
