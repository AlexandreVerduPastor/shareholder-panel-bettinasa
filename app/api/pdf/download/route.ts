import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! 
);

export async function GET(req: NextRequest) {
 

  const { searchParams } = new URL(req.url);
  const fileName = searchParams.get("file");

  if (!fileName) {
    return NextResponse.json({ error: "Falta el nombre del archivo" }, { status: 400 });
  }

  const bucketName = process.env.SUPABASE_PDF_CONTAINER || "pdfs";
 
  // Generar una URL firmada con expiración (60 segundos)
  const { data, error } = await supabase.storage
  .from(bucketName)
  .createSignedUrl(fileName, 60); 

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ url: data.signedUrl });
}
