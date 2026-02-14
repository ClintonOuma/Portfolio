import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
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
  title: "Portfolio | Full-Stack Engineer",
  description: "A premium portfolio for a Full-Stack Engineer specializing in Next.js, TypeScript, and modern web development.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://portfolio.com",
    title: "Portfolio | Full-Stack Engineer",
    description: "Building the future of the web with JavaScript.",
    siteName: "Portfolio",
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
        {children}
        <Toaster position="bottom-right" theme="dark" />
      </body>
    </html>
  );
}
