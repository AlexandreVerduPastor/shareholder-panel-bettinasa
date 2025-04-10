import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    const { pathname } = req.nextUrl;

    // ✅ Permitir archivos estáticos o rutas públicas especiales
    if (
        pathname.startsWith("/_next/") ||
        pathname.startsWith("/images/") ||
        pathname.startsWith("/favicon.ico") ||
        pathname.startsWith("/api/auth") ||
        pathname.startsWith("/api/register")
    ) {
        return NextResponse.next();
    }

    // 🔒 Rutas protegidas
    const protectedRoutes = ["/dashboard"];
    const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));

    // 🔐 Si intenta acceder a una ruta protegida sin token → login
    if (!token && isProtectedRoute) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    // ✅ Si está autenticado y quiere ir al login, lo mandamos al dashboard
    if (token && pathname === "/login") {
        return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!_next|api/auth).*)"],
};
