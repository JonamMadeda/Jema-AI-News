"use client";

import { useState } from "react";
import { NewsItem } from "@/types/news";

export function useSavedNews() {
    const [savedItems, setSavedItems] = useState<NewsItem[]>(() => {
        if (typeof window === "undefined") return [];
        const stored = localStorage.getItem("saved_news");
        if (stored) {
            try {
                return JSON.parse(stored);
            } catch (e) {
                console.error("Failed to parse saved news:", e);
            }
        }
        return [];
    });

    const toggleSave = (item: NewsItem) => {
        const isSaved = savedItems.some((i) => i.id === item.id);
        let newSaved;
        if (isSaved) {
            newSaved = savedItems.filter((i) => i.id !== item.id);
        } else {
            newSaved = [...savedItems, item];
        }
        setSavedItems(newSaved);
        localStorage.setItem("saved_news", JSON.stringify(newSaved));
    };

    const isSaved = (id: string) => savedItems.some((i) => i.id === id);

    return { savedItems, toggleSave, isSaved };
}
