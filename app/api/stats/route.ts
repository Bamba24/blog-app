import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    // 📌 1. Compter les utilisateurs
    const usersCount = await prisma.user.count();

    // 📌 2. Compter les articles
    const postsCount = await prisma.articles.count();

    // 📌 3. Compter les catégories
    const categoriesCount = await prisma.categories.count();

    // 📌 4. Total des vues (sommer toutes les vues)
    const totalViews = await prisma.articles.aggregate({
      _sum: { vues: true },
    });

    // 📌 5. Nombre d’articles populaires (ex: > 100 vues)
    const popularPosts = await prisma.articles.count({
      where: { vues: { gte: 100 } },
    });

    // 📌 6. Derniers utilisateurs (par date)
    const latestUsers = await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      select: {
        name: true,
        email: true,
        createdAt: true,
      },
    });

    // 📌 Réponse finale pour ton useQuery
    return NextResponse.json({
      users: usersCount,
      posts: postsCount,
      categories: categoriesCount,
      totalViews: totalViews._sum.vues ?? 0,
      popularPosts,
      latestUsers,
    });

  } catch (error) {
    console.error("Erreur API Dashboard:", error);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
