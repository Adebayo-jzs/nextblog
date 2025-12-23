import { supabase } from "@/utils/supabase";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
    const {slug} = await params;

    const {data:post} = await supabase
    .from("posts")
    .select("*")
    .eq("slug",slug)
    .eq("published", true)
    .single();

    if (!post) {
    return {
      title: "Post not found",
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `/blog/${post.slug}`,
      type: "article",
    },
  };
}

export async function generateStaticParams() {
  const { data: posts, error } = await supabase
    .from("posts")
    .select("slug");

  if (error || !posts) return [];

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }) {
  const { slug } = await  params;

  const { data: post } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!post) notFound();

  return (
    <article className="mx-auto max-w-3xl py-10">
      <h1 className="text-3xl font-bold">{post.title}</h1>
      <span className="text-sm text-zinc-500 dark:text-zinc-400">{post.created_at}</span>
      <div className="mt-6">{post.content}</div>
    </article>
  );
}
