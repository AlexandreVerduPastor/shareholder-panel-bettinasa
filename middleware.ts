import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    const { pathname } = req.nextUrl;

    // ✅ Permitir archivos estáticos (imágenes, CSS, JS, etc.)
    if (
        pathname.startsWith("/_next/") || // Archivos de Next.js
        pathname.startsWith("/images/") || // Tus imágenes en /public/images/
        pathname.startsWith("/favicon.ico") || // Ícono del sitio
        pathname.startsWith("/api/auth") // Rutas de autenticación
    ) {
        return NextResponse.next();
    }

    // 🔒 Rutas protegidas (requieren sesión)
    const protectedRoutes = ["/dashboard"];
    const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));

    if (!token && pathname !== "/login") {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    if (token && pathname === "/login") {
        return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    if (token && !isProtectedRoute) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    return NextResponse.next();
}


export const config = {
    matcher: ["/((?!_next|api/auth).*)"], // Eliminamos "public" porque Next.js ya lo maneja internamente
};
