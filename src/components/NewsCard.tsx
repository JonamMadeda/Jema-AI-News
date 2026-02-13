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
        <div className="group relative py-6 border-b border-slate-100 last:border-0 hover:bg-white hover:premium-shadow-hover hover:border-transparent transition-all duration-300 px-2 sm:px-6 sm:rounded-xl overflow-hidden">
            <Link
                href={`/article/${encodeURIComponent(item.id)}`}
                className="block"
            >
                <div className="flex flex-col gap-3 pr-8 min-w-0">
                    {/* Metadata Row */}
                    <div className="flex items-center gap-2 text-[11px] sm:text-[13px] font-bold uppercase tracking-wider text-slate-400">
                        <span className="text-slate-500">{item.source}</span>
                        <span className="text-slate-300">•</span>
                        <span>{dateFormatted}</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-accent transition-colors leading-tight break-words">
                        {item.title}
                    </h3>

                    {/* Summary */}
                    <p className="text-base text-slate-500 line-clamp-3 leading-relaxed max-w-4xl break-words">
                        {item.summary}
                    </p>

                    <div className="flex items-center gap-1.5 pt-2 group-hover:translate-x-1 transition-all text-slate-400 group-hover:text-slate-600">
                        <span className="text-xs font-bold uppercase tracking-widest">
                            Read Summary
                        </span>
                        <span>→</span>
                    </div>
                </div>
            </Link>

            {/* Save Button */}
            <button
                onClick={handleSave}
                className="absolute top-4 right-0 p-2 text-slate-200 hover:text-slate-400 transition-colors"
                title={saved ? "Remove from saved" : "Save for later"}
            >
                {saved ? (
                    <BookmarkCheck className="w-4 h-4 text-accent" />
                ) : (
                    <Bookmark className="w-4 h-4" />
                )}
            </button>
        </div>
    );
}
