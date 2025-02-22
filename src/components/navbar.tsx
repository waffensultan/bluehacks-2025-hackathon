"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/select";

import { secondaryTags } from "@/lib/constants";

import { Plus } from "lucide-react";
import { createPost } from "@/actions/actions";

export default function Navbar() {
    const [archiveActive, setArchiveActive] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);

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
        <div className="absolute bottom-0 z-50 sticky">
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogTrigger asChild>
                    <button
                        type="button"
                        className="w-16 h-16 border-4 border-white absolute bg-[#03032C] -top-20 right-0 rounded-full flex justify-center items-center"
                    >
                        <Plus className="text-white w-10 h-10" />
                    </button>
                </DialogTrigger>
                <DialogContent className="bg-white border-4 border-[#03032C] text-[#03032C] rounded-xl w-[90%]">
                    <DialogHeader>
                        <DialogTitle className="text-3xl">
                            Create a Post 📝
                        </DialogTitle>
                    </DialogHeader>
                    <form action={createPost} className="flex flex-col gap-3">
                        <div className="flex flex-col">
                            <label
                                htmlFor="name"
                                className="text-xl tracking-wide"
                            >
                                Name
                            </label>
                            <input
                                id="name"
                                name="name"
                                type="string"
                                placeholder="Enter your name here"
                                className="border rounded-2xl py-2 px-4 border-[#5E6E92]"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label
                                htmlFor="baranggay"
                                className="text-xl tracking-wide"
                            >
                                Baranggay
                            </label>
                            <input
                                id="baranggay"
                                name="baranggay"
                                type="string"
                                placeholder="Enter your baranggay here"
                                className="border rounded-2xl py-2 px-4 border-[#5E6E92]"
                            />
                        </div>

                        <div>
                            <fieldset className="space-y-2">
                                <legend className="text-xl tracking-wide">
                                    Priority Group
                                </legend>
                                <div className="space-y-2 flex flex-wrap gap-3">
                                    {[
                                        "Pregnant",
                                        "Senior",
                                        "Child",
                                        "PWD",
                                        "Infant",
                                        "Pet",
                                    ].map((tag) => (
                                        <label
                                            key={tag}
                                            className="flex items-center gap-2 cursor-pointer grow w-20"
                                        >
                                            <input
                                                type="checkbox"
                                                name="priorityGroup"
                                                value={tag}
                                                className="w-5 h-5"
                                            />
                                            <span className="text-lg">
                                                {tag}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </fieldset>
                        </div>

                        <div className="flex flex-col gap-3">
                            <label
                                htmlFor="tags"
                                className="text-xl tracking-wide"
                            >
                                Tags
                            </label>

                            <Select name="naturalDisaster">
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Natural Disaster" />
                                </SelectTrigger>
                                <SelectContent className="w-full text-white bg-white text-black">
                                    {secondaryTags["1"].map((item) => (
                                        <SelectItem key={item} value={item}>
                                            {item}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Select name="rescueEmergency">
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Rescue & Emergency" />
                                </SelectTrigger>
                                <SelectContent className="w-full text-white bg-white text-black">
                                    {secondaryTags["3"].map((item) => (
                                        <SelectItem key={item} value={item}>
                                            {item}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Select name="donationsAid">
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Donations & Aid Requests" />
                                </SelectTrigger>
                                <SelectContent className="w-full text-white bg-white text-black">
                                    {secondaryTags["4"].map((item) => (
                                        <SelectItem key={item} value={item}>
                                            Needs {item}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex w-full justify-center items-center pt-10">
                            <button
                                type="submit"
                                className="font-semibold text-white bg-[#03032C] py-2 px-20 rounded-full tracking-wide text-xl"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>

            <nav className="w-full bg-[#E8E9FC]">
                <ul className="flex flex justify-evenly border-t-2 border-[#03032C] py-5 rounded-xl">
                    {links.map((link) => {
                        const activePath = pathname === link.url;

                        return (
                            <li
                                key={link.name}
                                className={`${activePath ? "bg-[#03032C]" : "bg-white text-[#03032C] border-[#03032C]"}  border-2 rounded-full w-32 text-center py-3`}
                            >
                                <Link href={link.url} className="w-full h-full">
                                    <span className="font-semibold text-xl tracking-tight">
                                        {link.name}
                                    </span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </div>
    );
}
