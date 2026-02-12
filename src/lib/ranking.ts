import { NewsItem } from "@/types/news";

export function rankNews(items: NewsItem[]): NewsItem[] {
    return [...items].sort((a, b) => {
        // 1. Priority (Ascending: 1 is higher than 2)
        if (a.priority !== b.priority) {
            return a.priority - b.priority;
        }
        // 2. PublishedAt (Descending: Newer is better)
        return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    });
}
