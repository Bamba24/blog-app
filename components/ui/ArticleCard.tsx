import Image from "next/image";
import Link from "next/link";

interface ArticleCardProps {
  titre: string;
  slug: string;
  description: string;
  readTime: string;
  vues: number;
  tags: string;
  imageUrl: string;
}

export default function ArticleCard({
  titre,
  description,
  readTime,
  vues,
  tags,
  imageUrl,
  slug,
}: ArticleCardProps) {
  return (
    <Link
      href={`/articles/${slug}`}
      className="block transition-all duration-300 hover:scale-[1.01]"
    >
      <article className="flex flex-col p-6 sm:flex-row  overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm hover:shadow-md transition-all duration-300">

        {/* Image - colonne gauche */}
        <div className="relative w-full sm:w-1/3   aspect-[4/3]">
          <Image
            src={imageUrl}
            alt={titre}
            fill
            priority 
            fetchPriority="high"
            className="object-cover rounded-lg"
          />
        </div>

        {/* Content - colonne droite */}
        <div className="p-6 flex flex-col gap-3 w-full sm:w-2/3 ">

          <div className="text-sm text-zinc-500 dark:text-zinc-400 flex items-center gap-2">
            <span>{readTime}</span>
            <span>•</span>
            <span>{vues} vues</span>
          </div>

          <h2 className="font-serif text-xl font-semibold text-zinc-900 dark:text-zinc-100 leading-tight">
            {titre}
          </h2>

          <div className="flex flex-wrap gap-2">
            {tags.split(",").map((tag) => (
              <span
                key={tag}
                className="text-xs bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 px-2 py-1 rounded-md"
              >
                {tag}
              </span>
            ))}
          </div>

          <p className="font-sans text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed line-clamp-3 ">
            {description}
          </p>

        </div>
      </article>
    </Link>
  );
}
