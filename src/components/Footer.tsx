export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full bg-slate-50 border-t border-slate-200 py-12 mt-20">
            <div className="container mx-auto max-w-5xl px-4">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                    <div className="space-y-4">
                        {/* Assuming Link component is imported or defined elsewhere, or should be a regular <a> tag */}
                        <a href="/" className="group">
                            <span className="text-xl font-bold tracking-tight text-slate-900">
                                <span className="text-accent underline decoration-accent/20 underline-offset-4">JEMA</span> AI NEWS
                            </span>
                        </a>
                        <p className="text-sm tracking-normal normal-case text-slate-500">&copy; {currentYear} All rights reserved.</p>
                    </div>

                    <div className="flex gap-8 text-sm font-medium text-slate-500">
                        <a href="#" className="hover:text-primary transition-colors">Privacy</a>
                        <a href="#" className="hover:text-primary transition-colors">Terms</a>
                        <a href="#" className="hover:text-primary transition-colors">Contact</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
