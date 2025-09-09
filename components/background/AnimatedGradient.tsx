"use client";

import React, { useMemo, useRef } from "react";
import { cn } from "@/lib/utils";
import { useDimensions } from "@/hooks/use-dimensions";

interface AnimatedGradientProps {
  colors: string[];
  speed?: number;
  blur?: "light" | "medium" | "heavy";
  className?: string;
}

export const AnimatedGradient: React.FC<AnimatedGradientProps> = ({
  colors,
  speed = 5,
  blur = "light",
  className,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const dimensions = useDimensions(containerRef);

  const circleSize = useMemo(() => {
    return Math.max(dimensions.width, dimensions.height);
  }, [dimensions.width, dimensions.height]);

  const blurClass =
    blur === "light" ? "blur-2xl" : blur === "medium" ? "blur-3xl" : "blur-[100px]";

  return (
    <div ref={containerRef} className={cn("absolute inset-0 overflow-hidden", className)}>
      <div className={cn("absolute inset-0", blurClass)}>
        {colors.map((color, index) => {
          const animationProps = {
            animation: `background-gradient ${speed}s infinite ease-in-out`,
            animationDuration: `${speed}s`,
            top: `${Math.random() * 50}%`,
            left: `${Math.random() * 50}%`,
            // movement variables
            "--tx-1": Math.random() - 0.5,
            "--ty-1": Math.random() - 0.5,
            "--tx-2": Math.random() - 0.5,
            "--ty-2": Math.random() - 0.5,
            "--tx-3": Math.random() - 0.5,
            "--ty-3": Math.random() - 0.5,
            "--tx-4": Math.random() - 0.5,
            "--ty-4": Math.random() - 0.5,
          } as React.CSSProperties;

          return (
            <svg
              key={index}
              width={circleSize}
              height={circleSize}
              viewBox={`0 0 ${circleSize} ${circleSize}`}
              fill="none"
              className="absolute will-change-transform"
              style={animationProps}
            >
              <circle cx={circleSize / 2} cy={circleSize / 2} r={circleSize / 2} fill={color} />
            </svg>
          );
        })}
      </div>
    </div>
  );
};

export default AnimatedGradient;


