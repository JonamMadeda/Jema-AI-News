"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-sm border-b border-zinc-200 py-4 supports-[backdrop-filter]:bg-white/60">
            <div className="container mx-auto max-w-2xl flex items-center justify-between px-4">
                <Link href="/" className="group" onClick={() => setIsOpen(false)}>
                    <span className="text-xl font-bold tracking-tight text-zinc-900 uppercase">
                        JEMA AI NEWS
                    </span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-500">
                    <Link href="/" className="hover:text-zinc-900 transition-colors">
                        Home
                    </Link>
                    <Link href="/saved" className="hover:text-zinc-900 transition-colors">
                        Saved
                    </Link>
                </nav>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 -mr-2 text-zinc-500 hover:text-zinc-900"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Dropdown */}
            {isOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-zinc-200 shadow-lg animate-in fade-in slide-in-from-top-2 duration-200">
                    <nav className="flex flex-col p-4 gap-4">
                        <Link
                            href="/"
                            className="text-sm font-bold text-zinc-900 px-4 py-2 hover:bg-zinc-50 rounded-lg transition-colors"
                            onClick={() => setIsOpen(false)}
                        >
                            Home
                        </Link>
                        <Link
                            href="/saved"
                            className="text-sm font-bold text-zinc-900 px-4 py-2 hover:bg-zinc-50 rounded-lg transition-colors"
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
