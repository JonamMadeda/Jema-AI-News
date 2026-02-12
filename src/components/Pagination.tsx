import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
}

export default function Pagination({ currentPage, totalPages }: PaginationProps) {
    return (
        <div className="flex justify-center items-center gap-4 py-8 mt-4 border-t border-zinc-100">
            {currentPage > 1 ? (
                <Link
                    href={`/?page=${currentPage - 1}`}
                    className="flex items-center gap-1 text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors px-3 py-2 rounded-lg hover:bg-zinc-100"
                >
                    <ChevronLeft className="w-4 h-4" /> Previous
                </Link>
            ) : (
                <span className="flex items-center gap-1 text-sm font-medium text-zinc-300 px-3 py-2 cursor-not-allowed">
                    <ChevronLeft className="w-4 h-4" /> Previous
                </span>
            )}

            <span className="text-sm text-zinc-400 font-medium">
                Page {currentPage} of {totalPages}
            </span>

            {currentPage < totalPages ? (
                <Link
                    href={`/?page=${currentPage + 1}`}
                    className="flex items-center gap-1 text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors px-3 py-2 rounded-lg hover:bg-zinc-100"
                >
                    Next <ChevronRight className="w-4 h-4" />
                </Link>
            ) : (
                <span className="flex items-center gap-1 text-sm font-medium text-zinc-300 px-3 py-2 cursor-not-allowed">
                    Next <ChevronRight className="w-4 h-4" />
                </span>
            )}
        </div>
    );
}
