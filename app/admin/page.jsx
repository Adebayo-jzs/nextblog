"use client"
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, Edit, Trash2 } from "lucide-react";

import { supabase } from "@/utils/supabase";
 
export default async function Admin() {
//   const { user, isAdmin, loading } = useAuth();
//   const navigate = useNavigate();
//   const { toast } = useToast();
  
  const [isEditing, setIsEditing] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    category: "",
    read_time: "",
    published: false,
  });

   

//   const fetchPosts = async () => {
//     const { data, error } = await supabase
//       .from("posts")
//       .select("*")
//       .order("created_at", { ascending: false });

//     if (error) {
//       toast({ variant: "destructive", title: "Error loading posts" });
//     } else {
//       setPosts(data || []);
//     }
//   };
const {data: posts = []} = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });
    
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
//   const generateSlug = (title) => {
//     return title
//       .toLowerCase()
//       .replace(/[^a-z0-9\s-]/g, "")
//       .replace(/\s+/g, "-")
//       .slice(0, 100);
//   };

//   const handleTitleChange = (title) => {
//     setFormData((prev) => ({
//       ...prev,
//       title,
//       slug: editingPost ? prev.slug : generateSlug(title),
//     }));
//   };

//   const resetForm = () => {
//     setFormData({
//       title: "",
//       slug: "",
//       excerpt: "",
//       content: "",
//       category: "",
//       read_time: "",
//       published: false,
//     });
//     setEditingPost(null);
//     setIsEditing(false);
//   };

//   const handleEdit = (post) => {
//     setEditingPost(post);
//     setFormData({
//       title: post.title,
//       slug: post.slug,
//       excerpt: post.excerpt,
//       content: post.content,
//       category: post.category,
//       read_time: post.read_time,
//       published: post.published,
//     });
//     setIsEditing(true);
//   };

//   const handleDelete = async (id) => {
//     if (!confirm("Are you sure you want to delete this post?")) return;

//     const { error } = await supabase.from("posts").delete().eq("id", id);

//     if (error) {
//       toast({ variant: "destructive", title: "Error deleting post" });
//     } else {
//       toast({ title: "Post deleted" });
//       fetchPosts();
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     const validation = postSchema.safeParse(formData);
//     if (!validation.success) {
//       toast({
//         variant: "destructive",
//         title: "Validation Error",
//         description: validation.error.errors[0].message,
//       });
//       setIsSubmitting(false);
//       return;
//     }

//     if (editingPost) {
//       const { error } = await supabase
//         .from("posts")
//         .update(formData)
//         .eq("id", editingPost.id);

//       if (error) {
//         toast({ variant: "destructive", title: "Error updating post", description: error.message });
//       } else {
//         toast({ title: "Post updated" });
//         resetForm();
//         fetchPosts();
//       }
//     } else {
//       const { error } = await supabase.from("posts").insert({
//         ...formData,
//         author_id: user?.id,
//       });

//       if (error) {
//         toast({ variant: "destructive", title: "Error creating post", description: error.message });
//       } else {
//         toast({ title: "Post created" });
//         resetForm();
//         fetchPosts();
//       }
//     }

//     setIsSubmitting(false);
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-muted-foreground">Loading...</div>
//       </div>
//     );
//   }

  return (
    <div className="min-h-screen">
      <div className="noise-overlay" />
      {/* <Header /> */}

      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6 max-w-4xl">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 font-mono text-sm"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </a>

          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                <Plus className="h-4 w-4" />
                New Post
              </button>
            )}
          </div>

          {isEditing ? (
            <div className="bg-card border border-border rounded-xl p-6">
              <h2 className="text-xl font-bold mb-6">
                {editingPost ? "Edit Post" : "Create New Post"}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="title" className="block text-sm font-medium">Title</label>
                    <input
                      id="title"
                      type="text"
                      value={formData.title}
                      onChange={(e) => handleTitleChange(e.target.value)}
                      placeholder="My Awesome Post"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="slug" className="block text-sm font-medium">Slug</label>
                    <input
                      id="slug"
                      type="text"
                      value={formData.slug}
                      onChange={(e) =>
                        setFormData({ ...formData, slug: e.target.value })
                      }
                      placeholder="my-awesome-post"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="category" className="block text-sm font-medium">Category</label>
                    <input
                      id="category"
                      type="text"
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value })
                      }
                      placeholder="React, TypeScript, etc."
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="read_time" className="block text-sm font-medium">Read Time</label>
                    <input
                      id="read_time"
                      type="text"
                      value={formData.read_time}
                      onChange={(e) =>
                        setFormData({ ...formData, read_time: e.target.value })
                      }
                      placeholder="5 min read"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="excerpt" className="block text-sm font-medium">Excerpt</label>
                  <textarea
                    id="excerpt"
                    value={formData.excerpt}
                    onChange={(e) =>
                      setFormData({ ...formData, excerpt: e.target.value })
                    }
                    placeholder="A brief summary of the post..."
                    rows={2}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="content" className="block text-sm font-medium">Content (Markdown)</label>
                  <textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) =>
                      setFormData({ ...formData, content: e.target.value })
                    }
                    placeholder="Write your post content here..."
                    rows={15}
                    className="font-mono text-sm w-full px-3 py-2 border border-gray-300 rounded"
                    required
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input
                    id="published"
                    type="checkbox"
                    checked={formData.published}
                    onChange={(e) =>
                      setFormData({ ...formData, published: e.target.checked })
                    }
                    className="w-4 h-4"
                  />
                  <label htmlFor="published" className="text-sm font-medium">Published</label>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                  >
                    {isSubmitting
                      ? "Saving..."
                      : editingPost
                      ? "Update Post"
                      : "Create Post"}
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="space-y-4">
              {posts.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  No posts yet. Create your first post!
                </div>
              ) : (
                posts.map((post) => (
                  <div
                    key={post.id}
                    className="bg-card border border-border rounded-lg p-4 flex items-center justify-between"
                  >
                    <div>
                      <h3 className="font-semibold">{post.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {post.category} • {post.read_time} •{" "}
                        {post.published ? (
                          <span className="text-accent">Published</span>
                        ) : (
                          <span className="text-syntax-orange">Draft</span>
                        )}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(post)}
                        className="p-2 hover:bg-gray-100 rounded"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="p-2 hover:bg-gray-100 rounded text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </main>

      {/* <Footer /> */}
    </div>
  );
};

// export default Admin;
