import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TopProgressBar from "@/components/TopProgressBar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "JEMA AI NEWS — Minimalist Intelligence",
  description: "Your daily focus and weekly roundup on the future of artificial intelligence, machine learning, and technology ethics. Curated for clarity.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Jema AI News",
  },
  icons: {
    apple: "/apple-touch-icon.png",
  },
  formatDetection: {
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased font-sans`}>
        <TopProgressBar />
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1 flex flex-col bg-subtle-glow">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
