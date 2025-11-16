import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// مرحله ۱: middleware چندزبانه
const intlMiddleware = createMiddleware(routing);

export async function middleware(request: NextRequest) {
  // اول next-intl اجرا بشه
  const intlResponse = intlMiddleware(request);
  if (intlResponse) return intlResponse;

  const { pathname } = request.nextUrl;

  const allCookies = request.cookies.getAll();
  const accessToken = request.cookies.get("access-token");
  const refreshToken = request.cookies.get("refresh-token");

  console.log("🟢 Middleware running...");
  console.log("📍 URL:", pathname);
  console.log("🍪 All cookies count:", allCookies.length);
  console.log(
    "🍪 All cookies:",
    allCookies.map((c) => ({
      name: c.name,
      value: c.value ? "exists" : "empty",
    }))
  );
  console.log(
    "🔑 Access Token:",
    accessToken?.value ? "✅ Found" : "❌ Not found"
  );
  console.log(
    "🔄 Refresh Token:",
    refreshToken?.value ? "✅ Found" : "❌ Not found"
  );

  // if (isProtected) {
  //   console.log("🔒 Protected route detected");

  //   if (!accessToken?.value) {
  //     console.log("❌ No access token found → redirecting to /");
  //     return NextResponse.redirect(new URL("/", request.url));
  //   }

  //   console.log("✅ Access token exists → attempting to resolve user role");

  //   let resolvedRole: string | null = null;
  //   try {
  //     const controller = new AbortController();
  //     const timeout = setTimeout(() => controller.abort(), 2500);

  //     const apiUrl = `${request.nextUrl.origin}/api/v1/user`;
  //     console.log("🌐 Fetching role from:", apiUrl);

  //     const res = await fetch(apiUrl, {
  //       method: "GET",
  //       headers: {
  //         Accept: "application/json",
  //         Cookie: request.headers.get("cookie") || "",
  //       },
  //       signal: controller.signal,
  //       cache: "no-store",
  //     }).catch((err) => {
  //       console.error("❌ Role fetch network error:", err);
  //       throw err;
  //     });

  //     clearTimeout(timeout);

  //     if (!res.ok) {
  //       console.error("❌ Role fetch failed with status:", res.status);
  //     } else {
  //       const data = await res.json().catch(() => ({} as any));
  //       resolvedRole = data?.data?.user?.role ?? null;
  //       console.log("👤 Role resolved:", resolvedRole || "(none)");
  //     }
  //   } catch (err) {
  //     console.error("❌ Failed to resolve role:", err);
  //   }

  //   const response = NextResponse.next();
  //   response.headers.set("x-auth-token", accessToken.value);
  //   if (resolvedRole) {
  //     response.headers.set("x-user-role", resolvedRole);
  //     console.log("✅ Role added to x-user-role header");
  //   } else {
  //     console.log("⚠️ Role not available; x-user-role header not set");
  //   }

  //   if (
  //     pathname.startsWith("/dashboard") &&
  //     resolvedRole &&
  //     resolvedRole !== "admin"
  //   ) {
  //     console.log("⛔ RBAC: role is not admin → redirecting to /");
  //     return NextResponse.redirect(new URL("/", request.url));
  //   }

  //   return response;
  // } else {
  //   console.log("✅ Public route → allowing access");
  // }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/profile/:path*",
    "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
  ],
};
