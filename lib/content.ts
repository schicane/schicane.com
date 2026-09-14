import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { evaluate } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";
import remarkGfm from "remark-gfm";

export type Edition = {
  slug: string;
  title: string;
  description: string;
  date: string;
  kind: "report" | "editorial";
  tags: string[];
  readingMinutes: number;
  content: string;
};
export const topics = [
  {
    name: "Models",
    text: "Capabilities, releases, and the limits behind the benchmarks.",
  },
  {
    name: "Research",
    text: "Ideas that move the field forward. Evidence that holds up.",
  },
  {
    name: "Industry",
    text: "The companies, capital, and infrastructure shaping AI.",
  },
  { name: "Agents", text: "From answering questions to getting things done." },
  {
    name: "Robotics",
    text: "Intelligence beyond the screen, in the physical world.",
  },
  {
    name: "Policy",
    text: "The rules, institutions, and decisions that set the direction.",
  },
];
export function editions(): Edition[] {
  const root = path.join(process.cwd(), "content/ai/weekly");
  return fs
    .readdirSync(root)
    .filter((f) => f.endsWith(".mdx"))
    .flatMap((file) => {
      const { data, content } = matter(
        fs.readFileSync(path.join(root, file), "utf8"),
      );
      const slug = file.replace(/\.mdx$/, "");
      if (data.draft === true) return [];
      if (
        !/^\d{4}-\d{2}-\d{2}$/.test(slug) ||
        typeof data.date !== "string" ||
        data.date !== slug ||
        new Date(slug).toISOString().slice(0, 10) !== slug
      )
        throw new Error(`Invalid publication date: ${file}`);
      if (slug > new Date().toISOString().slice(0, 10)) return [];
      if (
        typeof data.title !== "string" ||
        !data.title.trim() ||
        typeof data.description !== "string" ||
        !data.description.trim() ||
        !["report", "editorial"].includes(data.kind) ||
        !Array.isArray(data.tags) ||
        !data.tags.every((tag: unknown) => typeof tag === "string")
      )
        throw new Error(`Invalid metadata: ${file}`);
      if (data.kind === "report" && !/https:\/\//.test(content))
        throw new Error(`Weekly report requires primary source links: ${file}`);
      return [
        {
          slug,
          title: data.title,
          description: data.description,
          date: data.date,
          kind: data.kind,
          tags: data.tags,
          readingMinutes: Math.max(
            1,
            Math.ceil(content.split(/\s+/).length / 220),
          ),
          content,
        },
      ];
    })
    .sort((a, b) => b.date.localeCompare(a.date));
}
export function dateLabel(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T12:00:00Z`));
}
export async function renderEdition(content: string) {
  // MDX is executable code. Only trusted repository contributors may author it.
  const result = await evaluate(content, {
    ...runtime,
    remarkPlugins: [remarkGfm],
  });
  return result.default;
}
