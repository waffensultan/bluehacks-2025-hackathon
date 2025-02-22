import { LucideIcon, PawPrint, Baby, Accessibility, Bed } from "lucide-react";

export type Tag = "Pet" | "Pregnant" | "Senior" | "Child" | "PWD" | "Infant";

export const tags: Tag[] = [];
export const tagsWithIcon: Record<Tag, LucideIcon> = {
    Pet: PawPrint,
    Child: Baby,
    PWD: Accessibility,
    Pregnant: Bed,
    Infant: Bed,
    Senior: Bed,
};
