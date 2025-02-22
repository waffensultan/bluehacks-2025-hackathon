"use client";

import Link from "next/link";

export default function Page() {
    return (
        <main className="relative h-screen w-screen flex flex-col justify-end">
            <div className="w-full absolute bg-[#E8E9FC] text-black rounded-t-3xl flex flex-col gap-10 justify-center items-center py-10">
                <section className="text-center w-full px-7 flex flex-col gap-4">
                    <h1 className="font-bold text-3xl tracking-tight">
                        Stay Safe,
                        <br />
                        Stay Connected 🌍
                    </h1>
                    <p className="text-[17px]">
                        Join a community dedicated to disaster response.{" "}
                        <b>Volunteer</b>, <b>request help</b>, and{" "}
                        <b>stay informed</b> with real-time updates from your
                        location.
                    </p>
                </section>
                <footer className="w-full flex flex-col gap-3 px-5">
                    <div className="flex flex-row w-full gap-4">
                        <Link href={"/auth/login"} className="w-full">
                            <button
                                type="button"
                                className="w-full bg-[#03032C] text-white rounded-full text-xl py-2"
                            >
                                <span className="font-semibold tracking-wide">
                                    Login
                                </span>
                            </button>
                        </Link>
                        <Link href={"/auth/register"} className="w-full">
                            <button
                                type="button"
                                className="w-full bg-[#03032C] text-white rounded-full text-xl py-2"
                            >
                                <span className="font-semibold tracking-wide">
                                    Register
                                </span>
                            </button>
                        </Link>
                    </div>
                    <button
                        type="button"
                        className="border-4 border-[#03032C] text-[#03032C] rounded-full py-2"
                    >
                        <span className="font-semibold tracking-wide text-xl">
                            Continue as Guest
                        </span>
                    </button>
                </footer>
            </div>
        </main>
    );
}
