'use client';

import { useActionState, useRef, useEffect, useState } from 'react';
import { addEntry } from '@/app/actions/guestbook';
import { Send, CheckCircle2, AlertCircle, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { GuestbookEntry, GuestbookActionState } from '@/types/guestbook';

const initialState: GuestbookActionState = { success: false, message: '' };
const COOLDOWN_SECONDS = 60;

/* ------------------------------------------------------------------ */
/*  Form                                                               */
/* ------------------------------------------------------------------ */

function GuestbookForm() {
    const [state, formAction, isPending] = useActionState(addEntry, initialState);
    const formRef = useRef<HTMLFormElement>(null);
    const [cooldown, setCooldown] = useState(0);

    useEffect(() => {
        if (state.success) {
            formRef.current?.reset();
            setCooldown(COOLDOWN_SECONDS);
        }
    }, [state]);

    useEffect(() => {
        if (cooldown <= 0) return;
        const t = setInterval(() => setCooldown((c) => (c <= 1 ? 0 : c - 1)), 1000);
        return () => clearInterval(t);
    }, [cooldown]);

    const inCooldown = cooldown > 0;

    return (
        <form ref={formRef} action={formAction} className="space-y-4">
            {/* Honeypot: hidden from users, bots fill it */}
            <div className="absolute -left-[9999px] top-0" aria-hidden>
                <label htmlFor="website">Website</label>
                <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                    name="name"
                    required
                    placeholder="Your name *"
                    className={cn(
                        'w-full px-4 py-2.5 rounded-xl text-sm',
                        'bg-white/5 border border-white/10 text-foreground placeholder:text-muted-foreground/60',
                        'focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 transition-all'
                    )}
                />
                <input
                    name="email"
                    type="email"
                    required
                    placeholder="Your email *"
                    pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                    title="Please enter a valid email (e.g. name@example.com)"
                    className={cn(
                        'w-full px-4 py-2.5 rounded-xl text-sm',
                        'bg-white/5 border border-white/10 text-foreground placeholder:text-muted-foreground/60',
                        'focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 transition-all'
                    )}
                />
            </div>
            <textarea
                name="message"
                required
                rows={3}
                maxLength={500}
                placeholder="Leave a kind message... (max 500 characters) *"
                className={cn(
                    'w-full px-4 py-2.5 rounded-xl text-sm resize-none',
                    'bg-white/5 border border-white/10 text-foreground placeholder:text-muted-foreground/60',
                    'focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 transition-all'
                )}
            />

            {/* Status */}
            {state.message && (
                <div
                    className={cn(
                        'flex items-center gap-2 text-sm px-3 py-2 rounded-lg',
                        state.success
                            ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20'
                            : 'bg-red-500/10 text-red-300 border border-red-500/20'
                    )}
                >
                    {state.success ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                    {state.message}
                </div>
            )}

            <button
                type="submit"
                disabled={isPending || inCooldown}
                className={cn(
                    'inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all',
                    'bg-primary text-primary-foreground hover:brightness-110 active:scale-95',
                    'disabled:opacity-50 disabled:cursor-not-allowed'
                )}
            >
                <Send className="w-4 h-4" />
                {isPending ? 'Sending…' : inCooldown ? `Wait ${cooldown}s` : 'Sign Guestbook'}
            </button>
        </form>
    );
}

/* ------------------------------------------------------------------ */
/*  Entries List                                                       */
/* ------------------------------------------------------------------ */

function EntryCard({ entry }: { entry: GuestbookEntry }) {
    return (
        <div className="flex gap-3 p-4 rounded-xl bg-white/5 border border-white/5">
            <div className="shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">
                {entry.name.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0">
                <p className="text-sm font-medium text-foreground/90">{entry.name}</p>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{entry.message}</p>
            </div>
        </div>
    );
}

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

export function Guestbook({ entries }: { entries: GuestbookEntry[] }) {
    return (
        <div className="flex flex-col flex-1 min-h-0 space-y-6">
            <div className="flex items-center gap-2 mb-2">
                <MessageSquare className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold text-foreground/90">Guestbook</h3>
            </div>

            <GuestbookForm />

            {entries.length > 0 ? (
                <div className="space-y-3 mt-6">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Latest {entries.length} {entries.length === 1 ? 'entry' : 'entries'}
                    </p>
                    {entries.map((entry) => (
                        <EntryCard key={entry.id} entry={entry} />
                    ))}
                </div>
            ) : (
                <div className="mt-6 p-6 rounded-xl bg-white/[0.03] border border-dashed border-white/10 text-center">
                    <p className="text-sm text-muted-foreground">No entries yet. Be the first to leave a message!</p>
                    <p className="text-xs text-muted-foreground/70 mt-1">Your kind words brighten the day.</p>
                </div>
            )}
        </div>
    );
}
