import { supabase } from "@/utils/supabase";

export default async function BlogPost({ params }) {
    const {slug} = await params;

    const {data: post, error } = await supabase
        .from("posts")
        .select("*")
        .eq("slug", slug)
        .single();
    if(error || !post){
        return <div>Post not found</div>;
    }

    return (
        <article className="mx-auto max-w-3xl py-10">
            <h1 className="mb-4 text-3xl font-bold">{post.title}</h1>
            <p className="text-zinc-600 dark:text-zinc-400">
                {new Date(post.created_at).toLocaleDateString()}
            </p>

            <div className="prose dark:prose-invert mt-6">
                {post.content}
            </div>
        </article>
    );
}