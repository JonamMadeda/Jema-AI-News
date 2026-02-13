import { NewsItem } from "@/types/news";
import Link from "next/link";

interface TopHeadlineProps {
    items: NewsItem[];
}

export default function TopHeadline({ items }: TopHeadlineProps) {
    if (!items.length) return null;

    const mainStory = items[0];

    return (
        <section className="mb-8">
            <div className="group relative overflow-hidden rounded-2xl border border-slate-200/60 bg-gradient-to-br from-slate-50/80 to-white premium-shadow hover:premium-shadow-hover hover:border-accent/20 transition-all duration-300">
                <Link href={mainStory.url} target="_blank" className="block p-6 sm:p-10">
                    <div className="flex flex-col gap-3 sm:gap-4">
                        <div className="flex items-center gap-3">
                            <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider bg-accent text-white rounded-full">
                                Featured
                            </span>
                            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-slate-400">
                                {mainStory.source}
                            </span>
                        </div>

                        <h3 className="text-2xl sm:text-4xl font-bold text-slate-900 leading-tight group-hover:text-accent transition-colors">
                            {mainStory.title}
                        </h3>

                        <p className="text-base sm:text-lg text-slate-500 line-clamp-2 sm:line-clamp-3 leading-relaxed max-w-4xl">
                            {mainStory.summary}
                        </p>
                    </div>
                </Link>
            </div>
        </section>
    );
}
