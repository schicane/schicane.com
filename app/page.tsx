import type { Metadata } from "next";
import { editions, topics } from "@/lib/content";
import { Signal } from "@/components/signal";
import { Featured, SectionTitle, EditionList } from "@/components/editorial";
export const metadata: Metadata = { alternates: { canonical: "/" } };
export default function Home() {
  const items = editions();
  return (
    <>
      <section className="hero shell">
        <div className="hero-copy">
          <div className="eyebrow">
            <span className="status-dot" /> INDEPENDENT AI INTELLIGENCE
          </div>
          <h1>
            AI moves fast.
            <br />
            <span>
              We tell you
              <br className="desktop-break" /> what mattered.
            </span>
          </h1>
          <p>
            Independent weekly intelligence covering the developments shaping
            artificial intelligence, research, industry, models and policy.
          </p>
          <a
            className="button"
            href={items[0] ? `/ai/weekly/${items[0].slug}/` : "/ai/weekly/"}
          >
            READ THIS WEEK <span aria-hidden="true">→</span>
          </a>
        </div>
        <Signal />
      </section>
      <div className="coverage-strip">
        <div className="shell flex flex-wrap items-center justify-between">
          <span>FOLLOWING THE SIGNAL</span>
          <span>MODELS / RESEARCH / INDUSTRY / AGENTS / ROBOTICS / POLICY</span>
        </div>
      </div>
      <div className="shell">
        <section className="section">
          <SectionTitle
            right={<span className="small-muted">A weekly perspective</span>}
          >
            THIS WEEK IN AI
          </SectionTitle>
          <Featured edition={items[0]} />
        </section>
        <section className="section latest">
          <SectionTitle
            right={
              <a className="subtle-link" href="/ai/weekly/">
                All editions ↗
              </a>
            }
          >
            LATEST
          </SectionTitle>
          <EditionList items={items.slice(0, 4)} />
        </section>
        <section className="section">
          <SectionTitle
            right={
              <span className="small-muted">
                Six lenses. One changing field.
              </span>
            }
          >
            WHAT WE COVER
          </SectionTitle>
          <div className="topics grid sm:grid-cols-2 lg:grid-cols-3">
            {topics.map((topic, i) => (
              <a
                className="topic"
                href={`/ai/#${topic.name.toLowerCase()}`}
                key={topic.name}
              >
                <div className="flex items-center justify-between">
                  <span className="topic-index">0{i + 1}</span>
                  <span aria-hidden="true">↗</span>
                </div>
                <h3>{topic.name}</h3>
                <p>{topic.text}</p>
              </a>
            ))}
          </div>
        </section>
        <section className="about-band">
          <div className="eyebrow">ABOUT SCHICANE</div>
          <div>
            <h2>
              A little distance.
              <br />A clearer perspective.
            </h2>
            <p>
              Schicane tracks the developments shaping artificial intelligence
              and publishes a source-backed weekly report focused on what
              happened, why it matters, and what comes next.
            </p>
            <a className="text-link" href="/about/">
              Get to know Schicane <span>↗</span>
            </a>
          </div>
        </section>
      </div>
    </>
  );
}
