import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Resume | Clinton Ouma',
  description: 'Clinton Ouma — Full-Stack Engineer. Resume and experience.',
};

export default function ResumeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
