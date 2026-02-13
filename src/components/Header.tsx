"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-200 py-3">
            <div className="container mx-auto max-w-5xl flex items-center justify-between px-4">
                <Link href="/" className="group" onClick={() => setIsOpen(false)}>
                    <span className="text-lg sm:text-xl font-bold tracking-tight text-slate-900">
                        <span className="text-accent underline decoration-accent/20 underline-offset-4">JEMA</span> AI NEWS
                    </span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-6 text-sm font-bold uppercase tracking-wider text-slate-500">
                    <Link href="/" className="hover:text-accent transition-colors">
                        Home
                    </Link>
                    <Link href="/saved" className="hover:text-accent transition-colors">
                        Saved
                    </Link>
                </nav>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 -mr-2 text-slate-500 hover:text-accent transition-colors"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <div className="relative w-6 h-6 overflow-hidden">
                        <div className={`absolute inset-0 transition-all duration-300 transform ${isOpen ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'}`}>
                            <Menu className="w-6 h-6" />
                        </div>
                        <div className={`absolute inset-0 transition-all duration-300 transform ${isOpen ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'}`}>
                            <X className="w-6 h-6" />
                        </div>
                    </div>
                </button>
            </div>

            {/* Mobile Dropdown */}
            {isOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-lg border-b border-slate-200 shadow-xl shadow-slate-200/50 animate-in fade-in slide-in-from-top-4 duration-300 ease-out">
                    <nav className="flex flex-col p-4 gap-2">
                        <Link
                            href="/"
                            className="text-sm font-bold uppercase tracking-wide text-slate-900 px-4 py-3 hover:bg-slate-50 rounded-lg transition-colors flex items-center justify-between"
                            onClick={() => setIsOpen(false)}
                        >
                            Home
                        </Link>
                        <Link
                            href="/saved"
                            className="text-sm font-bold uppercase tracking-wide text-slate-900 px-4 py-3 hover:bg-slate-50 rounded-lg transition-colors flex items-center justify-between"
                            onClick={() => setIsOpen(false)}
                        >
                            Saved
                        </Link>
                    </nav>
                </div>
            )}
        </header>
    );
}
