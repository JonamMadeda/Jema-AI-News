import Link from "next/link";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full bg-slate-50 border-t border-slate-200 py-12 mt-20">
            <div className="mx-auto max-w-5xl px-4">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                    <div className="space-y-4">
                        <Link href="/" className="group flex items-center gap-3">
                            {/* Logo Icon */}
                            <div className="w-8 h-8 bg-accent rounded-md flex items-center justify-center text-white font-bold text-lg premium-shadow">
                                J
                            </div>
                            {/* Logo Text */}
                            <div className="flex flex-col leading-none">
                                <span className="flex items-baseline gap-1">
                                    <span className="text-xl font-black tracking-tighter text-slate-900">JEMA</span>
                                    <span className="text-xl font-light tracking-tight text-slate-400">AI NEWS</span>
                                </span>
                            </div>
                        </Link>
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
