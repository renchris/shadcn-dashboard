"use client";

import { useEffect, useMemo, useState } from "react";
import { useTheme } from "next-themes";
import AnimatedGradient from "@/components/background/AnimatedGradient";

export default function GradientBanner() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isDark = mounted ? resolvedTheme === "dark" : false;

  // Keep color array identities stable to avoid reshuffling animations on re-render
  const darkColors = useMemo(() => ["#3b82f6", "#22d3ee", "#8b5cf6"], []);
  const lightColors = useMemo(() => ["#60a5fa", "#a78bfa", "#f472b6"], []);

  return (
    <span
      className={
        "absolute inset-0 z-0 pointer-events-none " +
        (isDark
          ? "bg-gradient-to-r from-[#0b1b3f] via-[#1e3a8a] to-[#4c1d95]"
          : "bg-gradient-to-r from-[#e7f0ff] via-[#efe7ff] to-[#ffe9f1]")
      }
    >
      {isDark ? (
        <AnimatedGradient
          colors={darkColors}
          speed={20}
          blur="heavy"
          movementScale={0.035}
          opacity={0.4}
        />
      ) : (
        <AnimatedGradient
          colors={lightColors}
          speed={20}
          blur="heavy"
          movementScale={0.028}
          opacity={0.32}
        />
      )}
    </span>
  );
}


