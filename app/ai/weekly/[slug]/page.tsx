import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { editions, dateLabel, renderEdition } from "@/lib/content";
export const dynamicParams = false;
export function generateStaticParams() {
  return editions().map((e) => ({ slug: e.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const e = editions().find((e) => e.slug === slug);
  if (!e) return {};
  return {
    title: e.title,
    description: e.description,
    alternates: { canonical: `/ai/weekly/${slug}/` },
    openGraph: {
      type: "article",
      title: e.title,
      description: e.description,
      publishedTime: e.date,
      url: `/ai/weekly/${slug}/`,
    },
  };
}
export default async function Article({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const e = editions().find((e) => e.slug === slug);
  if (!e) notFound();
  const Content = await renderEdition(e.content);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": e.kind === "report" ? "NewsArticle" : "Article",
    headline: e.title,
    description: e.description,
    datePublished: e.date,
    author: {
      "@type": "Organization",
      name: "Schicane",
      url: "https://schicane.com/about/",
    },
    publisher: { "@type": "Organization", name: "Schicane" },
    mainEntityOfPage: `https://schicane.com/ai/weekly/${e.slug}/`,
  };
  return (
    <article className="shell article">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <header className="article-header">
        <a className="subtle-link" href="/ai/weekly/">
          ← All editions
        </a>
        <div className="eyebrow">
          {e.kind === "editorial" ? "LAUNCH NOTE" : "AI WEEKLY"} /{" "}
          <time dateTime={e.date}>{dateLabel(e.date)}</time>
        </div>
        <h1>{e.title}</h1>
        <p className="article-deck">{e.description}</p>
        <div className="article-meta">
          By Schicane <span>·</span> {e.readingMinutes} min read
        </div>
      </header>
      <div className="prose">
        <Content />
      </div>
      <div className="article-end">
        <span className="eyebrow">KEEP YOUR PERSPECTIVE</span>
        <h2>The next edition, in your feed.</h2>
        <a className="text-link" href="/rss.xml">
          Follow Schicane via RSS <span>↗</span>
        </a>
      </div>
    </article>
  );
}
