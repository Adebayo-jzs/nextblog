"use client"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Assuming Next.js router
// import { useNavigate } from "react-router-dom"; // Use Next.js router for Next.js projects
import { ArrowLeft, Plus, Edit, Trash2 } from "lucide-react";
import Header from "@/components/Header";
 
import { createClient } from "@/lib/client";
// import { useToast } from "@/components/ui/use-toast"; // Assuming a toast component is available
// import { useAuth } from "@/hooks/useAuth"; // Assuming an authentication hook is available
// import { postSchema } from "@/lib/validation"; // Assuming Zod schema for validation

export default function Admin() { // Removed async here, data fetching moved to useEffect
  // const { user, isAdmin, loading: authLoading } = useAuth(); // Uncomment and ensure useAuth is defined
  const supabase = createClient()
  const router = useRouter();
  // const { toast } = useToast(); // Uncomment and ensure useToast is defined

  const [posts, setPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [errorFetchingPosts, setErrorFetchingPosts] = useState(null);

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

  const generateSlug = (value) =>
    value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

  const fetchPosts = async () => {
    setLoadingPosts(true);
    setErrorFetchingPosts(null);
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      // toast({ variant: "destructive", title: "Error loading posts", description: error.message });
      console.error("Error loading posts:", error.message);
      setErrorFetchingPosts("Error loading posts.");
    } else {
      setPosts(data || []);
    }
    setLoadingPosts(false);
  };

  useEffect(() => {
    fetchPosts();
    // if (!authLoading && !isAdmin) { // Uncomment if useAuth is implemented
    //   router.push("/");
    // }
  }, [/* authLoading, isAdmin, router */]); // Add dependencies if useAuth is uncommented

  const handleTitleChange = (title) => {
    setFormData((prev) => ({
      ...prev,
      title,
      slug: editingPost ? prev.slug : generateSlug(title),
    }));
  };

  const resetForm = () => {
    setFormData({
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      category: "",
      read_time: "",
      published: false,
    });
    setEditingPost(null);
    setIsEditing(false);
  };

  const handleEdit = (post) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      category: post.category,
      read_time: post.read_time,
      published: post.published,
    });
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this post?")) return;

    const { error } = await supabase.from("posts").delete().eq("id", id);

    if (error) {
      // toast({ variant: "destructive", title: "Error deleting post", description: error.message });
      console.error("Error deleting post:", error.message);
    } else {
      // toast({ title: "Post deleted" });
      fetchPosts();
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);

    // Uncomment and integrate Zod validation if postSchema is used
    // const validation = postSchema.safeParse(formData);
    // if (!validation.success) {
    //   toast({
    //     variant: "destructive",
    //     title: "Validation Error",
    //     description: validation.error.errors[0].message,
    //   });
    //   setIsSubmitting(false);
    //   return;
    // }

    let error;

    if (editingPost) {
      const { error: updateError } = await supabase
        .from("posts")
        .update({ ...formData, slug: formData.slug || generateSlug(formData.title) }) // Ensure slug is generated if empty on update
        .eq("id", editingPost.id);
      error = updateError;
    } else {
      const { error: insertError } = await supabase.from("posts").insert({
        ...formData,
        slug: formData.slug || generateSlug(formData.title),
        // author_id: user?.id, // Uncomment if useAuth is implemented
      });
      error = insertError;
    }

    setIsSubmitting(false);

    if (error) {
      // toast({ variant: "destructive", title: `Error ${editingPost ? "updating" : "creating"} post`, description: error.message });
      console.error(`Error ${editingPost ? "updating" : "creating"} post:`, error.message);
      return;
    }

    // toast({ title: `Post ${editingPost ? "updated" : "created"}` });
    resetForm();
    fetchPosts();
  }

  // if (authLoading || loadingPosts) { // Uncomment if useAuth is implemented
  if (loadingPosts) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-[#7b899d]">Loading...</div>
      </div>
    );
  }

  // if (errorFetchingPosts) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center">
  //       <div className="text-destructive">{errorFetchingPosts}</div>
  //     </div>
  //   );
  // }

  return (
    <>
    <Header/>

    <div className="min-h-screen">
      <div className="noise-overlay" />
      <Header />

      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6 max-w-4xl font-mono">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-[#7b899d] hover:text-[#00e6ff] transition-colors mb-8 font-mono text-sm"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </a>

          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
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
            <div className="bg-card border border-border rounded-xl p-6 text-white ">
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
                    className="px-4 py-2 border border-gray-300 rounded hover:bg-[#3eff3e]"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="space-y-4">
              {posts.length === 0 ? (
                <div className="text-center py-12 text-[#7b899d]">
                  No posts yet. Create your first post!
                </div>
              ) : (
                posts.map((post) => (
                  <div
                    key={post.id}
                    className="bg-[#171a20] border border-[#2d323c] rounded-lg p-4 flex items-center justify-between"
                  >
                    <div>
                      <h3 className="font-semibold text-white">{post.title}</h3>
                      <p className="text-sm text-[#7b899d]">
                        {post.category} • {post.read_time} •{" "}
                        {post.published ? (
                          <span className="text-accent">Published</span>
                        ) : (
                          <span className="text-[#ff9933]">Draft</span>
                        )}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(post)}
                        className="p-2 hover:bg-[#3eff3e] hover:text-black rounded text-white"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="p-2 hover:bg-[#3eff3e]  rounded text-red-600"
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
    </>
  );
}
