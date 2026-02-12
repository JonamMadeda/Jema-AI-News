"use client";

import { useEffect, useState, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";

function ProgressBarInner() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(true);
        }, 0);
        const timeout = setTimeout(() => setLoading(false), 500);
        return () => {
            clearTimeout(timer);
            clearTimeout(timeout);
        };
    }, [pathname, searchParams]);

    if (!loading) return null;

    return (
        <div className="fixed top-0 left-0 right-0 z-[100] h-1 bg-[#FF2400]/10 overflow-hidden">
            <div className="h-full bg-[#FF2400] transition-all duration-500 ease-out animate-[loadingProgress_1.5s_infinite]"
                style={{ width: '40%' }} />
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
