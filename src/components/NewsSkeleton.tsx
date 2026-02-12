export default function NewsSkeleton() {
    return (
        <div className="py-8 border-b border-zinc-100 last:border-0 -mx-4 px-4 sm:mx-0 sm:px-0 animate-pulse">
            <div className="flex flex-col gap-2.5">
                {/* Metadata Skeleton */}
                <div className="flex items-center gap-2.5">
                    <div className="h-3 w-16 bg-zinc-100 rounded"></div>
                    <div className="h-3 w-3 bg-zinc-50 rounded-full"></div>
                    <div className="h-3 w-20 bg-zinc-100 rounded"></div>
                </div>

                {/* Title Skeleton */}
                <div className="space-y-2">
                    <div className="h-7 w-full bg-zinc-100 rounded-lg"></div>
                    <div className="h-7 w-3/4 bg-zinc-100 rounded-lg"></div>
                </div>

                {/* Summary Skeleton */}
                <div className="space-y-2 mt-1">
                    <div className="h-4 w-full bg-zinc-50 rounded"></div>
                    <div className="h-4 w-5/6 bg-zinc-50 rounded"></div>
                </div>
            </div>
        </div>
    );
}
