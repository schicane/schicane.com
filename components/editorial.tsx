import { dateLabel, type Edition } from "@/lib/content";
import { Signal } from "./signal";
export function SectionTitle({
  children,
  right,
}: {
  children: React.ReactNode;
  right?: React.ReactNode;
}) {
  return (
    <div className="section-title flex items-center justify-between gap-4">
      <h2>{children}</h2>
      {right}
    </div>
  );
}
export function Featured({ edition }: { edition?: Edition }) {
  if (!edition)
    return (
      <div className="empty-state">
        <h3>The first edition is ahead.</h3>
        <p>Our source-backed weekly reporting will appear here.</p>
        <a className="text-link" href="/methodology/">
          Explore our methodology <span>↗</span>
        </a>
      </div>
    );
  return (
    <article className="featured grid md:grid-cols-2">
      <div className="feature-art">
        <Signal compact />
        <span className="art-label">THE SCHICANE PERSPECTIVE</span>
      </div>
      <div className="feature-copy">
        <div className="eyebrow">
          {edition.kind === "editorial" ? "LAUNCH NOTE" : "WEEKLY REPORT"}{" "}
          <span className="dot-separator">/</span>{" "}
          <time dateTime={edition.date}>{dateLabel(edition.date)}</time>
        </div>
        <h3>
          <a href={`/ai/weekly/${edition.slug}/`}>{edition.title}</a>
        </h3>
        <p>{edition.description}</p>
        <a className="text-link" href={`/ai/weekly/${edition.slug}/`}>
          {edition.kind === "editorial"
            ? "Read the launch note"
            : "Read the report"}{" "}
          <span>↗</span>
        </a>
      </div>
    </article>
  );
}
export function EditionList({ items }: { items: Edition[] }) {
  return (
    <div>
      {items.map((e, i) => (
        <article className="edition-row" key={e.slug}>
          <span className="edition-number">
            {String(items.length - i).padStart(2, "0")}
          </span>
          <div className="edition-date">
            <time dateTime={e.date}>{dateLabel(e.date)}</time>
            <span>
              {e.kind === "editorial" ? "Launch note" : "Weekly report"} ·{" "}
              {e.readingMinutes} min read
            </span>
          </div>
          <h3>
            <a href={`/ai/weekly/${e.slug}/`}>
              {e.title}
              <span aria-hidden="true">↗</span>
            </a>
          </h3>
        </article>
      ))}
      {items.length === 0 && (
        <p className="empty-state">
          Our first weekly report is on its way. Follow the{" "}
          <a href="/rss.xml">RSS feed</a> for new editions.
        </p>
      )}
    </div>
  );
}
