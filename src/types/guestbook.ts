export interface GuestbookEntry {
    id: number;
    name: string;
    email: string;
    message: string;
    created_at?: string;
}

export interface GuestbookActionState {
    success: boolean;
    message: string;
}
