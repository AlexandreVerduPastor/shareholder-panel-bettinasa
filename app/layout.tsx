"use client";


import "../../globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (

            <html lang="en">
            <head></head>
            <body>
            <div >
                {children}
            </div>
            </body>
            </html>

    );
}
