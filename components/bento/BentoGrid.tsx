import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface BentoGridProps {
  children: ReactNode;
  className?: string;
  columnsClassName?: string; // e.g. "grid-cols-1 md:grid-cols-3"
  separated?: boolean; // when true, adds spacing between cards
}

export function BentoGrid({ children, className, columnsClassName, separated = false }: BentoGridProps) {
  const columns = columnsClassName ?? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
  if (separated) {
    return <div className={cn("grid gap-4", columns, className)}>{children}</div>;
  }
  return (
    <div className={cn("rounded-2xl overflow-hidden", className)}>
      <div className={cn("grid gap-px bg-border", columns)}>{children}</div>
    </div>
  );
}

interface BentoCardProps {
  children: ReactNode;
  className?: string;
  spanClassName?: string; // e.g. "sm:col-span-2 lg:row-span-2"
}

export function BentoCard({ children, className, spanClassName }: BentoCardProps) {
  return <div className={cn("bg-card rounded-2xl border border-border p-5 sm:p-6", spanClassName, className)}>{children}</div>;
}

export default BentoGrid;


