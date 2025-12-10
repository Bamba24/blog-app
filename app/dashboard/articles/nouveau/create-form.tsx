"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Image from "next/image";
import type { Categories } from "@/app/types/type";

import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  titre: z.string().min(5, "Ajouter un titre valide"),
  slug: z.string().min(3, "Ajouter un slug valide"),
  description: z.string().min(50, "La description doit faire au moins 50 caractères"),
  readTime: z.string(),
  imageUrl: z.string().url(),
  contenus: z.string().min(100, "Le contenu doit faire au moins 100 caractères"),
  tags: z.string().min(3, "Ajouter au moins un tag"),
  idCategory: z.string().min(1, "Sélectionner une catégorie"),
  auteurId: z.string().min(1, "Auteur requis"),
});

export function CreateArticleForm({ id }: { id: string }) {
  const [uploading, setUploading] = useState(false);
  const router = useRouter();


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      titre: "Titre de l'article",
      slug: "",
      description: "description de l'article",
      readTime: "5 min",
      contenus: "Contenus de l'article",
      tags: "Les tags de l'article",
      imageUrl: "",
      auteurId: id,
      idCategory: "",
    },
  });


    // function slugify(text: string) {
    //   return text
    //     .toLowerCase()
    //     .trim()
    //     .split(" ")     // Sépare chaque mot
    //     .join("-");     // Remplace les espaces par des tirets
    // }

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


    const { data: categories } = useQuery({
      queryKey: ["categories"],
      queryFn: async () => {
        const res = await fetch("/api/categories");
        if (!res.ok) throw new Error("Erreur");
        return res.json();
      }
    });

    
    // 🚀 Mutation TanStack Query
    const mutation = useMutation({
      mutationFn: async (values: z.infer<typeof formSchema>) => {
        const res = await fetch("/api/articles", {
        method: "POST",
        body: JSON.stringify(values),
      });
      
      if (!res.ok) throw new Error("Erreur lors de la création de l’article");
      
      return res.json();
    },
    onSuccess() {
      toast.success("Article créé avec succès !");
      router.push("/dashboard/articles");
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
                 onChange={(e) => {
                    const value = e.target.value;
                    field.onChange(value);

                    // 🔥 Générer automatiquement le slug
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
          name="readTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Temps de lecture</FormLabel>
              <FormControl>
                <Input placeholder="5 min" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="contenus"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contenus de l&apos;article</FormLabel>
              <FormControl>
                <textarea
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
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Les tags de l&apos;article</FormLabel>
              <FormControl>
                <Input placeholder="tags" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />


        <FormField
          control={form.control}
          name="idCategory"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Catégorie</FormLabel>
              <FormControl>
                <select {...field} className="border rounded p-2 w-full">
                  <option value="">-- Choisir une catégorie --</option>
                  {categories?.map((cat: Categories) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.titre}
                    </option>
                  ))}
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
       />


        <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
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
