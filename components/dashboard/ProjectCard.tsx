"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import CardGlow from "./CardGlow";
import { motion } from "motion/react";

export type ProjectTag = { label: string };

export type ProjectCardProps = {
  priority?: "Low" | "Medium" | "High";
  tags?: ProjectTag[];
  title: string;
  description?: string;
  bullets?: string[];
  eta?: string;
  chart?: { bars: number[]; color?: string };
  className?: string;
};

const priorityColor: Record<NonNullable<ProjectCardProps["priority"]>, string> = {
  Low: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
  Medium: "bg-amber-500/20 text-amber-700 dark:text-amber-300",
  High: "bg-rose-500/20 text-rose-700 dark:text-rose-300",
};

export function ProjectCard({
  priority = "Medium",
  tags = [],
  title,
  description,
  bullets = [],
  eta,
  chart,
  className,
}: ProjectCardProps) {
  return (
    <div className={cn("group rounded-xl border border-border bg-card p-4 sm:p-5 transition-shadow transition-colors duration-200 hover:border-foreground/15 hover:shadow-[0_8px_24px_-12px_rgba(0,0,0,0.2)] dark:hover:shadow-[0_8px_24px_-12px_rgba(0,0,0,0.5)]", className)}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-1.5">
          <span className={cn("inline-flex h-6 items-center rounded-md px-2 text-[11px] font-semibold", priorityColor[priority])}>
            {priority}
          </span>
          {tags.slice(0, 3).map((t) => (
            <span key={t.label} className="inline-flex h-6 items-center rounded-md bg-muted/60 px-2 text-[11px] font-medium text-foreground/70">
              {t.label}
            </span>
          ))}
        </div>
        <div className="shrink-0 rounded-md border border-border bg-muted/40 p-2 transition-colors group-hover:border-foreground/20 group-hover:bg-muted/60">
          <Image src="/window.svg" alt="window" width={16} height={16} />
        </div>
      </div>
      <h4 className="mt-3 text-[15px] font-semibold leading-6">{title}</h4>
      {description ? (
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      ) : null}

      {chart ? (
        <div className="mt-4 grid grid-cols-12 gap-1.5">
          {chart.bars.map((h, i) => (
            <div key={i} className="flex items-end">
              <motion.span
                style={{ height: `${Math.max(8, Math.min(48, h))}px`, backgroundColor: chart.color }}
                className="w-full rounded-[2px] bg-foreground/30 origin-bottom"
                initial={{ scaleY: 1 }}
                whileHover={{ scaleY: 1.1 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: i * 0.02 }}
              />
            </div>
          ))}
        </div>
      ) : null}

      {bullets.length ? (
        <ul className="mt-4 space-y-2 text-sm text-foreground/80">
          {bullets.map((b) => (
            <li key={b} className="flex items-start gap-2">
              <span className="mt-1 inline-block size-1.5 rounded-full bg-foreground/40" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      ) : null}

      {eta ? (
        <p className="mt-4 text-xs text-muted-foreground">ETA, {eta}</p>
      ) : null}
      <CardGlow />
    </div>
  );
}

export default ProjectCard;


