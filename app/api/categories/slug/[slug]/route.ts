import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const slug  = (await params).slug;

  try {
    const categorie = await prisma.categories.findUnique({
      where: { slug },
      include: { articles: true },
    });

    if (!categorie) {
      return NextResponse.json({ message: "Article non trouvé" }, { status: 404 });
    }

    return NextResponse.json(categorie, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
  }
}
