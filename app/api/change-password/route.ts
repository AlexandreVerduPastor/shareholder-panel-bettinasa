import { NextResponse } from "next/server";
import supabase from "@/infrastructure/supabase/client";
import bcrypt from "bcryptjs";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  const { oldPassword, newPassword } = await req.json();
  const userId = session.user.id;

  // Buscar usuario en Supabase
  const { data: user, error: userError } = await supabase
    .from("users")
    .select("id, password")
    .eq("id", userId)
    .single();

  if (userError || !user) {
    return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
  }

  // Verificar contraseña actual
  const isValid = await bcrypt.compare(oldPassword, user.password);
  if (!isValid) {
    return NextResponse.json({ error: "Contraseña actual incorrecta" }, { status: 400 });
  }

  // Encriptar nueva contraseña
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  // Actualizar contraseña en Supabase
  const { error: updateError } = await supabase
    .from("users")
    .update({ password: hashedPassword })
    .eq("id", userId);

  if (updateError) {
    return NextResponse.json({ error: "Error al actualizar contraseña" }, { status: 500 });
  }

  return NextResponse.json({ message: "Contraseña actualizada correctamente" });
}
