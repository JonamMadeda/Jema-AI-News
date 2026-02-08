import { Article } from "@/lib/mockData";
import NewsCard from "./NewsCard";

interface NewsGridProps {
    articles: Article[];
}

export default function NewsGrid({ articles }: NewsGridProps) {
    if (!articles || articles.length === 0) {
        return <div className="text-center py-20 text-muted-foreground">No articles found.</div>;
    }

    return (
        <div className="max-w-2xl mx-auto">
            <div className="space-y-2">
                {articles.map((article) => (
                    <NewsCard key={article.id} article={article} />
                ))}
            </div>
        </div>
    );
}
