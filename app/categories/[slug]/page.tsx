import Head from "next/head";
import React from "react";
import { CategoriesPage } from "./categories-page";

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // Métadonnées dynamiques basées sur le slug
  const title = `Catégorie : ${slug} | Mon Blog`;
  const description = `Découvrez les meilleurs articles dans la catégorie ${slug}. Tutoriels, conseils et contenus tech.`;
  const ogImage = `/images/logo_blog.png`;

  return (
    <>
      {/* === META DONNÉES SEO === */}
      <Head>
        <title>{title}</title>

        <meta name="description" content={description} />

        {/* Open Graph */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:type" content="website" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />
      </Head>

      {/* === PAGE CLIENT === */}
      <CategoriesPage slug={slug} />
    </>
  );
}
