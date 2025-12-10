import type { Metadata } from "next";
import { Suspense } from "react";
import ResetPasswordForm from "./ResetPasswordForm";

export const metadata: Metadata = {
  title: "Réinitialiser le mot de passe - MyApp",
  description: "Réinitialisez votre mot de passe pour accéder à votre compte MyApp.",
  keywords: ["reset password", "réinitialiser mot de passe", "MyApp", "connexion"],
  openGraph: {
    title: "Réinitialiser le mot de passe - MyApp",
    description: "Réinitialisez votre mot de passe pour accéder à votre compte MyApp.",
    url: "https://myapp.com/auth/reset-password",
    type: "website",
    siteName: "MyApp",
  },
  twitter: {
    card: "summary_large_image",
    title: "Réinitialiser le mot de passe - MyApp",
    description: "Réinitialisez votre mot de passe pour accéder à votre compte MyApp.",
    images: ["/images/logo_blog.png"],
  },
};

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<p>Chargement...</p>}>
      <ResetPasswordForm />
    </Suspense>
  );
}
