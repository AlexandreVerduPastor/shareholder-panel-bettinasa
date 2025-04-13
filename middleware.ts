import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    const { pathname } = req.nextUrl;

    // ✅ Permitir archivos estáticos o rutas públicas
    if (
        pathname.startsWith("/_next/") ||
        pathname.startsWith("/images/") ||
        pathname.startsWith("/favicon.ico") ||
        pathname.startsWith("/api")
    ) {
        return NextResponse.next();
    }

    // 🌐 Ruta base "/"
    if (pathname === "/") {
        return NextResponse.redirect(new URL(token ? "/dashboard" : "/login", req.url));
    }

    // 🔒 Rutas protegidas
    const protectedRoutes = ["/dashboard"];
    const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));

    if (isProtectedRoute && !token) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    // 🔁 Si va al login estando autenticado → redirigir al dashboard
    if (token && pathname === "/login") {
        return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    // ❌ Si la ruta no existe (ni pública ni protegida), redirigir según autenticación
    const knownRoutes = ["/login", "/dashboard", "/api/register"];
    const isKnownRoute = knownRoutes.some(route => pathname.startsWith(route));
    
    if (!isKnownRoute) {
        return NextResponse.redirect(new URL(token ? "/dashboard" : "/login", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!_next|api/auth).*)"],
};
