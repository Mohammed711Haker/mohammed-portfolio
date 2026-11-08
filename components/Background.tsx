"use client";
import { useEffect, useRef } from "react";

/** Interactive network-of-nodes background. Nodes drift, link up when close,
 *  get pulled toward the cursor and "send packets" along links. */
export default function Background() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current!;
    const ctx = cv.getContext("2d")!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0,
      h = 0,
      raf = 0;
    const mouse = { x: -9999, y: -9999 };
    type N = { x: number; y: number; vx: number; vy: number };
    let nodes: N[] = [];
    const packets: { a: number; b: number; t: number }[] = [];

    const css = (v: string) => getComputedStyle(document.documentElement).getPropertyValue(v).trim();
    let c1 = "#22d3ee",
      c2 = "#8b5cf6";

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      cv.width = w * dpr;
      cv.height = h * dpr;
      cv.style.width = w + "px";
      cv.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(90, Math.floor((w * h) / 17000));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
      }));
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);
      c1 = css("--a1") || c1;
      c2 = css("--a2") || c2;
      const D = 140;
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
        const dx = mouse.x - n.x,
          dy = mouse.y - n.y,
          d = Math.hypot(dx, dy);
        if (d < 170 && d > 1) {
          n.x += (dx / d) * 0.7;
          n.y += (dy / d) * 0.7;
        }
        for (let j = i + 1; j < nodes.length; j++) {
          const m = nodes[j];
          const dist = Math.hypot(n.x - m.x, n.y - m.y);
          if (dist < D) {
            ctx.globalAlpha = (1 - dist / D) * 0.38;
            ctx.strokeStyle = c1;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(m.x, m.y);
            ctx.stroke();
            if (packets.length < 14 && Math.random() < 0.0009) packets.push({ a: i, b: j, t: 0 });
          }
        }
        ctx.globalAlpha = 0.85;
        ctx.fillStyle = d < 170 ? c2 : c1;
        ctx.beginPath();
        ctx.arc(n.x, n.y, d < 170 ? 2.6 : 1.7, 0, 6.283);
        ctx.fill();
      }
      for (let k = packets.length - 1; k >= 0; k--) {
        const p = packets[k];
        const a = nodes[p.a],
          b = nodes[p.b];
        p.t += 0.018;
        if (!a || !b || p.t >= 1 || Math.hypot(a.x - b.x, a.y - b.y) > D) {
          packets.splice(k, 1);
          continue;
        }
        ctx.globalAlpha = 1;
        ctx.fillStyle = c2;
        ctx.shadowColor = c2;
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.arc(a.x + (b.x - a.x) * p.t, a.y + (b.y - a.y) * p.t, 3, 0, 6.283);
        ctx.fill();
        ctx.shadowBlur = 0;
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    }

    const mv = (e: PointerEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const lv = () => {
      mouse.x = mouse.y = -9999;
    };
    const click = (e: PointerEvent) => {
      // burst: push nearby nodes away
      for (const n of nodes) {
        const dx = n.x - e.clientX,
          dy = n.y - e.clientY,
          d = Math.hypot(dx, dy);
        if (d < 220 && d > 1) {
          n.vx += (dx / d) * 2.2;
          n.vy += (dy / d) * 2.2;
        }
      }
    };

    resize();
    if (reduce) {
      draw();
      cancelAnimationFrame(raf);
    } else raf = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", mv);
    window.addEventListener("pointerdown", click);
    document.addEventListener("pointerleave", lv);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", mv);
      window.removeEventListener("pointerdown", click);
      document.removeEventListener("pointerleave", lv);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", opacity: 0.75 }}
    />
  );
}
