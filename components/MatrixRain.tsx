"use client";

import { useEffect, useRef } from "react";

/**
 * subtle matrix-style digital rain behind all content.
 * - uses canvas, fixed position, z-index just above body grid.
 * - respects prefers-reduced-motion → static when reduced.
 * - ~15 fps (draws every 4 frames) for low battery impact.
 */
export function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // note: we intentionally do NOT respect prefers-reduced-motion here.
    // the rain is slow (~15fps), low-opacity, decorative-only, and the whole
    // site's "cyber hacker" identity relies on it. if it matters to a given
    // reader, they can blur it out with browser extensions.

    const CHAR_SET =
      "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789<>/\\|=+-*&^%$#@!?";
    const FONT_SIZE = 14;
    // longer trail + slower fall. explicit trail rendering (clear each frame,
    // redraw trail with decaying alpha) so the canvas never accumulates.
    const TRAIL_LEN = 18;
    const DROP_STEP = 0.35;

    let cols = 0;
    let rows = 0;
    let drops: number[] = [];
    let dpr = 1;

    const resize = () => {
      dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
      cols = Math.ceil(window.innerWidth / FONT_SIZE);
      rows = Math.ceil(window.innerHeight / FONT_SIZE);
      // stagger initial positions so streams don't all hit top/bottom together
      drops = Array.from({ length: cols }, () =>
        Math.random() * rows * 2 - rows
      );
      ctx.font = `${FONT_SIZE}px ui-monospace, Menlo, monospace`;
      ctx.textBaseline = "top";
    };

    const pick = () =>
      CHAR_SET.charAt(Math.floor(Math.random() * CHAR_SET.length));

    const draw = () => {
      // full clear each frame — zero accumulation, trail is drawn explicitly.
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      for (let i = 0; i < drops.length; i++) {
        const x = i * FONT_SIZE;
        const headRow = Math.floor(drops[i]);

        for (let t = 0; t < TRAIL_LEN; t++) {
          const row = headRow - t;
          const y = row * FONT_SIZE;
          if (y < -FONT_SIZE || y > window.innerHeight) continue;
          if (t === 0) {
            ctx.fillStyle = "rgba(200, 255, 220, 0.95)"; // near-white head
          } else {
            // linear falloff from ~0.5 → near 0 across trail
            const alpha = Math.max(0.03, 0.55 * (1 - t / TRAIL_LEN));
            ctx.fillStyle = `rgba(74, 222, 128, ${alpha})`;
          }
          ctx.fillText(pick(), x, y);
        }

        drops[i] += DROP_STEP;
        // recycle once head is well past the bottom (so trail fully exits)
        if (
          drops[i] * FONT_SIZE > window.innerHeight + TRAIL_LEN * FONT_SIZE &&
          Math.random() > 0.96
        ) {
          drops[i] = -Math.random() * TRAIL_LEN;
        }
      }
    };

    resize();
    window.addEventListener("resize", resize);

    let rafId = 0;
    let frame = 0;
    const tick = () => {
      frame = (frame + 1) % 4; // ~15fps from 60fps base
      if (frame === 0) draw();
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 1,
        opacity: 0.6,
      }}
    />
  );
}
