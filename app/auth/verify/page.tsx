import type { Metadata } from "next";
import { Suspense } from "react";
import { VerifyContent } from "./VerifyContent";

export const metadata: Metadata = {
  title: "Vérification du compte - MyApp",
  description: "Vérifiez votre compte MyApp pour continuer.",
  keywords: ["vérification compte", "verify account", "MyApp", "authentification"],
  openGraph: {
    title: "Vérification du compte - MyApp",
    description: "Vérifiez votre compte MyApp pour continuer.",
    url: "https://myapp.com/auth/verify",
    type: "website",
    siteName: "MyApp",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vérification du compte - MyApp",
    description: "Vérifiez votre compte MyApp pour continuer.",
    images: ["/images/logo_blog.png"],
  },
};

export default function VerifyPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyContent />
    </Suspense>
  );
}
