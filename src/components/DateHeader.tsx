interface DateHeaderProps {
    count: number;
}

export default function DateHeader({ count }: DateHeaderProps) {
    const today = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric'
    });

    return (
        <div className="flex items-center justify-between py-8 border-b border-zinc-200 mb-8">
            <h2 className="text-[11px] font-extrabold text-zinc-900 uppercase tracking-[0.2em]">
                {today}
            </h2>
            <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider bg-zinc-100 px-2 py-0.5 rounded-md">
                {count} updates
            </span>
        </div>
    );
}
