"use client";

import { Search, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const CATEGORIES = ["All", "Artificial Intelligence", "Industry", "Research", "Governance"];

export default function FilterBar() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const currentSearch = searchParams.get("q") || "";
    const currentCategory = searchParams.get("category") || "All";

    const [searchInput, setSearchInput] = useState(currentSearch);

    // Debounced search update
    useEffect(() => {
        // Skip if input matches current URL query to prevent loop
        if (searchInput === currentSearch) return;

        const timer = setTimeout(() => {
            const params = new URLSearchParams(searchParams.toString());
            if (searchInput) {
                params.set("q", searchInput);
            } else {
                params.delete("q");
            }
            params.set("page", "1"); // Reset pagination on search
            router.push(`/?${params.toString()}`);
        }, 500);

        return () => clearTimeout(timer);
    }, [searchInput, currentSearch, router, searchParams]);

    const setCategory = (category: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (category === "All") {
            params.delete("category");
        } else {
            params.set("category", category);
        }
        params.set("page", "1"); // Reset pagination
        router.push(`/?${params.toString()}`);
    };

    return (
        <div className="mb-10 space-y-6">
            {/* Search Input */}
            <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-slate-400 group-focus-within:text-accent transition-colors" />
                </div>
                <input
                    type="text"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    placeholder="Search news..."
                    className="w-full bg-white border border-slate-200 rounded-lg pl-10 pr-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-accent/5 focus:border-accent/30 transition-all premium-shadow"
                />
            </div>

            {/* Filter Chips */}
            <div className="flex flex-wrap sm:flex-nowrap sm:overflow-x-auto no-scrollbar gap-2 py-2">
                {CATEGORIES.map((cat) => {
                    const isActive = currentCategory === cat;
                    return (
                        <button
                            key={cat}
                            onClick={() => setCategory(cat)}
                            className={`flex-none px-3 py-1 sm:px-4 sm:py-1.5 text-[11px] sm:text-sm font-bold uppercase tracking-wider transition-all whitespace-nowrap rounded-full ${isActive
                                ? "bg-accent text-white shadow-sm shadow-accent/20"
                                : "text-slate-500 bg-slate-100/50 hover:bg-slate-100 hover:text-slate-700"
                                }`}
                        >
                            {cat}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
