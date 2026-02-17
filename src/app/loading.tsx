export default function Loading() {
    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-white">
            <div className="flex flex-col items-center gap-4">
                <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center text-white font-bold text-xl">
                    J
                </div>
                <div className="h-[2px] w-16 bg-slate-100 overflow-hidden rounded-full">
                    <div
                        className="h-full bg-accent rounded-full"
                        style={{
                            animation: 'loadingProgress 1.2s ease-in-out infinite'
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
