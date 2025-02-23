"use client";

import { Post } from "@/lib/constants";
import { formatDistanceToNow, parseISO } from "date-fns";
import {
    convertedStatus,
    statusColors,
    tagsWithIcons,
    secondaryTags,
} from "@/lib/constants";
import { Accessibility, ExternalLink } from "lucide-react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { logout } from "@/app/auth/actions";
import { takeAction, completePost } from "@/actions/actions";

import { Dialog, DialogContent, DialogTitle } from "@/components/dialog";

export default function Posts({
    posts,
    authenticated,
    isVolunteer,
}: {
    posts: Post[];
    authenticated: boolean;
    isVolunteer: boolean;
}) {
    const [clearView, setClearView] = useState(false);
    const [selectedPost, setSelectedPost] = useState<undefined | Post>(
        undefined
    );

    const router = useRouter();

    const clickButton = (postId: string) => {
        if (!authenticated) {
            router.push("/auth");
            return;
        }

        takeAction(postId);
    };

    return (
        <main className="text-black h-screen flex flex-col gap-5 overflow-auto px-7 py-5">
            <div className="w-full flex justify-between items-center">
                <div className="flex flex-row items-center gap-4">
                    <Link
                        href={"/auth"}
                        className="bg-white w-14 h-14 rounded-full border-2 border-[#03032C] flex justify-center items-center"
                    >
                        <div className="w-8 h-8">
                            <img
                                src="profile.svg"
                                alt="alt_logo"
                                className="object-contain"
                            />
                        </div>
                    </Link>

                    {authenticated && (
                        <button
                            type="button"
                            onClick={() => logout()}
                            className="bg-[#03032C] text-white font-semibold py-2 px-8 rounded-full"
                        >
                            Logout
                        </button>
                    )}
                </div>

                <div className="w-[4.4rem] h-[4.4rem] relative flex justify-center items-center">
                    <img
                        src="final_logo.svg"
                        alt="alt_logo"
                        className="object-contain"
                    />
                </div>
            </div>

            {authenticated && (
                <div className="bg-gradient-to-r from-[#FDA303] to-[#FF6912] border-2 border-[#03032C] rounded-xl py-2 px-4 text-white font-semibold text-xl text-center underline flex justify-center items-center gap-3">
                    <ExternalLink />
                    <Link href={"/apply"}>
                        <span>Apply as a Volunteer</span>
                    </Link>
                </div>
            )}

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
                                    className={`w-4 h-4 rounded-full ${statusColors[post.status]}`}
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
                                onClick={() => clickButton(post.id)}
                                disabled={!authenticated}
                                className={`text-white font-semibold text-xl py-2 px-3  ${post.status !== "RESCUED" ? "bg-[#FF6912]" : "bg-neutral-500"} ${!authenticated && "bg-neutral-500"} rounded-full border-2 border-[#03032C]`}
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
                        className="border-2 border-[#03032C] bg-white rounded-md p-5 flex flex-col gap-5 relative"
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

                        <section className="w-full flex flex-col justify-center items-center gap-3">
                            <button
                                disabled={!authenticated}
                                className={`w-full self-start text-white font-semibold text-xl py-2 px-3 ${selectedPost?.status !== "RESCUED" ? " bg-[#FF6912]" : "bg-neutral-500"}  ${!authenticated && "bg-neutral-500"} rounded-full border-2 border-[#03032C]`}
                            >
                                Take Action
                            </button>

                            {selectedPost?.status === "RESCUING" &&
                                isVolunteer &&
                                authenticated && (
                                    <button
                                        onClick={() =>
                                            completePost(selectedPost?.id!)
                                        }
                                        type="button"
                                        className="w-full self-start text-white font-semibold text-xl py-2 px-3 bg-green-500 whitespace-nowrap rounded-full border-2 border-green-600"
                                    >
                                        Mark as Completed
                                    </button>
                                )}
                        </section>

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
                    </article>
                </DialogContent>
            </Dialog>
        </main>
    );
}
