'use client';

import { useEffect, useState, useCallback, useMemo } from 'react';
import { Command } from 'cmdk';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LayoutDashboard,
    Code2,
    Briefcase,
    Mail,
    Github,
    Twitter,
    Copy,
    Search,
    Laptop,
    Lightbulb,
    X,
    ExternalLink,
} from 'lucide-react';
import { toast } from 'sonner';
import { getSearchIndex } from '@/lib/searchIndex';
import { useMediaQuery } from '@/hooks/useMediaQuery';

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

export function CommandMenu({
    open,
    setOpen,
}: {
    open: boolean;
    setOpen: (open: boolean) => void;
    children?: React.ReactNode;
}) {
    const router = useRouter();
    const isDesktop = useMediaQuery('(min-width: 768px)');

    // Toggle Logic — Cmd+K
    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen(!open);
            }
        };
        document.addEventListener('keydown', down);
        return () => document.removeEventListener('keydown', down);
    }, [setOpen, open]);

    // Navigation Helper
    const runCommand = useCallback(
        (command: () => void) => {
            setOpen(false);
            command();
        },
        [setOpen],
    );

    // Copy Helper
    const copyToClipboard = useCallback(
        async (text: string, label: string) => {
            try {
                await navigator.clipboard.writeText(text);
                toast.success(`${label} copied to clipboard!`, {
                    style: {
                        background: 'rgba(13, 13, 26, 0.95)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        color: '#e2e8f0',
                    },
                });
            } catch {
                toast.error('Failed to copy');
            }
            setOpen(false);
        },
        [setOpen],
    );

    const searchIndex = useMemo(() => getSearchIndex(), []);

    const getIconForItem = (item: (typeof searchIndex)[0]): React.ElementType => {
        if (item.type === 'nav') {
            const map: Record<string, React.ElementType> = {
                Home: LayoutDashboard,
                Projects: Code2,
                'Tech Stack': Laptop,
                Experience: Briefcase,
                Contact: Mail,
            };
            return map[item.label] || LayoutDashboard;
        }
        if (item.type === 'project') return Code2;
        if (item.type === 'experience') return Briefcase;
        if (item.type === 'skill') return Lightbulb;
        if (item.type === 'contact') return item.label.includes('GitHub') ? Github : item.label.includes('Twitter') ? Twitter : Copy;
        return Search;
    };

    const handleSearchItemSelect = useCallback(
        (item: (typeof searchIndex)[0]) => {
            if (item.href) {
                runCommand(() => router.push(item.href!));
            } else if (item.action === 'copy' && item.actionPayload) {
                copyToClipboard(item.actionPayload, item.label);
            } else if (item.action === 'external' && item.actionPayload) {
                runCommand(() => window.open(item.actionPayload!, '_blank'));
            }
        },
        [runCommand, copyToClipboard, router]
    );

    /* ---- Shared command list content ---- */
    const commandContent = (
        <>
            {/* Search Input */}
            <div className="flex items-center border-b border-white/10 px-4">
                <Search className="w-5 h-5 text-muted-foreground mr-3 shrink-0" />
                <Command.Input
                    placeholder="Search projects, skills, experience, contact..."
                    className="flex-1 h-14 bg-transparent text-foreground placeholder:text-muted-foreground/60 outline-none text-sm md:text-base"
                />
                {/* Mobile close button */}
                {!isDesktop && (
                    <button
                        onClick={() => setOpen(false)}
                        className="ml-2 p-1.5 rounded-lg hover:bg-white/10 text-muted-foreground"
                    >
                        <X className="w-5 h-5" />
                    </button>
                )}
            </div>

            {/* Results List — portfolio-wide search */}
            <Command.List className="max-h-[50vh] md:max-h-[60vh] overflow-y-auto overflow-x-hidden p-2 scrollbar-thin scrollbar-thumb-white/10">
                <Command.Empty className="py-6 text-center text-sm text-muted-foreground">
                    No results found. Try &quot;projects&quot;, &quot;typescript&quot;, &quot;experience&quot;, or &quot;contact&quot;.
                </Command.Empty>

                {searchIndex.map((item) => {
                    const Icon = getIconForItem(item);
                    return (
                        <Command.Item
                            key={item.id}
                            value={`${item.label} ${item.subtitle || ''} ${item.keywords}`}
                            onSelect={() => handleSearchItemSelect(item)}
                            className="group flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-foreground/80 aria-selected:bg-primary/20 aria-selected:text-primary cursor-pointer transition-colors"
                        >
                            <div className="flex items-center justify-center w-5 h-5 rounded bg-white/5 border border-white/5 group-aria-selected:border-primary/20 group-aria-selected:bg-primary/10 transition-colors shrink-0">
                                <Icon className="w-3 h-3 text-muted-foreground group-aria-selected:text-primary" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <span className="block truncate">{item.label}</span>
                                {item.subtitle && (
                                    <span className="block text-xs text-muted-foreground truncate">{item.subtitle}</span>
                                )}
                            </div>
                            {(item.action === 'external' || item.href) && (
                                <ExternalLink className="w-3.5 h-3.5 text-muted-foreground/50 shrink-0" />
                            )}
                        </Command.Item>
                    );
                })}
            </Command.List>

            {/* Footer — desktop only */}
            <div className="hidden md:flex items-center justify-between px-4 py-2 border-t border-white/5 bg-white/[0.02]">
                <span className="text-[10px] text-muted-foreground">
                    Use <kbd className="font-sans bg-white/10 px-1 rounded">↑</kbd>{' '}
                    <kbd className="font-sans bg-white/10 px-1 rounded">↓</kbd> to navigate
                </span>
                <span className="text-[10px] text-muted-foreground">
                    <kbd className="font-sans bg-white/10 px-1 rounded">Esc</kbd> to close
                </span>
            </div>

            {/* Footer — mobile: drag hint */}
            <div className="flex md:hidden items-center justify-center px-4 py-3 border-t border-white/5 bg-white/[0.02]">
                <span className="text-[10px] text-muted-foreground">Tap outside or press X to close</span>
            </div>
        </>
    );

    return (
        <AnimatePresence>
            {open && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        key="cmd-backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
                        onClick={() => setOpen(false)}
                    />

                    {/* Desktop: Centered floating modal */}
                    {isDesktop ? (
                        <motion.div
                            key="cmd-desktop"
                            initial={{ opacity: 0, scale: 0.95, y: -10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: -10 }}
                            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                            className="fixed inset-0 z-[101] flex items-start justify-center pt-[15vh] pointer-events-none"
                        >
                            <Command
                                className="w-full max-w-2xl rounded-xl overflow-hidden bg-[#0d0d1a] border border-white/10 shadow-2xl pointer-events-auto"
                                label="Global Command Menu"
                            >
                                {commandContent}
                            </Command>
                        </motion.div>
                    ) : (
                        /* Mobile: Bottom sheet */
                        <motion.div
                            key="cmd-mobile"
                            initial={{ y: '100%' }}
                            animate={{ y: 0 }}
                            exit={{ y: '100%' }}
                            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                            className="fixed inset-x-0 bottom-0 z-[101] pointer-events-auto"
                        >
                            {/* Drag handle */}
                            <div className="flex justify-center pt-3 pb-1 bg-[#0d0d1a] rounded-t-2xl border-t border-x border-white/10">
                                <div className="w-10 h-1 rounded-full bg-white/20" />
                            </div>
                            <Command
                                className="w-full overflow-hidden bg-[#0d0d1a] border-x border-white/10 shadow-2xl"
                                label="Global Command Menu"
                            >
                                {commandContent}
                            </Command>
                        </motion.div>
                    )}
                </>
            )}
        </AnimatePresence>
    );
}
