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
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-zinc-400 group-focus-within:text-[#FF2400] transition-colors" />
                </div>
                <input
                    type="text"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    placeholder="Search news..."
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl py-3.5 pl-12 pr-10 text-sm text-zinc-900 placeholder:text-zinc-400 focus:bg-white focus:ring-2 focus:ring-[#FF2400]/10 focus:border-[#FF2400] transition-all shadow-sm"
                />
                {searchInput && (
                    <button
                        onClick={() => setSearchInput("")}
                        className="absolute inset-y-0 right-4 flex items-center text-zinc-400 hover:text-zinc-600"
                    >
                        <X className="h-4 w-4" />
                    </button>
                )}
            </div>

            {/* Filter Chips */}
            <div className="flex overflow-x-auto no-scrollbar gap-2.5 pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
                {CATEGORIES.map((cat) => {
                    const isActive = currentCategory === cat;
                    return (
                        <button
                            key={cat}
                            onClick={() => setCategory(cat)}
                            className={`flex-none px-5 py-2 rounded-full text-xs font-bold transition-all active:scale-95 shadow-sm whitespace-nowrap ${isActive
                                ? "bg-[#FF2400] text-white"
                                : "bg-white text-zinc-600 border border-zinc-200 hover:bg-zinc-50 hover:text-zinc-900"
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
