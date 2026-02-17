import Parser from "rss-parser";
import { NewsItem } from "@/types/news";
import { rankNews } from "./ranking";

const parser = new Parser({
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }
});

const FEEDS = [
    { url: "https://techcrunch.com/category/artificial-intelligence/feed/", source: "TechCrunch" },
    { url: "https://www.theverge.com/rss/index.xml", source: "The Verge" },
    { url: "https://www.wired.com/feed/tag/ai/latest/rss", source: "Wired" },
    { url: "https://news.google.com/rss/topics/CAAqJggKIiBDQkFTRWdvSUwyMHZNRGRqTVhZU0FtVnVHZ0pWVXlnQVAB?hl=en-US&gl=US&ceid=US:en", source: "Google News (AI)" },
    { url: "https://www.artificialintelligence-news.com/feed/", source: "Artificial Intelligence News" },
    { url: "https://www.analyticsvidhya.com/blog/category/artificial-intelligence/feed/", source: "Analytics Vidhya" },
    { url: "https://openai.com/news/rss.xml", source: "OpenAI" },
    { url: "https://www.technologyreview.com/topic/artificial-intelligence/feed/", source: "MIT Tech Review" }
];

let cachedNews: NewsItem[] | null = null;
let lastFetched: number = 0;
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

export async function getNews(page: number = 1, limit: number = 5): Promise<{ items: NewsItem[]; total: number }> {
    try {
        const now = Date.now();
        let allItems: NewsItem[] = [];

        if (cachedNews && (now - lastFetched < CACHE_TTL)) {
            allItems = cachedNews;
        } else {
            const feedResults = await Promise.all(
                FEEDS.map(async (f) => {
                    try {
                        const feed = await parser.parseURL(f.url);
                        return feed.items.map((item) => ({
                            id: item.guid || item.link || Math.random().toString(),
                            title: item.title || "No Title",
                            summary: (item.contentSnippet || item.content || "").slice(0, 160) + "...",
                            source: f.source,
                            publishedAt: item.pubDate ? new Date(item.pubDate).toISOString() : new Date().toISOString(),
                            priority: f.source === "OpenAI" ? 1 : 2,
                            url: item.link || "",
                        }));
                    } catch (e) {
                        console.error(`Failed to fetch ${f.source}:`, e);
                        return [];
                    }
                })
            );

            allItems = feedResults.flat();
            cachedNews = allItems;
            lastFetched = now;
        }

        const sorted = rankNews(allItems);

        const start = (page - 1) * limit;
        const end = start + limit;

        return {
            items: sorted.slice(start, end),
            total: sorted.length
        };
    } catch (error) {
        console.error("News fetching failed:", error);
        return { items: [], total: 0 };
    }
}

export async function getArticleById(id: string): Promise<NewsItem | null> {
    const { items } = await getNews(1, 100);
    return items.find(item => item.id === id) || null;
}

