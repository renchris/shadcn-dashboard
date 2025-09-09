import Image from "next/image";
import Link from "next/link";
import GradientBanner from "@/components/background/GradientBanner";
import { BentoGrid, BentoCard } from "@/components/bento/BentoGrid";
import { StatCard } from "@/components/dashboard/StatCard";
import { ProjectCard } from "@/components/dashboard/ProjectCard";

type StatusRow = {
  sectionName: string;
  statusKey: string;
  count: number;
  button: { label: string };
};

type QuickLink = { text: string; url: string };

export default function Home() {
  const pageTitle = "Home";
  const bannerButtons = [
    { label: "New Project", destination: "/section-a" },
    { label: "New Task", destination: "/section-b" },
  ];

  const leftTitle = "Enable Real-Time Collaboration in Task View";
  const statusRows: StatusRow[] = [
    { sectionName: "WebSocket service integrated and stable", statusKey: "in-progress", count: 78, button: { label: "Open" } },
    { sectionName: "Conflict-handling logic implemented", statusKey: "qa", count: 16, button: { label: "Open" } },
    { sectionName: "Active users: 318 across 5 teams", statusKey: "adoption", count: 318, button: { label: "Open" } },
    { sectionName: "Cursor avatars added for multi-user view", statusKey: "ux", count: 12, button: { label: "Open" } },
    { sectionName: "Latency under 120ms in staging", statusKey: "perf", count: 120, button: { label: "Open" } },
    { sectionName: "ETA, July 26, 2025", statusKey: "eta", count: 10, button: { label: "Open" } },
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
      <section className="w-full -mt-8" aria-label="Top banner">
        <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] -mt-px w-screen overflow-hidden text-foreground ring-1 ring-black/10 dark:text-white dark:ring-white/10">
          <GradientBanner />
          <div className="relative z-10 mx-auto max-w-6xl px-6 py-12 lg:py-14 flex items-center justify-between">
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">{pageTitle}</h1>
            <div className="flex items-center gap-3">
              {bannerButtons.map((btn) => (
                <Link
                  key={btn.label}
                  href={btn.destination}
                  className="inline-flex items-center rounded-md px-4 py-2 text-sm font-medium ring-1 ring-inset backdrop-blur-sm transition-colors focus:outline-none focus-visible:ring-2 dark:bg-white/10 dark:ring-white/30 dark:hover:bg-white/20 bg-black/5 ring-black/20 hover:bg-black/10"
                >
                  {btn.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Section as Bento */}
      <main className="mt-6">
        {/* Summary Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <StatCard href="/section-a" title="All Tasks" value={1280} caption="Across all projects" trend={{ direction: "up", label: "+8% this week" }} />
          <StatCard href="/section-b" title="Completed Tasks" value={192} caption="Compared to 156 last week" trend={{ direction: "up", label: "+23% efficiency" }} />
          <StatCard href="/section-c" title="Active Projects" value={12} caption="3 new this week" trend={{ direction: "up", label: "Growing steadily" }} />
        </div>

        <div className="mt-6 flex items-center justify-between">
          <h2 className="text-sm font-semibold tracking-wide text-foreground/70 uppercase">Ongoing Works</h2>
          <button className="text-sm text-primary hover:underline">+ New</button>
        </div>

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
            <ProjectCard
              priority="Medium"
              tags={[{ label: "UI design" }, { label: "Interaction" }]}
              title="Setup Slack Integration for Task Updates"
              description="Allow teams to receive automated task activity alerts directly in Slack channels."
              chart={{ bars: [10, 16, 12, 18, 14, 22, 15, 19, 17, 20, 13, 18], color: "currentColor" }}
              bullets={["OAuth flow complete", "Support for task created and status-change events", "Notifications sent ~7s avg", "Channel selection UI deployed", "Next: Add user-level controls"]}
              eta="July 14, 2025"
            />
          </BentoCard>
        </BentoGrid>
      </main>
    </div>
  );
}
