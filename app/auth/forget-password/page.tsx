import type { Metadata } from "next";
import { CardHeader, CardTitle, CardDescription, CardContent, Card } from "@/components/ui/card";
import { ForgetPasswordForm } from "./Forget-PasswordForm";

export const metadata: Metadata = {
  title: "Mot de passe oublié - MyApp",
  description: "Réinitialisez votre mot de passe pour accéder à votre compte MyApp.",
  keywords: ["password reset", "mot de passe oublié", "MyApp", "connexion"],
  openGraph: {
    title: "Mot de passe oublié - MyApp",
    description: "Réinitialisez votre mot de passe pour accéder à votre compte MyApp.",
    url: "https://myapp.com/auth/forget-password",
    type: "website",
    siteName: "MyApp",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mot de passe oublié - MyApp",
    description: "Réinitialisez votre mot de passe pour accéder à votre compte MyApp.",
    images: ["/images/logo_blog.png"], // ton logo ou image de branding
  },
};

export default function ForgetPasswordPage() {
  return (
    <Card className="w-full max-w-lg mx-auto mt-20">
      <CardHeader>
        <CardTitle>Mot de passe oublié</CardTitle>
        <CardDescription>Récupérez l&apos;accès à votre compte MyApp</CardDescription>
      </CardHeader>
      <CardContent>
        <ForgetPasswordForm />
      </CardContent>
    </Card>
  );
}
