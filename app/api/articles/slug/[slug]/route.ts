import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const slug  = (await params).slug;

  try {
    const article = await prisma.articles.findUnique({
      where: { slug },
      include: { category: true },
    });

    if (!article) {
      return NextResponse.json({ message: "Article non trouvé" }, { status: 404 });
    }

    return NextResponse.json(article, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
  }
}
