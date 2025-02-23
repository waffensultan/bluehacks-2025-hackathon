"use client";

import { NewsInterface } from "@/lib/constants";
import { formatDistanceToNow, parseISO } from "date-fns";
import { useState, useEffect } from "react";
import { ArrowUpLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function News({ news }: { news: NewsInterface[] }) {
    const [baranggay, setBaranggay] = useState("");

    const router = useRouter();

    useEffect(() => {
        const storedBaranggay = localStorage.getItem("baranggay");
        if (storedBaranggay) {
            setBaranggay(storedBaranggay);
            console.log("Retrieved baranggay: ", storedBaranggay);
        } else {
            router.push("/confirmation");
        }
    }, []);

    const baranggays = {
        alfonso: "Alfonso",
        indang: "Indang",
        dasmarinas: "Dasmarinas",
        imus: "Imus",
    };

    const filteredNews = news.filter(
        (news) => news.baranggay.name.toLowerCase() === baranggay.toLowerCase()
    );

    return (
        <div className="text-black h-screen flex flex-col gap-5 overflow-auto">
            <nav className="border-2 border-[#03032C] px-8 rounded-full bg-[#E8E9FC] flex flex-row items-center whitespace-nowrap justify-between">
                <span className="font-semibold text-2xl">
                    Cavite ·{" "}
                    {baranggays[baranggay as keyof typeof baranggays] ??
                        "unknown"}
                </span>
                <div className="w-14 h-14 relative flex justify-center items-center -mr-5">
                    <img
                        src="final_logo.svg"
                        alt="alt_logo"
                        className="object-contain"
                    />
                </div>
            </nav>

            <ul>
                {filteredNews.map((news) => (
                    <li
                        key={news.id}
                        className="border-2 border-[#03032C] bg-white rounded-md p-3 flex flex-col gap-5 relative"
                    >
                        <header className="bg-[#03032C] text-white rounded-xl py-3 px-5 text-xl font-bold tracking-wider">
                            {news.title}
                        </header>

                        <section className="bg-[url('/sample_image.png')] h-52 bg-no-repeat flex py-5 px-3"></section>
                        <p>{news.content}</p>
                        <hr className="w-full h-0.5 bg-black" />
                        <div className="w-full flex justify-between items-center">
                            <a
                                href="https://example.com"
                                target="_blank"
                                className="font-semibold tracking-tight flex items-center gap-1"
                            >
                                <ArrowUpLeft />
                                Learn more...
                            </a>
                            <span className="text-neutral-500">
                                Posted{" "}
                                {formatDistanceToNow(parseISO(news.createdAt), {
                                    addSuffix: true,
                                })}
                            </span>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
