'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface BentoCardProps {
    children: React.ReactNode;
    className?: string;
    /** Column span: 1 | 2 */
    colSpan?: 1 | 2;
    /** Row span: 1 | 2 */
    rowSpan?: 1 | 2;
}

export function BentoCard({ children, className, colSpan = 1, rowSpan = 1 }: BentoCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            className={cn(
                "relative overflow-hidden rounded-2xl p-6",
                "bg-white/5 backdrop-blur-md border border-white/10",
                "shadow-lg shadow-black/5",
                "transition-colors duration-300",
                colSpan === 2 && "md:col-span-2",
                rowSpan === 2 && "md:row-span-2",
                className
            )}
        >
            {children}
        </motion.div>
    );
}
