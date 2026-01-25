import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "All Articles | Theebayo Blog";
export const size = {
    width: 1200,
    height: 630,
};

export const contentType = "image/png";

export default async function OGImage() {
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
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontFamily: 'sans-serif',
                    position: 'relative',
                }}
            >
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.1, backgroundImage: 'radial-gradient(circle at 25px 25px, white 2%, transparent 0%)', backgroundSize: '50px 50px' }}></div>

                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 40 }}>
                    <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'linear-gradient(to bottom right, #00C6FF, #00E5FF)', marginRight: 20 }}></div>
                    <span style={{ fontSize: 40, fontWeight: 'bold', background: 'linear-gradient(to right, #fff, #bbb)', backgroundClip: 'text', color: 'transparent' }}>Theebayo Blog</span>
                </div>

                <div style={{ textAlign: 'center', padding: '0 60px', lineHeight: 1.2, fontWeight: 900, fontSize: 80, backgroundImage: 'linear-gradient(to bottom, #ffffff, #888888)', backgroundClip: 'text', color: 'transparent' }}>
                    All Articles
                </div>

                <div style={{ marginTop: 40, fontSize: 32, color: '#888', display: 'flex', gap: 20 }}>
                    <span>Explore my latest thoughts and tutorials</span>
                </div>
            </div>
        ),
        {
            ...size,
        }
    );
}
