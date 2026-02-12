export interface NewsItem {
    id: string;
    title: string;
    summary: string;
    source: string;
    publishedAt: string; // ISO date string
    priority: number; // 1 = Highest
    url: string;
}
