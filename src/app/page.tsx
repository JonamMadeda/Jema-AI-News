import NewsGrid from "@/components/NewsGrid";
import { mockArticles } from "@/lib/mockData";
import { fetchRSSNews } from "@/lib/rssService";

export const revalidate = 3600; // Revalidate every hour

import Pagination from "@/components/Pagination";

interface HomeProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;
  const itemsPerPage = 5;

  const allArticles = await fetchRSSNews();
  const articles = allArticles.length > 0 ? allArticles : mockArticles;

  const totalPages = Math.ceil(articles.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayArticles = articles.slice(startIndex, startIndex + itemsPerPage);

  const today = new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' });

  return (
    <div className="container mx-auto py-12 px-4 max-w-2xl">
      <div className="mb-8 border-b border-border/40 pb-4 flex justify-between items-baseline">
        <h1 className="text-sm font-medium text-muted-foreground uppercase tracking-widest">
          {today}
        </h1>
        <span className="text-xs text-muted-foreground">
          {articles.length} updates
        </span>
      </div>

      <NewsGrid articles={displayArticles} />

      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
}
