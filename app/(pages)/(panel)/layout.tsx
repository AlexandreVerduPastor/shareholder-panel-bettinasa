
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
            <div className="flex flex-col min-h-screen">
                <LAYHeader/>
                <div className="flex-1 flex">
                <LAYSidebar/>

                    <main className="flex-1 p-12 bg-gray-100">
                        {children}
                    </main>
                </div>
            </div>
            </body>
            </html>
        </SessionProvider>
    );
}
