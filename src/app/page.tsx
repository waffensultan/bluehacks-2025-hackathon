"use client";

import { createPost } from "@/app/actions";

export default function Page() {
    return (
        <div>
            <button
                className="bg-blue-500 m-3 p-3 rounded-md border"
                type="button"
                onClick={() => createPost()}
            >
                Create sample post
            </button>
        </div>
    );
}
