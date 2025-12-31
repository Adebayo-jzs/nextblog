export const revalidate = 86400;
import { createClient } from "@/lib/client";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft,Calendar,Clock } from "lucide-react";
import Head from "next/head";
import MarkdownIt from "markdown-it";
const md = new MarkdownIt();
const supabase = createClient();
 
export async function generateMetadata({ params }) {
  const { slug } = await params;

  const { data: post } = await supabase
    .from("posts")
    .select("title, excerpt, slug, created_at, updated_at")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (!post) {
    notFound();
  }

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: `https://blog.theebayo.name.ng/posts/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://blog.theebayo.name.ng/posts/${post.slug}`,
      type: "article",
      publishedTime: post.created_at,
      modifiedTime: post.updated_at,
      authors: ["Adebayo Adedeji"],
    },
    twitter: {
      card: "summary_large_image",
    },
  };
}
  const formatDate = (string) => {
    return new Date(string).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
  
export async function generateStaticParams() {
  const { data: posts } = await supabase
    .from("posts")
    .select("slug")
    .eq("published", true);

  if (!posts) return [];

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
  const htmlContent = md.render(post.content)
const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.created_at,
    dateModified: post.updated_at,
    author: {
      "@type": "Person",
      name: "Adebayo Adedeji",
      url: "https://theebayo.name.ng",
      sameAs: [
        "https://twitter.com/theebayo",
        "https://github.com/Adebayo-jzs",
        "https://linkedin.com/in/theebayo",
      ],
    },
  };
  return (
    // <article className="mx-auto max-w-3xl py-10">
    //   <h1 className="text-3xl font-bold">{post.title}</h1>
    //   <span className="text-sm text-zinc-500 dark:text-zinc-400">{post.created_at}</span>
    //   <div className="mt-6">{post.content}</div>
    // </article>
    <>
<Head>
    <meta name="description" content={post.excerpt || post.title} />
    <link rel="canonical" href={`https://blog.theebayo.name.ng/posts/${post.slug}`} />

    {/* Open Graph */}
    <meta property="og:title" content={post.title} />
    <meta property="og:description" content={post.excerpt} />
    <meta property="og:url" content={`https://blog.theebayo.name.ng/posts/${post.slug}`} />
    <meta property="og:type" content="article" />
    <meta property="og:published_time" content={post.created_at} />
    <meta property="og:modified_time" content={post.updated_at} />
    {/* Add og:image later if you have one, e.g. <meta property="og:image" content="https://.../cover.jpg" /> */}

    {/* Twitter */}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={post.title} />
    <meta name="twitter:description" content={post.excerpt} />
    {/* <meta name="twitter:image" content="..." /> if you add images */}

    <meta name="robots" content="index, follow" /> {/* Optional but explicit */}

<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1310135702830044"
     crossorigin="anonymous"></script>
  </Head>
    <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    <div className="min-h-screen">
      <div className="noise-overlay" />
      {/* <Header /> */}

      <main className="pt-32 pb-20">
        <article className="container mx-auto px-6 max-w-3xl">
          {/* Back link */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[#7b899d] hover:text-[#00E5FF] transition-colors mb-8 font-mono text-sm"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to posts
          </Link>

          {/* Tags */}
          {/* <div className="flex flex-wrap gap-2 mb-6">
            {categories.map((tag) => (
              <span
                key={tag}
                className={`syntax-tag border ${
                  tagColors[tag.toLowerCase()] ||
                  "bg-muted text-muted-foreground border-border"
                }`}
              >
                {tag}
              </span>
            ))}
          </div> */}

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white leading-tight">
            {post.title}
          </h1>

          {/* {/* Meta *  /} */}
          <div className="flex flex-col gap-4  text-[#7b899d] mb-12 pb-8 border-b border-[#2d323c]">
            <div className="flex items-center gap-6 text-sm">
            <span className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              {formatDate(post.created_at)}
            </span>
            <span className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              {post.read_time}
            </span>
          </div>
          <div className="flex items-center gap-2"> 
          <Image
            src="/avatar.jpg"
            alt="Author Avatar"
            width={30}
            height={30}
            className="rounded-full"
          />
          <h2 className=" font-mono">Adebayo Adedeji</h2>
          </div>
          </div>
          {/* Content */}
          {/* <div className="prose prose-invert text-[#7b899d] max-w-none"> */}
            {/* {post.content} */}
            {/* {renderContent(post.content)} */}
          {/* </div> */
          <div 
      className="prose prose-invert max-w-none  text-[#7b899d]
                 prose-img:rounded-xl prose-img:border prose-img:border-[#2d323c]
                 prose-headings:text-white prose-a:text-[#00e6ff]"
      dangerouslySetInnerHTML={{ __html: htmlContent }} 
    />}
        </article>
      </main>

      {/* <Footer /> */}
    </div>
    </>
  );
}
