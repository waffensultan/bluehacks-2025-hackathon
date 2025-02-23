import { prisma } from "@/lib/db";
import { Post } from "@/lib/constants";
import { Suspense } from "react";
import Navbar from "@/components/navbar";
import Archive from "@/app/archive/client-component";
import { createClient } from "@/supabase/server";
import { subHours } from "date-fns";

export default async function Page() {
    return (
        <main className="w-screen h-screen relative bg-gradient-to-t from-[#E8E9FC] to-[#CADDF9]">
            <Suspense
                fallback={
                    <div className="text-black h-screen mx-5 pt-10">
                        Loading...
                    </div>
                }
            >
                <ArchiveWrapper />
            </Suspense>
            <Navbar />
        </main>
    );
}

async function ArchiveWrapper() {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    const twoDaysAgo = subHours(new Date(), 48);

    const posts = await prisma.post.findMany({
        where: {
            OR: [
                {
                    status: "RESCUED",
                },
                {
                    createdAt: { lt: twoDaysAgo },
                },
            ],
        },
        include: {
            baranggay: true,
            tags: true,
        },
    });

    const serializedPosts: Post[] = posts.map((post) => ({
        ...post,
        mediaUrl: post.mediaUrl ?? undefined,
        createdAt: post.createdAt.toISOString(),
        updatedAt: post.updatedAt.toISOString(),
        baranggay: {
            id: post.baranggay.id,
            name: post.baranggay.name,
        },
        tags: post.tags.map((tag) => ({
            id: tag.id,
            title: tag.title,
        })),
    }));

    return <Archive posts={serializedPosts} authenticated={user !== null} />;
}
