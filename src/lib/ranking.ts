import { NewsItem } from "@/types/news";

export function rankNews(items: NewsItem[]): NewsItem[] {
    return [...items].sort((a, b) => {
        // Just verify dates are valid, fallback to 0 if not
        const dateA = new Date(a.publishedAt).getTime() || 0;
        const dateB = new Date(b.publishedAt).getTime() || 0;
        return dateB - dateA;
    });
}
