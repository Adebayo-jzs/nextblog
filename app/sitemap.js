export const revalidate = 86400;

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY // server-only
);

export default async function sitemap() {
  const { data: posts, error } = await supabase
    .from("posts")
    .select("slug, updated_at")
    .eq("published", true);

  if (error || !posts) {
    return [];
  }

  const postUrls = posts.map((post) => ({
    url: `https://blog.theebayo.name.ng/posts/${post.slug}`,
    lastModified: new Date(post.updated_at),
    changeFrequency: "weekly",
    priority: 1,
  }));

  return [
    {
      url: "https://blog.theebayo.name.ng",
      lastModified: new Date(),
      priority: 1,
    },
{
      url: "https://blog.theebayo.name.ng/posts",
      lastModified: new Date(),
      priority: 1,
    },
{
      url: "https://blog.theebayo.name.ng/sponsor",
      lastModified: new Date(),
      priority: 1,
    },
    ...postUrls,
  ];
}