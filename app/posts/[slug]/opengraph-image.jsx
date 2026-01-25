import { createClient } from "@supabase/supabase-js";
import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Theebayo Blog Post";
export const size = {
    width: 1200,
    height: 630,
};

export const contentType = "image/png";

export default async function OgImage({ params }) {
    const { slug } = await params;

    // Initialize Supabase client
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );

    // Fetch post title
    const { data: post } = await supabase
        .from("posts")
        .select("title")
        .eq("slug", slug)
        .single();

    const title = post?.title || slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

    return new ImageResponse(
        (
            <div
                style={{
                    fontSize: 64,
                    background: "#0e1216",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center", // Center horizontally
                    justifyContent: "center", // Center vertically
                    color: "white",
                    fontFamily: 'sans-serif',
                    position: 'relative',
                }}
            >
                {/* Background noise or pattern could go here */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.1, backgroundImage: 'radial-gradient(circle at 25px 25px, white 2%, transparent 0%)', backgroundSize: '50px 50px' }}></div>

                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 40 }}>
                    {/* Avatar or Logo */}
                    <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'linear-gradient(to bottom right, #00C6FF, #00E5FF)', marginRight: 20 }}></div>
                    <span style={{ fontSize: 40, fontWeight: 'bold', background: 'linear-gradient(to right, #fff, #bbb)', backgroundClip: 'text', color: 'transparent' }}>Theebayo Blog</span>
                </div>

                <div style={{ textAlign: 'center', padding: '0 60px', lineHeight: 1.2, fontWeight: 900, fontSize: 80, backgroundImage: 'linear-gradient(to bottom, #ffffff, #888888)', backgroundClip: 'text', color: 'transparent' }}>
                    {title}
                </div>

                <div style={{ marginTop: 40, fontSize: 32, color: '#888', display: 'flex', gap: 20 }}>
                    <span>Software Engineering</span>
                    <span>•</span>
                    <span>Web Development</span>
                </div>
            </div>
        ),
        {
            ...size,
        }
    );
}
