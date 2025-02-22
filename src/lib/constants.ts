import { LucideIcon, PawPrint, Baby, Accessibility, Bed } from "lucide-react";
import { PostStatus } from "@prisma/client";

export type Tag = "Pet" | "Pregnant" | "Senior" | "Child" | "PWD" | "Infant";
export type Baranggay = "Indang" | "Imus" | "Dasmarinas" | "Alfonso";
export interface Post {
    id: string;
    authorId?: string | null;
    name?: string | null; // Can be "Anonymous"
    status: "AWAITING" | "RESCUING" | "RESCUED";
    createdAt: string; // Serialized Date
    updatedAt: string;
    baranggay: {
        id: string;
        name: string;
    };
    tags: { id: string; title: string }[];
}
export interface NewsInterface {
    id: string;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    baranggay: {
        id: string;
        name: string;
    };
}

export const secondaryTags = {
    "1": ["Earthquake", "Fire", "Tsunami", "Typhoon", "Volcanic Eruption"],
    "2": [
        "Children",
        "Sick",
        "Infant",
        "Person with Disability (PWD)",
        "Pets",
        "Pregnant",
        "Senior Citizen",
    ],
    "3": ["Trapped", "Missing Person", "Evacuation Needed", "Rescue Needed"],
    "4": ["Food", "Water", "Medical Aid", "Clothing", "Shelter"],
};

export const tags: Tag[] = [];
export const convertedStatus: Record<PostStatus, string> = {
    AWAITING: "Awaiting Rescue",
    RESCUING: "Rescue In Progress",
    RESCUED: "Rescued & Safe",
};
export const statusColors: Record<PostStatus, string> = {
    AWAITING: "bg-red-500",
    RESCUING: "bg-yellow-400",
    RESCUED: "bg-green-500",
};
export const tagsWithIcons: Record<string, LucideIcon> = {
    Pet: PawPrint,
    Child: Baby,
    PWD: Accessibility,
    Pregnant: Bed,
    Infant: Bed,
    Senior: Bed,
};
