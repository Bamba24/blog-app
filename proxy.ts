import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  const url = request.nextUrl;

  // 1. Vérifier session via BetterAuth (cookies)
  const session = request.cookies.get("better-auth.sessionToken")?.value;

  // Pas de session → redirect login
  if (!session && url.pathname.startsWith("/dashboard")) {
    url.pathname = "/signIn";
    return NextResponse.redirect(url);
  }

  // 2. Vérification du rôle
  if (url.pathname.startsWith("/dashboard")) {
    const userReq = await fetch(`${request.nextUrl.origin}/api/me`, {
      headers: {
        Cookie: request.headers.get("cookie") || "",
      },
    });

    const user = await userReq.json();

    if (!user || user.role !== "ADMIN") {
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}
