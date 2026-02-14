'use client';

import { useState } from 'react';
import {
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    Radar,
    ResponsiveContainer,
    Tooltip,
} from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { SKILLS, type Skill } from '@/data/skills';
import { cn } from '@/lib/utils';

/* ------------------------------------------------------------------ */
/*  Custom Tooltip                                                     */
/* ------------------------------------------------------------------ */

function SkillTooltip({ active, payload }: { active?: boolean; payload?: Array<{ payload: Skill }> }) {
    if (!active || !payload?.length) return null;
    const skill = payload[0].payload;

    return (
        <div className="rounded-xl px-4 py-3 bg-[#0d0d1a]/90 backdrop-blur-lg border border-white/10 shadow-xl max-w-[220px]">
            <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-semibold text-foreground/90">{skill.name}</span>
                {skill.mastering && (
                    <span className="text-[10px] font-medium text-violet-400 bg-violet-500/10 px-1.5 py-0.5 rounded-full border border-violet-500/20">
                        Mastering
                    </span>
                )}
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">{skill.description}</p>
            <div className="mt-2 flex items-center gap-2">
                <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
                    <div
                        className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-400"
                        style={{ width: `${skill.level}%` }}
                    />
                </div>
                <span className="text-[10px] font-mono text-muted-foreground">{skill.level}%</span>
            </div>
        </div>
    );
}

/* ------------------------------------------------------------------ */
/*  Custom Axis Tick                                                   */
/* ------------------------------------------------------------------ */

function CustomTick({
    x,
    y,
    payload,
    showMastering,
}: {
    x?: number;
    y?: number;
    payload?: { value: string };
    showMastering: boolean;
}) {
    const skill = SKILLS.find((s) => s.name === payload?.value);
    const isMastering = skill?.mastering;

    return (
        <g transform={`translate(${x},${y})`}>
            <text
                textAnchor="middle"
                dy={4}
                className={cn(
                    'fill-muted-foreground text-xs font-medium',
                    showMastering && isMastering && 'fill-violet-400'
                )}
            >
                {payload?.value}
            </text>
            {showMastering && isMastering && (
                <circle cy={-10} r={3} className="fill-violet-400 animate-pulse" />
            )}
        </g>
    );
}

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

export function SkillsRadar() {
    const [showMastering, setShowMastering] = useState(false);

    return (
        <section id="stack" className="relative py-24 px-4">
            <div className="max-w-3xl mx-auto">
                {/* Header */}
                <div className="text-center mb-10">
                    <span className="text-xs font-medium text-primary uppercase tracking-wider">Expertise</span>
                    <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-foreground/90 tracking-tight">
                        Skill Matrix
                    </h2>
                </div>

                {/* Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="relative rounded-2xl p-6 sm:p-8 bg-white/5 backdrop-blur-md border border-white/10 shadow-lg"
                >
                    {/* Toggle */}
                    <div className="flex justify-end mb-4">
                        <button
                            onClick={() => setShowMastering((prev) => !prev)}
                            className={cn(
                                'group flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all border',
                                showMastering
                                    ? 'bg-violet-500/15 border-violet-500/30 text-violet-300'
                                    : 'bg-white/5 border-white/10 text-muted-foreground hover:text-foreground hover:bg-white/10'
                            )}
                        >
                            <Sparkles
                                className={cn(
                                    'w-3.5 h-3.5 transition-colors',
                                    showMastering ? 'text-violet-400' : 'text-muted-foreground group-hover:text-foreground'
                                )}
                            />
                            Currently Mastering
                        </button>
                    </div>

                    {/* Chart */}
                    <ResponsiveContainer width="100%" height={320}>
                        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={SKILLS}>
                            <PolarGrid stroke="rgba(255,255,255,0.06)" />
                            <PolarAngleAxis
                                dataKey="name"
                                tick={(props: Record<string, unknown>) => (
                                    <CustomTick {...(props as { x: number; y: number; payload: { value: string } })} showMastering={showMastering} />
                                )}
                            />
                            <Radar
                                name="Proficiency"
                                dataKey="level"
                                stroke="url(#radarGlow)"
                                fill="url(#radarFill)"
                                strokeWidth={2}
                                dot={{ r: 4, fill: '#a78bfa', stroke: '#7c3aed', strokeWidth: 1 }}
                            />
                            <Tooltip
                                content={<SkillTooltip />}
                                cursor={false}
                            />

                            {/* Gradient definitions */}
                            <defs>
                                <linearGradient id="radarGlow" x1="0" y1="0" x2="1" y2="1">
                                    <stop offset="0%" stopColor="#a78bfa" />
                                    <stop offset="100%" stopColor="#22d3ee" />
                                </linearGradient>
                                <linearGradient id="radarFill" x1="0" y1="0" x2="1" y2="1">
                                    <stop offset="0%" stopColor="#a78bfa" stopOpacity={0.25} />
                                    <stop offset="100%" stopColor="#22d3ee" stopOpacity={0.08} />
                                </linearGradient>
                            </defs>
                        </RadarChart>
                    </ResponsiveContainer>

                    {/* Mastering Legend */}
                    <AnimatePresence>
                        {showMastering && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mt-4 flex flex-wrap justify-center gap-3 overflow-hidden"
                            >
                                {SKILLS.filter((s) => s.mastering).map((skill) => (
                                    <span
                                        key={skill.name}
                                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-xs font-medium text-violet-300"
                                    >
                                        <span className="relative flex h-1.5 w-1.5">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75" />
                                            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-violet-500" />
                                        </span>
                                        {skill.name}
                                    </span>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
}
