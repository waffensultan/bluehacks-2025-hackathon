import { prisma } from "@/lib/db";
import { Post } from "@/lib/constants";
import { Suspense } from "react";
import Navbar from "@/components/navbar";
import Posts from "@/components/posts";
import { createClient } from "@/supabase/server";
import { logout } from "@/app/auth/actions";

export default async function Page() {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    return (
        <main className="w-screen h-screen relative bg-gradient-to-t from-[#E8E9FC] to-[#CADDF9]">
            {user && (
                <button type="button" onClick={logout}>
                    Logout
                </button>
            )}
            <Suspense
                fallback={
                    <div className="text-black h-screen mx-5 pt-10">
                        Loading...
                    </div>
                }
            >
                <PostWrapper />
            </Suspense>
            <Navbar />
        </main>
    );
}

async function PostWrapper() {
    const posts = await prisma.post.findMany({
        include: {
            baranggay: true,
            tags: true,
        },
    });

    const serializedPosts: Post[] = posts.map((post) => ({
        ...post,
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

    return <Posts posts={serializedPosts} />;
}
