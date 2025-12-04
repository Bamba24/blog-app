import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import {getUser} from "@/lib/auth-server";

const prisma = new PrismaClient();

export async function GET (){

  try {

    const articles = await prisma.articles.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(articles, {status: 200})

  }catch (error) {
    return NextResponse.json({message: "Erreur serveur", error: String(error)}, {status: 500})
  }

}


export async function POST(req: NextRequest) {
  const body = await req.json();
  const user = await getUser();

  if(!user){
    return NextResponse.json({message: "Non autorisé"}, {status: 401})
  }

  try {
    // Vérifier si la catégorie existe
    const categorie = await prisma.categories.findUnique({
      where: { id: body.idCategory },
    });

    if (!categorie) {
      return NextResponse.json(
        { message: "Catégorie introuvable" },
        { status: 400 }
      );
    }

    const nouveauArticle = await prisma.articles.create({
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
        auteurId: body.auteurId, 
      },
      include: {
        category: true,
      },
    });

    return NextResponse.json(nouveauArticle, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Erreur serveur", error: String(error) },
      { status: 500 }
    );
  }
}
