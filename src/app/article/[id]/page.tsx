import { mockArticles } from "@/lib/mockData";
import { fetchRSSNews } from "@/lib/rssService";
import { Calendar, User, ArrowLeft, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface ArticlePageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function ArticlePage({ params }: ArticlePageProps) {
    const { id } = await params;

    // Try to find in RSS feed first
    const rssArticles = await fetchRSSNews();
    let article = rssArticles.find((a) => a.id === id);

    // Fallback to mock data
    if (!article) {
        article = mockArticles.find((a) => a.id === id);
    }

    if (!article) {
        return notFound();
    }

    return (
        <article className="container mx-auto py-8 px-4 md:px-8 max-w-3xl">
            <Link
                href="/"
                className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
            >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Back to News
            </Link>

            <div className="mb-4">
                <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-primary-foreground bg-primary rounded-full mb-4">
                    {article.category}
                </span>
                <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 leading-tight">
                    {article.title}
                </h1>
                <div className="flex items-center gap-6 text-sm text-muted-foreground mb-8 border-b pb-8">
                    <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        <span>By <span className="font-medium text-foreground">{article.author}</span></span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <time dateTime={article.date}>{new Date(article.date).toLocaleDateString(undefined, {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}</time>
                    </div>
                    {article.source && (
                        <div className="flex items-center gap-2">
                            <span className="font-medium text-foreground">Source: {article.source}</span>
                        </div>
                    )}
                </div>
            </div>

            <div className="relative w-full aspect-video mb-10 rounded-xl overflow-hidden shadow-lg bg-muted">
                {article.imageUrl ? (
                    <Image
                        src={article.imageUrl}
                        alt={article.title}
                        fill
                        className="object-cover"
                        priority
                    />
                ) : (
                    <div className="flex items-center justify-center h-full text-muted-foreground">No Image Available</div>
                )}
            </div>

            <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="lead text-xl text-muted-foreground font-medium mb-6">
                    {article.summary}
                </p>
                <div className="whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: article.content }} />

                {article.link && (
                    <div className="mt-8">
                        <a
                            href={article.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-primary-foreground bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                        >
                            Read Full Story on {article.source || "Source"} <ExternalLink className="ml-2 -mr-1 w-5 h-5" />
                        </a>
                    </div>
                )}
            </div>
        </article>
    );
}
