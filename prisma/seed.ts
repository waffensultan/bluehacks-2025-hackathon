import { PrismaClient, PostStatus } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    console.log("🔄 Deleting existing data...");

    await prisma.tag.deleteMany({});
    await prisma.post.deleteMany({});
    await prisma.news.deleteMany({});
    await prisma.user.deleteMany({});
    await prisma.baranggay.deleteMany({});

    console.log("✅ Database cleared. Seeding fresh data...");

    // Seed Baranggays
    const baranggays = await prisma.baranggay.createMany({
        data: [
            { id: "1", name: "Indang" },
            { id: "2", name: "Imus" },
            { id: "3", name: "Dasmarinas" },
            { id: "4", name: "Alfonso" },
        ],
    });

    console.log("✅ Baranggays added!");

    // Fetch Baranggay IDs
    const baranggayIndang = await prisma.baranggay.findFirst({
        where: { name: "Indang" },
    });
    const baranggayImus = await prisma.baranggay.findFirst({
        where: { name: "Imus" },
    });
    const baranggayDasma = await prisma.baranggay.findFirst({
        where: { name: "Dasmarinas" },
    });
    const baranggayAlfonso = await prisma.baranggay.findFirst({
        where: { name: "Alfonso" },
    });

    // Seed Users
    const user1 = await prisma.user.create({
        data: {
            name: "John Doe",
            email: "john@example.com",
            isVolunteer: true,
        },
    });

    const user2 = await prisma.user.create({
        data: {
            name: "Jane Smith",
            email: "jane@example.com",
            isVolunteer: false,
        },
    });

    console.log("✅ Users added!");

    // Seed Posts
    const post1 = await prisma.post.create({
        data: {
            name: "Anonymous",
            status: PostStatus.AWAITING,
            baranggayId: baranggayIndang?.id || "",
            authorId: user1.id,
        },
    });

    const post2 = await prisma.post.create({
        data: {
            name: "Maria Santos",
            status: PostStatus.RESCUING,
            baranggayId: baranggayImus?.id || "",
            authorId: user2.id,
        },
    });

    console.log("✅ Posts added!");

    // Seed Tags
    await prisma.tag.createMany({
        data: [
            { title: "Child", postId: post1.id },
            { title: "Pregnant", postId: post2.id },
        ],
    });

    console.log("✅ Tags added!");

    // Seed News for Each Baranggay
    await prisma.news.createMany({
        data: [
            {
                title: "Indang Faces Power Outage Due to Heavy Rainfall",
                content:
                    "Several areas in Indang experienced power interruptions following heavy rains. Authorities are working on restoring power lines.",
                baranggayId: baranggayIndang?.id || "",
            },
            {
                title: "Imus Implements Stricter Traffic Rules",
                content:
                    "The city government of Imus has enforced new traffic policies to ease congestion during peak hours. Motorists are advised to follow the new guidelines.",
                baranggayId: baranggayImus?.id || "",
            },
            {
                title: "Dasmariñas Residents Urged to Prepare for Typhoon",
                content:
                    "With a typhoon expected to make landfall, officials in Dasmariñas are advising residents to stock up on supplies and stay indoors.",
                baranggayId: baranggayDasma?.id || "",
            },
            {
                title: "Alfonso Launches Free Medical Checkups for Seniors",
                content:
                    "The local government of Alfonso has initiated a free medical checkup program for senior citizens to promote health awareness.",
                baranggayId: baranggayAlfonso?.id || "",
            },
        ],
    });

    console.log("✅ News added for each baranggay!");
}

main()
    .catch((e) => {
        console.error("❌ Error seeding database:", e);
    })
    .finally(async () => {
        await prisma.$disconnect();
        console.log("🌱 Seeding completed!");
    });
