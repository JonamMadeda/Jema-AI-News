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
        <div className="flex items-center justify-between py-6">
            <h2 className="text-[10px] sm:text-xs font-black text-slate-900 tracking-widest uppercase">
                {today}
            </h2>
            <span className="bg-slate-50 text-slate-600 px-3 py-1 rounded-full text-[9px] sm:text-[10px] font-bold uppercase tracking-wider premium-shadow">
                {count} Updates
            </span>
        </div>
    );
}
