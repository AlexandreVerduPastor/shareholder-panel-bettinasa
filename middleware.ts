import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
    const availableRoutes = ["/dashboard"]; // Agrega aquí más rutas permitidas

    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    const url = req.nextUrl;

    // 1️⃣ Si NO está autenticado y NO está en "/login", redirigir al login
    if (!token && url.pathname !== "/login") {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    // 2️⃣ Si ESTÁ autenticado y trata de ir a "/login", redirigir a "/dashboard"
    if (token && url.pathname === "/login") {
        return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    // 3️⃣ Si la ruta no está en las disponibles y está autenticado, ir al dashboard
    if (token && !availableRoutes.includes(url.pathname)) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon.ico|api).*)"],
};
