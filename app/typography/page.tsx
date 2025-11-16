'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Copy, Check } from 'lucide-react';
import { toast } from 'sonner';

const fonts = [
  {
    name: 'Inter',
    category: 'Sans-serif',
    description: 'A versatile typeface designed for computer screens',
    preview: 'The quick brown fox jumps over the lazy dog',
    css: "font-family: 'Inter', sans-serif;",
    googleFonts: 'https://fonts.google.com/specimen/Inter',
  },
  {
    name: 'Roboto',
    category: 'Sans-serif',
    description: 'A neo-grotesque sans-serif typeface family',
    preview: 'The quick brown fox jumps over the lazy dog',
    css: "font-family: 'Roboto', sans-serif;",
    googleFonts: 'https://fonts.google.com/specimen/Roboto',
  },
  {
    name: 'Poppins',
    category: 'Sans-serif',
    description: 'A geometric sans-serif with a unique style',
    preview: 'The quick brown fox jumps over the lazy dog',
    css: "font-family: 'Poppins', sans-serif;",
    googleFonts: 'https://fonts.google.com/specimen/Poppins',
  },
  {
    name: 'Montserrat',
    category: 'Sans-serif',
    description: 'Urban typographic style inspired by old Buenos Aires',
    preview: 'The quick brown fox jumps over the lazy dog',
    css: "font-family: 'Montserrat', sans-serif;",
    googleFonts: 'https://fonts.google.com/specimen/Montserrat',
  },
  {
    name: 'JetBrains Mono',
    category: 'Monospace',
    description: 'A typeface for developers with increased height for better readability',
    preview: 'const code = "Hello World";',
    css: "font-family: 'JetBrains Mono', monospace;",
    googleFonts: 'https://fonts.google.com/specimen/JetBrains+Mono',
  },
  {
    name: 'Fira Code',
    category: 'Monospace',
    description: 'Monospaced font with programming ligatures',
    preview: 'const code => !== === >= <=',
    css: "font-family: 'Fira Code', monospace;",
    googleFonts: 'https://fonts.google.com/specimen/Fira+Code',
  },
  {
    name: 'Playfair Display',
    category: 'Serif',
    description: 'A high contrast serif for headings',
    preview: 'The quick brown fox jumps over the lazy dog',
    css: "font-family: 'Playfair Display', serif;",
    googleFonts: 'https://fonts.google.com/specimen/Playfair+Display',
  },
  {
    name: 'Merriweather',
    category: 'Serif',
    description: 'Designed to be pleasant to read on screens',
    preview: 'The quick brown fox jumps over the lazy dog',
    css: "font-family: 'Merriweather', serif;",
    googleFonts: 'https://fonts.google.com/specimen/Merriweather',
  },
];

const fontPairings = [
  {
    title: 'Modern & Clean',
    heading: 'Inter',
    body: 'Roboto',
    use: 'Web Apps, Dashboards',
  },
  {
    title: 'Editorial',
    heading: 'Playfair Display',
    body: 'Merriweather',
    use: 'Blogs, Articles',
  },
  {
    title: 'Tech & Code',
    heading: 'Poppins',
    body: 'JetBrains Mono',
    use: 'Documentation, Dev Tools',
  },
  {
    title: 'Professional',
    heading: 'Montserrat',
    body: 'Inter',
    use: 'Corporate, Business',
  },
];

export default function TypographyPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [previewText, setPreviewText] = useState('The quick brown fox jumps over the lazy dog');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const filteredFonts = fonts.filter(
    (font) =>
      font.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      font.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    toast.success('Copied to clipboard!');
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="space-y-2">
          <h1 className="text-3xl lg:text-4xl font-bold tracking-tight">Typography Library</h1>
          <p className="text-muted">
            Professional font collection with live previews and CSS snippets
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search fonts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex-1">
            <Input
              placeholder="Custom preview text..."
              value={previewText}
              onChange={(e) => setPreviewText(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Font Pairings */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold border-b border-border pb-2">
          Recommended Pairings
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {fontPairings.map((pairing) => (
            <Card key={pairing.title} className="p-6">
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-primary">{pairing.title}</h3>
                <div className="space-y-2">
                  <div className="text-sm">
                    <span className="text-muted">Heading: </span>
                    <span className="font-semibold">{pairing.heading}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-muted">Body: </span>
                    <span className="font-semibold">{pairing.body}</span>
                  </div>
                </div>
                <div className="pt-2 border-t border-border">
                  <p className="text-xs text-muted">Best for: {pairing.use}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Font Cards */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold border-b border-border pb-2">
          All Fonts ({filteredFonts.length})
        </h2>
        
        <div className="space-y-4">
          {filteredFonts.map((font, index) => (
            <Card key={font.name} className="p-6">
              <div className="space-y-4">
                {/* Font Header */}
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="text-xl font-semibold">{font.name}</h3>
                      <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-md">
                        {font.category}
                      </span>
                    </div>
                    <p className="text-sm text-muted">{font.description}</p>
                  </div>
                  <a
                    href={font.googleFonts}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" size="sm">
                      Google Fonts
                    </Button>
                  </a>
                </div>

                {/* Font Preview */}
                <div className="p-6 bg-zinc-900 rounded-lg border border-border">
                  <p
                    className="text-2xl"
                    style={{ fontFamily: font.name }}
                  >
                    {previewText || font.preview}
                  </p>
                </div>

                {/* CSS Code */}
                <div className="flex items-center gap-2">
                  <code className="flex-1 px-4 py-3 bg-zinc-900 rounded-lg text-sm font-mono">
                    {font.css}
                  </code>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(font.css, index)}
                    className="gap-2"
                  >
                    {copiedIndex === index ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredFonts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted">No fonts found matching your search.</p>
          </div>
        )}
      </section>
    </div>
  );
}
