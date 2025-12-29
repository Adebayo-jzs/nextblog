"use client"
import PostCard from "../components/PostCard";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/client";

export default function AllPosts() {
    const supabase = createClient()
      const [posts, setPosts] = useState([]);
      const [loading, setLoading] = useState(true);
    
      useEffect(() => {
        const fetchPosts = async () => {
          const { data } = await supabase
            .from("posts")
            .select("*")
            .eq("published", true)
            .order("created_at", { ascending: false })
            // .limit(6);
    
          setPosts(data || []);
          setLoading(false);
        };
    
        fetchPosts();
      }, []);
    
      const formatDate = (string) => {
        return new Date(string).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
      };
    return(
        <section id="allposts" className="py-20 lg:px-30">
      <div className="container mx-auto px-6">
        {/* Section header */}
        <div className="flex items-center gap-3 mb-12">
          <span className="font-mono text-[#00e6ff] text-sm">##</span>
          <h2 className="text-2xl text-white font-bold">All Posts</h2>
          <div className="flex-1 h-px bg-[#2d323c] ml-4" />
        </div>

        {/* Posts grid */}
        {loading ? (
          <div className="text-center py-12 text-[#7b899d]">
            Loading posts...
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-12 text-[#7b899d]">
            No posts yet. Check back soon!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {posts.map((post, index) => (
              <div
                key={post.id}
                className="opacity-100 "
              >
                <PostCard
                  title={post.title}
                  excerpt={post.excerpt}
                  date={formatDate(post.created_at)}
                  readTime={post.read_time}
                  tags={[post.category]}
                  // tags={post.tags}
                  slug={post.slug}
                />
              </div>
            ))}
          </div>
        )}

         
      </div>
    </section>
    );
}