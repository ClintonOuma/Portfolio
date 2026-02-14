import { Github, Twitter, Mail } from 'lucide-react';
import { SITE_METADATA } from '@/lib/constants';

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative border-t border-white/10 bg-black/30 backdrop-blur-sm">
            <div className="max-w-5xl mx-auto px-4 py-8">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-center sm:text-left">
                        <p className="text-sm font-semibold text-foreground/90">Clinton Ouma</p>
                        <p className="text-xs text-muted-foreground mt-0.5">Full-Stack Developer</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <a
                            href={SITE_METADATA.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-primary transition-colors"
                            aria-label="GitHub"
                        >
                            <Github className="w-4 h-4" />
                        </a>
                        <a
                            href={SITE_METADATA.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-primary transition-colors"
                            aria-label="X / Twitter"
                        >
                            <Twitter className="w-4 h-4" />
                        </a>
                        <a
                            href="mailto:clichyb80@gmail.com"
                            className="text-muted-foreground hover:text-primary transition-colors"
                            aria-label="Email"
                        >
                            <Mail className="w-4 h-4" />
                        </a>
                    </div>
                </div>
                <div className="mt-6 pt-6 border-t border-white/5 text-center">
                    <p className="text-xs text-muted-foreground">
                        © {currentYear} Clinton Ouma. Built with Next.js & Tailwind.
                    </p>
                </div>
            </div>
        </footer>
    );
}
