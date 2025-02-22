"use client";

import { Post } from "@/lib/constants";
import { formatDistanceToNow, parseISO } from "date-fns";
import {
    convertedStatus,
    statusColors,
    tagsWithIcons,
    secondaryTags,
} from "@/lib/constants";
import { Accessibility } from "lucide-react";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { createClient } from "@/supabase/client";

import { Dialog, DialogContent, DialogTitle } from "@/components/dialog";

export default function Posts({ posts }: { posts: Post[] }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [clearView, setClearView] = useState(false);
    const [selectedPost, setSelectedPost] = useState<undefined | Post>(
        undefined
    );

    const router = useRouter();
    const supabase = createClient();

    useEffect(() => {
        const storedBaranggay = localStorage.getItem("baranggay");
        if (!storedBaranggay) {
            router.push("/confirmation");
        }

        const checkAuthentication = async () => {
            const {
                data: { user },
            } = await supabase.auth.getUser();

            if (!user) {
                setIsAuthenticated(false);
            }
        };

        checkAuthentication();
    }, []);

    const takeAction = () => {
        if (!isAuthenticated) {
            router.push("/auth");
        }
    };

    return (
        <main className="text-black mx-5 h-screen pt-10 flex flex-col gap-5 overflow-auto py-10">
            {posts.map((post) => {
                return (
                    <article
                        key={post.id}
                        onClick={() => {
                            setClearView(true);
                            setSelectedPost(post);
                        }}
                        className="border-2 border-[#03032C] bg-white rounded-md p-3 flex flex-col gap-5 relative"
                    >
                        <header className="bg-[#03032C] text-white rounded-xl py-3 px-5 text-xl font-bold tracking-wider">
                            Cavite · {post.baranggay.name}
                        </header>

                        <section className="bg-[url('/sample_image.png')] h-52 bg-no-repeat flex py-5 px-3">
                            <div className="bg-white border self-end rounded-full py-1 px-4 flex flex-row gap-2 items-center">
                                <div
                                    className={`w-3.5 h-3.5 rounded-full ${statusColors[post.status]}`}
                                ></div>
                                <span>
                                    <b>Status</b>:{" "}
                                    {convertedStatus[post.status]}
                                </span>
                            </div>
                        </section>

                        <h1 className="text-black font-semibold text-3xl -mt-3">
                            {post.name ? post.name : "Anonymous"}
                        </h1>

                        <ul className="flex flex-row max-w-full flex-wrap">
                            {post.tags.map((tag) => {
                                if (
                                    !Object.keys(tagsWithIcons).includes(
                                        tag.title
                                    )
                                ) {
                                    return;
                                }

                                const Icon =
                                    tagsWithIcons[tag.title] || Accessibility;

                                return (
                                    <li
                                        key={tag.id}
                                        className="flex flex-row items-center gap-5 w-[50%] py-2"
                                    >
                                        <div className="w-10 h-10 rounded-full flex justify-center items-center bg-[#03032C]">
                                            <Icon className="text-white" />
                                        </div>
                                        <span className="text-xl">
                                            {tag.title}
                                        </span>
                                    </li>
                                );
                            })}
                        </ul>

                        <section className="flex justify-between items-center">
                            <button
                                onClick={() => takeAction()}
                                className="text-white font-semibold text-xl py-2 px-3 bg-[#FF6912] rounded-full border-2 border-[#03032C]"
                            >
                                Take Action
                            </button>
                            <span>
                                Posted{" "}
                                {formatDistanceToNow(parseISO(post.createdAt), {
                                    addSuffix: true,
                                })}
                            </span>
                        </section>
                    </article>
                );
            })}

            <Dialog
                key={selectedPost?.createdAt}
                open={clearView}
                onOpenChange={setClearView}
            >
                <DialogContent className="bg-transparent border-none text-black">
                    <DialogTitle>Clear View</DialogTitle>
                    <article
                        onClick={() => setClearView(true)}
                        className="border-2 border-[#03032C] bg-white rounded-md p-3 flex flex-col gap-5 relative"
                    >
                        <header className="bg-[#03032C] text-white rounded-xl py-3 px-5 text-2xl font-bold tracking-wider">
                            Cavite · {selectedPost?.baranggay.name}
                        </header>

                        <section className="bg-[url('/sample_image.png')] h-52 bg-no-repeat flex py-5 px-3">
                            <div className="bg-white border self-end rounded-full py-1 px-4 flex flex-row gap-2 items-center">
                                <div
                                    className={`w-3.5 h-3.5 rounded-full ${statusColors[selectedPost?.status!]}`}
                                ></div>
                                <span>
                                    <b>Status</b>:{" "}
                                    {convertedStatus[selectedPost?.status!]}
                                </span>
                            </div>
                        </section>

                        <h1 className="text-black font-semibold text-3xl -mt-3">
                            {selectedPost?.name
                                ? selectedPost?.name
                                : "Anonymous"}
                        </h1>

                        <ul className="flex flex-row max-w-full flex-wrap">
                            {selectedPost?.tags.map((tag) => {
                                if (
                                    !Object.keys(tagsWithIcons).includes(
                                        tag.title
                                    )
                                ) {
                                    return;
                                }

                                const Icon =
                                    tagsWithIcons[tag.title] || Accessibility;

                                return (
                                    <li
                                        key={tag.id}
                                        className="flex flex-row items-center gap-5 w-[50%] py-2"
                                    >
                                        <div className="w-10 h-10 rounded-full flex justify-center items-center bg-[#03032C]">
                                            <Icon className="text-white" />
                                        </div>
                                        <span className="text-xl">
                                            {tag.title}
                                        </span>
                                    </li>
                                );
                            })}
                        </ul>

                        <hr className="w-full h-0.5 bg-black" />

                        <div className="flex flex-col gap-2 justify-start">
                            {selectedPost?.tags.map((tag) => {
                                if (
                                    Object.keys(tagsWithIcons).includes(
                                        tag.title
                                    )
                                ) {
                                    return;
                                }

                                return (
                                    <div
                                        key={tag.id}
                                        className="border-2 rounded-full w-[70%] py-1 px-5 flex flex-row items-center gap-1"
                                    >
                                        <div
                                            className={`w-4 h-4 rounded-full ${
                                                secondaryTags["1"].includes(
                                                    tag.title
                                                )
                                                    ? "bg-blue-500"
                                                    : secondaryTags[
                                                            "3"
                                                        ].includes(tag.title)
                                                      ? "bg-red-500"
                                                      : secondaryTags[
                                                              "4"
                                                          ].includes(tag.title)
                                                        ? "bg-green-500"
                                                        : ""
                                            }`}
                                        ></div>
                                        <span>
                                            {secondaryTags["4"].includes(
                                                tag.title
                                            ) && "Needs"}{" "}
                                            {tag.title}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>

                        <section className="flex flex-col">
                            <button className="self-start text-white font-semibold text-xl py-2 px-3 bg-[#FF6912] rounded-full border-2 border-[#03032C]">
                                Take Action
                            </button>
                            <span>
                                Posted{" "}
                                {selectedPost &&
                                    formatDistanceToNow(
                                        parseISO(selectedPost?.createdAt),
                                        {
                                            addSuffix: true,
                                        }
                                    )}
                            </span>
                        </section>
                    </article>
                </DialogContent>
            </Dialog>
        </main>
    );
}
