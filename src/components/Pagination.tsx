import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
}

export default function Pagination({ currentPage, totalPages }: PaginationProps) {
    return (
        <div className="flex justify-center items-center gap-2 sm:gap-4 py-8 mt-4 border-t border-slate-100">
            <Link
                href={currentPage > 1 ? `?page=${currentPage - 1}` : "#"}
                className={`flex items-center gap-1 px-3 py-2 sm:px-4 text-sm font-bold rounded-lg transition-all ${currentPage > 1
                    ? "text-slate-600 hover:bg-slate-50 hover:text-accent"
                    : "text-slate-200 pointer-events-none"
                    }`}
            >
                <ChevronLeft className="w-4 h-4" /> <span className="hidden sm:inline">Previous</span>
            </Link>

            <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }).map((_, i) => {
                    const page = i + 1;
                    const isCurrent = page === currentPage;

                    // Logic to show: 1, lastPage, and 2 pages around current
                    const shouldShow =
                        page === 1 ||
                        page === totalPages ||
                        Math.abs(page - currentPage) <= 1;

                    if (!shouldShow) {
                        // Show ellipsis if it's the first gap after 1 or before total
                        if (page === 2 || page === totalPages - 1) {
                            return (
                                <span key={`ellipsis-${page}`} className="w-8 h-8 flex items-center justify-center text-slate-300">
                                    ...
                                </span>
                            );
                        }
                        return null;
                    }

                    return (
                        <Link
                            key={page}
                            href={`?page=${page}`}
                            className={`w-9 h-9 flex items-center justify-center text-sm font-bold rounded-lg transition-all ${isCurrent
                                ? "bg-slate-100 text-slate-900"
                                : "text-slate-400 hover:bg-slate-50 hover:text-slate-900"
                                }`}
                        >
                            {page}
                        </Link>
                    );
                })}
            </div>

            <Link
                href={currentPage < totalPages ? `?page=${currentPage + 1}` : "#"}
                className={`flex items-center gap-1 px-3 py-2 sm:px-4 text-sm font-bold rounded-lg transition-all ${currentPage < totalPages
                    ? "text-slate-600 hover:bg-slate-50 hover:text-accent"
                    : "text-slate-200 pointer-events-none"
                    }`}
            >
                <span className="hidden sm:inline">Next</span> <ChevronRight className="w-4 h-4" />
            </Link>
        </div>
    );
}
