"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {

    return (
      <div className="flex min-h-screen justify-center bg-zinc-50 dark:bg-black">
        <main className="max-w-5xl w-full py-24">

          {/* Présentation */}
          <section className="mb-16">
            <Skeleton className="h-10 w-72 mb-4" />
            <Skeleton className="h-6 w-96" />
          </section>

          {/* Derniers articles */}
          <section className="mb-20">
            <Skeleton className="h-8 w-56 mb-6" />

            <div className="grid grid-cols-1 gap-8">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex flex-col gap-4">
                  <Skeleton className="h-48 w-full rounded-xl" />
                  <Skeleton className="h-6 w-64" />
                  <Skeleton className="h-4 w-80" />
                  <Skeleton className="h-4 w-40" />
                </div>
              ))}
            </div>
          </section>

          {/* Articles populaires */}
          <section>
            <Skeleton className="h-8 w-56 mb-6" />

            <div className="grid grid-cols-1 gap-8">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex flex-col gap-4">
                  <Skeleton className="h-48 w-full rounded-xl" />
                  <Skeleton className="h-6 w-64" />
                  <Skeleton className="h-4 w-80" />
                  <Skeleton className="h-4 w-40" />
                </div>
              ))}
            </div>
          </section>

        </main>
      </div>
    );

}
