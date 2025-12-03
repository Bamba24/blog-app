"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function ArticlePageSkeleton() {
  return (
    <div className="flex min-h-screen justify-center bg-zinc-50 dark:bg-black">
      <main className="flex w-full max-w-5xl justify-between flex-col lg:flex-row py-16 gap-12">

        {/* --- Colonne principale --- */}
        <div className="flex-1 space-y-6">
          {/* Titre */}
          <Skeleton className="h-10 w-3/4" />

          {/* Infos (readTime / vues) */}
          <div className="flex items-center gap-4">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-20" />
          </div>

          {/* Image */}
          <Skeleton className="w-full h-64 rounded-lg" />

          {/* Contenu markdown */}
          <div className="space-y-4 mt-6">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/6" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>

          {/* Tags */}
          <div className="flex gap-3 mt-8">
            <Skeleton className="h-7 w-16 rounded-full" />
            <Skeleton className="h-7 w-20 rounded-full" />
            <Skeleton className="h-7 w-12 rounded-full" />
          </div>
        </div>

        {/* --- Sidebar droite --- */}
        <aside className="hidden lg:flex flex-col w-64 shrink-0 gap-6">
          {/* Titre catégories */}
          <Skeleton className="h-6 w-32" />

          {/* Liste catégories */}
          <div className="space-y-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-4 w-24" />
            ))}
          </div>
        </aside>
      </main>
    </div>
  );
}
