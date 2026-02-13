import { getArticleById } from "@/lib/newsService";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { notFound } from "next/navigation";

interface ArticlePageProps {
    params: { id: string };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
    const { id } = await params;
    const decodedId = decodeURIComponent(id);
    const article = await getArticleById(decodedId);

    if (!article) {
        notFound();
    }

    const dateFormatted = new Date(article.publishedAt).toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });

    return (
        <div className="container mx-auto px-4 max-w-3xl py-8 min-h-screen">
            <Link
                href="/"
                className="flex items-center gap-2 text-sm text-zinc-400 hover:text-zinc-900 mb-12 transition-colors group"
            >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Back to News
            </Link>

            <article className="space-y-8">
                <header className="space-y-4">
                    <div className="flex items-center gap-3 text-[11px] font-medium text-slate-400">
                        <span className="text-accent">{article.source}</span>
                        <span className="text-slate-200">•</span>
                        <span>{dateFormatted}</span>
                    </div>

                    <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight leading-tight">
                        {article.title}
                    </h1>
                </header>

                <div className="prose prose-slate prose-lg max-w-none">
                    <p className="text-lg md:text-xl text-slate-600 leading-relaxed">
                        {article.summary}
                    </p>

                    {/* In a real app, we might fetch more content here if available */}
                    <div className="mt-12 p-6 bg-slate-50 rounded border border-slate-100 space-y-4">
                        <h3 className="text-lg font-bold text-slate-900">Want to read the full story?</h3>
                        <p className="text-sm text-slate-600">This article was originally published on {article.source}. Click below to visit the original site and read the complete coverage.</p>
                        <Link
                            href={article.url}
                            target="_blank"
                            className="inline-flex items-center gap-2 px-6 py-2.5 bg-accent text-white rounded font-semibold text-sm hover:opacity-90 transition-all active:scale-95"
                        >
                            Read full article on {article.source}
                            <ExternalLink className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </article>
        </div>
    );
}
