'use client';

import { useActionState, useRef, useEffect } from 'react';
import { addEntry } from '@/app/actions/guestbook';
import { Send, CheckCircle2, AlertCircle, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { GuestbookEntry, GuestbookActionState } from '@/types/guestbook';

const initialState: GuestbookActionState = { success: false, message: '' };

/* ------------------------------------------------------------------ */
/*  Form                                                               */
/* ------------------------------------------------------------------ */

function GuestbookForm() {
    const [state, formAction, isPending] = useActionState(addEntry, initialState);
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        if (state.success) {
            formRef.current?.reset();
        }
    }, [state]);

    return (
        <form ref={formRef} action={formAction} className="space-y-4">
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
                placeholder="Leave a kind message... *"
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
                disabled={isPending}
                className={cn(
                    'inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all',
                    'bg-primary text-primary-foreground hover:brightness-110 active:scale-95',
                    'disabled:opacity-50 disabled:cursor-not-allowed'
                )}
            >
                <Send className="w-4 h-4" />
                {isPending ? 'Sending…' : 'Sign Guestbook'}
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
        <div className="space-y-6">
            <div className="flex items-center gap-2 mb-2">
                <MessageSquare className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold text-foreground/90">Guestbook</h3>
            </div>

            <GuestbookForm />

            {entries.length > 0 ? (
                <div className="space-y-3 mt-6">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Recent entries</p>
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
