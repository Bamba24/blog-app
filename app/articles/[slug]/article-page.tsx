"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import type { Articles } from "@/app/types/type";
import { ArticlePageSkeleton } from "@/components/ui/skeleton-articles-slug";
import NotFound from "./not-found";

function extractHeadings(markdown: string) {
  const lines = markdown.split("\n");

  const headings = lines
    .map((line) => {
      const match = line.match(/^(#{1,3})\s+(.*)/);
      if (!match) return null;

      let text = match[2];

      // 🚀 Enlever les numéros au début : "1. ", "2) ", "3 - " etc.
      text = text.replace(/^\s*\d+[\.\-\)\s]+/, "");

      return {
        level: match[1].length,
        text,
        id: text
          .toLowerCase()
          .replace(/[^\w]+/g, "-")
          .replace(/^-|-$/g, "")
      };
    })
    .filter(Boolean);

  return headings as { level: number; text: string; id: string }[];
}

async function fetchArticle(slug: string) {
  const res = await fetch(`/api/articles/slug/${slug}`);
  if (!res.ok) throw new Error("Erreur lors du chargement de l'article");
  return res.json();
}

export function ArticlePage({ slug }: { slug: string }) {
  const { data: article, isLoading, error } = useQuery<Articles>({
    queryKey: ["article", slug],
    queryFn: () => fetchArticle(slug),
  });

  if (isLoading) return <ArticlePageSkeleton />;
  if (error || !article) return NotFound();

  /* --- GÉNÉRER LE SOMMAIRE --- */
  const headings = extractHeadings(article.contenus);

  const categories = ["Développement", "Design", "Performance", "Backend", "Frontend"];

  return (
    <div className="flex min-h-screen justify-center bg-zinc-50 dark:bg-black">
      <main className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-[1fr_250px] py-16 gap-12 px-6 sm:px-6 lg:px-8">
        
        {/* --- Contenu principal --- */}
        <div className="flex-1">

          <h1 className="font-serif text-4xl font-bold text-black dark:text-white mb-4">
            {article.titre}
          </h1>

          <div className="flex items-center gap-4 text-sm text-zinc-600 dark:text-zinc-400 mb-6">
            <span>{article.readTime}</span>
            <span>•</span>
            <span>{article.vues} vues</span>
          </div>

          <Image
            src={article.imageUrl}
            alt={article.titre}
            width={800}
            height={200}
            className="rounded-lg mb-8 max-h-50 object-cover w-full"
          />

          {/* ---- CONTENU MARKDOWN ---- */}
          <article className="prose dark:prose-invert max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
              components={{

                /* TITRES AVEC ID POUR LE SOMMAIRE */
                h1: ({ children }) => {
                  const text = String(children);
                  const id = text.toLowerCase().replace(/[^\w]+/g, "-");
                  return (
                    <h1 id={id} className="text-4xl font-bold mt-10 mb-6">
                      {children}
                    </h1>
                  );
                },

                h2: ({ children }) => {
                  const text = String(children);
                  const id = text.toLowerCase().replace(/[^\w]+/g, "-");
                  return (
                    <h2 id={id} className="text-3xl font-semibold mt-8 mb-4">
                      {children}
                    </h2>
                  );
                },

                h3: ({ children }) => {
                  const text = String(children);
                  const id = text.toLowerCase().replace(/[^\w]+/g, "-");
                  return (
                    <h3 id={id} className="text-2xl font-semibold mt-6 mb-3">
                      {children}
                    </h3>
                  );
                },

                /* LIENS */
                a: ({ href, children }) => (
                  <Link
                    href={href || "#"}
                    className="text-blue-600 dark:text-blue-400 underline hover:opacity-80"
                  >
                    {children}
                  </Link>
                ),

                /* IMAGES */
                img: ({ src, alt }) => (
                  <Image
                    src={typeof src === "string" ? src : ""}
                    alt={alt || ""}
                    width={900}
                    height={500}
                    className="rounded-lg my-6 border border-zinc-300 dark:border-zinc-700"
                  />
                ),

                /* LISTES */
                ul: ({ children }) => (
                  <ul className="list-disc pl-6 space-y-2 my-4">{children}</ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal pl-6 space-y-2 my-4">{children}</ol>
                ),

                /* BLOCKQUOTE */
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-zinc-300 dark:border-zinc-600 pl-4 italic my-6">
                    {children}
                  </blockquote>
                ),

                /* TABLES */
                th: ({ children }) => (
                  <th className="border p-2 font-semibold bg-zinc-200 dark:bg-zinc-800">
                    {children}
                  </th>
                ),
                td: ({ children }) => (
                  <td className="border p-2">{children}</td>
                ),

                /* CODE INLINE + BLOCK */
                code: ({ className, children }) => {
                  const isBlock = className && className.startsWith("language-");
                  const isInline =
                    !isBlock &&
                    typeof children[0] === "string" &&
                    !children[0].includes("\n");

                  if (isInline) {
                    return (
                      <code className="bg-zinc-200 dark:bg-zinc-800 px-2 py-1 rounded font-mono text-sm">
                        {children}
                      </code>
                    );
                  }

                  return <code className={className}>{children}</code>;
                },
              }}
            >
              {article.contenus}
            </ReactMarkdown>
          </article>

          <div className="mt-8 flex flex-wrap gap-2">
            {article.tags.split(",").map((tag: string) => (
              <span
                key={tag}
                className="px-3 py-1 text-sm bg-zinc-200 dark:bg-zinc-800 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* --- ASIDE (Sommaire + catégories) --- */}
        <aside className="hidden lg:flex flex-col w-64 shrink-0 gap-8 sticky top-10 self-start ">

          {/* --- SOMMAIRE --- */}
          <div>
            <h3 className="font-serif text-zinc-700 dark:text-zinc-300 text-lg font-semibold mb-4">
              Sommaire
            </h3>

            <ul className="space-y-2 text-sm">
              {headings.map((h) => (
                <li
                  key={h.id}
                  className={
                    h.level === 1
                      ? "font-semibold"
                      : h.level === 2
                      ? "ml-3"
                      : "ml-6"
                  }
                >
                  <a
                    href={`#${h.id}`}
                    className="hover:text-black dark:hover:text-white"
                  >
                    {h.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* --- CATÉGORIES --- */}
          <div>
            <h3 className="font-serif text-zinc-700 dark:text-zinc-300 text-lg font-semibold mb-4">
              Catégories
            </h3>
            <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
              {categories.map((cat) => (
                <li key={cat}>
                  <Link
                    href={`/categories/${cat.toLowerCase()}`}
                    className="hover:text-black dark:hover:text-white"
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </aside>
      </main>
    </div>
  );
}
