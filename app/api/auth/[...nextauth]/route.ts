import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import supabase from "@/infrastructure/supabase/client";
import bcrypt from "bcryptjs";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Email y Contraseña",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "tuemail@gmail.com" },
                password: { label: "Contraseña", type: "password" },
            },
            async authorize(credentials) {
                // Buscar el usuario por el email
                const { data: user } = await supabase
                    .from("users")
                    .select("*")
                    .eq("email", credentials.email)
                    .single();

                if (!user) {
                    const errorCode = "1215DSF1412";  // Código único para "Usuario no encontrado"
                    throw new Error(errorCode);
                }

                const isValid = await bcrypt.compare(credentials.password, user.password);
                if (!isValid) {
                    const errorCode = "1234ABC567";  // Código único para "Contraseña incorrecta"
                    throw new Error(errorCode);
                }

                return user;
            },
        }),
    ],
    pages: {
        error: '/login',  // Redirige al login cuando haya un error
    },
    session: { strategy: "jwt" },
    callbacks: {
        async session({ session, token }) {
            session.user.id = token.sub;
            return session;
        },
        async redirect({ url, baseUrl }) {
            // Aquí redirigimos al login con el código de error
            if (url.includes('/api/auth/callback/credentials')) {
                return `/login?error=${url.split('error=')[1]}`; // Redirige a la página de login con el código de error
            }
            return baseUrl;
        }
    },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
