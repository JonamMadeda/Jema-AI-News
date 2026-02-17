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
  const limit = 5;

  // Fetch all for filtering
  const { items: allItems } = await getNews(1, 100);

  // AUTOMATIC Focus: Enforce a strict 7-day window (Weekly maximum)
  // while prioritizing the latest 24h (Daily focus) via existing sort.
  const now = new Date();
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  let filteredItems = allItems.filter(item => new Date(item.publishedAt) >= sevenDaysAgo);

  // If we have very few items in 7 days, fall back to showing the latest 20 total
  // to ensure the site never looks empty.
  if (filteredItems.length < 5) {
    filteredItems = allItems.slice(0, 20);
  }

  // Apply Search & Category Filters
  if (query) {
    filteredItems = filteredItems.filter(item =>
      item.title.toLowerCase().includes(query) ||
      item.summary.toLowerCase().includes(query) ||
      item.source.toLowerCase().includes(query)
    );
  }

  if (category !== "All") {
    const aiMlKeywords = ["ai", "artificial intelligence", "machine learning", "deep learning", "neural", "llm", "gpt", "gemini", "claude", "model", "transformer", "compute", "training", "inference", "generative"];
    const startupsVcKeywords = ["startup", "funding", "seed", "series a", "series b", "venture", "vc", "valuation", "unicorn", "founder", "accelerator", "y combinator", "investment", "raise", "techcrunch"];
    const bigTechKeywords = ["google", "apple", "microsoft", "meta", "amazon", "nvidia", "openai", "anthropic", "tesla", "samsung", "intel", "amd", "qualcomm", "ibm", "oracle"];
    const researchKeywords = ["research", "paper", "study", "benchmark", "breakthrough", "arxiv", "lab", "scientist", "experiment", "dataset", "algorithm"];
    const productKeywords = ["launch", "released", "announces", "unveil", "introduce", "update", "feature", "app", "platform", "tool", "api", "beta", "rollout", "available"];

    filteredItems = filteredItems.filter(item => {
      const text = (item.title + " " + item.summary + " " + item.source).toLowerCase();

      if (category === "AI & ML") {
        return aiMlKeywords.some(key => text.includes(key));
      }
      if (category === "Startups & VC") {
        return startupsVcKeywords.some(key => text.includes(key));
      }
      if (category === "Big Tech") {
        return bigTechKeywords.some(key => text.includes(key));
      }
      if (category === "Research") {
        return researchKeywords.some(key => text.includes(key));
      }
      if (category === "Product Launches") {
        return productKeywords.some(key => text.includes(key));
      }
      return true;
    });
  }

  const total = filteredItems.length;
  const totalPages = Math.ceil(total / limit);
  const paginatedItems = filteredItems.slice((currentPage - 1) * limit, currentPage * limit);

  return (
    <div className="mx-auto max-w-5xl mb-6 py-2 px-4">
      <DateHeader
        count={total}
      />

      <Suspense fallback={<div className="h-8 bg-slate-50 rounded mb-4 animate-pulse" />}>
        <FilterBar />
      </Suspense>

      <div className="flex flex-col gap-1">
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
