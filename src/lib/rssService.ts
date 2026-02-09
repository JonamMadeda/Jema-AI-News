import Parser from "rss-parser";
import { Article } from "./mockData";

const parser = new Parser();

const FEEDS = [
    {
        url: "https://www.wired.com/feed/tag/ai/latest/rss",
        source: "Wired",
        category: "Technology",
    },
    {
        url: "https://www.theverge.com/rss/artificial-intelligence/index.xml",
        source: "The Verge",
        category: "Technology",
    },
    {
        url: "https://www.technologyreview.com/topic/artificial-intelligence/feed",
        source: "MIT Tech Review",
        category: "Research",
    },
    {
        url: "https://techcrunch.com/category/artificial-intelligence/feed/",
        source: "TechCrunch",
        category: "Startup",
    },
];

export async function fetchRSSNews(): Promise<Article[]> {
    const allArticles: Article[] = [];

    const feedPromises = FEEDS.map(async (feed) => {
        try {
            const feedData = await parser.parseURL(feed.url);

            feedData.items.forEach((item) => {
                if (!item.title || !item.link || !item.isoDate) return;

                // Extract image from content or enclosure if available
                let imageUrl =
                    "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1000"; // Fallback

                if (item.enclosure && item.enclosure.url && item.enclosure.type?.startsWith("image")) {
                    imageUrl = item.enclosure.url;
                } else if (item.content) {
                    const imgMatch = item.content.match(/<img[^>]+src="([^">]+)"/);
                    if (imgMatch) {
                        imageUrl = imgMatch[1];
                    }
                }

                allArticles.push({
                    id: Buffer.from(item.link).toString("hex"), // Generate stable ID from link (hex is URL-safe)
                    title: item.title,
                    summary: item.contentSnippet || item.content?.substring(0, 150) + "..." || "",
                    content: item.content || "", // Full content might be limited in RSS
                    author: item.creator || feed.source,
                    date: new Date(item.isoDate).toISOString().split("T")[0],
                    category: feed.category,
                    imageUrl: imageUrl,
                    source: feed.source,
                    link: item.link,
                });
            });
        } catch (error) {
            console.error(`Error fetching feed from ${feed.source}:`, error);
        }
    });

    await Promise.all(feedPromises);

    // Sort by date descending
    return allArticles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
