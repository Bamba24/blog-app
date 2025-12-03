"use client";

import {
  Search,
  Code2,
  Palette,
  FileCode2,
  Atom,
  Boxes,
  Layers,
} from "lucide-react";
import { useQueryState } from "nuqs";
import { useQuery } from "@tanstack/react-query";
import ArticleCard from "../../components/ui/ArticleCard";
import type { Articles } from "../types/type";
import SkeletonArticles from "@/components/ui/skeleton-articles";
import type {Categories} from "@/types/type"

export default function PostsPage() {
  // --- États synchronisés avec l’URL ---
  const [search, setSearch] = useQueryState("q", { defaultValue: "" });
  const [category, setCategory] = useQueryState("cat", { defaultValue: "" });

  // --- TanStack Query récupère les articles ---
  const { data: articles = [], isLoading, error } = useQuery({
    queryKey: ["articles"],
    queryFn: async () => {
      const res = await fetch("/api/articles");

      if (!res.ok) {
        throw new Error("Erreur lors de la récupération des articles");
      }

      return res.json();
    },
  });


  const { data: categories = [] } = useQuery<Categories[]>({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await fetch("/api/categories");

      if (!res.ok) {
        throw new Error("Erreur lors de la récupération des categories");
      }

      return res.json();
    },
  });


  // --- Logique de filtrage ---
  const ArticlesFiltre = articles.filter((article: Articles) => {
    const matchesSearch = article.titre
      .toLowerCase()
      .includes(search.toLowerCase());

    const cat = categories.find((c) => c.id === article.categoryId);
    const matchesCategory = category ? cat?.slug === category : true;
    return matchesSearch && matchesCategory;
  });

  // --- Loading ---
  if (isLoading) {
    return (
     <SkeletonArticles />
    );
  }

  // --- Erreur ---
  if (error) {
    return (
      <div className="h-screen flex items-center justify-center text-red-500">
        Impossible de charger les articles ❌
      </div>
    );
  }

  // --- Rendu ---
  return (
    <div className="flex min-h-screen justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex w-full max-w-5xl flex-col items-center sm:items-start py-24 ">
        {/* --- Titre --- */}
        <section className="mb-12 text-center sm:text-left w-full">
          <h1 className=" font-serif text-4xl font-bold text-black dark:text-white mb-4">
            Tous les articles 
          </h1>
          <p className=" font-sans text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl">
            Retrouvez ici tous mes articles sur le développement web, le design
            et la tech.
          </p>
        </section>

        {/* --- Barre de recherche --- */}
        <section className="w-full mb-8">
          <div className="relative max-w-xl">
            <input
              type="text"
              placeholder="Rechercher un article..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-3 text-sm text-zinc-800 dark:text-zinc-200 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search
              size={18}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-500"
            />
          </div>
        </section>

        {/* --- Catégories --- */}
        <section className="w-full mb-16">
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => {
              const isActive = category === cat.slug;

              return (
                <button
                  key={cat.id}
                  onClick={() => setCategory(isActive ? "" : cat.slug)}

                  className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full border transition cursor-pointer ${
                    isActive
                      ? `bg-gray-700 text-white shadow-md`
                      : "border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  }`}
                >
                  <span>{cat.titre}</span>
                </button>
              );
            })}
          </div>
        </section>

        {/* --- Liste filtrée --- */}
        <section className="w-full mb-20">
          <div className="grid grid-cols-1 gap-8">
            {ArticlesFiltre.length > 0 ? (
              ArticlesFiltre.map((article: Articles) => (
                <ArticleCard key={article.id} {...article} />
              ))
            ) : (
              <p className="text-zinc-600 dark:text-zinc-400">
                Aucun article trouvé pour « {search || category || "votre filtre"} »
              </p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
