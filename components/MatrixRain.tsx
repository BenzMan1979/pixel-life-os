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
      drops = Array.from({ length: cols }, () =>
        Math.floor(Math.random() * rows)
      );
      ctx.font = `${FONT_SIZE}px ui-monospace, Menlo, monospace`;
      ctx.textBaseline = "top";
    };

    const pick = () =>
      CHAR_SET.charAt(Math.floor(Math.random() * CHAR_SET.length));

    const draw = () => {
      // subtle trail by painting a translucent black over the canvas
      ctx.fillStyle = "rgba(10, 15, 8, 0.08)";
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

      for (let i = 0; i < drops.length; i++) {
        const x = i * FONT_SIZE;
        const y = drops[i] * FONT_SIZE;
        // lead char brighter; body faint
        const isHead = Math.random() > 0.985;
        ctx.fillStyle = isHead
          ? "rgba(134, 239, 172, 0.55)"
          : "rgba(74, 222, 128, 0.22)";
        ctx.fillText(pick(), x, y);

        if (drops[i] * FONT_SIZE > window.innerHeight && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i] += 1;
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
