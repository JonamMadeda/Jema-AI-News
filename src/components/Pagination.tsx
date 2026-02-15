import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
}

export default function Pagination({ currentPage, totalPages }: PaginationProps) {
    return (
        <div className="flex justify-between items-center py-8 mt-8 border-t border-slate-200">
            {/* Previous Button */}
            <Link
                href={currentPage > 1 ? `?page=${currentPage - 1}` : "#"}
                className={`flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-widest transition-colors ${currentPage > 1
                    ? "text-slate-400 hover:text-slate-900"
                    : "text-slate-200 pointer-events-none"
                    }`}
            >
                <ArrowLeft className="w-4 h-4" />
                <span>Previous</span>
            </Link>

            {/* Page Count */}
            <div className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-slate-400">
                Page {currentPage} of {totalPages}
            </div>

            {/* Next Button */}
            <Link
                href={currentPage < totalPages ? `?page=${currentPage + 1}` : "#"}
                className={`flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-widest transition-colors ${currentPage < totalPages
                    ? "text-slate-900 hover:text-accent"
                    : "text-slate-200 pointer-events-none"
                    }`}
            >
                <span>Next</span>
                <ArrowRight className="w-4 h-4" />
            </Link>
        </div>
    );
}
