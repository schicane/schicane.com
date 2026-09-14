import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Methodology",
  description:
    "How Schicane selects, sources and explains AI developments, handles uncertainty and corrects errors.",
  alternates: { canonical: "/methodology/" },
};
export default function Methodology() {
  return (
    <div className="shell">
      <section className="page-intro">
        <div className="eyebrow">OUR EDITORIAL STANDARD</div>
        <h1>
          Follow the evidence.
          <br />
          <span>Keep the perspective.</span>
        </h1>
        <p>
          Our reporting is only as useful as the reasoning and sources behind
          it. Here is the standard we work toward.
        </p>
      </section>
      <div className="prose info-prose">
        <h2>01 / Select for significance</h2>
        <p>
          We prioritize developments that change capabilities, access,
          deployment, economics, or governance. Attention alone does not make an
          announcement significant.
        </p>
        <h2>02 / Go to the source</h2>
        <p>
          We seek original research papers, technical documentation, official
          announcements, and policy documents. We link sources near the claims
          they support, and identify when a claim comes from a company rather
          than an independent evaluation.
        </p>
        <h2>03 / Separate fact from interpretation</h2>
        <p>
          Reports distinguish what happened from our assessment of why it
          matters and what could happen next. Predictions are scenarios, not
          established outcomes. Benchmark results should include relevant
          limitations and testing context.
        </p>
        <h2>04 / Show the uncertainty</h2>
        <p>
          Early research, demos, and unpublished results require context. We
          flag gaps in evidence, limited availability, and claims we cannot
          independently verify.
        </p>
        <h2>05 / Make corrections visible</h2>
        <p>
          Substantive corrections will be noted in the affected article with a
          date and a description of what changed. Minor spelling and formatting
          fixes may be made without a separate note.
        </p>
        <h2>06 / Keep editorial responsibility</h2>
        <p>
          AI tools may assist research organization, drafting, or editing. A
          human editor remains responsible for verifying claims and sources
          before publication. Sponsored content and material conflicts will be
          clearly disclosed.
        </p>
        <hr />
        <p>
          Found an issue?{" "}
          <a href="https://github.com/schicane/schicane.com/issues">
            Report a correction on GitHub
          </a>
          , including the article URL, the claim, and a supporting source.
        </p>
      </div>
    </div>
  );
}
