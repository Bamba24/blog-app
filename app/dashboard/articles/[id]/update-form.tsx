"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Image from "next/image";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { Articles } from "@/app/types/type";

const formSchema = z.object({
  titre: z.string().min(5, "Ajouter un titre valide"),
  slug: z.string().min(3, "Ajouter un slug valide"),
  description: z.string().min(50, "La description doit faire au moins 50 caractères"),
  contenus: z.string().min(100, "Le contenu doit faire au moins 100 caractères"),
  readTime: z.string(),
  imageUrl: z.string().url(),
});

export function UpdateArticleForm({id}: {id: string}) {
  const router = useRouter();
  const [uploading, setUploading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      titre: "",
      slug: "",
      description: "",
      contenus: "",
      readTime: "5 min",
      imageUrl: "",
    },
  });


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

  // 1️⃣ Récupération de l'article
  const { data: article, isLoading } = useQuery<Articles | null>({
    queryKey: ["article", id],
    queryFn: async () => {
      if (!id) return null;
      const res = await fetch(`/api/articles/${id}`);
      if (!res.ok) throw new Error("Impossible de récupérer l'article");
      return res.json();
    },
    enabled: !!id,
  });

  // 2️⃣ Remplir le formulaire automatiquement
  useEffect(() => {
    if (article) {
      form.reset({
        titre: article.titre || "",
        slug: article.slug || "",
        description: article.description || "",
        contenus: article.contenus || "",
        readTime: article.readTime || "5 min",
        imageUrl: article.imageUrl || "",
      });
    }
  }, [article, form]);

  // 3️⃣ Mutation pour Update
  const mutation = useMutation({
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      if (!id) throw new Error("ID manquant");

      const res = await fetch(`/api/articles/${id}`, {
        method: "PATCH",
        body: JSON.stringify(values),
      });

      if (!res.ok) throw new Error("Erreur lors de la mise à jour");
      return res.json();
    },
    onSuccess() {
      toast.success("Article mis à jour !");
      router.push("/dashboard/articles");
    },
    onError: (err: Error) => toast.error(err.message),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutation.mutate(values);
  }

  if (isLoading) return <p>Chargement...</p>;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

        <FormField
          control={form.control}
          name="titre"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Titre</FormLabel>
              <FormControl><Input {...field} /></FormControl>
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
              <FormControl><Input {...field} /></FormControl>
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
              <FormControl><Input {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="contenus"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contenus</FormLabel>
              <FormControl><textarea
                    {...field}
                    className="w-full h-96 p-2 border rounded"
                    placeholder="Écris ton article en Markdown ici..."
                  />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="readTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Temps de lecture</FormLabel>
              <FormControl><Input {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
                         control={form.control}
                         name="imageUrl"
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
          {mutation.isPending ? "Mise à jour..." : "Mettre à jour l’article"}
        </Button>

      </form>
    </Form>
  );
}
