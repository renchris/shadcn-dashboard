"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export type MenuItem = { label: string; href: string };

type ProfileMenuProps = {
  items?: MenuItem[];
};

const defaultItems: MenuItem[] = [
  { label: "Profile", href: "/profile" },
  { label: "Settings", href: "/settings" },
  { label: "Sign out", href: "/sign-out" },
];

export default function ProfileMenu({ items = defaultItems }: ProfileMenuProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onClickOutside(event: MouseEvent) {
      if (
        open &&
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="h-9 w-9 inline-flex items-center justify-center rounded-full bg-foreground/10 text-foreground/80 hover:bg-foreground/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40"
      >
        <span className="sr-only">Open user menu</span>
        {/* Simple user glyph */}
        <svg
          aria-hidden
          viewBox="0 0 24 24"
          fill="none"
          className="h-5 w-5"
        >
          <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5" />
          <path
            d="M4 20c1.5-3.5 5-5.5 8-5.5s6.5 2 8 5.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>

      {open ? (
        <div
          role="menu"
          className="absolute right-0 mt-2 w-44 overflow-hidden rounded-md border border-foreground/10 bg-background shadow-lg"
        >
          <ul className="py-1">
            {items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block px-3 py-2 text-sm text-foreground/80 hover:bg-foreground/5 hover:text-foreground"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}


