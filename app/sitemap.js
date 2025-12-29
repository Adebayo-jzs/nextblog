 
import { createClient } from "@/lib/client";
export default async function sitemap() {
  const supabase = createClient()
  const baseUrl = 'https://blog.theebayo.name.ng';
  const { data: posts } = await supabase
    .from("posts")
    .select("slug");

  const postUrls = posts.map((post) => ({
    url: `${baseUrl}/posts/${post.slug}`,
    lastModified: new Date(post.date),
    priority:0.8,
  }));

  return [
    { url: baseUrl, lastModified: new Date(),priority:1, },
    ...postUrls,
  ];
}