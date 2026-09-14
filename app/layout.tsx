import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  metadataBase: new URL("https://schicane.com"),
  title: {
    default: "SCHICANE — Independent AI Intelligence",
    template: "%s — SCHICANE",
  },
  description:
    "Independent weekly intelligence covering the developments shaping artificial intelligence, research, industry, models and policy.",
  openGraph: {
    type: "website",
    siteName: "SCHICANE",
    images: [
      {
        url: "/social.png",
        width: 1200,
        height: 630,
        alt: "SCHICANE — AI moves fast. We tell you what mattered.",
      },
    ],
  },
  twitter: { card: "summary_large_image", images: ["/social.png"] },
  alternates: { types: { "application/rss+xml": "/rss.xml" } },
  icons: { icon: "/icon.svg" },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <header className="site-header">
          <div className="shell header-inner flex items-center justify-between">
            <a className="wordmark" href="/" aria-label="Schicane home">
              SCHICANE<span className="brand-period">.</span>
            </a>
            <nav aria-label="Main navigation" className="flex items-center">
              <a href="/ai/">AI</a>
              <a href="/about/">ABOUT</a>
              <a href="/methodology/">METHODOLOGY</a>
            </nav>
          </div>
        </header>
        <main id="main">{children}</main>
        <footer className="site-footer">
          <div className="shell">
            <div className="footer-top flex justify-between gap-8">
              <div>
                <a className="wordmark" href="/">
                  SCHICANE<span className="brand-period">.</span>
                </a>
                <p>Intelligence worth your attention.</p>
              </div>
              <nav
                aria-label="Footer navigation"
                className="flex flex-wrap gap-x-8 gap-y-4"
              >
                <a href="/ai/weekly/">AI Weekly</a>
                <a href="/about/">About</a>
                <a href="/methodology/">Methodology</a>
                <a href="/rss.xml">RSS ↗</a>
              </nav>
            </div>
            <div className="footer-bottom flex justify-between gap-4">
              <span>© {new Date().getUTCFullYear()} Schicane</span>
              <span>Independent by design.</span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
