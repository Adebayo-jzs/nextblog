import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function GET() {
    const { data: posts } = await supabase
        .from("posts")
        .select("*")
        .eq("published", true)
        .order("created_at", { ascending: false });

    const siteUrl = "https://blog.theebayo.name.ng";

    const feed = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>Theebayo Blog</title>
    <link>${siteUrl}</link>
    <description>Sharing insights on Next.js, Web Development, and Software Engineering.</description>
    <language>en-us</language>
    ${posts
            ?.map((post) => {
                return `
      <item>
        <title>${post.title}</title>
        <link>${siteUrl}/posts/${post.slug}</link>
        <guid>${siteUrl}/posts/${post.slug}</guid>
        <pubDate>${new Date(post.created_at).toUTCString()}</pubDate>
        <description>${post.excerpt}</description>
      </item>
    `;
            })
            .join("")}
  </channel>
</rss>`;

    return new Response(feed, {
        headers: {
            "Content-Type": "application/xml",
        },
    });
}
