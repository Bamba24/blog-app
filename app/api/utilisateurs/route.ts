import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET (){

  try {

    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    return NextResponse.json(users, {status: 200})

  }catch (error) {
    return NextResponse.json({message: "Erreur serveur", error: String(error)}, {status: 500})
  }

}
