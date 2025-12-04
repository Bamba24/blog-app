import type { Metadata } from 'next';
import {CardHeader, CardTitle, CardDescription, CardContent, Card} from "@/components/ui/card";
import {ForgetPasswordForm} from "./Forget-PasswordForm"


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
        <ForgetPasswordForm />
      </CardContent>
     
    </Card>
  );
}