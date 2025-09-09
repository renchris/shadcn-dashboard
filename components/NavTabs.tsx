"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

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
    <nav aria-label="Primary" className="flex items-end gap-6">
      {tabs.map((tab) => {
        const isActive =
          tab.href === "/" ? pathname === "/" : pathname?.startsWith(tab.href);
        return (
          <Link
            key={tab.href}
            href={tab.href}
            aria-current={isActive ? "page" : undefined}
            className={
              "text-sm font-medium pb-2 border-b-2 transition-colors " +
              (isActive
                ? "border-foreground text-foreground"
                : "border-transparent text-foreground/60 hover:text-foreground")
            }
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}


