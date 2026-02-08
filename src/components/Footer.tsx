import Link from "next/link";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-zinc-200 py-8 mt-auto">
            <div className="container mx-auto max-w-2xl px-4 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-muted-foreground uppercase tracking-widest">
                <p>
                    &copy; {currentYear} JEMA AI NEWS
                </p>
                <div className="flex gap-4">
                    <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
                    <a href="#" className="hover:text-foreground transition-colors">Terms</a>
                </div>
            </div>
        </footer>
    );
}
