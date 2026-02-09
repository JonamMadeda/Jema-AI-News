import Link from "next/link";

export default function Header() {
    return (
        <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-zinc-200">
            <div className="container mx-auto max-w-2xl flex h-14 items-center justify-between px-4 ">
                <div className="flex items-center gap-2">
                    <Link href="/" className="flex items-center gap-2 group">
                        <span className="text-lg font-bold tracking-tight group-hover:text-primary transition-colors">
                            JEMA AI NEWS
                        </span>
                    </Link>
                </div>

                <nav className="flex items-center gap-4 text-sm font-medium text-muted-foreground">
                    <Link href="/" className="hover:text-foreground transition-colors">Latest</Link>
                </nav>
            </div>
        </header>
    );
}
