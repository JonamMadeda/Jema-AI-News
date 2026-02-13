"use client";

import { useSavedNews } from "@/hooks/useSavedNews";
import NewsCard from "@/components/NewsCard";
import DateHeader from "@/components/DateHeader";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function SavedPage() {
    const { savedItems } = useSavedNews();

    return (
        <div className="mx-auto px-4 max-w-5xl py-8 min-h-screen">
            <Link
                href="/"
                className="flex items-center gap-2 text-sm text-zinc-400 hover:text-zinc-900 mb-8 transition-colors group"
            >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Back to Latest
            </Link>

            <DateHeader count={savedItems.length} />

            <div className="mb-10">
                <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Saved Articles</h1>
                <p className="text-slate-500 mt-2">Your personal collection of news, saved locally.</p>
            </div>

            <div className="flex flex-col">
                {savedItems.length > 0 ? (
                    savedItems.map((item) => (
                        <NewsCard key={item.id} item={item} />
                    ))
                ) : (
                    <div className="text-center py-20 border border-slate-100 rounded">
                        <p className="text-slate-400">You haven&apos;t saved any articles yet.</p>
                        <Link
                            href="/"
                            className="mt-4 inline-block text-sm font-semibold text-accent hover:underline"
                        >
                            Browse Latest News
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
