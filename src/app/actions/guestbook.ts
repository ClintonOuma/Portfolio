'use server';

import { supabase } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';
import type { GuestbookActionState } from '@/types/guestbook';

const MAX_MESSAGE_LENGTH = 500;

export async function addEntry(
    _prevState: GuestbookActionState,
    formData: FormData
): Promise<GuestbookActionState> {
    /* Honeypot: if filled, treat as bot */
    const honeypot = formData.get('website') as string | null;
    if (honeypot?.trim()) {
        return { success: true, message: 'Thanks for signing the guestbook! 🎉' };
    }

    const name = formData.get('name') as string | null;
    const email = formData.get('email') as string | null;
    const message = formData.get('message') as string | null;

    if (!name?.trim() || !message?.trim()) {
        return { success: false, message: 'Name and message are required.' };
    }

    if (name.length > 100) {
        return { success: false, message: 'Name is too long.' };
    }

    if (!email?.trim()) {
        return { success: false, message: 'Please enter a valid email address.' };
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email.trim())) {
        return { success: false, message: 'Please enter a valid email address (e.g. name@example.com).' };
    }

    if (message.length > MAX_MESSAGE_LENGTH) {
        return { success: false, message: `Message must be under ${MAX_MESSAGE_LENGTH} characters.` };
    }

    const { error } = await supabase.from('guestbook').insert({
        name: name.trim(),
        email: email?.trim() || null,
        message: message.trim(),
    });

    if (error) {
        console.error('Supabase insert error:', error);
        return { success: false, message: 'Failed to sign the guestbook. Please try again.' };
    }

    revalidatePath('/');
    return { success: true, message: 'Thanks for signing the guestbook! 🎉' };
}
