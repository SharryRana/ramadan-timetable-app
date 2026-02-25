"use client";

import { useEffect, useState } from "react";
import { useSettings } from "@/lib/store";
import { getCalendarByCity, AladhanCalendarResponse } from "@/lib/api";
import { formatTime } from "@/lib/utils";
import { CalendarDays } from "lucide-react";
import { motion } from "framer-motion";

export function MonthTimeline() {
    const { settings, isLoaded } = useSettings();
    const [data, setData] = useState<AladhanCalendarResponse['data'] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!isLoaded) return;

        const city = settings.city.trim();
        const country = settings.country.trim();

        if (!city || !country) {
            setData(null);
            setError("City and country are required to load the monthly calendar.");
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);
        getCalendarByCity({
            city,
            country,
            method: settings.method,
            school: settings.school
        }).then(res => {
            if (!res) {
                setData(null);
                setError("Could not load monthly calendar for this location.");
            } else {
                setData(res);
                setError(null);
            }
            setLoading(false);
        });
    }, [settings, isLoaded]);

    if (!isLoaded || loading) {
        return (
            <div className="py-12 flex justify-center">
                <div className="w-8 h-8 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
            </div>
        );
    }

    if (!data) {
        return (
            <div className="mt-16 rounded-3xl border border-red-500/20 bg-red-900/10 p-6 text-sm text-red-200">
                {error || "Monthly calendar is currently unavailable."}
            </div>
        );
    }

    // Filter to only show dates from today onwards in the current month, or the whole month if preferred.
    // We will show the whole month in a sleek scrollable grid or list.

    return (
        <div className="mt-16">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <CalendarDays className="w-5 h-5 text-purple-400" /> Full Month Calendar
            </h2>

            <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-950/50 border-b border-slate-800">
                                <th className="p-3 sm:p-4 font-medium text-[#ffffff] text-xs sm:text-sm">Date</th>
                                <th className="p-3 sm:p-4 font-medium text-[#ffffff] text-xs sm:text-sm hidden sm:table-cell">Islamic Date</th>
                                <th className="p-3 sm:p-4 font-medium text-purple-400 text-xs sm:text-sm">Sehar (Fajr)</th>
                                <th className="p-3 sm:p-4 font-medium text-indigo-400 text-xs sm:text-sm">Iftar (Maghrib)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((day, idx) => {
                                const isToday = day.date.gregorian.date === new Date().toLocaleDateString('en-GB').replace(/\//g, '-'); // Approximating today match

                                return (
                                    <motion.tr
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.02 }}
                                        key={day.date.timestamp}
                                        className={`border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors ${isToday ? 'bg-purple-900/10' : ''}`}
                                    >
                                        <td className="p-3 sm:p-4">
                                            <div className="font-medium text-slate-200 text-xs sm:text-base">{day.date.readable.substring(0, 6)}</div>
                                            <div className="text-[10px] sm:text-xs text-slate-500">{day.date.gregorian.weekday.en}</div>
                                        </td>
                                        <td className="p-3 sm:p-4 text-slate-300 text-xs sm:text-sm hidden sm:table-cell">
                                            {day.date.hijri.day} {day.date.hijri.month.en}
                                        </td>
                                        <td className="p-3 sm:p-4 font-bold text-white text-sm sm:text-base">
                                            {formatTime(day.timings.Fajr)}
                                        </td>
                                        <td className="p-3 sm:p-4 font-bold text-white text-sm sm:text-base">
                                            {formatTime(day.timings.Maghrib)}
                                        </td>
                                    </motion.tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
