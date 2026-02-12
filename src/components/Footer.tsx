export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-zinc-100 py-12 mt-20 bg-zinc-50/50">
            <div className="container mx-auto max-w-5xl px-4 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-zinc-500">
                <div className="flex flex-col items-center md:items-start gap-2">
                    <span className="font-semibold text-zinc-900">JEMA AI NEWS</span>
                    <p>&copy; {currentYear} All rights reserved.</p>
                </div>

                <div className="flex gap-6">
                    <a href="#" className="hover:text-zinc-900 transition-colors">Privacy Policy</a>
                    <a href="#" className="hover:text-zinc-900 transition-colors">Terms of Service</a>
                    <a href="#" className="hover:text-zinc-900 transition-colors">Contact</a>
                </div>
            </div>
        </footer>
    );
}
