"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Page() {
    const pathname = usePathname();

    const links = [
        {
            name: "Feed",
            url: "/",
        },
        {
            name: "News",
            url: "/news",
        },
        {
            name: "Archive",
            url: "/archive",
        },
    ];

    return (
        <main className="w-screen h-screen relative bg-gradient-to-t from-[#E8E9FC] to-[#CADDF9]">
            <nav className="w-full absolute bottom-0">
                <ul className="flex flex justify-evenly border-t-2 border-[#03032C] py-5 rounded-xl">
                    {links.map((link) => {
                        const activePath = pathname === link.url;

                        return (
                            <li
                                key={link.name}
                                className={`${activePath ? "bg-[#03032C]" : "bg-white text-[#03032C] border-[#03032C]"}  border-2 rounded-full w-32 text-center py-3`}
                            >
                                <Link href={link.url} className="w-full">
                                    <span className="font-semibold text-xl tracking-tight">
                                        {link.name}
                                    </span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </main>
    );
}
