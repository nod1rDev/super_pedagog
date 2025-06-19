import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { MobileNavigation } from "@/components/mobile-navigation";
import { ErrorBoundary } from "@/components/error-boundary";



const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Super Pedagog - Ta'lim Platformasi",
  description:
    "O'zbekiston pedagogika talabalari uchun zamonaviy ta'lim platformasi",
  keywords: [
    "pedagogika",
    "ta'lim",
    "o'zbekiston",
    "talaba",
    "kitob",
    "maqola",
  ],
  authors: [{ name: "Super Pedagog Team" }],
  creator: "Super Pedagog",
  publisher: "Super Pedagog",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    viewportFit: "cover",
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "#020817" },
  ],
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uz" suppressHydrationWarning className={inter.variable}>
      <body className={inter.className}>
        <ErrorBoundary>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
           
            <main className="min-h-[100svh] bg-background text-foreground antialiased pb-16">
              {children}
            </main>
            <MobileNavigation />
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
