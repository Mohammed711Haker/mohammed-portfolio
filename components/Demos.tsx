"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Lang } from "@/lib/data";

const rnd = () => Math.floor(Math.random() * 4);

/* ------------------------------------------------------------------ */
/* Smart Parking — concept simulator                                   */
/* ------------------------------------------------------------------ */
export function ParkingSim({ lang }: { lang: Lang }) {
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
        <span>● ESP32 DASHBOARD · {ar ? "محاكاة" : "simulated"}</span>
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

/* ------------------------------------------------------------------ */
/* Cloud lab — terminal replay                                         */
/* ------------------------------------------------------------------ */
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
export function CloudReplay({ lang }: { lang: Lang }) {
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

/* ------------------------------------------------------------------ */
/* VisionCheck — tumbling-E concept demo                               */
/* ------------------------------------------------------------------ */
const SIZES = [92, 70, 54, 42, 32, 24, 18];
export function EyeTest({ lang }: { lang: Lang }) {
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
          <div className="sim-actions" style={{ justifyContent: "center" }} dir="ltr">
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
/* Temperature alarm — 30 °C threshold logic                           */
/* ------------------------------------------------------------------ */
const THRESHOLD = 30;
export function TempAlarm({ lang }: { lang: Lang }) {
  const ar = lang === "ar";
  const [temp, setTemp] = useState(26);
  const [sound, setSound] = useState(false);
  const ctx = useRef<AudioContext | null>(null);
  const alarm = temp >= THRESHOLD;

  // optional, user-enabled beep while the alarm is on
  useEffect(() => {
    if (!alarm || !sound) return;
    const beep = () => {
      try {
        ctx.current ??= new AudioContext();
        const a = ctx.current;
        const o = a.createOscillator();
        const g = a.createGain();
        o.frequency.value = 2200;
        g.gain.value = 0.04;
        o.connect(g).connect(a.destination);
        o.start();
        o.stop(a.currentTime + 0.12);
      } catch {}
    };
    beep();
    const id = setInterval(beep, 600);
    return () => clearInterval(id);
  }, [alarm, sound]);

  const pct = ((temp - 15) / (45 - 15)) * 100;
  return (
    <div className={`sim temp ${alarm ? "alarm" : ""}`}>
      <div className="sim-top" dir="ltr">
        <span>● TEMP MONITOR · {ar ? "محاكاة" : "simulated"}</span>
        <span>threshold: {THRESHOLD} °C</span>
      </div>
      <div className="temp-row">
        <div className="thermo" aria-hidden>
          <i style={{ height: `${pct}%` }} />
          <b style={{ bottom: `${((THRESHOLD - 15) / 30) * 100}%` }} />
        </div>
        <div style={{ flex: 1 }}>
          <div className="temp-val" dir="ltr">
            {temp.toFixed(0)} °C
          </div>
          <div className={`buzzer ${alarm ? "on" : ""}`} role="status" aria-live="polite">
            <span className="bz" aria-hidden>
              🔔
            </span>
            {alarm ? (ar ? "الجرس يعمل! الحرارة ≥ 30 °C" : "BUZZER ON — temperature ≥ 30 °C") : ar ? "الجرس متوقف" : "buzzer off"}
          </div>
          <input
            type="range"
            min={15}
            max={45}
            value={temp}
            onChange={(e) => setTemp(Number(e.target.value))}
            aria-label={ar ? "درجة الحرارة" : "temperature"}
            className="range"
            dir="ltr"
          />
        </div>
      </div>
      <div className="sim-log" dir="ltr">
        <div>$ read sensor → {temp} °C</div>
        <div>
          $ if ({temp} &gt;= {THRESHOLD}) buzzer = {alarm ? "HIGH" : "LOW"}
        </div>
      </div>
      <div className="sim-actions">
        <button className="mini" onClick={() => setTemp(THRESHOLD)}>
          {ar ? "اضبط على 30" : "set 30 °C"}
        </button>
        <button className="mini" onClick={() => setTemp(24)}>
          {ar ? "تبريد" : "cool down"}
        </button>
        <button className="mini" onClick={() => setSound((s) => !s)} aria-pressed={sound}>
          {sound ? "🔊" : "🔈"} {ar ? "صوت" : "sound"}
        </button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* FruitScan — platform / engine architecture view                     */
/* ------------------------------------------------------------------ */
export function FruitArch({ lang }: { lang: Lang }) {
  const ar = lang === "ar";
  const [web, setWeb] = useState(false);
  const nodes = [
    { k: "in", l: ar ? "📷 صورة فاكهة" : "📷 Fruit photo" },
    { k: "eng", l: web ? "TensorFlow.js" : "TensorFlow Lite", s: web ? (ar ? "في المتصفح" : "in the browser") : ar ? "على الجهاز" : "on the device" },
    { k: "out", l: ar ? "🍎 1 من 20 نوعاً" : "🍎 1 of 20 fruit types" },
    { k: "nut", l: ar ? "🥗 القيم الغذائية" : "🥗 Nutrition info" },
    { k: "hist", l: ar ? "🕘 سجل الفحوصات" : "🕘 Scan history" },
  ];
  return (
    <div className="sim">
      <div className="sim-top">
        <span>● FRUITSCAN · {ar ? "عرض البنية" : "architecture"}</span>
        <div className="seg" role="tablist" dir="ltr">
          <button role="tab" aria-selected={!web} className={!web ? "on" : ""} onClick={() => setWeb(false)}>
            📱 Android / iOS
          </button>
          <button role="tab" aria-selected={web} className={web ? "on" : ""} onClick={() => setWeb(true)}>
            🌐 Web
          </button>
        </div>
      </div>
      <div className="pipe" key={String(web)}>
        {nodes.map((n, i) => (
          <div key={n.k} className={`pipe-n ${n.k === "eng" ? "eng" : ""}`} style={{ animationDelay: `${i * 120}ms` }}>
            <b>{n.l}</b>
            {n.s && <small>{n.s}</small>}
          </div>
        ))}
      </div>
      <p className="m" style={{ fontSize: 12, color: "#94a3b8", marginTop: 12, fontFamily: "var(--mono)" }}>
        {web
          ? ar
            ? "على الويب لا يتوفر TFLite، فيستخدم التطبيق TensorFlow.js بديلاً."
            : "TFLite isn't available on the web, so the app falls back to TensorFlow.js."
          : ar
            ? "التصنيف يتم على الجهاز نفسه بنموذج TensorFlow Lite."
            : "Classification runs on the device itself with a TensorFlow Lite model."}
      </p>
    </div>
  );
}
