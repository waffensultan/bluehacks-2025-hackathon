import { ArrowLeft, ImageDown } from "lucide-react";
import Link from "next/link";

export default function Page() {
    return (
        <main className="w-screen h-screen bg-[#E8E9FC]">
            <form className="bg-[#E8E9FC] w-full h-full text-black px-10 pt-10 flex flex-col">
                <section className="flex flex-row items-center justify-center">
                    <Link href={"/"} className="absolute left-7">
                        <ArrowLeft className="w-10 h-10" />
                    </Link>
                    <h1 className="text-2xl font-semibold tracking-wide">
                        Validation
                    </h1>
                </section>

                <section className="flex flex-col gap-4 pt-20 pb-10">
                    <div className="flex flex-col">
                        <label
                            htmlFor="affiliation"
                            className="font-semibold tracking-tight"
                        >
                            Affiliation or Organization
                        </label>
                        <input
                            name="affiliation"
                            id="affiliation"
                            placeholder="Enter your affiliation/organization"
                            type="string"
                            className="rounded-full bg-inherit border border-[#5E6E92] py-2 px-4"
                            required
                        />
                    </div>
                    <div className="flex flex-col">
                        <label
                            htmlFor="organizationType"
                            className="font-semibold tracking-tight"
                        >
                            Type of Organization
                        </label>
                        <input
                            name="organizationType"
                            id="organizationType"
                            placeholder="Enter the type of your organization"
                            type="string"
                            className="rounded-full bg-inherit border border-[#5E6E92] py-2 px-4"
                            required
                        />
                    </div>
                    <div className="flex flex-col">
                        <label
                            htmlFor="image"
                            className="font-semibold tracking-tight"
                        >
                            Upload proof of identity
                        </label>
                        <div className="w-full bg-gray-400 rounded-md h-32 flex justify-center items-center">
                            <ImageDown className="w-20 h-20" />
                        </div>
                    </div>
                </section>

                <button
                    type="submit"
                    className="w-full bg-[#03032C] text-white rounded-full text-xl py-2 mt-5 mb-2"
                >
                    <span className="font-semibold tracking-wide">Apply</span>
                </button>
                <span className="text-neutral-500 text-center">
                    It might take us a few business days to respond to your
                    application.
                </span>
                <div className="grow relative">
                    <img
                        src="/login_character.svg"
                        className="object-contain absolute bottom-0"
                    />
                </div>
            </form>
        </main>
    );
}
