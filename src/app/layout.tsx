import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import { Navbar } from "@/components/layout/Navbar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Clinton Ouma | Full-Stack Engineer",
  description: "Clinton Ouma is a Full-Stack Engineer specializing in Next.js, TypeScript, and Supabase. Building premium, high-performance web applications with modern design principles.",
  keywords: ["Clinton Ouma", "Full-Stack Developer", "Next.js", "TypeScript", "Supabase", "Portfolio", "Web Development", "Nairobi"],
  authors: [{ name: "Clinton Ouma" }],
  creator: "Clinton Ouma",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://portfolio.com", // Replace with actual URL if known
    title: "Clinton Ouma | Full-Stack Engineer",
    description: "Building the future of the web with Next.js and Supabase.",
    siteName: "Clinton Ouma Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Clinton Ouma | Full-Stack Engineer",
    description: "Building the future of the web with Next.js and Supabase.",
    creator: "@abclichy",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground selection:bg-violet-500/30 selection:text-violet-200`}
      >
        <Navbar />
        <div className="min-h-screen pt-20">
          {children}
        </div>
        <Toaster position="bottom-right" theme="dark" />
      </body>
    </html>
  );
}
