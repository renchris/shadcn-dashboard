"use client";

import AnimatedGradient from "@/components/background/AnimatedGradient";

export default function GradientBanner() {
  return (
    <span className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-r from-[#0b1b3f] via-[#1e3a8a] to-[#4c1d95]">
      <AnimatedGradient
        colors={["#3b82f6", "#22d3ee", "#8b5cf6"]}
        speed={20}
        blur="heavy"
        movementScale={0.035}
        opacity={0.4}
      />
    </span>
  );
}


