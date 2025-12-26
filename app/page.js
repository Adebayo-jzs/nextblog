import { supabase } from "@/utils/supabase";
import Link from "next/link";
import PostsGrid from "./components/PostsGrid";
import Hero from "./components/Hero"; 
export default async function Home() {
  const {data: posts} = await supabase
    .from("posts")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false })
    // .limit(5);
  return (
    <>
    <Hero/>
    <PostsGrid/>
    <div className="flex min-h-screen items-center justify-center  font-sans  bg-[#0e1216]">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 sm:items-start">
         <div className="grid grid-col-2 gap-9">
          {posts?.map((post) => (
            <div key={post.id} className="flex flex-col gap-3 rounded-lg border border-zinc-200 bg-white p-6 shadow-md hover:shadow-lg dark:border-zinc-700 dark:bg-zinc-900">
            <Link href={`/post/${post.slug}`}>
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">{post.title}</h2>
              <p className="text-zinc-700 dark:text-zinc-300">{post.excerpt}</p>
              <div className="flex gap-5">
              <span className="text-sm text-zinc-500 dark:text-zinc-400">{new Date(post.created_at).toLocaleDateString()}</span>
              <span className="text-sm text-zinc-500 dark:text-zinc-400">{post.read_time}</span>
              </div>
            </Link>
            </div>
          ))}
         </div>
      </main>
    </div>
    </>
  );
}
