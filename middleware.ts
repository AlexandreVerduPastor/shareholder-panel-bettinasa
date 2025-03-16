import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    const { pathname } = req.nextUrl;

    // Rutas permitidas si el usuario tiene sesión activa
    const protectedRoutes = ["/dashboard"];

    // Permitir acceso a rutas anidadas (Ejemplo: /dashboard/settings)
    const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));

    // Si el usuario NO tiene sesión y no está en /login, redirigir a /login
    if (!token && pathname !== "/login") {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    // Si el usuario tiene sesión y está en /login, redirigir a /dashboard
    if (token && pathname === "/login") {
        return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    // Si el usuario tiene sesión pero está en una ruta no permitida, redirigir a /dashboard
    if (token && !isProtectedRoute) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    return NextResponse.next();
}

// ⬇️ Ajustamos el matcher para que no bloquee rutas de Next.js ni API routes
export const config = {
    matcher: ["/((?!_next|favicon.ico|api/auth).*)"],
};
