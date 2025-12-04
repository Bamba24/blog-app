"use client"

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { authClient } from '@/lib/auth-client';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';

export default function ResetPasswordForm() {
    
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get('token'); 

    async function onSubmit(formData: FormData) { 
        const password = formData.get('password') as string;

        if (!token) {
            toast.error("Invalid or missing reset token. Please request a new link.");
            return;
        }

        if (!password || password.length < 6) {
            toast.error("Password must be at least 6 characters long.");
            return;
        }

        await authClient.resetPassword({
            newPassword: password,
            token: token,
        }, {
            onSuccess:  ()=> {
                router.push(`/auth/signIn`);
                router.refresh();
                toast.success("Password reset successful! You can now log in with your new password.");
            }, 
            onError: (error)=>{
                toast.error(error.error.message);
            }
        })
    }
    
    return (
        <Card className="w-full max-w-sm mx-auto mt-20">
            <CardHeader>
                <CardTitle>Reset Your Password</CardTitle>
                <CardDescription>Enter your new secure password.</CardDescription>
            </CardHeader>
            <CardContent>
                <form action={onSubmit}>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="password">New Password</Label>
                            <Input 
                                id="password" 
                                type="password" 
                                name="password" 
                                placeholder="Enter your new password" 
                                required 
                            />
                        </div>
                        <Button type="submit" className="w-full mt-4">Set New Password</Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
