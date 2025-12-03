"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function CategoriesPageSkeleton() {
  return (
    <div className="flex min-h-screen justify-center bg-zinc-50 dark:bg-black font-sans px-6">
      <main className="flex w-full max-w-5xl flex-col py-16">

        {/* --- Header catégorie --- */}
        <div className="flex flex-col justify-between sm:flex-row items-center gap-8 mb-12">
          
          <div className="flex flex-col gap-4 w-full max-w-xl">
            <Skeleton className="h-8 w-48 rounded-lg" />
            <Skeleton className="h-4 w-full rounded-lg" />
            <Skeleton className="h-4 w-2/3 rounded-lg" />
          </div>

          <Skeleton className="w-40 h-40 rounded-xl" />
        </div>

        {/* --- Liste des articles --- */}
        <section className="grid grid-cols-1 gap-8">

          {[1, 2, 3].map((i) => (
            <Skeleton
              key={i}
              className="w-full h-44 rounded-xl"
            />
          ))}

        </section>
      </main>
    </div>
  );
}
