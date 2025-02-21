import type { Metadata } from "next";
import "@/app/globals.css";

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
            <body className="antialiased">{children}</body>
        </html>
    );
}
