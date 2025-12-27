import { supabase } from "@/utils/supabase";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft,Calendar,Clock } from "lucide-react";
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
const authorSchema = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  'headline': post.title,
  'author': {
    '@type': 'Person',
    'name': 'Adebayo Adedeji',
    'url': 'https://theebayo.name.ng', // Very important!
    'sameAs': [
      'https://twitter.com/theebayo',
      'https://github.com/Adebayo-jzs',
      'https://linkedin.com/in/theebayo'
    ]
  }
};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `/blog/${post.slug}`,
      type: "article",
      publishedTime: post.date,
      authors: ['Adebayo Adedeji','Adedeji Adebayo', 'Theebayo'],
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
const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://yourdomain.com' },
      { '@type': 'ListItem', 'position': 2, 'name': 'Blog', 'item': 'https://yourdomain.com/blog' },
      { '@type': 'ListItem', 'position': 3, 'name': params.slug, 'item': `https://yourdomain.com/blog/${params.slug}` }
    ],
  };
  return (
    // <article className="mx-auto max-w-3xl py-10">
    //   <h1 className="text-3xl font-bold">{post.title}</h1>
    //   <span className="text-sm text-zinc-500 dark:text-zinc-400">{post.created_at}</span>
    //   <div className="mt-6">{post.content}</div>
    // </article>
    <>
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
            className="inline-flex items-center gap-2 text-[#7b899d] hover:text-primary transition-colors mb-8 font-mono text-sm"
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

          {/* Meta */}
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
          <div className="prose prose-invert text-[#7b899d] max-w-none">
            {post.content}
            {/* {renderContent(post.content)} */}
          </div>
        </article>
      </main>

      {/* <Footer /> */}
    </div>
    </>
  );
}
