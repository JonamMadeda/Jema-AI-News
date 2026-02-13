"use client";

import { useEffect, useState, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";

function ProgressBarInner() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => {
            setLoading(false);
        }, 400); // Brief loading state on navigation

        return () => clearTimeout(timer);
    }, [pathname, searchParams]);

    if (!loading) return null;

    return (
        <div className="fixed top-0 left-0 right-0 z-[100] h-[3px] bg-accent/5 overflow-hidden">
            <div
                className="h-full bg-accent transition-all duration-300 ease-out animate-[loadingProgress_1.5s_infinite]"
                style={{ width: '40%' }}
            />
        </div>
    );
}

export default function TopProgressBar() {
    return (
        <Suspense fallback={null}>
            <ProgressBarInner />
        </Suspense>
    )
}
