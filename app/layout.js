import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import { Analytics } from "@vercel/analytics/next"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL('https://blog.theebayo.name.ng'),
  title: {
    default: 'Theebayo Blog',
    template: '%s | Adebayo Blog', // Adds suffix to sub-pages
  },
  description: 'Sharing insights on Next.js and Web Development',
  twitter: {
    card: 'summary_large_image',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      <div className="min-h-screen">
        {/* <div className="noise-overlay" /> */}
          <Header/>
          <main className="mt-16" >
            {children}
          </main>
        {/* </div> */}
      </div>
      <Analytics />
      </body>
    </html>
  );
}
