import { getNews } from "@/lib/newsService";
import NewsCard from "@/components/NewsCard";
import DateHeader from "@/components/DateHeader";
import FilterBar from "@/components/FilterBar";
import Pagination from "@/components/Pagination";
import { Suspense } from "react";
import NewsSkeleton from "@/components/NewsSkeleton";

export const revalidate = 3600; // Cache for 1 hour

interface HomeProps {
  searchParams: {
    page?: string;
    q?: string;
    category?: string;
  };
}

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  const currentPage = Number(params?.page) || 1;
  const query = params?.q?.toLowerCase() || "";
  const category = params?.category || "All";
  const limit = 7;

  // Fetch all for filtering (in a real high-scale app, we'd filter at the DB level)
  const { items: allItems } = await getNews(1, 100);

  // Apply Search & Category Filters
  let filteredItems = allItems;

  if (query) {
    filteredItems = filteredItems.filter(item =>
      item.title.toLowerCase().includes(query) ||
      item.summary.toLowerCase().includes(query) ||
      item.source.toLowerCase().includes(query)
    );
  }

  if (category !== "All") {
    const aiKeywords = ["ai", "machine learning", "neural", "intelligence", "model", "llm", "compute"];
    const researchKeywords = ["research", "paper", "study", "lab", "openai"];
    const industryKeywords = ["startup", "market", "funding", "stock", "business", "techcrunch", "investment", "enterprise"];
    const governanceKeywords = ["policy", "ethic", "law", "regulation", "government", "safety", "governance"];

    filteredItems = filteredItems.filter(item => {
      const text = (item.title + " " + item.summary + " " + item.source).toLowerCase();

      if (category === "Artificial Intelligence") {
        return aiKeywords.some(key => text.includes(key));
      }
      if (category === "Research") {
        return researchKeywords.some(key => text.includes(key));
      }
      if (category === "Industry") {
        return industryKeywords.some(key => text.includes(key));
      }
      if (category === "Governance") {
        return governanceKeywords.some(key => text.includes(key));
      }
      return true;
    });
  }

  const total = filteredItems.length;
  const totalPages = Math.ceil(total / limit);
  const paginatedItems = filteredItems.slice((currentPage - 1) * limit, currentPage * limit);

  return (
    <div className="container mx-auto px-4 max-w-2xl py-8">
      <DateHeader count={total} />

      <Suspense fallback={<div className="h-10 bg-zinc-100 rounded-2xl mb-10 animate-pulse" />}>
        <FilterBar />
      </Suspense>

      <div className="flex flex-col">
        <Suspense fallback={
          Array.from({ length: 5 }).map((_, i) => <NewsSkeleton key={i} />)
        }>
          {total > 0 ? (
            paginatedItems.map((item) => (
              <NewsCard key={item.id} item={item} />
            ))
          ) : (
            <div className="text-center py-20 text-zinc-400">
              {query
                ? `No results for "${query}"`
                : `No news available in ${category}.`}
            </div>
          )}
        </Suspense>
      </div>

      {total > 0 && <Pagination currentPage={currentPage} totalPages={totalPages} />}
    </div>
  );
}
