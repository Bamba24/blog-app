import Head from "next/head";
import PostsPage from "./page-articles";

export default function Page() {
  const title = "Tous les articles | Mon Blog";
  const description = "Explorez tous mes articles sur la tech, le code, Next.js, React et plus encore.";
  const ogImage = "/images/logo_blog.png";

  return (
    <>
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

      <PostsPage />
    </>
  );
}
