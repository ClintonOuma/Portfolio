'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TESTIMONIALS, type Testimonial } from '@/data/testimonials';

function TestimonialCard({ testimonial, index }: { testimonial: Testimonial; index: number }) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.article
      initial={reducedMotion ? undefined : { opacity: 0, y: 24 }}
      whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={cn(
        'relative rounded-2xl p-6 sm:p-8',
        'bg-white/5 backdrop-blur-md border border-white/10',
        'shadow-lg shadow-black/5'
      )}
    >
      <Quote className="absolute top-5 right-5 w-8 h-8 text-primary/20" aria-hidden />
      <p className="text-sm sm:text-base text-foreground/90 leading-relaxed mb-6 pr-8">
        &ldquo;{testimonial.quote}&rdquo;
      </p>
      <div className="flex items-center gap-4">
        <div
          className={cn(
            'w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold shrink-0',
            'bg-primary/20 text-primary border border-primary/20'
          )}
        >
          {testimonial.avatar ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={testimonial.avatar}
              alt=""
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            testimonial.name.charAt(0).toUpperCase()
          )}
        </div>
        <div>
          <p className="font-semibold text-foreground/90">{testimonial.name}</p>
          <p className="text-xs sm:text-sm text-muted-foreground">
            {testimonial.role}
            {testimonial.company && ` · ${testimonial.company}`}
          </p>
        </div>
      </div>
    </motion.article>
  );
}

export function Testimonials() {
  const reducedMotion = useReducedMotion();

  return (
    <section
      id="testimonials"
      className="relative py-28 px-4"
      aria-label="Testimonials"
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-xs font-medium text-primary uppercase tracking-wider">
            Kind words
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-foreground/90 tracking-tight">
            What others say
          </h2>
          <p className="mt-2 text-sm text-muted-foreground max-w-xl mx-auto">
            Recommendations from peers, mentors, and collaborators.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <TestimonialCard key={t.id} testimonial={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
