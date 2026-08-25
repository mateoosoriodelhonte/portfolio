import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updated: z.coerce.date().optional(),
    category: z.enum([
      "Engineering",
      "AI / RAG",
      "System Design",
      "Developer Tools",
      "Lessons Learned",
      "Open Source",
    ]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
