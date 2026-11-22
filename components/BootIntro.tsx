"use client";
import { CSSProperties, useEffect } from "react";
import { Lang, t } from "@/lib/data";

const LINE_MS = 230;

/**
 * "Dev OS" boot screen. It is part of the server HTML but hidden by CSS unless
 * the inline script in app/layout.tsx set <html data-boot> (first visit in this
 * tab, no reduced-motion). Any key, click or tap skips it. `replay` bumps to show it again.
 */
export default function BootIntro({ lang, replay }: { lang: Lang; replay: number }) {
  useEffect(() => {
    const d = document.documentElement;
    if (replay > 0) {
      d.setAttribute("data-boot", "1");
    }
    if (!d.hasAttribute("data-boot")) return;
    const end = () => {
      d.setAttribute("data-boot", "out");
      setTimeout(() => d.removeAttribute("data-boot"), 380);
      try {
        sessionStorage.setItem("booted", "1");
      } catch {}
      cleanup();
    };
    const timer = setTimeout(end, t.boot.lines.length * LINE_MS + 700);
    const opts = { once: true } as const;
    window.addEventListener("keydown", end, opts);
    window.addEventListener("pointerdown", end, opts);
    function cleanup() {
      clearTimeout(timer);
      window.removeEventListener("keydown", end);
      window.removeEventListener("pointerdown", end);
    }
    return cleanup;
  }, [replay]);

  return (
    <div className="boot" aria-hidden="true" key={replay}>
      <div className="boot-in" dir="ltr">
        <div className="boot-logo">
          <span className="grad">&gt;_ mohammed-os</span>
        </div>
        {t.boot.lines.map((l, i) => (
          <div key={l} className="boot-l" style={{ "--i": i } as CSSProperties}>
            {l.startsWith("[ ok ]") ? (
              <>
                <span className="ok">[ ok ]</span>
                {l.slice(6)}
              </>
            ) : (
              l
            )}
          </div>
        ))}
        <div className="boot-bar">
          <i />
        </div>
      </div>
      <div className="boot-skip">{t.boot.skip[lang]}</div>
    </div>
  );
}
