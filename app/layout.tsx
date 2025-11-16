import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
