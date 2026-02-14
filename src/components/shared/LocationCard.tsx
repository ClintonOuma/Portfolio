'use client';

import { useEffect, useState } from 'react';
import { MapPin, Clock } from 'lucide-react';
import { BentoCard } from '@/components/shared/BentoCard';

export function LocationCard() {
    const [time, setTime] = useState<string>('');

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            setTime(
                now.toLocaleTimeString('en-US', {
                    timeZone: 'Africa/Nairobi',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: true,
                })
            );
        };

        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <BentoCard className="flex flex-col justify-between gap-3">
            <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                <h3 className="text-sm font-semibold text-foreground/90 tracking-tight">Location</h3>
            </div>

            <div className="space-y-1">
                <p className="text-lg font-medium text-foreground/90">Nairobi, Kenya 🇰🇪</p>
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Clock className="w-3.5 h-3.5" />
                    <span className="font-mono tabular-nums">{time || '--:--:-- --'}</span>
                    <span className="text-xs">(EAT, UTC+3)</span>
                </div>
            </div>
        </BentoCard>
    );
}
