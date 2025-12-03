"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Form,FormControl,FormField,FormItem,FormLabel,FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { signIn } from "@/lib/auth-client";
import { useRouter } from "next/navigation"
import { toast } from "sonner";
import {Github, User2} from "lucide-react"

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
})

export  function SignInForm () {

  const router = useRouter();
  
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })
  const {isSubmitting} = form.formState;
  
  // 2. Define a submit handler.
  async function  onSubmit(values: z.infer<typeof formSchema>) {
    
     await signIn.email({
      email: values.email,
      password: values.password,

     }, {
      onSuccess:  ()=> {
        router.push('/auth');
        router.refresh();
        toast.success("Signed in successfully.");
      }, 
      onError: (error)=>{
        toast.error(error.error.message);
      }
     })
   
  }

  async  function signInWithGithub(provider: string) {

      await signIn.social({
        provider: provider,
        callbackURL: "/auth",
     }, {
      onSuccess:  ()=> {
        router.push('/profil');
        router.refresh(); 
        toast.success("Signed in successfully with Github.");
      }, 
      onError: (error)=>{
        toast.error(error.error.message);
      }
     })
   
  }
  async  function signInWithGoogle(provider: string) {

      await signIn.social({
        provider: provider,
        callbackURL: "/auth",
     }, {
      onSuccess:  ()=> {
        router.push('/profil');
        router.refresh(); 
        toast.success("Signed in successfully with Google.");
      }, 
      onError: (error)=>{
        toast.error(error.error.message);
      }
     })
   
  }

  return (

    <div className="flex flex-col gap-4 items-center">

    <Form {...form} >
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 py-3  w-full">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="exemple@gmail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>password</FormLabel>
              <FormControl>
                <Input  type="password" placeholder="Your password" {...field} />
              </FormControl>
              <FormMessage />

              <div>
                <a href="/auth/forget-password" className="text-sm text-blue-600 hover:underline">Forgot password?</a>
              </div>
            </FormItem>
          )}
        />
        <Button 
          type="submit" 
          disabled={isSubmitting} // 👈 Désactiver le bouton
          className="w-full mt-4"
        >
          {isSubmitting ? 'Submitting...' : 'Submit'} 
        </Button>
      </form>
    </Form>

     <p className="text-muted-foreground text-xl text-center" >Or</p>

    <div className="flex flex-col gap-4">
       <Button onClick={()=> signInWithGithub("github")} variant="outline" className=" flex justify-center items-center w-full">
          <Github className="mr-2 h-4 w-4" />
          <p>S&apos;authentifier avec Github</p>
       </Button>
       <Button onClick={()=> signInWithGoogle("google")} variant="outline" className=" flex justify-center items-center w-full">
          <User2 className="mr-2 h-4 w-4" />
          <p>S&apos;authentifier avec Google</p>
       </Button>
    </div>
    </div>
  )
}