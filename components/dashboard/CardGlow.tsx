"use client";

import React from "react";
import { useTheme } from "next-themes";

type CardGlowProps = {
  className?: string;
};

// Lightweight pointer-follow radial gradient that is clipped to the card.
// Usage: Place as last child of a relatively positioned card container.
export default function CardGlow({ className }: CardGlowProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [pos, setPos] = React.useState({ x: 0, y: 0, active: false });
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  React.useEffect(() => {
    const el = ref.current?.parentElement;
    if (!el) return;

    const onEnter = () => setPos((p) => ({ ...p, active: true }));
    const onLeave = () => setPos((p) => ({ ...p, active: false }));
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top, active: true });
    };
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    el.addEventListener("mousemove", onMove);
    return () => {
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
      el.removeEventListener("mousemove", onMove);
    };
  }, []);

  const isDark = mounted ? resolvedTheme === "dark" : false;
  const lightGradient = `radial-gradient(220px 220px at ${pos.x}px ${pos.y}px, rgba(0,0,0,0.019), rgba(0,0,0,0.01) 35%, transparent 60%)`;
  const darkGradient = `radial-gradient(220px 220px at ${pos.x}px ${pos.y}px, rgba(255,255,255,0.08), transparent 60%)`;
  const style: React.CSSProperties = {
    opacity: pos.active ? 1 : 0,
    background: isDark ? darkGradient : lightGradient,
    mixBlendMode: isDark ? "screen" : "multiply",
  };

  return <div ref={ref} className={"pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-200 " + (className ?? "")} style={style} />;
}


