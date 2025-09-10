"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface AnimatedGradientProps {
  colors: string[];
  speed?: number;
  blur?: "light" | "medium" | "heavy";
  movementScale?: number; // 0..0.5 range typically; lower = subtler motion
  opacity?: number; // 0..1 visual intensity of layer
}

const randomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const AnimatedGradient: React.FC<AnimatedGradientProps> = ({
  colors,
  speed = 5,
  blur = "light",
  movementScale = 0.08,
  opacity = 0.35,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  // Mount flag to avoid SSR hydration mismatch
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Update a CSS variable with the container's max dimension without triggering React re-renders
  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const updateVar = () => {
      const rect = node.getBoundingClientRect();
      const maxDim = Math.max(rect.width, rect.height);
      node.style.setProperty("--cg-max", `${maxDim}px`);
    };

    updateVar();
    const resizeObserver = new ResizeObserver(() => {
      // Batch with rAF to avoid layout thrash
      requestAnimationFrame(updateVar);
    });
    resizeObserver.observe(node);
    return () => resizeObserver.disconnect();
  }, []);

  // Generate stable random seeds for each color so re-renders do not reshuffle positions/sizes
  const seeds = useMemo(() => {
    return colors.map(() => ({
      sizeMultiplier: randomInt(5, 15) / 10, // 0.5 .. 1.5
      topPercent: Math.random() * 50, // 0 .. 50
      leftPercent: Math.random() * 50, // 0 .. 50
      tx1: (Math.random() - 0.5) * movementScale,
      ty1: (Math.random() - 0.5) * movementScale,
      tx2: (Math.random() - 0.5) * movementScale,
      ty2: (Math.random() - 0.5) * movementScale,
      tx3: (Math.random() - 0.5) * movementScale,
      ty3: (Math.random() - 0.5) * movementScale,
      tx4: (Math.random() - 0.5) * movementScale,
      ty4: (Math.random() - 0.5) * movementScale,
    }));
    // Recalculate only if the color list identity changes or movement scale changes
  }, [colors, movementScale]);

  const blurClass =
    blur === "light" ? "blur-2xl" : blur === "medium" ? "blur-3xl" : "blur-[100px]";

  if (!isMounted) {
    return <div ref={containerRef} className="absolute inset-0 overflow-hidden" />;
  }

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden">
      <div className={cn("absolute inset-0", blurClass)} style={{ opacity }}>
        {colors.map((color, index) => {
          const seed = seeds[index] ?? seeds[0];
          type CSSWithVars = React.CSSProperties & { [key: string]: string | number | undefined };
          const style: CSSWithVars = {
            animation: `background-gradient ${speed}s infinite ease-in-out`,
            animationDuration: `${speed}s`,
            top: `${seed.topPercent}%`,
            left: `${seed.leftPercent}%`,
            width: `calc(var(--cg-max, 0px) * ${seed.sizeMultiplier})`,
            height: `calc(var(--cg-max, 0px) * ${seed.sizeMultiplier})`,
            "--tx-1": seed.tx1,
            "--ty-1": seed.ty1,
            "--tx-2": seed.tx2,
            "--ty-2": seed.ty2,
            "--tx-3": seed.tx3,
            "--ty-3": seed.ty3,
            "--tx-4": seed.tx4,
            "--ty-4": seed.ty4,
          };

          return (
            <svg
              key={index}
              className={cn("absolute", "animate-background-gradient")}
              viewBox="0 0 100 100"
              style={style}
            >
              <circle cx="50" cy="50" r="50" fill={color} />
            </svg>
          );
        })}
      </div>
    </div>
  );
};

export default AnimatedGradient;


