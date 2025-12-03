import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-50 dark:bg-black px-6">
      
      {/* Illustration cercle */}
      <div className="w-40 h-40 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center mb-10">
        <span className="text-6xl font-bold text-zinc-400 dark:text-zinc-600">404</span>
      </div>

      <h1 className="text-3xl font-semibold text-black dark:text-white mb-4">
        Page introuvable
      </h1>

      <p className="text-zinc-600 dark:text-zinc-400 text-center max-w-md mb-8">
        Désolé, cette page n’existe pas ou a été supprimée.  
        Vérifie l’URL ou retourne à l’accueil.
      </p>

      <Link
        href="/"
        className="px-6 py-3 rounded-lg bg-black text-white dark:bg-white dark:text-black font-medium hover:opacity-80 transition"
      >
        Retour à l’accueil
      </Link>
    </div>
  );
}
