import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const id =( await params).id;

  if (!id) {
    return NextResponse.json(
      { message: "ID manquant" },
      { status: 400 }
    );
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Utilisateur introuvable" },
        { status: 404 }
      );
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Erreur serveur", error: String(error) },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;

  if (!id) {
    return NextResponse.json({ message: "ID manquant" }, { status: 400 });
  }

  try {
    const user = await prisma.user.delete({
      where: { id }
    });

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Erreur serveur", error: String(error) },
      { status: 500 }
    );
  }
}