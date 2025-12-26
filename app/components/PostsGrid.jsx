"use client"
import { useEffect, useState } from "react";
import PostCard from "./PostCard";
import { supabase } from "@/utils/supabase";

 

const PostsGrid = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await supabase
        .from("posts")
        .select("*")
        .eq("published", true)
        .order("created_at", { ascending: false })
        .limit(6);

      setPosts(data || []);
      setLoading(false);
    };

    fetchPosts();
  }, []);

  // const formatDate = (string) => {
  //   return new Date(dateString).toLocaleDateString("en-US", {
  //     year: "numeric",
  //     month: "long",
  //     day: "numeric",
  //   });
  // };

  return (
    <section id="posts" className="py-20">
      <div className="container mx-auto px-6">
        {/* Section header */}
        <div className="flex items-center gap-3 mb-12">
          <span className="font-mono text-primary text-sm">01.</span>
          <h2 className="text-2xl font-bold">Latest Posts</h2>
          <div className="flex-1 h-px bg-border ml-4" />
        </div>

        {/* Posts grid */}
        {loading ? (
          <div className="text-center py-12 text-muted-foreground">
            Loading posts...
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            No posts yet. Check back soon!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {posts.map((post, index) => (
              <div
                key={post.id}
                className="opacity-0 animate-fade-up"
                style={{ animationDelay: `${0.1 * index}s` }}
              >
                <PostCard
                  title={post.title}
                  excerpt={post.excerpt}
                  date={formatDate(post.created_at)}
                  readTime={post.read_time}
                  tags={[post.category]}
                  slug={post.slug}
                />
              </div>
            ))}
          </div>
        )}

        {/* View all link */}
        <div className="text-center mt-12">
          <a
            href="/archive"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-mono text-sm"
          >
            <span>view all posts</span>
            <span className="text-primary">→</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default PostsGrid;
