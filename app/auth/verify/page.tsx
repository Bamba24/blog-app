"use client";

import { Card, CardHeader, CardContent, CardFooter, CardDescription, CardTitle } from "@/components/ui/card";
import  {useSearchParams} from 'next/navigation';

export default function VerifyPage() {

  const searchParams = useSearchParams();
  const email = searchParams.get("email") as string


  return (
    <Card className="w-full max-w-lg mx-auto mt-20">
      <CardHeader>
        <CardTitle>Verify Your Email</CardTitle>
        <CardDescription>Please check your email for the verification link.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>A verification email has been sent to your {email} address. Click the link in the email to verify your account.</p>
      </CardContent>
    </Card>
  );
}