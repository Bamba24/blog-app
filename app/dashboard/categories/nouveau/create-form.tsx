"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import Image from "next/image";

import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  titre: z.string().min(3, "Ajouter un titre valide"),
  slug: z.string().min(3, "Ajouter un slug valide"),
  description: z.string().min(50, "La description doit faire au moins 50 caractères"),
  image: z.string().url(),
});

export function CreateCategorieForm() {
  const router = useRouter();
  const [uploading, setUploading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      titre: "",
      slug: "",
      description: "",
      image: "",
    },
  });


  function slugify(text: string) {
      return text
        .toLowerCase()
        .trim()
        .replace(/[\s\_]+/g, "-")   // remplace espaces et _ par -
        .replace(/[^\w\-]+/g, "")   // supprime les caractères spéciaux
        .replace(/\-\-+/g, "-");    // évite les tirets doubles
  }


  async function uploadImage(file: File) {
    setUploading(true);
    
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setUploading(false);
      return data.secure_url; // URL Cloudinary
    }

  // 🚀 Mutation TanStack Query
  const mutation = useMutation({
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      const res = await fetch("/api/categories", {
        method: "POST",
        body: JSON.stringify(values),
      });

      if (!res.ok) throw new Error("Erreur lors de la création de l’article");

      return res.json();
    },
    onSuccess() {
      toast.success("Article créé avec succès !");
      router.push("/dashboard/posts");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutation.mutate(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        
        <FormField
          control={form.control}
          name="titre"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Titre</FormLabel>
              <FormControl>
                <Input placeholder="Ex: Apprendre Next.js en 2025" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Slug</FormLabel>
              <FormControl>
                <Input
                
                placeholder="nextjs-guide-2025" {...field}
                onChange={(e)=> {
                  const value = slugify(e.target.value);
                  field.onChange(value);

                   form.setValue("slug", slugify(value), { shouldValidate: true });
                }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="Un guide complet pour apprendre Next.js..." {...field} />
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
              <FormLabel>Image URL</FormLabel>
              <FormControl>
               <input
                    type="file"
                    accept="image/*"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;

                      const url = await uploadImage(file);
                      field.onChange(url);
                    }}
                  />
              </FormControl>

              {uploading && <p>Upload en cours...</p>}
              
                  {field.value && (
                    <Image
                    width={100}
                    height={100}
                    alt="Aperçu de l’image"
                    src={field.value}
                    className="w-32 h-32 rounded object-cover mt-2"
                     />
                  )}
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={mutation.isPending} type="submit" className="w-full">
          {mutation.isPending ? "Création..." : "Créer l’article"}
        </Button>
      </form>
    </Form>
  );
}
