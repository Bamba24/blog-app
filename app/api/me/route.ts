import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth } from "@/lib/auth";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  const session = await auth.api.getSession({ headers: req.headers });

  if (!session) {
    return NextResponse.json(null, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { id: true, email: true, role: true, name: true }
  });

  return NextResponse.json(user);
}
