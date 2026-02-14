'use client';

import { useCallback } from 'react';
import confetti from 'canvas-confetti';
import Link from 'next/link';
import { RESUME } from '@/data/resume';
import { EXPERIENCE } from '@/data/experience';
import { cn } from '@/lib/utils';
import { FileDown, ArrowLeft, Mail, Github, MapPin, Briefcase, GraduationCap, Code2 } from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Print styles: clean resume output for Cmd+P / Save as PDF           */
/* ------------------------------------------------------------------ */

const printStyles = `
  @media print {
    body * {
      visibility: hidden;
    }
    #resume-print-area,
    #resume-print-area * {
      visibility: visible;
    }
    #resume-print-area {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      padding: 0;
      margin: 0;
      background: #fff !important;
      color: #111 !important;
      box-shadow: none !important;
    }
    #resume-print-area a {
      color: #111 !important;
    }
    #resume-print-area .print\\:bg-white { background: #fff !important; }
    #resume-print-area .print\\:text-black { color: #111 !important; }
    #resume-print-area .print\\:border-gray-300 { border-color: #d1d5db !important; }
    #resume-print-area .resume-skill-badge {
      border-color: #d1d5db !important;
      background: #f9fafb !important;
      color: #111 !important;
    }
    header, footer, .no-print, nav, [data-no-print] {
      display: none !important;
    }
  }
`;

/* ------------------------------------------------------------------ */
/*  Download + confetti                                                */
/* ------------------------------------------------------------------ */

function useConfettiPrint() {
  return useCallback(() => {
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#8b5cf6', '#22d3ee', '#a78bfa'],
    });
    setTimeout(() => window.print(), 400);
  }, []);
}

/* ------------------------------------------------------------------ */
/*  Skill badge (glow on hover)                                         */
/* ------------------------------------------------------------------ */

function SkillBadge({ label }: { label: string }) {
  return (
    <span
      className={cn(
        'resume-skill-badge inline-block px-3 py-1.5 rounded-lg text-sm font-medium',
        'bg-white/5 border border-white/10 text-foreground/90',
        'transition-all duration-300',
        'hover:border-primary/40 hover:bg-primary/10 hover:shadow-[0_0_20px_rgba(139,92,246,0.25)] hover:text-primary'
      )}
    >
      {label}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Simplified timeline item                                           */
/* ------------------------------------------------------------------ */

function TimelineItem({
  title,
  organization,
  date,
  description,
  type,
}: {
  title: string;
  organization: string;
  date: string;
  description: string;
  type: 'education' | 'work' | 'project';
}) {
  const Icon = type === 'education' ? GraduationCap : type === 'project' ? Code2 : Briefcase;
  return (
    <div className="flex gap-4 print:gap-3">
      <div className="shrink-0 flex flex-col items-center">
        <div className="w-2 h-2 rounded-full bg-primary mt-1.5 print:bg-black" />
        <div className="w-px flex-1 min-h-[2rem] bg-white/10 print:bg-gray-300 mt-1" />
      </div>
      <div className="pb-6 print:pb-4">
        <div className="flex flex-wrap items-center gap-2">
          <Icon className="w-4 h-4 text-primary print:text-black shrink-0" />
          <span className="font-semibold text-foreground print:text-black">{title}</span>
          <span className="text-muted-foreground print:text-gray-700">— {organization}</span>
        </div>
        <p className="text-xs text-muted-foreground print:text-gray-600 mt-0.5">{date}</p>
        <p className="text-sm text-foreground/85 print:text-black mt-2 leading-snug">{description}</p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Resume page                                                         */
/* ------------------------------------------------------------------ */

export default function ResumePage() {
  const handleDownload = useConfettiPrint();

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: printStyles }} />

      <div className="min-h-screen bg-background text-foreground">
        {/* Screen-only: back + download */}
        <div className="no-print sticky top-20 z-10 flex items-center justify-between gap-4 px-4 py-4 max-w-4xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to portfolio
          </Link>
          <button
            type="button"
            onClick={handleDownload}
            className={cn(
              'inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium',
              'bg-primary text-primary-foreground hover:brightness-110 active:scale-95 transition-all',
              'shadow-lg shadow-primary/20'
            )}
          >
            <FileDown className="w-4 h-4" />
            Download PDF
          </button>
        </div>

        {/* Printable resume content */}
        <div
          id="resume-print-area"
          className={cn(
            'max-w-4xl mx-auto px-4 pb-24 print:pb-0',
            'print:bg-white print:text-black'
          )}
        >
          <div className="rounded-2xl border border-white/10 bg-white/5 print:border-0 print:bg-transparent print:rounded-none p-8 sm:p-10 print:p-0">
            {/* Header */}
            <header className="text-center print:text-left border-b border-white/10 print:border-gray-300 pb-6 print:pb-4 mb-6">
              <h1 className="text-3xl font-bold text-foreground print:text-black">{RESUME.name}</h1>
              <p className="text-primary print:text-black mt-1">{RESUME.title}</p>
              <div className="flex flex-wrap items-center justify-center print:justify-start gap-4 mt-4 text-sm text-muted-foreground print:text-gray-700">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="w-4 h-4" />
                  {RESUME.location}
                </span>
                <a href={`mailto:${RESUME.email}`} className="inline-flex items-center gap-1.5 hover:text-primary print:no-underline">
                  <Mail className="w-4 h-4" />
                  {RESUME.email}
                </a>
                <a href={RESUME.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-primary print:no-underline">
                  <Github className="w-4 h-4" />
                  GitHub
                </a>
              </div>
            </header>

            {/* Summary */}
            <section className="mb-8">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-primary print:text-black mb-3">
                Professional Summary
              </h2>
              <p className="text-sm text-foreground/90 print:text-black leading-relaxed">
                {RESUME.summary}
              </p>
            </section>

            {/* Key Project */}
            <section className="mb-8">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-primary print:text-black mb-3">
                Key Project
              </h2>
              <h3 className="font-semibold text-foreground print:text-black mb-2">{RESUME.keyProject.title}</h3>
              <ul className="list-disc list-inside space-y-1.5 text-sm text-foreground/85 print:text-black">
                {RESUME.keyProject.bullets.map((bullet, i) => (
                  <li key={i}>{bullet}</li>
                ))}
              </ul>
            </section>

            {/* Skills grid with glow badges */}
            <section className="mb-8">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-primary print:text-black mb-4">
                Technical Skills
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <h3 className="text-xs font-medium text-muted-foreground print:text-gray-600 mb-2">Frontend</h3>
                  <div className="flex flex-wrap gap-2">
                    {RESUME.skills.frontend.map((s) => (
                      <SkillBadge key={s} label={s} />
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-xs font-medium text-muted-foreground print:text-gray-600 mb-2">Backend</h3>
                  <div className="flex flex-wrap gap-2">
                    {RESUME.skills.backend.map((s) => (
                      <SkillBadge key={s} label={s} />
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-xs font-medium text-muted-foreground print:text-gray-600 mb-2">Tools</h3>
                  <div className="flex flex-wrap gap-2">
                    {RESUME.skills.tools.map((s) => (
                      <SkillBadge key={s} label={s} />
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Experience & Education timeline */}
            <section>
              <h2 className="text-sm font-semibold uppercase tracking-wider text-primary print:text-black mb-4">
                Experience & Education
              </h2>
              <div className="space-y-0">
                {EXPERIENCE.map((item) => (
                  <TimelineItem
                    key={item.id}
                    title={item.title}
                    organization={item.organization}
                    date={item.date}
                    description={item.description}
                    type={item.type}
                  />
                ))}
              </div>
            </section>

            <p className="text-xs text-muted-foreground print:text-gray-500 mt-8 pt-4 border-t border-white/10 print:border-gray-300">
              References and project links available on request.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
