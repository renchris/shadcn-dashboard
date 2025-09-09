import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";
import NavTabs from "../components/NavTabs";
import ProfileMenu from "../components/ProfileMenu";
import { ThemeProvider } from "next-themes";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shadcn Dashboard",
  description: "Demo dashboard with App Router",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen flex flex-col">
            <header className="sticky top-0 z-50 border-b border-foreground/10 bg-background/80 backdrop-blur">
              <div className="mx-auto max-w-6xl px-4 sm:px-6">
                <div className="h-14 flex items-center justify-between gap-4">
                  {/* Left: Logo */}
                  <Link href="/" className="inline-flex items-center gap-2">
                    <Image
                      src="/next.svg"
                      alt="Logo"
                      width={24}
                      height={24}
                      className="dark:invert"
                      priority
                    />
                    <span className="text-sm font-semibold tracking-wide">Shadcn Dashboard</span>
                  </Link>

                  {/* Center: Tabs */}
                  <div className="flex-1 hidden sm:flex items-center justify-center">
                    <NavTabs />
                  </div>

                  {/* Right: Profile */}
                  <div className="flex items-center justify-end min-w-[2.25rem]">
                    <ProfileMenu />
                  </div>
                </div>
              </div>
            </header>

            <main className="flex-1">
              <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8">{children}</div>
            </main>

            <footer className="border-t border-foreground/10">
              <div className="mx-auto max-w-6xl px-4 sm:px-6 h-12 flex items-center">
                <p className="text-xs text-foreground/60">
                  © {new Date().getFullYear()} Shadcn Dashboard
                </p>
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
