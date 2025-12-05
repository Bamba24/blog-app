import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function middleware(req: NextRequest) {
  // Récupération session Better Auth
  const session = await auth.api.getSession({
    headers: req.headers,
  });

  const pathname = req.nextUrl.pathname;

  // Si pas de session → redirection login
  if (!session?.user?.id) {
    if (pathname.startsWith("/dashboard")) {
      return NextResponse.redirect(new URL("/signIn", req.url));
    }
    return NextResponse.next();
  }

  // Si l’utilisateur va au dashboard → Vérifier rôle en BDD
  if (pathname.startsWith("/dashboard")) {
    try {
      const user = await prisma.user.findUnique({
        where: { id: session.user.id },
        select: { role: true },
      });

      if (!user || user.role !== "ADMIN") {
        return NextResponse.redirect(new URL("/", req.url));
      }

    } catch (err) {
      console.error("Erreur middleware:", err);
      return NextResponse.redirect(new URL("/signIn", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
