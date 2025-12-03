"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Form,FormControl,FormField,FormItem,FormLabel,FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { signUp } from "@/lib/auth-client";
import { useRouter } from "next/navigation"
import { toast } from "sonner";
import {Button} from "@/components/ui/button"
import {Github} from "lucide-react"

const formSchema = z.object({
 name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
})

export  function SignUpForm () {

  const router = useRouter();
  
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })
  const {isSubmitting} = form.formState;
  
  // 2. Define a submit handler.
  async function  onSubmit(values: z.infer<typeof formSchema>) {
    
     await signUp.email({
      name: values.name,
      email: values.email,
      password: values.password,

     }, {
      onSuccess:  ()=> {
        router.push('/auth/signIn');
        toast.success("Account created successfully. Please check your email to verify your account.");
      }, 
      onError: (error)=>{
        toast.error(error.error.message);
      }
     })
   
  }


  return (
    <Form {...form} >
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 py-3  w-full">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>name</FormLabel>
              <FormControl>
                <Input placeholder="name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
  )
}