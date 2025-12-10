import type { Metadata } from "next";
import { SignUpForm } from "./signUp-Form";
import { CardHeader, CardTitle, CardDescription, CardContent, Card, CardFooter } from "@/components/ui/card";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Inscription - MyApp",
  description: "Créez un nouveau compte sur MyApp et rejoignez-nous dès aujourd'hui.",
  keywords: ["signup", "register", "inscription", "MyApp"],
  openGraph: {
    title: "Inscription - MyApp",
    description: "Créez un nouveau compte sur MyApp et rejoignez-nous dès aujourd'hui.",
    url: "https://myapp.com/auth/signup",
    type: "website",
    siteName: "MyApp",
  },
  twitter: {
    card: "summary_large_image",
    title: "Inscription - MyApp",
    description: "Créez un nouveau compte sur MyApp et rejoignez-nous dès aujourd'hui.",
    images: ["/images/logo_blog.png"], // tu peux mettre ton logo ou image de branding
  },
};

export default function SignUpPage() {
  return (
    <Card className="w-full max-w-lg mx-auto mt-20">
      <CardHeader>
        <CardTitle>Create an Account</CardTitle>
        <CardDescription>Join us today!</CardDescription>
      </CardHeader>
      <CardContent>
        <SignUpForm />
      </CardContent>
      <CardFooter>
        <p>Do you have any account ?</p>
        <Link href="/auth/signIn" className="text-muted-foreground hover:underline ml-2">
          Sign In
        </Link>
      </CardFooter>
    </Card>
  );
}
