'use client';

import { CommandMenu } from '@/components/CommandMenu';
import { motion, animate } from 'framer-motion';
import { Command, Menu, Search, X } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { NAV_LINKS } from '@/lib/constants';

const NAVBAR_HEIGHT = 80;

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false); // Mobile Menu
    const [showCmd, setShowCmd] = useState(false); // Command Palette
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('');
    const intersectingRef = useRef<Map<Element, number>>(new Map());

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    /* Intersection Observer: tracks which section is in view for active link highlight + glow */
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        intersectingRef.current.set(entry.target, entry.intersectionRatio);
                    } else {
                        intersectingRef.current.delete(entry.target);
                    }
                });
                /* Pick section with highest visibility (most in view) */
                let best: { id: string; ratio: number } | null = null;
                intersectingRef.current.forEach((ratio, el) => {
                    const id = (el as HTMLElement).id;
                    if (id && (!best || ratio > best.ratio)) {
                        best = { id, ratio };
                    }
                });
                if (best) setActiveSection(best.id);
            },
            { threshold: [0, 0.25, 0.5, 0.75, 1], rootMargin: `-${NAVBAR_HEIGHT}px 0px -20% 0px` }
        );

        const sections = document.querySelectorAll('section[id]');
        sections.forEach((section) => observer.observe(section));
        return () => sections.forEach((section) => observer.unobserve(section));
    }, []);

    /* Spring-based smooth scroll for nav links */
    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        if (!href.startsWith('#')) return;
        e.preventDefault();
        const id = href.slice(1);
        const el = document.getElementById(id);
        if (el) {
            const targetY = el.getBoundingClientRect().top + window.scrollY - NAVBAR_HEIGHT;
            const currentY = window.scrollY;

            animate(currentY, targetY, {
                type: 'spring',
                stiffness: 80,
                damping: 20,
                mass: 0.5,
                onUpdate: (latest) => window.scrollTo(0, latest),
            });
        }
    };

    return (
        <>
            <CommandMenu open={showCmd} setOpen={setShowCmd} />

            <motion.header
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className={cn(
                    "fixed top-0 left-0 right-0 z-[100] w-full backdrop-blur-md transition-all duration-300 ease-out",
                    scrolled
                        ? "bg-black/70 border-b border-white/15 backdrop-blur-xl py-2 shadow-lg shadow-black/20"
                        : "bg-black/40 border-b border-transparent py-3"
                )}
            >
                <nav
                    className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4"
                >
                    {/* Logo / Home */}
                    <Link
                        href="/"
                        className="text-sm font-semibold tracking-tight text-foreground/90 hover:text-foreground transition-colors"
                        onClick={(e) => {
                            e.preventDefault();
                            animate(window.scrollY, 0, {
                                type: 'spring',
                                stiffness: 80,
                                damping: 20,
                                mass: 0.5,
                                onUpdate: (latest) => window.scrollTo(0, latest),
                            });
                        }}
                    >
                        Portfolio
                    </Link>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center gap-6">
                        {NAV_LINKS.map((link) => {
                            const sectionId = link.href.slice(1);
                            const isActive = activeSection === sectionId;
                            return (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={(e) => scrollToSection(e, link.href)}
                                    className={cn(
                                        "text-sm font-medium transition-all duration-300 relative py-1 px-2 rounded-md",
                                        isActive
                                            ? "text-primary"
                                            : "text-muted-foreground hover:text-primary"
                                    )}
                                    style={
                                        isActive
                                            ? {
                                                  textShadow: '0 0 16px rgb(139 92 246 / 0.5)',
                                                  boxShadow: 'inset 0 0 12px rgb(139 92 246 / 0.12)',
                                              }
                                            : undefined
                                    }
                                >
                                    {link.name}
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeNav"
                                            className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full shadow-[0_0_8px_rgb(139_92_246_/_0.6)]"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                                        />
                                    )}
                                </Link>
                            );
                        })}
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
                                onClick={(e) => {
                                    scrollToSection(e, link.href);
                                    setIsOpen(false);
                                }}
                                className={cn(
                                    "px-4 py-2 text-sm font-medium rounded-lg transition-colors",
                                    activeSection === link.href.slice(1)
                                        ? "text-primary bg-primary/10"
                                        : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                                )}
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
