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
        {/* Noise + Vignette + Texture */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.07),transparent_60%)]" />
      <div
        className="pointer-events-none fixed inset-0 z-99 mix-blend-overlay"
        style={{
          backgroundImage: "url('https://tse3.mm.bing.net/th/id/OIP.cBntmxAaGCUfgGY-9tCEegHaGr?rs=1&pid=ImgDetMain&o=7&rm=3')",
          backgroundRepeat: 'repeat',
          // small tile size to create a subtle repeating pattern across the screen
          backgroundSize: '24px 24px',
          opacity: 0.2,
        }}
      />
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.6),transparent_40%,rgba(0,0,0,0.6))]" />
        <LayoutShell>{children}</LayoutShell>
        <ToastProvider />
      </body>
    </html>
  );
}
