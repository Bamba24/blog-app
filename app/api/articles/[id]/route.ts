import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();



export async function GET(
  req: NextRequest,
  { params }: { params: Promise< { id: string } >}
) {
  
  const id = (await params).id;
  try {
    const article = await prisma.articles.findUnique({
      where: { id },
      include: { category: true },
    });

    if (!article) {
      return NextResponse.json({ message: "Catégorie non trouvée" }, { status: 404 });
    }

    return NextResponse.json(article, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Erreur serveur", error: String(error) }, { status: 500 });
  }

}


export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const articleId = (await params).id;

  try {
    const deletedArticle = await prisma.articles.delete({
      where: { id: articleId },
    });

    return NextResponse.json(deletedArticle, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Erreur serveur", error: String(error) }, { status: 500 });
  }
}


export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string } >}) {
  try {
    const articleId = (await params).id; // Récupération de l'id dans l'URL
    const body = await req.json();

    // Mise à jour
    const updatedArticle = await prisma.articles.update({
      where: { id: articleId },
      data: {
        titre: body.titre,
        contenus: body.contenus,
        slug: body.slug,
        description: body.description,
        readTime: body.readTime,
        imageUrl: body.imageUrl,
        tags: body.tags,
        vues: body.vues,
        categoryId: body.idCategory,
      },
      include: {
        category: true,
      },
    });

    return NextResponse.json(updatedArticle, { status: 200 });
  } catch (error) {
    console.error("UPDATE ERROR :", error);
    return NextResponse.json(
      { message: "Erreur serveur lors de la mise à jour" },
      { status: 500 }
    );
  }
}




