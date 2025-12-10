import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

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


// export async function DELETE(
//   req: NextRequest,
//   { params }: { params: Promise<{ id: string }> }
// ) {
//   const articleId = (await params).id;

//   try {
//     const deletedArticle = await prisma.articles.delete({
//       where: { id: articleId },
//     });

//     return NextResponse.json(deletedArticle, { status: 200 });
//   } catch (error) {
//     return NextResponse.json({ message: "Erreur serveur", error: String(error) }, { status: 500 });
//   }
// }



export async function DELETE(req: Request, { params }: {params: Promise<{id: string}>}) {
  try {
    const id  = (await params).id;

    // 1️⃣ Récupérer l'article
    const article = await prisma.articles.findUnique({
      where: { id },
    });

    if (!article) {
      return NextResponse.json({ error: "Article introuvable" }, { status: 404 });
    }

    // 2️⃣ Supprimer l'image Cloudinary
    if (article.imagePublicId) {
      await cloudinary.uploader.destroy(article.imagePublicId);
    }

    // 3️⃣ Supprimer l'article dans la DB
    await prisma.articles.delete({ where: { id } });

    return NextResponse.json({ message: "Article supprimé avec succès !" });
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur lors de la suppression", details: String(error) },
      { status: 500 }
    );
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




