import { supabase } from "@/utils/supabase";
export default async function sitemap() {
  const baseUrl = 'https://blog.theebayo.name.ng';
  const { data: posts } = await supabase
    .from("posts")
    .select("slug");

  const postUrls = posts.map((post) => ({
    url: `${baseUrl}/post/${post.slug}`,
    lastModified: new Date(),
  }));

  return [
    { url: baseUrl, lastModified: new Date() },
    ...postUrls,
  ];
}