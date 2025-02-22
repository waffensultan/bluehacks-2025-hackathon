"use server";

import { prisma } from "@/lib/db";

export async function createPost() {
    try {
        await prisma.post.create({
            data: {
                name: "A testing post",
                tags: {
                    create: {
                        title: "Rescue"
                    }
                }
            }
        })

        console.log("Successfully created a post.");
    } catch (error) {
        console.log(`Error: ${error}`);
    }
}
