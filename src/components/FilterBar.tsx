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
        <div className="mb-10 space-y-8">
            {/* Search Input */}
            <div className="relative group">
                <input
                    type="text"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    placeholder="Search headlines, events or topics..."
                    className="w-full bg-transparent border-b border-slate-200 py-3 text-lg sm:text-xl font-medium text-slate-900 placeholder:text-slate-300 focus:outline-none focus:border-slate-400 transition-colors"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-slate-300" />
                </div>
            </div>

            {/* Filter Categories */}
            <div className="flex flex-wrap sm:flex-nowrap sm:overflow-x-auto no-scrollbar gap-5 sm:gap-6 border-b border-slate-200">
                {CATEGORIES.map((cat) => {
                    const isActive = currentCategory === cat;
                    return (
                        <button
                            key={cat}
                            onClick={() => setCategory(cat)}
                            className={`flex-none pb-3 text-[10px] sm:text-[11px] font-bold uppercase tracking-widest transition-all whitespace-nowrap border-b-2 ${isActive
                                ? "border-slate-900 text-slate-900"
                                : "border-transparent text-slate-400 hover:text-slate-600 hover:border-slate-300"
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
