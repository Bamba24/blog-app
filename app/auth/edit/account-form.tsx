"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Form,FormControl,FormField,FormItem,FormLabel,FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation"
import { toast } from "sonner";
import {Button} from "@/components/ui/button";
import { authClient } from "@/lib/auth-client"


const formSchema = z.object({
 name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  image: z.string().url().optional(),
})

export  function AccountForm (props: {defaultValues: z.infer<typeof formSchema>}) {

  const router = useRouter();
  
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: props.defaultValues,
  })
  const {isSubmitting} = form.formState;
  
  // 2. Define a submit handler.
  async function  onSubmit(values: z.infer<typeof formSchema>) {
    
     await authClient.updateUser({
      name: values.name,
      image: values.image,

     }, {
      onSuccess:  ()=> {
        router.push('/auth');
        router.refresh();
        toast.success("Profile updated successfully.");
      }, 
      onError: (error)=>{
        toast.error(error.error.message);
      }
     })
   
  }


  return (
      
    <Form {...form} >
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 pt-3  w-full">
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
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <Input  value={field.value ?? ""} {...field} />
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