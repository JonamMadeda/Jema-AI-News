"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState, useEffect } from "react";

const CATEGORIES = ["All", "Technology", "Research", "Startup"];

export default function FilterBar() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [search, setSearch] = useState(searchParams.get("search") || "");

    // Sync with URL changes (e.g., when clicking "Latest" in header)
    useEffect(() => {
        setSearch(searchParams.get("search") || "");
    }, [searchParams]);

    const createQueryString = useCallback(
        (params: Record<string, string | null>) => {
            const newParams = new URLSearchParams(searchParams.toString());

            Object.entries(params).forEach(([name, value]) => {
                if (value === null || value === "All") {
                    newParams.delete(name);
                } else {
                    newParams.set(name, value);
                }
            });

            // Reset to page 1 when filter changes
            newParams.delete("page");

            return newParams.toString();
        },
        [searchParams]
    );

    const handleSearch = (value: string) => {
        setSearch(value);
        router.push(pathname + "?" + createQueryString({ search: value || null }), { scroll: false });
    };

    const handleCategoryChange = (category: string) => {
        router.push(pathname + "?" + createQueryString({ category }), { scroll: false });
    };

    const currentCategory = searchParams.get("category") || "All";

    return (
        <div className="flex flex-col gap-4 mb-8">
            <div className="relative">
                <input
                    type="text"
                    placeholder="Search news..."
                    value={search}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="w-full bg-muted/50 border border-border/40 rounded-full px-6 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                />
            </div>

            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {CATEGORIES.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => handleCategoryChange(cat)}
                        className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap border ${currentCategory === cat
                                ? "bg-primary text-primary-foreground border-primary"
                                : "bg-muted/50 text-muted-foreground border-border/40 hover:border-border"
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>
        </div>
    );
}
