import type { Metadata } from "next";
import { SignInForm } from "./signIn-Form";
import { CardHeader, CardTitle, CardDescription, CardContent, Card, CardFooter } from "@/components/ui/card";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Connexion - MyApp",
  description: "Connectez-vous à votre compte MyApp.",
  keywords: ["login", "auth", "connexion", "MyApp"],
  openGraph: {
    title: "Connexion - MyApp",
    description: "Connectez-vous à votre compte MyApp.",
    url: "https://myapp.com/auth/signin",
    type: "website",
    siteName: "MyApp",
  },
};

export default function SignInPage() {
  return (
    <Card className="w-full max-w-lg mx-auto mt-20">
      <CardHeader>
        <CardTitle>Login , your welcome</CardTitle>
        <CardDescription>Join us today!</CardDescription>
      </CardHeader>
      <CardContent>
        <SignInForm />
      </CardContent>
      <CardFooter>
        <p>Do you have any account ?</p>
        <Link href="/auth/signUp" className="text-muted-foreground hover:underline ml-2">
          Sign Up
        </Link>
      </CardFooter>
    </Card>
  );
}
