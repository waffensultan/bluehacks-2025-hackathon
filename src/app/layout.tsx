import type { Metadata } from "next";
import "@/app/globals.css";

import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "@/app/api/uploadthing/core";

export const metadata: Metadata = {
    title: "BlueHacks 2025",
    description: "Goodluck satin!",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className="antialiased">
                <NextSSRPlugin
                    routerConfig={extractRouterConfig(ourFileRouter)}
                />
                {children}
            </body>
        </html>
    );
}
