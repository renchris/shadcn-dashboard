import Image from "next/image";
import Link from "next/link";
import GradientBanner from "@/components/background/GradientBanner";

type StatusRow = {
  sectionName: string;
  count: number;
  button: { label: string; destination: string };
};

type QuickLink = { text: string; url: string };

export default function Home() {
  const pageTitle = "Home";
  const bannerButton = { label: "Create", destination: "/section-a" };

  const leftTitle = "Overview";
  const statusRows: StatusRow[] = [
    { sectionName: "Status A", count: 12, button: { label: "Open", destination: "/section-a" } },
    { sectionName: "Status B", count: 5, button: { label: "Open", destination: "/section-b" } },
    { sectionName: "Status C", count: 2, button: { label: "Open", destination: "/section-c" } },
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

      {/* Main Section */}
      <main className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Left Half */}
        <section aria-labelledby="overview-title" className="flex flex-col gap-4">
          <h2 id="overview-title" className="text-xl font-semibold">{leftTitle}</h2>

          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
            <ul role="list" className="divide-y divide-border">
              {statusRows.map((row) => (
                <li key={row.sectionName} className="flex items-center justify-between px-4 py-3.5 sm:px-5 sm:py-4 hover:bg-accent/40 transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium">{row.sectionName}</span>
                    <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-md bg-muted/60 px-2 text-xs font-semibold">
                      {row.count}
                    </span>
                  </div>
                  <Link
                    href={row.button.destination}
                    className="text-sm font-medium text-primary hover:underline"
                    aria-label={`${row.button.label} ${row.sectionName}`}
                  >
                    {row.button.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex justify-end">
            <Link href={viewAll.destination} className="text-sm font-medium text-primary hover:underline">
              {viewAll.label}
            </Link>
          </div>
        </section>

        {/* Right Half */}
        <section className="flex flex-col gap-6">
          {/* Quick Links Card */}
          <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-sm">
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
          </div>

          {/* Informational Card */}
          <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-sm">
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
          </div>
        </section>
      </main>
    </div>
  );
}
