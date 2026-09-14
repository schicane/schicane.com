import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "About",
  description:
    "Schicane is an independent AI publication focused on clarity, evidence and perspective.",
  alternates: { canonical: "/about/" },
};
export default function About() {
  return (
    <div className="shell">
      <section className="page-intro">
        <div className="eyebrow">ABOUT SCHICANE</div>
        <h1>
          More perspective.
          <br />
          <span>Less noise.</span>
        </h1>
        <p>
          An independent publication for people who want to understand where
          artificial intelligence is going.
        </p>
      </section>
      <div className="prose info-prose">
        <h2>Intelligence worth your attention.</h2>
        <p>
          Schicane tracks the developments shaping artificial intelligence and
          publishes a source-backed weekly report focused on what happened, why
          it matters, and what comes next.
        </p>
        <p>
          We follow models, research, industry, agents, robotics, and policy.
          Our aim is to connect developments across the field without treating
          every announcement as a breakthrough.
        </p>
        <h2>Built around the reader.</h2>
        <p>
          A useful report should respect your time. We aim to explain technical
          developments in plain language, link to the original evidence, and
          make the limits of that evidence clear.
        </p>
        <h2>Independent by design.</h2>
        <p>
          Editorial selection is guided by relevance and evidence. Any future
          sponsorship or material conflict of interest will be disclosed
          alongside the affected content.
        </p>
        <p>
          Explore our <a href="/methodology/">editorial methodology</a> or read
          the <a href="/ai/weekly/">latest edition</a>.
        </p>
      </div>
    </div>
  );
}
