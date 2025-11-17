import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { LayoutShell } from "@/components/LayoutShell";
import { ToastProvider } from "@/components/ToastProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "DevUtilities - Professional Developer Tools & Resources",
  description: "A comprehensive utility hub for developers providing fonts, SVG assets, color tools, code snippets, formatters, and generators. Production-grade developer resources in one place.",
  keywords: ["developer tools", "utilities", "fonts", "icons", "SVG", "code snippets", "formatters", "generators", "color palette", "gradients"],
  authors: [{ name: "DevUtilities" }],
  creator: "DevUtilities",
  openGraph: {
    title: "DevUtilities - Professional Developer Tools",
    description: "Comprehensive utility hub for developers with fonts, icons, tools, and more",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased bg-background text-foreground`}
      >
        <LayoutShell>{children}</LayoutShell>
        <ToastProvider />
      </body>
    </html>
  );
}
