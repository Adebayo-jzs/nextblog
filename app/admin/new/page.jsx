"use client";
import { useState } from "react";
import { supabase } from "@/utils/supabase";
import { useRouter } from "next/navigation";

export default function NewPostPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("");
  const [read_time, setReadTime] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateSlug = (value) =>
    value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.from("posts").insert([
      {
        title,
        slug: slug || generateSlug(title),
        excerpt,
        category,
        read_time,
        content,
      },
    ]).select();

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    router.push("/blog");
  }

  return (
    <div className="mx-auto max-w-3xl py-10">
      <h1 className="text-2xl font-bold mb-6">New Blog Post</h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}

        <div>
          <label className="block text-sm font-medium">Title</label>
          <input
            className="w-full border rounded px-3 py-2"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setSlug(generateSlug(e.target.value));
            }}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Slug</label>
          <input
            className="w-full border rounded px-3 py-2"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Excerpt</label>
          <textarea
            className="w-full border rounded px-3 py-2"
            rows={3}
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
        <label className="block text-sm font-medium">Category</label>
        <input
            className="w-full border rounded px-3 py-2"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="React, TypeScript, etc."
            required
        />
        </div>

        <div className="space-y-2">
            <label className="block text-sm font-medium">Read Time</label>
            <input
                className="w-full border rounded px-3 py-2"
                value={read_time}
                onChange={(e) => setReadTime(e.target.value)}
                placeholder="5 min read"
                required
            />
            </div>
        </div>
        <div>
          <label className="block text-sm font-medium">Content</label>
          <textarea
            className="w-full border rounded px-3 py-2"
            rows={10}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>

        <button
          disabled={loading}
          className="bg-black text-white px-5 py-2 rounded disabled:opacity-50"
        >
          {loading ? "Publishing..." : "Publish Post"}
        </button>
      </form>
    </div>
  );
}


 