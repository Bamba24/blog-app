import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonArticles() {
  return (
    <div className="flex min-h-screen justify-center bg-zinc-50 dark:bg-black">
      <main className="flex w-full max-w-5xl flex-col items-center sm:items-start py-24">

        {/* --- Titre --- */}
        <section className="mb-12 w-full">
          <Skeleton className="h-10 w-64 mb-4" />
          <Skeleton className="h-4 w-96" />
        </section>

        {/* --- Barre de recherche --- */}
        <section className="w-full mb-8">
          <Skeleton className="h-12 w-full max-w-xl rounded-lg" />
        </section>

        {/* --- Catégories --- */}
        <section className="w-full mb-16">
          <div className="flex flex-wrap gap-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton
                key={i}
                className="h-10 w-28 rounded-full"
              />
            ))}
          </div>
        </section>

        {/* --- Liste d’articles --- */}
        <section className="w-full mb-20 grid grid-cols-1 gap-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-5 bg-white dark:bg-zinc-900"
            >
              <Skeleton className="h-48 w-full rounded-lg mb-4" />
              <Skeleton className="h-6 w-2/3 mb-3" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-4/5" />
            </div>
          ))}
        </section>

      </main>
    </div>
  );
}
