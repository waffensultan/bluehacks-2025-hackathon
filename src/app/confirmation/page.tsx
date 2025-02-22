"use client";

import { useState, useEffect } from "react";

import { useRouter } from "next/navigation";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/select";

export default function Page() {
    const [baranggay, setBaranggay] = useState("");

    const router = useRouter();

    useEffect(() => {
        const storedBaranggay = localStorage.getItem("baranggay");
        if (storedBaranggay) {
            setBaranggay(storedBaranggay);
        }
    }, []);

    useEffect(() => {
        if (baranggay !== "") {
            localStorage.setItem("baranggay", baranggay);
            console.log("Successfully saved baranggay:", baranggay);

            const timeout = setTimeout(() => {
                router.push("/");
            }, 1500);

            return () => clearTimeout(timeout);
        }
    }, [baranggay]);

    return (
        <main className="bg-gradient-to-b from-[#6F9BDB] to-[#03032C] h-screen w-screen flex justify-center items-center flex-col gap-40">
            <div className="w-32 h-32">
                <img src="logo.svg" className="object-contain" />
            </div>

            <div className="p-10 rounded-xl bg-[#E8E9FC] text-[#03032C] mx-6 -mt-32">
                <h1 className="text-xl font-semibold">
                    Where are you located?
                </h1>
                <span className="text-neutral-600 text-sm">
                    This data is temporary and we use it to curate news for you.
                </span>
                <div className="flex flex-col gap-4 pt-8">
                    <Select>
                        <SelectTrigger className="w-full border border-[#5E6E92]">
                            <SelectValue placeholder="Province" />
                        </SelectTrigger>
                        <SelectContent className="bg-white text-[#03032C]">
                            <SelectItem value="cavite">Cavite</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select onValueChange={(value) => setBaranggay(value)}>
                        <SelectTrigger className="w-full border-[#5E6E92]">
                            <SelectValue placeholder="City" />
                        </SelectTrigger>
                        <SelectContent className="bg-white text-[#03032C]">
                            <SelectItem value="alfonso">Alfonso</SelectItem>
                            <SelectItem value="dasmarinas">
                                Dasmarinas
                            </SelectItem>
                            <SelectItem value="indang">Indang</SelectItem>
                            <SelectItem value="imus">Imus</SelectItem>
                        </SelectContent>
                    </Select>
                    <button
                        type="submit"
                        className="text-xl rounded-full font-semibold py-2 px-4 bg-[#03032C] text-white mt-7"
                        onClick={() => {
                            if (baranggay) {
                                router.push("/");
                            }
                        }}
                    >
                        Proceed
                    </button>
                </div>
            </div>
        </main>
    );
}
