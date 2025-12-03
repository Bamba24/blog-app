import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();



export async function GET(
  req: NextRequest,
  { params }: { params: Promise< { id: string } >}
) {
  
  const id = (await params).id;
  try {
    const categorie = await prisma.categories.findUnique({
      where: { id },
      include: { articles: true },
    });

    if (!categorie) {
      return NextResponse.json({ message: "Catégorie non trouvée" }, { status: 404 });
    }

    return NextResponse.json(categorie, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
  }

}

// ➤ Supprimer une catégorie
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;

  try {
    const deleted = await prisma.categories.delete({
      where: { id },
    });

    return NextResponse.json(deleted, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
  }
}


// ➤ Mettre à jour une catégorie
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;
  const body = await req.json();

  try {
    const updated = await prisma.categories.update({
      where: { id },
      data: {
        slug: body.slug,
        titre: body.titre,
        description: body.description,
        image: body.image,
      },
    });

    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
  }
}
