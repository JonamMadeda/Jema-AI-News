import NewsGrid from "@/components/NewsGrid";
import { mockArticles } from "@/lib/mockData";
import { fetchRSSNews } from "@/lib/rssService";
import FilterBar from "@/components/FilterBar";
import Pagination from "@/components/Pagination";

export const revalidate = 3600; // Revalidate every hour

interface HomeProps {
  searchParams: Promise<{
    page?: string;
    search?: string;
    category?: string;
  }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const { page, search, category } = await searchParams;
  const currentPage = Number(page) || 1;
  const itemsPerPage = 10; // Increased for better browsing experience with filters

  const allArticles = await fetchRSSNews();
  let articles = allArticles.length > 0 ? allArticles : mockArticles;

  // Search filtering
  if (search) {
    const query = search.toLowerCase();
    articles = articles.filter(
      (a) =>
        a.title.toLowerCase().includes(query) ||
        a.summary?.toLowerCase().includes(query) ||
        a.source?.toLowerCase().includes(query)
    );
  }

  // Category filtering
  if (category && category !== "All") {
    articles = articles.filter((a) => a.category === category);
  }

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

      <FilterBar />

      {displayArticles.length > 0 ? (
        <NewsGrid articles={displayArticles} />
      ) : (
        <div className="py-20 text-center">
          <p className="text-muted-foreground">No articles found matching your criteria.</p>
        </div>
      )}

      {totalPages > 1 && (
        <Pagination currentPage={currentPage} totalPages={totalPages} />
      )}
    </div>
  );
}

