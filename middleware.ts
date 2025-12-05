import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "./lib/auth";

export async function middleware(req: NextRequest) {
  // 1️⃣ Récupérer session BetterAuth
  const session = await auth.api.getSession({ headers: req.headers });

  if (!session) {
    return NextResponse.redirect(new URL("/signIn", req.url));
  }

  const userId = session.user.id;

  // 2️⃣ Fetch vers ton API utilisateur : rôle, etc.
  const baseUrl = req.nextUrl.origin;

  const res = await fetch(`${baseUrl}/api/utilisateurs/${userId}`, {
    method: "GET",
    cache: "no-store",
  });

  if (!res.ok) {
    return NextResponse.redirect(new URL("/signIn", req.url));
  }

  const user = await res.json();

  // 3️⃣ Vérifier le rôle admin
  if (user.role !== "ADMIN") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // 4️⃣ Tout va bien → laisser passer
  return NextResponse.next();
}

// Protéger toutes les routes dashboard
export const config = {
  matcher: ["/dashboard/:path*"],
};
