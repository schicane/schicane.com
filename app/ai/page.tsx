import type { Metadata } from "next";
import { editions, topics } from "@/lib/content";
import { Featured, SectionTitle } from "@/components/editorial";
export const metadata: Metadata = {
  title: "AI",
  description:
    "Models, research, industry, agents, robotics and policy. Explore the AI developments Schicane follows.",
  alternates: { canonical: "/ai/" },
};
export default function AI() {
  return (
    <div className="shell">
      <section className="page-intro">
        <div className="eyebrow">THE FIELD, IN FOCUS</div>
        <h1>
          Artificial intelligence.
          <br />
          <span>A wider perspective.</span>
        </h1>
        <p>
          Six connected areas. A weekly view of the developments reshaping
          technology and the world around it.
        </p>
        <a className="text-link" href="/ai/weekly/">
          Explore AI Weekly <span>↗</span>
        </a>
      </section>
      <section className="section">
        <SectionTitle>THE LATEST EDITION</SectionTitle>
        <Featured edition={editions()[0]} />
      </section>
      <section className="section">
        <SectionTitle>OUR COVERAGE</SectionTitle>
        <div className="coverage-list">
          {topics.map((t, i) => (
            <section id={t.name.toLowerCase()} key={t.name}>
              <span className="eyebrow">0{i + 1}</span>
              <h3>{t.name}</h3>
              <p>{t.text}</p>
            </section>
          ))}
        </div>
      </section>
    </div>
  );
}
