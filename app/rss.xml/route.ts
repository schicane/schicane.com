import { editions } from "@/lib/content";
export const dynamic = "force-static";
const escape = (s: string) =>
  s.replace(
    /[<>&"']/g,
    (c) =>
      ({
        "<": "&lt;",
        ">": "&gt;",
        "&": "&amp;",
        '"': "&quot;",
        "'": "&apos;",
      })[c]!,
  );
export function GET() {
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>SCHICANE — AI Weekly</title><link>https://schicane.com/ai/weekly/</link><description>Independent AI intelligence from Schicane.</description><language>en-us</language><atom:link href="https://schicane.com/rss.xml" rel="self" type="application/rss+xml"/>${editions()
      .map(
        (e) =>
          `<item><title>${escape(e.title)}</title><description>${escape(e.description)}</description><link>https://schicane.com/ai/weekly/${e.slug}/</link><guid>https://schicane.com/ai/weekly/${e.slug}/</guid><pubDate>${new Date(e.date + "T12:00:00Z").toUTCString()}</pubDate></item>`,
      )
      .join("")}</channel></rss>`,
    { headers: { "Content-Type": "application/rss+xml" } },
  );
}
