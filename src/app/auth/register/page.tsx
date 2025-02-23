"use client";

import Link from "next/link";

import { ArrowLeft } from "lucide-react";
import { signup } from "@/app/auth/actions";

export default function Page() {
    return (
        <main className="w-screen h-screen">
            <form
                action={signup}
                className="bg-[#E8E9FC] w-full h-full text-black px-10 pt-10 flex flex-col"
            >
                <section className="flex flex-row items-center justify-center">
                    <Link href={"/auth"} className="absolute left-7">
                        <ArrowLeft className="w-10 h-10" />
                    </Link>
                    <h1 className="text-2xl font-semibold tracking-wide">
                        Register
                    </h1>
                </section>

                <section className="flex flex-col gap-3 py-14">
                    <button
                        type="button"
                        className="w-full bg-[#03032C] text-white rounded-full text-xl py-2"
                    >
                        <span className="font-semibold tracking-wide">
                            Register with Google
                        </span>
                    </button>
                    <button
                        type="button"
                        className="w-full bg-[#03032C] text-white rounded-full text-xl py-2"
                    >
                        <span className="font-semibold tracking-wide">
                            Register with Facebook
                        </span>
                    </button>
                </section>

                <section className="flex flex-row items-center gap-4 py-4">
                    <hr className="w-full h-0.5 bg-[#03032C] text-red-500" />
                    <div className="w-full text-sm whitespace-nowrap tracking-wide">
                        Or Register with Email
                    </div>
                    <hr className="w-full h-0.5 bg-[#03032C] text-red-500" />
                </section>

                <section className="flex flex-col gap-4">
                    <div className="flex flex-col">
                        <label
                            htmlFor="email"
                            className="font-semibold tracking-tight"
                        >
                            Email
                        </label>
                        <input
                            name="email"
                            id="email"
                            placeholder="Enter your email"
                            type="email"
                            className="rounded-full bg-inherit border border-[#5E6E92] py-2 px-4"
                            required
                        />
                    </div>
                    <div className="flex flex-col">
                        <label
                            htmlFor="password"
                            className="font-semibold tracking-tight"
                        >
                            Password
                        </label>
                        <input
                            name="password"
                            id="password"
                            placeholder="Enter your password"
                            type="password"
                            className="rounded-full bg-inherit border border-[#5E6E92] py-2 px-4"
                            required
                        />
                    </div>
                </section>

                <button
                    type="submit"
                    className="w-full bg-[#03032C] text-white rounded-full text-xl py-2 mt-5 mb-2"
                >
                    <span className="font-semibold tracking-wide">
                        Register
                    </span>
                </button>
                <span className="text-neutral-500 text-center">
                    Already have an account?{" "}
                    <Link href={"/auth/login"} className="text-blue-500">
                        Login
                    </Link>
                </span>
                <div className="grow relative">
                    <img
                        src="/register_image.svg"
                        className="object-contain absolute bottom-0"
                    />
                </div>
            </form>
        </main>
    );
}
