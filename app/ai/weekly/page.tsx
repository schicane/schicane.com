import type { Metadata } from "next";
import { editions } from "@/lib/content";
import { EditionList, SectionTitle } from "@/components/editorial";
export const metadata: Metadata = {
  title: "AI Weekly",
  description: "The Schicane archive: weekly AI reports and editorial notes.",
  alternates: { canonical: "/ai/weekly/" },
};
export default function Weekly() {
  return (
    <div className="shell archive">
      <section className="page-intro">
        <div className="eyebrow">THE SCHICANE ARCHIVE</div>
        <h1>
          A week of change.
          <br />
          <span>A clearer view.</span>
        </h1>
        <p>
          What happened, why it matters, and what comes next. Every edition, in
          one place.
        </p>
        <a className="text-link" href="/rss.xml">
          Follow via RSS <span>↗</span>
        </a>
      </section>
      <section className="section">
        <SectionTitle>ALL EDITIONS</SectionTitle>
        <EditionList items={editions()} />
        {!editions().some((e) => e.kind === "report") && (
          <p className="archive-note">
            The publication begins with our launch note. Source-backed weekly
            reports will appear here as they are published.
          </p>
        )}
      </section>
    </div>
  );
}
