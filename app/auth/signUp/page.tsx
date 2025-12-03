import type { Metadata } from 'next';
import { SignUpForm } from './signUp-Form';
import {CardHeader, CardTitle, CardDescription, CardContent, Card, CardFooter, CardAction} from "@/components/ui/card"
import Link from 'next/link';


export const metadata: Metadata = {
  title: 'Sign Up - MyApp',
  description: 'Create a new account on MyApp.',
};

export default function SignUpPage() {
  return (
    <Card className="w-full max-w-lg mx-auto mt-20">
      <CardHeader>
        <CardTitle>Create an Account</CardTitle>
        <CardDescription>Join us today!</CardDescription>
      </CardHeader>
      <CardContent >
        <SignUpForm />
      </CardContent>
      <CardFooter>
        <p>Do you have any account ?</p>
        <Link href="/auth/signIn" className="text-muted-foreground hover:underline ml-2">Sign In Up</Link>
       </CardFooter>
    </Card>
  );
}