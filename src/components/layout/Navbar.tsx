'use client';

import { CommandMenu } from '@/components/CommandMenu';
import { motion } from 'framer-motion';
import { Command, Menu, Search, X } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { NAV_LINKS } from '@/lib/constants';

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false); // Mobile Menu
    const [showCmd, setShowCmd] = useState(false); // Command Palette
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <CommandMenu open={showCmd} setOpen={setShowCmd} />

            <motion.header
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className={cn(
                    "fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300",
                    scrolled
                        ? "bg-black/80 border-b border-white/10 backdrop-blur-lg py-1"
                        : "bg-black/50 border-b border-transparent backdrop-blur-md py-2"
                )}
            >
                <nav
                    className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4"
                >
                    {/* Logo / Home */}
                    <Link href="/" className="text-sm font-semibold tracking-tight text-foreground/90 hover:text-foreground transition-colors">
                        Portfolio
                    </Link>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center gap-6">
                        {NAV_LINKS.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    <div className="flex items-center gap-2">
                        {/* Desktop Search Trigger */}
                        <button
                            onClick={() => setShowCmd(true)}
                            className="hidden md:flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 transition-all group"
                            aria-label="Search"
                        >
                            <Search className="w-3.5 h-3.5 text-muted-foreground group-hover:text-foreground transition-colors" />
                            <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">Search</span>
                            <kbd className="hidden font-sans text-[10px] font-medium text-muted-foreground/70 bg-white/5 px-1.5 py-0.5 rounded border border-white/5 lg:inline-flex items-center gap-1">
                                <Command className="w-3 h-3" />
                                <span>K</span>
                            </kbd>
                        </button>

                        {/* Mobile Search Trigger */}
                        <button
                            className="md:hidden p-2 rounded-lg hover:bg-white/5 text-muted-foreground hover:text-foreground transition-colors"
                            onClick={() => setShowCmd(true)}
                            aria-label="Search"
                        >
                            <Search className="w-5 h-5" />
                        </button>

                        {/* Mobile Menu Toggle */}
                        <button
                            className="md:hidden p-1 text-muted-foreground hover:text-foreground"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>
                </nav>

                {/* Mobile Menu Overlay */}
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="absolute top-20 left-4 right-4 p-4 rounded-2xl glass border border-white/10 md:hidden flex flex-col gap-4"
                    >
                        {NAV_LINKS.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-white/5 rounded-lg transition-colors"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </motion.div>
                )}
            </motion.header>
        </>
    );
}
