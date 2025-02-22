import { PostStatus } from "@prisma/client";
import { prisma } from "../src/lib/db"

const TAGS = ["Pet", "Pregnant", "Senior", "Child", "PWD", "Infant"];

async function main() {
    // Create News entries
    await prisma.news.createMany({
        data: [
            { name: "Flood Warning Issued for Metro Manila" },
            { name: "Typhoon Expected to Make Landfall Soon" },
            { name: "Emergency Hotline System Upgraded" },
        ],
    });

    // Create Post entries
    for (let i = 0; i < 5; i++) {
        await prisma.post.create({
            data: {
                name: i % 2 === 0 ? "Anonymous" : `User ${i}`,
                status: PostStatus.AWAITING,
                tags: {
                    create: getRandomTags(),
                },
            },
            include: { tags: true },
        });
    }
}

function getRandomTags() {
    return TAGS.sort(() => 0.5 - Math.random()) // Shuffle
        .slice(0, Math.floor(Math.random() * TAGS.length) + 1) // Get 1-6 tags
        .map((tag) => ({ title: tag }));
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);

        await prisma.$disconnect();

        process.exit(1);
    });
