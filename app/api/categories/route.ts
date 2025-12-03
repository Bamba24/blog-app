import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// ➤ Créer une catégorie
export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
    const categorie = await prisma.categories.create({
      data: {
        slug: body.slug,
        titre: body.titre,
        description: body.description,
        image: body.image,
      },
    });

    return NextResponse.json(categorie, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
  }
}


// ➤ Liste des catégories
export async function GET() {
  try {
    const categories = await prisma.categories.findMany({
      include: { articles: true },
    });

    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
  }
}
