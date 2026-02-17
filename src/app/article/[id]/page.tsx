import { getArticleById } from "@/lib/newsService";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { notFound } from "next/navigation";
import BackButton from "@/components/BackButton";

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

    const publishDate = new Date(article.publishedAt);
    const dateFormatted = publishDate.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    }).toUpperCase();
    const timeFormatted = publishDate.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });

    return (
        <div className="mx-auto px-4 max-w-3xl py-8 min-h-screen">
            {/* Back Navigation */}
            <div className="mb-10">
                <BackButton />
            </div>

            <article>
                {/* Category Badge + Source */}
                <div className="flex items-center gap-3 mb-6">
                    <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider bg-accent text-white rounded">
                        News
                    </span>
                    <span className="text-sm font-bold text-accent uppercase tracking-wide">
                        {article.source}
                    </span>
                </div>

                {/* Title */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15] mb-6">
                    {article.title}
                </h1>

                {/* Publish Date */}
                <p className="text-[11px] font-medium uppercase tracking-widest text-slate-400 mb-8">
                    Published on {dateFormatted} at {timeFormatted}
                </p>

                {/* Divider */}
                <hr className="border-slate-200 mb-10" />

                {/* Summary */}
                <div className="mb-10">
                    <p className="text-lg sm:text-xl md:text-2xl text-slate-700 leading-relaxed italic">
                        {article.summary}
                    </p>
                </div>

                {/* Info Blockquote */}
                <div className="border-l-4 border-accent bg-slate-50 px-6 py-5 mb-10">
                    <p className="text-sm text-slate-500 leading-relaxed">
                        This is a summary of the news story. To read the complete, in-depth report including all media and related coverage, please visit the original source.
                    </p>
                </div>

                {/* CTA Button */}
                <Link
                    href={article.url}
                    target="_blank"
                    className="inline-flex items-center gap-3 px-8 py-4 bg-accent text-white font-bold text-xs uppercase tracking-widest hover:opacity-90 transition-all active:scale-[0.98]"
                >
                    Read Original Full Story
                    <ArrowRight className="w-4 h-4" />
                </Link>
            </article>
        </div>
    );
}
