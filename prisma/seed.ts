import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    // Fetch all baranggays with correct field name
    const baranggays = await prisma.baranggay.findMany();

    const newsData = [
        {
            title: "Flooding in Indang",
            content:
                "Heavy rains have caused flooding in several areas of Indang. Residents are advised to take precautions.",
            baranggayId: "1",
        },
        {
            title: "Fire Incident in Imus",
            content:
                "A fire broke out in a residential area in Imus. Firefighters are currently on the scene.",
            baranggayId: "2",
        },
        {
            title: "Traffic Congestion in Dasmariñas",
            content:
                "Heavy traffic has been reported on major roads in Dasmariñas due to ongoing roadworks.",
            baranggayId: "3",
        },
        {
            title: "Power Outage in Alfonso",
            content:
                "Residents of Alfonso are experiencing a power outage due to maintenance work by the local power provider.",
            baranggayId: "4",
        },
    ];

    // Ensure only valid data is inserted
    const filteredNewsData = newsData

    if (filteredNewsData.length > 0) {
        await prisma.news.createMany({ data: filteredNewsData });
        console.log("✅ News seeding completed!");
    } else {
        console.log("⚠️ No valid baranggay data found. Seeding skipped.");
    }
}

main()
    .catch((e) => {
        console.error("❌ Seeding failed:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
