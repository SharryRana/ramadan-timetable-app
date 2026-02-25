import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// Format the Aladhan prayer time "HH:mm (Timezone)" -> "hh:mm a"
export function formatTime(aladhanTime: string): string {
    if (!aladhanTime) return "";
    const timePart = aladhanTime.split(" ")[0];
    const [h, m] = timePart.split(":");
    const hours = parseInt(h, 10);
    const minutes = parseInt(m, 10);

    const d = new Date();
    d.setHours(hours, minutes, 0, 0);

    return d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });
}
