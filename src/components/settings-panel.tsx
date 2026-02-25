"use client";

import { useState } from "react";
import { useSettings } from "@/lib/store";
import { MapPin, Settings2, X } from "lucide-react";

export function SettingsPanel({ onClose }: { onClose: () => void }) {
    const { settings, updateSettings } = useSettings();
    const [city, setCity] = useState(settings.city);
    const [country, setCountry] = useState(settings.country);
    const [method, setMethod] = useState(settings.method);
    const [school, setSchool] = useState(settings.school);
    const [errors, setErrors] = useState<{ city?: string; country?: string }>({});

    const handleSave = () => {
        const nextErrors: { city?: string; country?: string } = {};
        const trimmedCity = city.trim();
        const trimmedCountry = country.trim();

        if (!trimmedCity) {
            nextErrors.city = "City is required";
        }

        if (!trimmedCountry) {
            nextErrors.country = "Country is required";
        }

        if (Object.keys(nextErrors).length > 0) {
            setErrors(nextErrors);
            return;
        }

        setErrors({});
        updateSettings({ city: trimmedCity, country: trimmedCountry, method, school });
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-purple-500 to-indigo-500" />

                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold flex items-center gap-2 text-[#ffffff]">
                        <Settings2 className="w-5 h-5 text-purple-400" />
                        Configuration
                    </h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-1">City</label>
                        <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                            <input
                                type="text"
                                value={city}
                                onChange={(e) => {
                                    setCity(e.target.value);
                                    if (errors.city) setErrors((prev) => ({ ...prev, city: undefined }));
                                }}
                                className="w-full text-[#ffffff] bg-slate-950 border border-slate-800 rounded-xl py-2 pl-10 pr-4 focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all"
                                placeholder="E.g. San Francisco"
                            />
                        </div>
                        {errors.city && <p className="mt-1 text-xs text-red-400">{errors.city}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-1">Country</label>
                        <input
                            type="text"
                            value={country}
                            onChange={(e) => {
                                setCountry(e.target.value);
                                if (errors.country) setErrors((prev) => ({ ...prev, country: undefined }));
                            }}
                            className="w-full text-[#ffffff] bg-slate-950 border border-slate-800 rounded-xl py-2 px-4 focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all"
                            placeholder="E.g. United States"
                        />
                        {errors.country && <p className="mt-1 text-xs text-red-400">{errors.country}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-1">Method</label>
                            <select
                                value={method}
                                onChange={(e) => setMethod(Number(e.target.value))}
                                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-4 focus:ring-2 focus:ring-purple-500 focus:outline-none appearance-none"
                            >
                                <option value={2}>ISNA (NA)</option>
                                <option value={3}>MWL (Europe)</option>
                                <option value={1}>Umm Al-Qura</option>
                                <option value={4}>Makkah</option>
                                <option value={5}>Egyptian</option>
                                <option value={0}>Shia Ithna Ashari</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-1">School</label>
                            <select
                                value={school}
                                onChange={(e) => setSchool(Number(e.target.value))}
                                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-4 focus:ring-2 focus:ring-purple-500 focus:outline-none appearance-none"
                            >
                                <option value={0}>Shafi / Maliki</option>
                                <option value={1}>Hanafi</option>
                            </select>
                        </div>
                    </div>
                </div>

                <button
                    onClick={handleSave}
                    className="mt-8 w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-medium py-3 rounded-xl transition-all shadow-[0_0_20px_rgba(168,85,247,0.4)]"
                >
                    Save & Apply
                </button>
            </div>
        </div>
    );
}
