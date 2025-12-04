"use client"

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {toast} from 'sonner';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';


export  function ForgetPasswordForm() {
  
   const router = useRouter();

   // 2. Define a submit handler.
    async function  onSubmit(formdata: FormData) {

      const email = formdata.get('email') as string

      
       await authClient.requestPasswordReset({
        email: email,
        redirectTo:"/auth/reset-password"
       }, {
        onSuccess:  ()=> {
          router.push(`/auth/verify?email=${email}`);
          router.refresh();
          toast.success("Password reset email sent! Please check your inbox.");
        }, 
        onError: (error)=>{
          toast.error(error.error.message);
        }
       })
     
    }
  
  return (
    <form action={onSubmit}>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email </Label>
          <p></p>
          <Input id="email" type="email" name='email' required placeholder="Enter your email" />
        </div>
        <Button variant='outline' className="w-full mt-4">Reset Password</Button>
      </div>
    </form>
  )
}
