import React from "react";
import Head from "next/head";
import { ArticlePage } from "./article-page";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Métadonnées (tu peux personnaliser)
  const title = `${slug} | Mon Blog`;
  const description = `Découvrez l'article détaillé : ${slug}.`;
  const ogImage = "/images/logo_blog.png";

  return (
    <>
      <Head>
        {/* SEO de base */}
        <title>{title}</title>
        <meta name="description" content={description} />

        {/* Open Graph */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://tonsite.com/articles/${slug}`} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />
      </Head>

      <ArticlePage slug={slug} />
    </>
  );
}
