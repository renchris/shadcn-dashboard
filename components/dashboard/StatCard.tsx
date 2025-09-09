"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import CardGlow from "./CardGlow";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

export type StatTrend = {
  direction: "up" | "down" | "flat";
  label?: string; // e.g. "+8% this week"
};

export type StatCardProps = {
  title: string;
  value: string | number;
  caption?: string;
  icon?: React.ReactNode;
  trend?: StatTrend;
  className?: string;
  href?: string; // when provided, whole card is a link and shows corner arrow
};

export function StatCard({ title, value, caption, icon, trend, className, href }: StatCardProps) {
  const TrendIcon = trend?.direction === "down" ? ArrowDownRight : ArrowUpRight;
  const trendColor =
    trend?.direction === "down"
      ? "text-destructive"
      : trend?.direction === "flat"
      ? "text-muted-foreground"
      : "text-emerald-600 dark:text-emerald-400";

  return (
    <motion.div
      initial="rest"
      animate="rest"
      whileHover="hover"
      className={cn(
        "group relative rounded-xl border border-border bg-card p-4 sm:p-5 transition-shadow transition-colors duration-200 hover:border-foreground/15 hover:shadow-[0_6px_14px_-12px_rgba(0,0,0,0.12)] dark:hover:shadow-[0_6px_14px_-12px_rgba(0,0,0,0.28)]",
        className
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-foreground/60">{title}</p>
          <div className="mt-2 text-2xl font-semibold tabular-nums leading-none">{value}</div>
          {caption ? (
            <p className="mt-1 text-xs text-muted-foreground">{caption}</p>
          ) : null}
        </div>
        {icon ? (
          <div className="shrink-0 rounded-md border border-border bg-muted/40 p-2 text-foreground/70">{icon}</div>
        ) : null}
      </div>
      {trend ? (
        <div className="mt-3 flex items-center gap-1.5 text-xs font-medium text-foreground/70 group-hover:text-foreground transition-colors">
          {trend.direction === "flat" ? (
            <span className={cn("h-4 w-4 rounded-sm bg-muted inline-flex items-center justify-center text-[10px]", trendColor)}>
              =
            </span>
          ) : (
            <TrendIcon className={cn("h-4 w-4", trendColor)} />
          )}
          <span className={cn(trendColor)}>{trend.label}</span>
        </div>
      ) : null}
      {href ? (
        <>
          <motion.span
            variants={{
              rest: { opacity: 0, x: -2, y: 2, scale: 0.995, rotate: -1 },
              hover: { opacity: 1, x: 0, y: 0, scale: 1, rotate: 0 },
            }}
            transition={{ type: "spring", bounce: 0.12, duration: 1.0 }}
            className="pointer-events-none absolute right-3 top-3 z-20 inline-flex h-5 w-5 items-center justify-center text-foreground/60 group-hover:text-foreground"
          >
            <ArrowUpRight className="h-4 w-4" />
          </motion.span>
          <Link href={href} aria-label={title} className="absolute inset-0 z-10" />
        </>
      ) : null}
      <CardGlow />
    </motion.div>
  );
}

export default StatCard;


