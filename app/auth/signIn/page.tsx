import type { Metadata } from 'next';
import { SignInForm } from "./signIn-Form";
import {CardHeader, CardTitle, CardDescription, CardContent, Card, CardFooter} from "@/components/ui/card"
import Link from 'next/link';


export const metadata: Metadata = {
  title: 'Sign In - MyApp',
  description: 'Create a new account on MyApp.',
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
        <Link href="/auth/signUp" className="text-muted-foreground hover:underline ml-2">Sign Up</Link>
      </CardFooter>
    </Card>
  );
}