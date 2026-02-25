"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export interface UserSettings {
    city: string;
    country: string;
    method: number;
    school: number;
}

interface SettingsContextType {
    settings: UserSettings;
    updateSettings: (newSettings: Partial<UserSettings>) => void;
    isLoaded: boolean;
    isFirstVisit: boolean;
}

const defaultSettings: UserSettings = {
    city: "San Francisco",
    country: "United States",
    method: 2, // ISNA
    school: 0, // Shafi
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
    const [settings, setSettings] = useState<UserSettings>(defaultSettings);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isFirstVisit, setIsFirstVisit] = useState(false);

    useEffect(() => {
        // Load from local storage
        const saved = localStorage.getItem("ramadan-app-settings");
        if (saved) {
            try {
                setSettings(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to parse settings", e);
            }
        } else {
            setIsFirstVisit(true);
        }
        setIsLoaded(true);
    }, []);

    const updateSettings = (newSettings: Partial<UserSettings>) => {
        setSettings((prev) => {
            const updated = { ...prev, ...newSettings };
            localStorage.setItem("ramadan-app-settings", JSON.stringify(updated));
            return updated;
        });
        setIsFirstVisit(false);
    };

    return (
        <SettingsContext.Provider value={{ settings, updateSettings, isLoaded, isFirstVisit }}>
            {children}
        </SettingsContext.Provider>
    );
}

export function useSettings() {
    const context = useContext(SettingsContext);
    if (context === undefined) {
        throw new Error("useSettings must be used within a SettingsProvider");
    }
    return context;
}
