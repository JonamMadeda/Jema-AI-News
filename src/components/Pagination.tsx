import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
}

export default function Pagination({ currentPage, totalPages }: PaginationProps) {
    const prevPage = currentPage > 1 ? currentPage - 1 : null;
    const nextPage = currentPage < totalPages ? currentPage + 1 : null;

    if (totalPages <= 1) return null;

    return (
        <div className="flex items-center justify-between mt-12 py-4 border-t border-border/40">
            <div className="flex-1">
                {prevPage ? (
                    <Link
                        href={`/?page=${prevPage}`}
                        className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <ChevronLeft className="w-4 h-4 mr-1" />
                        Previous
                    </Link>
                ) : (
                    <span className="inline-flex items-center text-sm font-medium text-muted-foreground/50 cursor-not-allowed">
                        <ChevronLeft className="w-4 h-4 mr-1" />
                        Previous
                    </span>
                )}
            </div>

            <div className="text-sm text-muted-foreground">
                Page <span className="font-medium text-foreground">{currentPage}</span> of{" "}
                <span className="font-medium text-foreground">{totalPages}</span>
            </div>

            <div className="flex-1 flex justify-end">
                {nextPage ? (
                    <Link
                        href={`/?page=${nextPage}`}
                        className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                    >
                        Next
                        <ChevronRight className="w-4 h-4 ml-1" />
                    </Link>
                ) : (
                    <span className="inline-flex items-center text-sm font-medium text-muted-foreground/50 cursor-not-allowed">
                        Next
                        <ChevronRight className="w-4 h-4 ml-1" />
                    </span>
                )}
            </div>
        </div>
    );
}
