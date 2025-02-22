"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function createPost(formData: FormData) {
    const name = formData.get("name") as string;
    const baranggayName = formData.get("baranggay") as string;

    // Primary Tags
    const selectedPriorityGroups = formData.getAll("priorityGroup") as string[];

    // Secondary Tags
    const naturalDisaster = formData.get("naturalDisaster") as string;
    const rescueEmergency = formData.get("rescueEmergency") as string;
    const donationsAid = formData.get("donationsAid") as string;

    // Combine all tags into a single array (filter out any null values)
    const tags = [
        ...selectedPriorityGroups,
        naturalDisaster,
        rescueEmergency,
        donationsAid,
    ].filter(Boolean); // Remove empty values

    try {
        // Find or create the baranggay
        let baranggay = await prisma.baranggay.findFirst({
            where: { name: baranggayName },
        });

        if (!baranggay) {
            baranggay = await prisma.baranggay.create({
                data: { name: baranggayName },
            });
        }

        // Create the post
        await prisma.post.create({
            data: {
                name,
                tags: {
                    create: tags.map((tag) => ({ title: tag })),
                },
                baranggayId: baranggay.id, // Use the found or created baranggay ID
            },
            include: {
                tags: true,
            },
        });

        revalidatePath("/");
    } catch (error) {
        console.error("Error creating post:", error);
        throw new Error("Failed to create post.");
    }
}
