import { Suspense } from "react";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/layout/Navbar";
import { SkillsRadar } from "@/components/SkillsRadar";
import { ProjectGrid } from "@/components/ProjectGrid";
import { ContactSection } from "@/components/Contact";
import { BentoGrid } from "@/app/(home)/sections/BentoGrid";
import { supabase } from "@/lib/supabase";
import type { GuestbookEntry } from "@/types/guestbook";

import { Experience } from "@/components/Experience";
import { Testimonials } from "@/components/Testimonials";

async function ContactWrapper() {
  const { data: entries } = await supabase
    .from('guestbook')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(2);

  return <ContactSection entries={(entries as GuestbookEntry[]) ?? []} />;
}

export default function Home() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-background text-foreground">
      <Hero />
      <Suspense fallback={
        <div className="py-24 text-center text-muted-foreground">
          <div className="animate-pulse">Loading dashboard...</div>
        </div>
      }>
        <BentoGrid />
      </Suspense>
      <SkillsRadar />
      <ProjectGrid />
      <Experience />
      <Testimonials />
      <Suspense fallback={
        <div className="py-24 text-center text-muted-foreground">
          <div className="animate-pulse">Loading contact...</div>
        </div>
      }>
        <ContactWrapper />
      </Suspense>
    </main>
  );
}
