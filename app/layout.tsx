import { DM_Sans, DM_Serif_Text } from "next/font/google";
import type { Metadata } from "next";
import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";
import { Toaster } from "@/components/ui/sonner";
import { NuqsAdapter } from "nuqs/adapters/react";
import { Providers } from "./providers";
import Script from "next/script";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const dmSerif = DM_Serif_Text({
  subsets: ["latin"],
  variable: "--font-dm-serif",
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mon blog",
  description: "Le blog tech 2025",
  keywords: ["blog", "tech", "Next.js", "SEO"],
  openGraph: {
    title: "Mon blog",
    description: "Le blog tech 2025",
    url: "https://blog-app-sand-tau.vercel.app",
    siteName: "Mon blog",
    images: [
      {
        url: "https://monblog.com/images/logo_blog.png",
        width: 1200,
        height: 630,
        alt: "Mon blog tech",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mon blog",
    description: "Le blog tech 2025",
    images: ["https://monblog.com/images/logo_blog.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${dmSans.variable} ${dmSerif.variable}`}>
      <head>
        <link
          rel="shortcut icon"
          href="/images/logo_blog.png"
          type="image/x-icon"
        />
      </head>
      <body>
        <NuqsAdapter>
          <Providers>
            <Header />
            {children}
            <Footer />
          </Providers>
          <Toaster />
        </NuqsAdapter>

        {/* JSON-LD Schema pour Google */}
        <Script id="json-ld" type="application/ld+json" strategy="afterInteractive">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Blog",
              "name": "Mon blog",
              "url": "https://monblog.com",
              "description": "Le blog tech 2025",
              "publisher": {
                "@type": "Organization",
                "name": "Mon blog",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://monblog.com/images/logo_blog.png"
                }
              }
            }
          `}
        </Script>
      </body>
    </html>
  );
}
