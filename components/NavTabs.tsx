"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGroup, motion } from "motion/react";

type TabItem = {
  label: string;
  href: string;
};

const tabs: TabItem[] = [
  { label: "Home", href: "/" },
  { label: "Section A", href: "/section-a" },
  { label: "Section B", href: "/section-b" },
  { label: "Section C", href: "/section-c" },
  { label: "Section D", href: "/section-d" },
];

export default function NavTabs() {
  const pathname = usePathname();

  return (
    <LayoutGroup id="nav">
      <nav aria-label="Primary" className="relative flex items-end gap-6">
        {tabs.map((tab) => {
          const isActive =
            tab.href === "/" ? pathname === "/" : pathname?.startsWith(tab.href);
          return (
            <div key={tab.href} className="relative pb-2">
              <Link
                href={tab.href}
                aria-current={isActive ? "page" : undefined}
                className={
                  "text-sm font-medium transition-colors " +
                  (isActive
                    ? "text-foreground"
                    : "text-foreground/60 hover:text-foreground")
                }
              >
                {tab.label}
              </Link>
              {isActive ? (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute left-0 -bottom-0.5 h-[2px] w-full bg-foreground"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.3 }}
                />
              ) : null}
            </div>
          );
        })}
      </nav>
    </LayoutGroup>
  );
}


