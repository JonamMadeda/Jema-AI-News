"use client";

import { NewsItem } from "@/types/news";
import Link from "next/link";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { useSavedNews } from "@/hooks/useSavedNews";

interface NewsCardProps {
    item: NewsItem;
}

export default function NewsCard({ item }: NewsCardProps) {
    const { toggleSave, isSaved } = useSavedNews();
    const saved = isSaved(item.id);

    const dateFormatted = new Date(item.publishedAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
    }).toUpperCase();

    const handleSave = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        toggleSave(item);
    };

    return (
        <div className="group relative py-8 border-b border-zinc-200/60 last:border-0 hover:bg-zinc-50/50 transition-colors -mx-4 px-4 sm:mx-0 sm:px-0">
            <Link
                href={`/article/${encodeURIComponent(item.id)}`}
                className="block"
            >
                <div className="flex flex-col gap-2.5 pr-8"> {/* Padding for bookmark button */}
                    {/* Metadata Row */}
                    <div className="flex items-center gap-2.5 text-[11px] font-bold tracking-[0.1em] text-zinc-400 uppercase">
                        <span className="text-zinc-900">{item.source}</span>
                        <span className="text-zinc-200">•</span>
                        <span>{dateFormatted}</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl md:text-[26px] font-extrabold text-[#09090b] group-hover:text-zinc-800 transition-colors leading-[1.15] tracking-tight">
                        {item.title}
                    </h3>

                    {/* Summary */}
                    <p className="text-[15px] md:text-lg text-zinc-600 line-clamp-2 leading-relaxed max-w-3xl">
                        {item.summary}
                    </p>
                </div>
            </Link>

            {/* Bookmark Button */}
            <button
                onClick={handleSave}
                className="absolute top-8 right-0 p-2 text-zinc-300 hover:text-[#FF2400] transition-colors"
                title={saved ? "Remove from saved" : "Save for later"}
            >
                {saved ? (
                    <BookmarkCheck className="w-5 h-5 text-[#FF2400]" />
                ) : (
                    <Bookmark className="w-5 h-5" />
                )}
            </button>
        </div>
    );
}
