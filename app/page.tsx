"use client";

import { useQuery } from "@tanstack/react-query";
import ArticleCard from "../components/ui/ArticleCard";
import type { Articles } from "./types/type";

import SkeletonPage from "@/components/ui/skeleton-page";


export default function Home() {
  const { data: articles, isLoading } = useQuery({
    queryKey: ["articles"],
    queryFn: async () => {
      const res = await fetch("/api/articles");
      return res.json();
    },
  });

  if(isLoading) {
    return <SkeletonPage />;
  } else {

    
    
  return (
    <div className="flex min-h-screen justify-center bg-zinc-50 dark:bg-black0 px-6 sm:px-6 lg:px-8">
      <main className="font-sans flex w-full max-w-5xl flex-col items-center sm:items-start py-24">

        {/* --- Présentation --- */}
        <section className="mb-16 text-center sm:text-left">
          <h1 className="font-serif text-4xl font-bold text-black dark:text-white mb-4 px-6 sm:px-6 lg:px-8">
            Bienvenue sur mon blog
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl">
            Découvrez mes tutoriels, conseils et articles tech. 🚀
          </p>
        </section>

        {/* --- 🔥 Derniers articles --- */}
        <section className="mb-20  sm:w-full">
          <h2 className="font-serif text-2xl font-semibold text-black dark:text-white mb-6">
            Derniers articles
          </h2>

          <div className="grid grid-cols-1 gap-8">
            {articles?.map((article: Articles) => (
              <ArticleCard key={article.id} {...article} />
            ))}
          </div>
        </section>

        {/* --- 🔥 Articles populaires --- */}
        <section className="w-full">
          <h2 className="font-serif text-2xl font-semibold text-black dark:text-white mb-6">
            Articles populaires
          </h2>

          <div className="grid grid-cols-1 gap-8">
            {articles
              ?.sort((a, b) => b.vues - a.vues)
              .slice(0, 3)
              .map((article: Articles) => (
                <ArticleCard key={article.id} {...article} />
              ))}
          </div>
        </section>

      </main>
    </div>
  );
}
}
