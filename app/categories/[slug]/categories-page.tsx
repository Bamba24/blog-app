"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import ArticleCard from "@/components/ui/ArticleCard";
import type { Categories } from "@/app/types/type";
import CategoriesPageSkeleton from "@/components/ui/skeleton-ctategories"
import NotFound from "./not-found";


export  function CategoriesPage({slug}: {slug: string}) {


  const { data: categories, isLoading, error } = useQuery<Categories>({
    queryKey: ["categories", slug],
    queryFn: async () => {
      const res = await fetch(`/api/categories/slug/${slug}`);
      if (!res.ok) throw new Error("Catégorie introuvable");
      return res.json();
    },
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <CategoriesPageSkeleton />
    );
  }

  if (!categories || error) {
    return (
       NotFound()
    );
  }

  return (
    <div className="flex min-h-screen justify-center bg-zinc-50 dark:bg-black font-sans">
      <main className="flex w-full max-w-5xl flex-col py-16">
        {/* --- Header Catégorie --- */}
        <div className="flex flex-col justify-between sm:flex-row items-center gap-8 mb-12 ">
         
          <div>
            <h1 className="text-4xl font-bold mb-2">{categories.titre}</h1>
            <p className="text-zinc-600 max-w-2xl">
              {categories.description}
            </p>
          </div>
           {/* <Image
            src={categories.image}
            alt={categories.titre}
            width={160}
            height={160}
            className="rounded-xl border border-zinc-200 dark:border-zinc-800"
          /> */}
          <span className="font-serif hidden sm:flex flex-col gap-2 text-3xl font-bold text-center">
            {categories.articles.length} 
            <span>Articles</span>
          </span>
        </div>

        {/* --- Liste des articles --- */}
        <section>
          <div className="grid grid-cols-1 gap-8">
            {categories.articles.map((article) => (
              <Link key={article.id} href={`/articles/${article.slug}`}>
                <ArticleCard
                  titre={article.titre}
                  description={article.description || ""}
                  readTime={article.readTime}
                  vues={article.vues}
                  tags={article.tags}
                  imageUrl={article.imageUrl}
                  slug={article.slug}
                />
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
