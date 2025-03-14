"use client";

import "../../globals.css";
import { SessionProvider } from "next-auth/react";
import LAYHeader from "@/ui/layouts/LAYHeader";
import LAYSidebar from "@/ui/layouts/LAYSidebar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <html lang="en">
            <head></head>
            <body>
            <div className="flex min-h-screen">
                <LAYSidebar/>

                <div className="flex-1 flex flex-col">
                    <LAYHeader/>

                    <main className="flex-1 p-6 bg-gray-100">
                        {children}
                    </main>
                </div>
            </div>
            </body>
            </html>
        </SessionProvider>
    );
}
