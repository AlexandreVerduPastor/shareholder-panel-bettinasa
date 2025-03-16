import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  env: {
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXT_IGNORE_TS_ERRORS: process.env.NEXT_IGNORE_TS_ERRORS,
    NEXT_PUBLIC_1215DSF1412: process.env.NEXT_PUBLIC_1215DSF1412,
    NEXT_PUBLIC_1234ABC567: process.env.NEXT_PUBLIC_1234ABC567,
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_PDF_CONTAINER: process.env.SUPABASE_PDF_CONTAINER,
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
  },
};

export default nextConfig;
