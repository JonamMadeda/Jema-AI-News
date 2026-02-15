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
        <div className="group relative py-8 border-b border-slate-200 last:border-0 hover:bg-slate-50/50 transition-colors duration-300 -mx-4 px-4 sm:mx-0 sm:px-0">
            <Link
                href={`/article/${encodeURIComponent(item.id)}`}
                className="block"
            >
                <div className="flex flex-col gap-2 pr-8 min-w-0 max-w-3xl">
                    {/* Metadata Row */}
                    <div className="flex items-center gap-2 text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-slate-500">
                        <span className="text-slate-900">{item.source}</span>
                        <span className="text-slate-300">•</span>
                        <span>{dateFormatted}</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg sm:text-2xl font-bold text-slate-900 group-hover:text-accent transition-colors leading-tight tracking-tight break-words py-1">
                        {item.title}
                    </h3>

                    {/* Summary */}
                    <p className="text-sm sm:text-base text-slate-500 leading-relaxed max-w-4xl break-words font-medium">
                        {item.summary}
                    </p>

                    <div className="flex items-center gap-2 pt-2 group-hover:translate-x-1 transition-all text-slate-900">
                        <span className="text-[9px] font-black uppercase tracking-widest">
                            Read Summary
                        </span>
                        <span className="text-[10px] font-bold">→</span>
                    </div>
                </div>
            </Link>

            {/* Save Button */}
            <button
                onClick={handleSave}
                className="absolute top-8 right-0 sm:right-0 p-2 text-slate-300 hover:text-accent transition-colors"
                title={saved ? "Remove from saved" : "Save for later"}
            >
                {saved ? (
                    <BookmarkCheck className="w-5 h-5 text-accent" />
                ) : (
                    <Bookmark className="w-5 h-5" />
                )}
            </button>
        </div>
    );
}
