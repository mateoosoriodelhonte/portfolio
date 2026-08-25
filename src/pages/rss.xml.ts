import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { getCollection } from "astro:content";
import { site } from "~/lib/site";

export async function GET(context: APIContext) {
  const posts = (await getCollection("blog", ({ data }) => !data.draft)).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  );

  const base = import.meta.env.BASE_URL.replace(/\/$/, "");

  return rss({
    title: `${site.name} — Blog`,
    description:
      "Writing on engineering, grounded AI, and developer tools by Mateo Osorio Delhonte.",
    site: new URL(`${base}/`, context.site ?? "https://mateoosoriodelhonte.github.io").href,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `${base}/blog/${post.id}/`,
      categories: [post.data.category],
    })),
    customData: "<language>en-us</language>",
  });
}
