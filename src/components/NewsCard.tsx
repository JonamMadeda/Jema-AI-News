import Link from "next/link";
import { Article } from "@/lib/mockData";

interface NewsCardProps {
    article: Article;
}

export default function NewsCard({ article }: NewsCardProps) {
    return (
        <div className="group py-6 border-b border-border/40 last:border-0 hover:bg-muted/30 transition-colors -mx-4 px-4 rounded-md">
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-wider font-medium">
                    <span className="text-foreground">{article.source || "News"}</span>
                    <span>•</span>
                    <time dateTime={article.date}>{new Date(article.date).toLocaleDateString(undefined, {
                        month: 'short',
                        day: 'numeric'
                    })}</time>
                </div>

                <h3 className="text-xl md:text-2xl font-bold leading-tight group-hover:underline decoration-2 underline-offset-4">
                    <Link href={`/article/${article.id}`}>
                        {article.title}
                    </Link>
                </h3>

                {article.summary && (
                    <p className="text-muted-foreground line-clamp-2 leading-relaxed max-w-3xl">
                        {article.summary}
                    </p>
                )}
            </div>
        </div>
    );
}
