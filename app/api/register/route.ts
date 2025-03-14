import { NextResponse } from "next/server";
import supabase from "@/infrastructure/supabase/client";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
    try {
        const { email, password, name } = await req.json();

        // Verificar que se recibieron los datos necesarios
        if (!email || !password || !name) {
            return NextResponse.json({ error: "Faltan datos" }, { status: 400 });
        }

        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insertar usuario en la base de datos
        const { data, error } = await supabase.from("users").insert([
            { email, password: hashedPassword, name },
        ]);

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ message: "Usuario creado correctamente", user: data });
    } catch (error) {
        return NextResponse.json({ error: "Error en el servidor" }, { status: 500 });
    }
}
