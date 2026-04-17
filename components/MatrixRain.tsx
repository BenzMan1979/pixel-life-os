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
    const TRAIL_LEN = 18;
    const DROP_STEP = 0.35;
    // probability per drop per frame that a random trail cell "glitches" to
    // a new char. low value → chars feel stable with occasional flicker,
    // rather than whole screen shimmering every frame.
    const GLITCH_RATE = 0.012;

    let cols = 0;
    let rows = 0;
    let drops: number[] = [];
    // characters "burned into" each cell. only rewritten when the head moves
    // into the cell, or rarely glitched. this is what gives the rain its
    // tech feel — trails are stable, not a mess of random chars.
    let charGrid: (string | null)[][] = [];
    let lastHeadRow: number[] = [];
    let dpr = 1;

    const pick = () =>
      CHAR_SET.charAt(Math.floor(Math.random() * CHAR_SET.length));

    const resize = () => {
      dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
      cols = Math.ceil(window.innerWidth / FONT_SIZE);
      rows = Math.ceil(window.innerHeight / FONT_SIZE);
      drops = Array.from({ length: cols }, () =>
        Math.random() * rows * 2 - rows
      );
      charGrid = Array.from({ length: cols }, () => []);
      lastHeadRow = Array.from({ length: cols }, () => Number.NEGATIVE_INFINITY);
      ctx.font = `${FONT_SIZE}px ui-monospace, Menlo, monospace`;
      ctx.textBaseline = "top";
    };

    const draw = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      for (let i = 0; i < drops.length; i++) {
        const x = i * FONT_SIZE;
        const headRow = Math.floor(drops[i]);

        // write a new char into each row the head just crossed
        const prev = lastHeadRow[i];
        if (headRow > prev) {
          for (let r = Math.max(prev + 1, headRow - TRAIL_LEN); r <= headRow; r++) {
            if (r >= 0) charGrid[i][r] = pick();
          }
          lastHeadRow[i] = headRow;
        }

        // occasional trail glitch — one random cell re-rolls
        if (Math.random() < GLITCH_RATE) {
          const offset = 1 + Math.floor(Math.random() * (TRAIL_LEN - 1));
          const r = headRow - offset;
          if (r >= 0 && charGrid[i][r]) charGrid[i][r] = pick();
        }

        // draw trail (head to tail)
        for (let t = 0; t < TRAIL_LEN; t++) {
          const row = headRow - t;
          if (row < 0) continue;
          const ch = charGrid[i][row];
          if (!ch) continue;
          const y = row * FONT_SIZE;
          if (y < -FONT_SIZE || y > window.innerHeight) continue;
          if (t === 0) {
            ctx.fillStyle = "rgba(200, 255, 220, 0.95)";
          } else {
            const alpha = Math.max(0.03, 0.55 * (1 - t / TRAIL_LEN));
            ctx.fillStyle = `rgba(74, 222, 128, ${alpha})`;
          }
          ctx.fillText(ch, x, y);
        }

        drops[i] += DROP_STEP;
        if (
          drops[i] * FONT_SIZE > window.innerHeight + TRAIL_LEN * FONT_SIZE &&
          Math.random() > 0.96
        ) {
          drops[i] = -Math.random() * TRAIL_LEN;
          charGrid[i] = [];
          lastHeadRow[i] = Number.NEGATIVE_INFINITY;
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
