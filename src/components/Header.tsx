"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-200 py-4 top-0 transition-all">
            <div className="mx-auto max-w-5xl flex items-center justify-between px-4">
                <Link href="/" className="group flex items-center gap-3" onClick={() => setIsOpen(false)}>
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

                {/* Right Side Actions */}
                <div className="flex items-center gap-4">
                    {/* Country Badge */}
                    <div className="hidden sm:block px-3 py-1 bg-slate-100 rounded text-[10px] font-bold tracking-widest text-slate-500 uppercase">
                        Kenya
                    </div>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-6 text-sm font-bold uppercase tracking-wider text-slate-500 ml-4">
                        <Link href="/" className="hover:text-accent transition-colors">
                            Home
                        </Link>
                        <Link href="/saved" className="hover:text-accent transition-colors">
                            Saved
                        </Link>
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 text-slate-500 hover:text-accent transition-colors"
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
