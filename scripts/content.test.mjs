import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { editions, renderEdition } from "../lib/content.ts";

test("publication rules protect drafts, future content, metadata and unsourced reports", () => {
  const original = process.cwd();
  const temp = mkdtempSync(join(tmpdir(), "schicane-content-"));
  const root = join(temp, "content/ai/weekly");
  mkdirSync(root, { recursive: true });
  const file = (slug, extra = "", body = "An editorial note.") =>
    writeFileSync(
      join(root, `${slug}.mdx`),
      `---\ntitle: Test edition\ndescription: Test description\ndate: "${slug}"\nkind: editorial\ntags: [Models]\n${extra}---\n${body}`,
    );
  try {
    process.chdir(temp);
    file("2020-01-01");
    file("2020-01-02", "draft: true\n");
    file("2099-01-01");
    assert.deepEqual(
      editions().map((e) => e.slug),
      ["2020-01-01"],
    );
    file("2020-01-03");
    assert.deepEqual(
      editions().map((e) => e.slug),
      ["2020-01-03", "2020-01-01"],
    );
    writeFileSync(
      join(root, "2020-01-03.mdx"),
      "---\ntitle: Missing metadata\n---\nText",
    );
    assert.throws(() => editions(), /Invalid/);
    file("2020-01-03");
    writeFileSync(
      join(root, "2020-01-04.mdx"),
      '---\ntitle: Report\ndescription: Report description\ndate: "2020-01-04"\nkind: report\ntags: [Models]\n---\nNo source',
    );
    assert.throws(() => editions(), /requires primary source links/);
  } finally {
    process.chdir(original);
    rmSync(temp, { recursive: true, force: true });
  }
});
test("MDX compiles prose, internal links, JSX and GFM tables", async () => {
  const Content = await renderEdition(
    "## What happened\n\nA [methodology](/methodology/) link.\n\n<strong>Signal</strong>\n\n| A | B |\n| - | - |\n| 1 | 2 |",
  );
  assert.equal(typeof Content, "function");
});
