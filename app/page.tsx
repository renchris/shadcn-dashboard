import Image from "next/image";
import Link from "next/link";
import GradientBanner from "@/components/background/GradientBanner";
import { BentoGrid, BentoCard } from "@/components/bento/BentoGrid";

type StatusRow = {
  sectionName: string;
  statusKey: string;
  count: number;
  button: { label: string };
};

type QuickLink = { text: string; url: string };

export default function Home() {
  const pageTitle = "Home";
  const bannerButton = { label: "Create", destination: "/section-a" };

  const leftTitle = "Overview";
  const statusRows: StatusRow[] = [
    { sectionName: "Status A", statusKey: "in-progress", count: 12, button: { label: "Open" } },
    { sectionName: "Status B", statusKey: "ready-for-review", count: 5, button: { label: "Open" } },
    { sectionName: "Status C", statusKey: "approved", count: 2, button: { label: "Open" } },
  ];
  const viewAll = { label: "View All", destination: "/section-d" };

  const quickLinks: QuickLink[] = [
    { text: "Section A", url: "/section-a" },
    { text: "Section B", url: "/section-b" },
    { text: "Section C", url: "/section-c" },
    { text: "Docs", url: "https://nextjs.org/docs" },
  ];

  const infoCard = {
    title: "Welcome to the Dashboard",
    description: "Review statuses, jump to sections, and get the latest updates.",
    logo: "/globe.svg",
  };

  return (
    <div className="min-h-screen w-full bg-background text-foreground">
      {/* Top Banner */}
      <section
        className="w-full -mt-8"
        aria-label="Top banner"
      >
        {/* Full-bleed wrapper breaks out of page container */}
        <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] -mt-px w-screen overflow-hidden text-foreground ring-1 ring-black/10 dark:text-white dark:ring-white/10">
          <GradientBanner />
          <div className="relative z-10 mx-auto max-w-6xl px-6 py-12 lg:py-14 flex items-center justify-between">
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">{pageTitle}</h1>
            <Link
              href={bannerButton.destination}
              className="inline-flex items-center rounded-md px-4 py-2 text-sm font-medium ring-1 ring-inset backdrop-blur-sm transition-colors focus:outline-none focus-visible:ring-2 dark:bg-white/10 dark:ring-white/30 dark:hover:bg-white/20 bg-black/5 ring-black/20 hover:bg-black/10"
            >
              {bannerButton.label}
            </Link>
          </div>
        </div>
      </section>

      {/* Main Section as Bento */}
      <main className="mt-6">
        {/* 3 columns, 2 equal-height rows; left card spans 2x2; right column stacks two cards */}
        <BentoGrid separated columnsClassName="grid-cols-1 lg:grid-cols-3 lg:[grid-template-rows:repeat(2,minmax(0,1fr))]">
          {/* Left column: Overview spans 2 columns and 2 rows */}
          <BentoCard spanClassName="lg:col-span-2 lg:row-span-2" className="h-full lg:min-h-[28rem] flex flex-col">
            <div className="mb-3">
              <h2 className="text-xl font-semibold">{leftTitle}</h2>
            </div>
            <div className="flex-1">
              <ul role="list" className="divide-y divide-border">
                {statusRows.map((row) => (
                  <li key={row.sectionName}>
                    <Link
                      href={{ pathname: "/section-a", query: { status: row.statusKey } }}
                      className="group grid grid-cols-[12rem_3rem_1fr_auto] items-center gap-3 px-4 py-3 sm:px-5 sm:py-3.5 transition-colors hover:bg-accent/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      aria-label={`${row.button.label} ${row.sectionName}`}
                    >
                      <span className="text-sm font-medium truncate">{row.sectionName}</span>
                      <span className="inline-flex h-6 w-12 items-center justify-start rounded-md bg-muted/60 px-2 text-[11px] font-semibold">
                        {row.count}
                      </span>
                      <span className="justify-self-end text-sm font-medium text-primary inline-flex items-center gap-1 pr-1">
                        {row.button.label}
                        <svg
                          className="h-3.5 w-3.5 opacity-0 translate-x-0.5 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-1"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden
                        >
                          <path d="M7.293 14.707a1 1 0 0 1 0-1.414L10.586 10 7.293 6.707a1 1 0 1 1 1.414-1.414l4 4a1 1 0 0 1 0 1.414l-4 4a1 1 0 0 1-1.414 0Z" />
                        </svg>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="border-t border-border">
              <Link
                href={viewAll.destination}
                className="block px-4 py-3.5 sm:px-5 sm:py-4 text-right text-sm font-medium text-primary hover:underline"
              >
                {viewAll.label}
              </Link>
            </div>
          </BentoCard>

          {/* Right top: Quick Links (row 1, col 3) */}
          <BentoCard className="h-full">
            <h3 className="text-xs font-semibold tracking-wide text-foreground/70 mb-3 uppercase">Quick Links</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2" role="list">
              {quickLinks.map((link) => (
                <li key={link.text}>
                  {link.url.startsWith("http") ? (
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline"
                    >
                      {link.text}
                    </a>
                  ) : (
                    <Link href={link.url} className="text-sm text-primary hover:underline">
                      {link.text}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </BentoCard>

          {/* Right bottom: Info with logo on right (row 2, col 3) */}
          <BentoCard className="h-full">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <h3 className="text-base font-semibold">{infoCard.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {infoCard.description}
                </p>
              </div>
              <div className="shrink-0 rounded-full border border-border bg-muted/40 p-2">
                <Image src={infoCard.logo} alt="Info logo" width={36} height={36} />
              </div>
            </div>
          </BentoCard>
        </BentoGrid>
      </main>
    </div>
  );
}
