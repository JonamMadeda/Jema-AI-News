export default function Loading() {
    return (
        <div className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-white">
            <div className="flex flex-col items-center gap-6">
                {/* Animated Logo Mark */}
                <div className="relative">
                    <div className="w-12 h-12 bg-zinc-900 rounded-xl flex items-center justify-center text-white font-bold text-2xl animate-pulse">
                        J
                    </div>
                    <div className="absolute inset-0 w-12 h-12 bg-[#FF2400]/20 rounded-xl animate-ping" />
                </div>

                {/* Text Loader */}
                <div className="flex flex-col items-center gap-2">
                    <span className="text-sm font-extrabold tracking-[0.3em] text-zinc-900 uppercase">
                        JEMA AI NEWS
                    </span>
                    <div className="h-[2px] w-24 bg-zinc-100 overflow-hidden rounded-full">
                        <div className="h-full w-full bg-[#FF2400] animate-[shimmer_1.5s_infinite]"
                            style={{
                                transform: 'translateX(-100%)',
                                animation: 'loadingProgress 2s ease-in-out infinite'
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
