import { NewsItem } from "@/types/news";
import Link from "next/link";
import { ExternalLink, Calendar, ArrowRight } from "lucide-react";

interface TopHeadlineProps {
    items: NewsItem[];
}

export default function TopHeadline({ items }: TopHeadlineProps) {
    if (!items.length) return null;

    const mainStory = items[0];
    const sideStories = items.slice(1, 3);

    return (
        <section className="mb-16">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold tracking-tight text-zinc-900 flex items-center gap-2">
                    <span className="text-orange-600">⚡</span> Top Stories
                </h2>
                <span className="text-sm text-zinc-500 font-medium">
                    {new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
                </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Main Story (Left - Large) */}
                <div className="lg:col-span-8 group relative overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm hover:shadow-md transition-all duration-300">
                    <Link href={mainStory.url} target="_blank" className="block h-full relative z-10 flex flex-col justify-end min-h-[400px] lg:min-h-[500px]">
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/40 to-transparent z-0" />

                        {/* Content */}
                        <div className="relative z-10 p-8 lg:p-10 text-white">
                            <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-wider mb-4">
                                <span className="text-zinc-300 bg-black/30 px-2 py-0.5 rounded backdrop-blur-sm border border-white/10">
                                    {mainStory.source}
                                </span>
                            </div>

                            <h3 className="text-3xl lg:text-5xl font-extrabold mb-4 leading-tight tracking-tight text-white group-hover:text-orange-100 transition-colors">
                                {mainStory.title}
                            </h3>

                            <p className="text-zinc-200 line-clamp-3 text-lg max-w-2xl mb-6 leading-relaxed">
                                {mainStory.summary}
                            </p>

                            <div className="flex items-center gap-6 mt-auto text-sm font-medium text-zinc-300/80">
                                <time className="flex items-center gap-1.5">
                                    <Calendar className="w-4 h-4" />
                                    {new Date(mainStory.publishedAt).toLocaleDateString()}
                                </time>
                                <span className="flex items-center gap-1.5 text-white group-hover:translate-x-1 transition-transform">
                                    Read full story <ArrowRight className="w-4 h-4" />
                                </span>
                            </div>
                        </div>

                        {/* Subtle pattern or image placeholder background */}
                        <div className="absolute inset-0 bg-zinc-900 -z-10" />
                    </Link>
                </div>

                {/* Side Stories (Right - Stacked) */}
                <div className="lg:col-span-4 flex flex-col gap-6">
                    {sideStories.map((item) => (
                        <Link
                            key={item.id}
                            href={item.url}
                            target="_blank"
                            className="flex-1 p-6 rounded-2xl border border-zinc-200 bg-white shadow-sm hover:shadow-md transition-all hover:border-orange-200 group flex flex-col justify-center relative overflow-hidden"
                        >
                            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider mb-3 text-zinc-500">
                                <span>{item.source}</span>
                            </div>

                            <h4 className="text-xl font-bold mb-3 leading-snug text-zinc-900 group-hover:text-orange-600 transition-colors">
                                {item.title}
                            </h4>

                            <p className="text-sm text-zinc-600 line-clamp-2 mb-4 leading-relaxed">
                                {item.summary}
                            </p>

                            <div className="flex items-center justify-between text-xs text-zinc-400 mt-auto">
                                <time>{new Date(item.publishedAt).toLocaleDateString()}</time>
                                <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-orange-600" />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
