import { DM_Sans, DM_Serif_Text } from "next/font/google";
import type { Metadata } from "next";
import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";
import { Toaster } from "@/components/ui/sonner";
import {NuqsAdapter} from "nuqs/adapters/react";
import { Providers } from "./providers";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
})

const dmSerif = DM_Serif_Text({
  subsets: ["latin"],
  variable: "--font-dm-serif",
  weight: "400",
  display: "swap",
})


 export const metadata: Metadata = {
  title: "Mon blog",
  description: "Le blog tech 2025",
};

export default function RootLayout({ children}: Readonly<{children: React.ReactNode}>) {

  return (
    <html lang="fr" className={`${dmSans.variable} ${dmSerif.variable}`}>
      <body
      >
        <NuqsAdapter>
           <Providers>
              <Header /> 
               {children}
             <Footer />
           </Providers>
          <Toaster />
        </NuqsAdapter>
      </body>
    </html>
  );
}
