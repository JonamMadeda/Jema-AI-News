import { NewsItem } from "@/types/news";
import NewsCard from "./NewsCard";

interface NewsFeedProps {
    items: NewsItem[];
}

export default function NewsFeed({ items }: NewsFeedProps) {
    if (!items.length) return null;

    return (
        <section className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-zinc-200">
                <h2 className="text-xl font-bold text-zinc-900 flex items-center gap-2">
                    Latest Updates
                </h2>
                <span className="text-xs font-bold bg-zinc-100 text-zinc-600 px-2 py-0.5 rounded-full">
                    {items.length}
                </span>
            </div>

            <div className="flex flex-col">
                {items.map((item) => (
                    <NewsCard key={item.id} item={item} />
                ))}
            </div>
        </section>
    );
}
