'use client';

import { Mail, Github, Phone, ArrowUpRight, Copy, Check, Facebook } from 'lucide-react';
import { XLogo } from '@/components/icons/XLogo';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import type { GuestbookEntry } from '@/types/guestbook';
import { Guestbook } from '@/components/Guestbook';

/* ------------------------------------------------------------------ */
/*  Contact Links Data                                                 */
/* ------------------------------------------------------------------ */

const CONTACT_LINKS = [
    {
        label: 'Email',
        value: 'clichyb80@gmail.com',
        href: 'mailto:clichyb80@gmail.com',
        icon: Mail,
        color: 'group-hover:text-rose-400',
        copyable: true,
    },
    {
        label: 'Phone',
        value: '+254 111 994 177',
        href: 'tel:+254111994177',
        icon: Phone,
        color: 'group-hover:text-emerald-400',
        copyable: true,
    },
    {
        label: 'GitHub',
        value: '@ClintonOuma',
        href: 'https://github.com/ClintonOuma',
        icon: Github,
        color: 'group-hover:text-white',
        copyable: false,
    },
    {
        label: 'X',
        value: '@abclichy',
        href: 'https://x.com/abclichy',
        icon: XLogo,
        color: 'group-hover:text-sky-400',
        copyable: false,
    },
    {
        label: 'Facebook',
        value: 'Clinton Ouma',
        href: 'https://www.facebook.com/profile.php?id=61576558384983',
        icon: Facebook,
        color: 'group-hover:text-blue-400',
        copyable: false,
    },
];

/* ------------------------------------------------------------------ */
/*  Copy-to-Clipboard Button                                           */
/* ------------------------------------------------------------------ */

function CopyButton({ text, label }: { text: string; label: string }) {
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (!copied) return;
        const timer = setTimeout(() => setCopied(false), 2000);
        return () => clearTimeout(timer);
    }, [copied]);

    const handleCopy = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            toast.success(`${label} copied to clipboard!`, {
                duration: 2000,
                style: {
                    background: 'rgba(13, 13, 26, 0.95)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: '#e2e8f0',
                },
            });
        } catch {
            toast.error('Failed to copy. Please try manually.');
        }
    };

    return (
        <button
            onClick={handleCopy}
            title={`Copy ${label}`}
            className="p-1.5 rounded-lg hover:bg-white/10 transition-colors shrink-0"
        >
            {copied ? (
                <Check className="w-3.5 h-3.5 text-emerald-400" />
            ) : (
                <Copy className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            )}
        </button>
    );
}

/* ------------------------------------------------------------------ */
/*  Contact Info Card                                                  */
/* ------------------------------------------------------------------ */

function ContactInfo() {
    return (
        <div className="rounded-2xl p-6 sm:p-8 bg-white/5 backdrop-blur-lg border border-white/10 shadow-lg flex flex-col gap-6 justify-between">
            <div>
                <h3 className="text-xl font-semibold text-foreground/90 mb-2">Let&apos;s Build Something</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                    I&apos;m a Full-Stack Developer and CS student based in Nairobi. Whether you have a project idea,
                    an internship opportunity, or just want to chat about tech — reach out!
                </p>
            </div>

            <div className="space-y-3">
                {CONTACT_LINKS.map((link) => (
                    <a
                        key={link.label}
                        href={link.href}
                        target={link.href.startsWith('mailto:') || link.href.startsWith('tel:') ? undefined : '_blank'}
                        rel={link.href.startsWith('mailto:') || link.href.startsWith('tel:') ? undefined : 'noopener noreferrer'}
                        className="group flex items-center gap-4 p-3.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
                    >
                        <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center border border-white/5 shrink-0">
                            <link.icon className={`w-5 h-5 text-muted-foreground transition-colors ${link.color}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-[11px] text-muted-foreground uppercase tracking-wider">{link.label}</p>
                            <p className="text-sm font-medium text-foreground/90 truncate">{link.value}</p>
                        </div>
                        {link.copyable ? (
                            <CopyButton
                                text={link.href.startsWith('tel:') ? '+254111994177' : link.value}
                                label={link.label}
                            />
                        ) : (
                            <ArrowUpRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                        )}
                    </a>
                ))}
            </div>
        </div>
    );
}

/* ------------------------------------------------------------------ */
/*  Contact Section (exported)                                         */
/* ------------------------------------------------------------------ */

export function ContactSection({ entries }: { entries: GuestbookEntry[] }) {
    return (
        <section id="contact" className="relative py-24 px-4">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <span className="text-xs font-medium text-primary uppercase tracking-wider">Connect</span>
                    <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-foreground/90 tracking-tight">
                        Get in Touch
                    </h2>
                    <p className="mt-4 text-muted-foreground max-w-xl mx-auto text-sm sm:text-base">
                        Always open to new collaborations and interesting conversations.
                    </p>
                </div>

                {/* Two-Column Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left: Contact Info */}
                    <ContactInfo />

                    {/* Right: Guestbook */}
                    <div className="rounded-2xl p-6 sm:p-8 bg-white/5 backdrop-blur-lg border border-white/10 shadow-lg">
                        <Guestbook entries={entries} />
                    </div>
                </div>
            </div>
        </section>
    );
}
