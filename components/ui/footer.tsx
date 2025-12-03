"use client";

import Link from "next/link";
import { Github, Linkedin, Twitter } from "lucide-react";
import {Button} from "@/components/ui/button";
import {usePathname} from "next/navigation";
import {useQuery} from "@tanstack/react-query";
import type {Categories} from "@/app/types/type";

export default function Footer() {
  const year = new Date().getFullYear();
  const pathname = usePathname();

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


  // Ne pas afficher le footer sur les pages du dashboard
  if (pathname.startsWith("/dashboard") || pathname.startsWith("/auth")) {
    return null;
  } else {

    
    return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
      <div className="max-w-5xl mx-auto  py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* --- Bloc 1 : Logo + description --- */}
        <div>
          <h2 className="text-2xl font-bold text-black dark:text-white">
            Dev Blog
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-3 leading-relaxed">
            Le blog des développeurs modernes.  
            Des tutoriels, des astuces et de la veille tech pour progresser chaque jour 🚀
          </p>
        </div>

        {/* --- Bloc 2 : Navigation --- */}
        <div>
          <h3 className="text-lg font-semibold text-black dark:text-white mb-4">
            Navigation
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                href="/"
                className="text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition"
              >
                Accueil
              </Link>
            </li>
            <li>
              <Link
                href="/categories"
                className="text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition"
              >
                Catégories
              </Link>
            </li>
            <li>
              <Link
                href="/articles"
                className="text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition"
              >
                Articles
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* --- Bloc 3 : Catégories --- */}
        <div>
          <h3 className="text-lg font-semibold text-black dark:text-white mb-4">
            Catégories
          </h3>
          <ul className="space-y-2 text-sm">
            {categories.map(
              (cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/categories/${cat.slug}`}
                    className="text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition"
                  >
                    {cat.titre}
                  </Link>
                </li>
              )
            )}
          </ul>
        </div>

        {/* --- Bloc 4 : Newsletter --- */}
        <div>
          <h3 className="text-lg font-semibold text-black dark:text-white mb-4">
            Newsletter
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
            Reçois chaque semaine les meilleurs articles tech 💡
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col gap-2 items-center"
          >
            <input
              type="email"
              placeholder="Ton email..."
              className="w-full px-3 py-2 rounded-md border border-zinc-300 dark:border-zinc-700 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            <Button
              type="submit"
              className="px-4 py-2 text-white text-sm w-full transition rounded-md"
            >
              S’inscrire
            </Button>
          </form>
        </div>
      </div>

      {/* --- Bas du footer --- */}
      <div className="border-t border-zinc-200 dark:border-zinc-800 mt-8">
        <div className="max-w-5xl mx-auto px-6 py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            © {year} DevBlog — Tous droits réservés.
          </p>

          <div className="flex items-center gap-4 text-zinc-500 dark:text-zinc-400">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-black dark:hover:text-white transition"
              >
              <Github size={20} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              >
              <Twitter size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
}
