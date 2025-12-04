"use client";

import { Card, CardHeader, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { useSearchParams } from "next/navigation";

export function VerifyContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? "your";

  return (
    <Card className="w-full max-w-lg mx-auto mt-20">
      <CardHeader>
        <CardTitle>Verify Your Email</CardTitle>
        <CardDescription>
          Please check your email for the verification link.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>
          A verification email has been sent to your <strong>{email}</strong> address.
          Click the link in the email to verify your account.
        </p>
      </CardContent>
    </Card>
  );
}
