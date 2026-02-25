"use client";

import { useEffect, useState } from "react";
import { useSettings } from "@/lib/store";
import { getTimingsByCity, AladhanResponse } from "@/lib/api";
import { formatTime } from "@/lib/utils";
import { SettingsPanel } from "./settings-panel";
import { MonthTimeline } from "./month-timeline";
import { AboutSection } from "./about-section";
import { Settings2, MapPin, Moon, Sun, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Dashboard() {
    const { settings, isLoaded, isFirstVisit } = useSettings();
    const [data, setData] = useState<AladhanResponse['data'] | null>(null);
    const [loading, setLoading] = useState(true);
    const [showSettings, setShowSettings] = useState(false);

    useEffect(() => {
        if (isLoaded && isFirstVisit) {
            setShowSettings(true);
        }
    }, [isLoaded, isFirstVisit]);

    // Countdown state
    const [nextEvent, setNextEvent] = useState<{ name: string; time: string; diff: number } | null>(null);
    const [now, setNow] = useState(new Date());

    useEffect(() => {
        if (!isLoaded) return;
        setLoading(true);
        getTimingsByCity({
            city: settings.city,
            country: settings.country,
            method: settings.method,
            school: settings.school
        }).then(res => {
            setData(res);
            setLoading(false);
        });
    }, [settings, isLoaded]);

    useEffect(() => {
        const interval = setInterval(() => {
            setNow(new Date());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (!data) return;
        // Calculate next event (Sehar / Iftar)
        const seharTimeStr = data.timings.Fajr.split(" ")[0]; // e.g. "05:12"
        const iftarTimeStr = data.timings.Maghrib.split(" ")[0];

        const today = new Date();

        // Parse Sehar (Fajr) Date object
        const [sH, sM] = seharTimeStr.split(":");
        const seharDate = new Date(today);
        seharDate.setHours(parseInt(sH), parseInt(sM), 0, 0);

        // Parse Iftar (Maghrib) Date object
        const [iH, iM] = iftarTimeStr.split(":");
        const iftarDate = new Date(today);
        iftarDate.setHours(parseInt(iH), parseInt(iM), 0, 0);

        let next = null;
        const currentMs = now.getTime();

        // If before Sehar, next is Sehar today
        if (currentMs < seharDate.getTime()) {
            next = { name: "Sehar", date: seharDate };
        }
        // If after Sehar but before Iftar, next is Iftar today
        else if (currentMs < iftarDate.getTime()) {
            next = { name: "Iftar", date: iftarDate };
        }
        // If after Iftar, next is Sehar tomorrow (Placeholder logic: we just add 24h to Sehar for demo purposes here)
        else {
            const tomorrowSehar = new Date(seharDate);
            tomorrowSehar.setDate(tomorrowSehar.getDate() + 1);
            next = { name: "Sehar (Next Day)", date: tomorrowSehar };
        }

        const diffMs = next.date.getTime() - currentMs;
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
        const diffSecs = Math.floor((diffMs % (1000 * 60)) / 1000);

        setNextEvent({
            name: next.name,
            time: `${diffHours.toString().padStart(2, '0')}:${diffMins.toString().padStart(2, '0')}:${diffSecs.toString().padStart(2, '0')}`,
            diff: diffMs
        });

    }, [data, now]);

    if (!isLoaded || loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            {/* HEADER */}
            <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12">
                <div className="flex items-center gap-2">
                    <Moon className="w-8 h-8 text-purple-400" />
                    <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-300 tracking-tight">
                        Ramadan<span className="font-light">Sync</span>
                    </h1>
                </div>
                <button
                    onClick={() => setShowSettings(true)}
                    className="flex items-center gap-2 bg-slate-900 border border-slate-800 hover:bg-slate-800 px-4 py-2 rounded-full transition-all text-xs sm:text-sm font-medium w-full sm:w-auto"
                >
                    <MapPin className="w-4 h-4 text-purple-400 shrink-0" />
                    <span className="truncate max-w-[200px]">{settings.city}, {settings.country}</span>
                    <Settings2 className="w-4 h-4 ml-auto sm:ml-1 opacity-50 shrink-0" />
                </button>
            </header>

            {/* HERO COUNTDOWN */}
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-900/40 to-purple-900/40 border border-purple-500/20 p-8 md:p-12 text-center mb-8 backdrop-blur-md"
            >
                <div className="absolute top-0 right-0 p-32 bg-purple-500/10 rounded-full blur-[100px] -z-10" />
                <div className="absolute bottom-0 left-0 p-32 bg-indigo-500/10 rounded-full blur-[100px] -z-10" />

                <p className="text-purple-300 text-xs sm:text-sm md:text-base font-medium tracking-widest uppercase mb-4">
                    Time remaining until {nextEvent?.name}
                </p>
                <div className="text-5xl sm:text-6xl md:text-8xl font-bold text-white tracking-tight font-mono mb-4 text-shadow-sm">
                    {nextEvent?.time || "00:00:00"}
                </div>
                <p className="text-slate-400 text-xs sm:text-sm md:text-base">
                    Islamic Date: {data?.date.hijri.date} / {data?.date.readable}
                </p>
            </motion.div>

            {/* TODAY'S TIMINGS */}
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Clock className="w-5 h-5 text-purple-400" /> Today's Timings
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <TimingBox title="Sehar (Fajr)" time={data!.timings.Fajr} isHighlight variant="purple" />
                <TimingBox title="Sunrise" time={data!.timings.Sunrise} />
                <TimingBox title="Dhuhr" time={data!.timings.Dhuhr} />
                <TimingBox title="Asr" time={data!.timings.Asr} />
                <TimingBox title="Iftar (Maghrib)" time={data!.timings.Maghrib} isHighlight variant="indigo" />
                <TimingBox title="Isha" time={data!.timings.Isha} />
                <TimingBox title="Midnight" time={data!.timings.Midnight} />
            </div>

            <AnimatePresence>
                {showSettings && <SettingsPanel onClose={() => setShowSettings(false)} />}
            </AnimatePresence>

            <MonthTimeline />
            <AboutSection />
        </div>
    );
}

function TimingBox({ title, time, isHighlight = false, variant = "purple" }: { title: string, time: string, isHighlight?: boolean, variant?: "purple" | "indigo" }) {
    const formattedTime = formatTime(time);

    if (isHighlight) {
        const gradient = variant === "purple" ? "from-purple-500/20 to-purple-900/20 border-purple-500/30" : "from-indigo-500/20 to-indigo-900/20 border-indigo-500/30";
        const textCol = variant === "purple" ? "text-purple-300" : "text-indigo-300";
        const Icon = variant === "purple" ? Moon : Sun;

        return (
            <motion.div
                whileHover={{ scale: 1.02 }}
                className={`bg-gradient-to-br ${gradient} border rounded-2xl p-6 relative overflow-hidden flex flex-col justify-center min-h-[140px]`}
            >
                <Icon className={`absolute right-[-10px] bottom-[-10px] w-24 h-24 ${textCol} opacity-10 blur-sm`} />
                <p className={`text-sm font-medium ${textCol} mb-2`}>{title}</p>
                <p className="text-3xl font-bold text-white tracking-tight">{formattedTime}</p>
            </motion.div>
        );
    }

    return (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-center min-h-[140px] hover:bg-slate-800/80 transition-colors">
            <p className="text-sm font-medium text-slate-400 mb-2">{title}</p>
            <p className="text-2xl font-bold text-slate-200">{formattedTime}</p>
        </div>
    );
}
