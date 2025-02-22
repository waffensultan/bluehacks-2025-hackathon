import Navbar from "@/components/navbar";
import { prisma } from "@/lib/db";
import { Suspense } from "react";
import { NewsInterface } from "@/lib/constants";
import News from "@/app/news/client-component";

export default function Page() {
    return (
        <main className="w-screen h-screen relative bg-gradient-to-t from-[#E8E9FC] to-[#CADDF9]">
            <div className="text-black mx-5 h-screen pt-10 flex flex-col gap-5 overflow-auto py-10">
                <Suspense fallback={<div>Testing...</div>}>
                    <PostWrapper />
                </Suspense>
            </div>
            <Navbar />
        </main>
    );
}

async function PostWrapper() {
    const newsList = await prisma.news.findMany({
        include: {
            baranggay: true,
        },
    });

    const serializedNews: NewsInterface[] = newsList.map((news) => ({
        ...news,
        createdAt: news.createdAt.toISOString(),
        updatedAt: news.updatedAt.toISOString(),
        baranggay: {
            id: news.baranggay.id,
            name: news.baranggay.name,
        },
    }));

    return <News news={serializedNews} />;
}
