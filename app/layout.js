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
  // metadataBase: new URL("https://blog.theebayo.name.ng"),
  title: {
    default: "Theebayo Blog",
    template: "%s | Theebayo Blog",
  },
  description: "Personal blog of Adebayo Adedeji - Software Engineer",
  // openGraph: {
  //   title: "Theebayo Blog",
  //   description: "Personal blog of Adebayo Adedeji - Software Engineer",
  //   url: "https://blog.theebayo.name.ng",
  //   siteName: "Theebayo Blog",
  //   locale: "en_US",
  //   type: "website",
  // },
  // twitter: {
  //   card: "summary_large_image",
  //   title: "Theebayo Blog",
  //   creator: "@theebayo",
  // },
  // robots: {
  //   index: true,
  //   follow: true,
  // },
};



export default function RootLayout({ children }) {
  return (
    <html lang="en">

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="min-h-screen">
          {/* <div className="noise-overlay" /> */}
          <Header />
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
