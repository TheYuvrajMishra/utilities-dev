"use client";

import React, { useRef, useEffect } from "react";

interface InteractiveCardProps {
  children: React.ReactNode;
  className?: string;
  /** Maximum rotation in degrees (tilt) */
  maxRotate?: number;
  /** Maximum inner translation in px for parallax */
  maxTranslate?: number;
  /** Scale applied while hovering */
  hoverScale?: number;
  /** Smoothing factor (0-1) used for lerp; smaller = slower */
  ease?: number;
}

export default function InteractiveCard({
  children,
  className = "",
  maxRotate = 8,
  maxTranslate = 6,
  hoverScale = 1.02,
  ease = 0.12,
}: InteractiveCardProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const frame = useRef<number | null>(null);
  const target = useRef({ rx: 0, ry: 0, tx: 0, ty: 0, scale: 1 });
  const current = useRef({ rx: 0, ry: 0, tx: 0, ty: 0, scale: 1 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let width = 0;
    let height = 0;

    function updateBounds() {
      const currentEl = ref.current;
      if (!currentEl) return;
      const rect = currentEl.getBoundingClientRect();
      width = rect.width || 1;
      height = rect.height || 1;
    }

    updateBounds();
    window.addEventListener("resize", updateBounds);

    function pointerMove(e: PointerEvent) {
      const node = ref.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const rx = ((y - height / 2) / height) * maxRotate; // rotateX
      const ry = -((x - width / 2) / width) * maxRotate; // rotateY
      const tx = -((x - width / 2) / width) * maxTranslate; // translateX inner
      const ty = -((y - height / 2) / height) * maxTranslate; // translateY inner

      target.current.rx = rx;
      target.current.ry = ry;
      target.current.tx = tx;
      target.current.ty = ty;
      target.current.scale = hoverScale;

      // ensure loop is running
      startLoop();
    }

    function pointerLeave() {
      target.current.rx = 0;
      target.current.ry = 0;
      target.current.tx = 0;
      target.current.ty = 0;
      target.current.scale = 1;
      startLoop();
    }

    function lerp(a: number, b: number, t: number) {
      return a + (b - a) * t;
    }

    function loop() {
      const node = ref.current;
      if (!node) return;

      // smooth current towards target
      current.current.rx = lerp(current.current.rx, target.current.rx, ease);
      current.current.ry = lerp(current.current.ry, target.current.ry, ease);
      current.current.tx = lerp(current.current.tx, target.current.tx, ease);
      current.current.ty = lerp(current.current.ty, target.current.ty, ease);
      current.current.scale = lerp(current.current.scale, target.current.scale, ease);

      node.style.transform = `perspective(900px) rotateX(${current.current.rx}deg) rotateY(${current.current.ry}deg) scale(${current.current.scale})`;
      node.style.setProperty("--ic-tx", `${current.current.tx}px`);
      node.style.setProperty("--ic-ty", `${current.current.ty}px`);

      // stop loop when close to target
      const closeEnough =
        Math.abs(current.current.rx - target.current.rx) < 0.01 &&
        Math.abs(current.current.ry - target.current.ry) < 0.01 &&
        Math.abs(current.current.tx - target.current.tx) < 0.1 &&
        Math.abs(current.current.ty - target.current.ty) < 0.1 &&
        Math.abs(current.current.scale - target.current.scale) < 0.001;

      if (!closeEnough) {
        frame.current = requestAnimationFrame(loop);
      } else {
        if (frame.current) {
          cancelAnimationFrame(frame.current);
          frame.current = null;
        }
      }
    }

    function startLoop() {
      if (!frame.current) frame.current = requestAnimationFrame(loop);
    }

    // Use pointer events so touch and mouse work the same
    el.addEventListener("pointermove", pointerMove as EventListener);
    el.addEventListener("pointerleave", pointerLeave as EventListener);
    el.addEventListener("pointercancel", pointerLeave as EventListener);
    el.addEventListener("pointerdown", startLoop as EventListener);

    return () => {
      window.removeEventListener("resize", updateBounds);
      el.removeEventListener("pointermove", pointerMove as EventListener);
      el.removeEventListener("pointerleave", pointerLeave as EventListener);
      el.removeEventListener("pointercancel", pointerLeave as EventListener);
      el.removeEventListener("pointerdown", startLoop as EventListener);
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, [ease, hoverScale, maxRotate, maxTranslate]);

  return (
    <div
      ref={ref}
      className={`${className} will-change-transform`} 
      style={{ transformStyle: "preserve-3d", transition: "box-shadow 180ms ease" }}
    >
      {children}
    </div>
  );
}
