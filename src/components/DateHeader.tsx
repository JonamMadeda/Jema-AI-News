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
        <div className="flex items-baseline gap-2 py-4 mb-4 border-b border-slate-50">
            <h2 className="text-lg font-bold text-slate-900 leading-none">
                {today}
            </h2>
            <span className="text-xs text-slate-400">
                ({count} updates)
            </span>
        </div>
    );
}
