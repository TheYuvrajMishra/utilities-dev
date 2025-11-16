'use client';

import { useState } from 'react';
import { Sidebar } from '../components/Sidebar';
import { SearchBar } from '../components/SearchBar';
import { CopyButton } from '../components/CopyButton';
import { Download } from 'lucide-react';

const fontCategories = {
  'Sans Serif': [
    { name: 'Inter', stack: 'Inter, system-ui, sans-serif', usage: 'Modern UI, clean interfaces', googleFont: 'Inter' },
    { name: 'Roboto', stack: 'Roboto, sans-serif', usage: 'Material Design, Android apps', googleFont: 'Roboto' },
    { name: 'Open Sans', stack: 'Open Sans, sans-serif', usage: 'Body text, readability', googleFont: 'Open+Sans' },
    { name: 'Lato', stack: 'Lato, sans-serif', usage: 'Professional, corporate', googleFont: 'Lato' },
    { name: 'Montserrat', stack: 'Montserrat, sans-serif', usage: 'Headers, bold statements', googleFont: 'Montserrat' },
    { name: 'Poppins', stack: 'Poppins, sans-serif', usage: 'Geometric, modern', googleFont: 'Poppins' },
    { name: 'Source Sans Pro', stack: 'Source Sans Pro, sans-serif', usage: 'Adobe, UI text', googleFont: 'Source+Sans+Pro' },
  ],
  'Serif': [
    { name: 'Merriweather', stack: 'Merriweather, serif', usage: 'Elegant reading, articles', googleFont: 'Merriweather' },
    { name: 'Playfair Display', stack: 'Playfair Display, serif', usage: 'Headlines, luxury brands', googleFont: 'Playfair+Display' },
    { name: 'Lora', stack: 'Lora, serif', usage: 'Body text, traditional', googleFont: 'Lora' },
    { name: 'PT Serif', stack: 'PT Serif, serif', usage: 'Newspapers, long-form', googleFont: 'PT+Serif' },
  ],
  'Monospace': [
    { name: 'JetBrains Mono', stack: 'JetBrains Mono, monospace', usage: 'Code editors, IDEs', googleFont: 'JetBrains+Mono' },
    { name: 'Fira Code', stack: 'Fira Code, monospace', usage: 'Programming ligatures', googleFont: 'Fira+Code' },
    { name: 'Source Code Pro', stack: 'Source Code Pro, monospace', usage: 'Adobe, code blocks', googleFont: 'Source+Code+Pro' },
    { name: 'Roboto Mono', stack: 'Roboto Mono, monospace', usage: 'Material code, terminals', googleFont: 'Roboto+Mono' },
    { name: 'Space Mono', stack: 'Space Mono, monospace', usage: 'Retro, tech aesthetic', googleFont: 'Space+Mono' },
    { name: 'IBM Plex Mono', stack: 'IBM Plex Mono, monospace', usage: 'Technical documentation', googleFont: 'IBM+Plex+Mono' },
  ],
  'Display': [
    { name: 'Bebas Neue', stack: 'Bebas Neue, display', usage: 'Bold headlines, posters', googleFont: 'Bebas+Neue' },
    { name: 'Righteous', stack: 'Righteous, display', usage: 'Retro, gaming, bold', googleFont: 'Righteous' },
    { name: 'Anton', stack: 'Anton, display', usage: 'Impact, condensed headers', googleFont: 'Anton' },
  ],
};

export default function TypographyPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', ...Object.keys(fontCategories)];

  const filteredFonts = Object.entries(fontCategories).reduce((acc, [category, fonts]) => {
    if (selectedCategory !== 'All' && selectedCategory !== category) return acc;
    
    const filtered = fonts.filter(font =>
      font.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      font.usage.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    if (filtered.length > 0) {
      acc[category] = filtered;
    }
    
    return acc;
  }, {} as Record<string, typeof fontCategories[keyof typeof fontCategories]>);

  const downloadFont = (fontName: string, googleFont: string) => {
    const link = document.createElement('a');
    link.href = `https://fonts.google.com/specimen/${googleFont}`;
    link.target = '_blank';
    link.click();
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      
      <main className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto p-8 lg:p-12">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-3">Typography Library</h1>
            <p className="text-lg text-[#a0a0a0]">
              Professional font families for development, UI/UX, and documentation
            </p>
          </div>

          {/* Search and Filter */}
          <div className="mb-8 space-y-4">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search fonts by name or usage..."
            />
            
            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-white text-[#0d0d0d]'
                      : 'bg-[#1a1a1a] text-[#a0a0a0] hover:text-white hover:bg-[#2a2a2a]'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Font List */}
          <div className="space-y-12">
            {Object.entries(filteredFonts).map(([category, fonts]) => (
              <div key={category}>
                <h2 className="text-2xl font-bold text-white mb-6 pb-2 border-b border-[#2a2a2a]">
                  {category}
                </h2>
                
                <div className="space-y-4">
                  {fonts.map((font) => (
                    <div
                      key={font.name}
                      className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-6 hover:border-white/20 transition-all"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-semibold text-white mb-1">
                            {font.name}
                          </h3>
                          <p className="text-sm text-[#a0a0a0]">{font.usage}</p>
                        </div>
                        
                        <div className="flex gap-2">
                          <CopyButton text={`font-family: ${font.stack};`} />
                          <button
                            onClick={() => downloadFont(font.name, font.googleFont)}
                            className="p-2 rounded-lg bg-[#1a1a1a] hover:bg-[#2a2a2a] transition-colors border border-[#2a2a2a]"
                            title="View on Google Fonts"
                          >
                            <Download className="w-4 h-4 text-[#a0a0a0]" />
                          </button>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div
                          className="text-3xl text-white"
                          style={{ fontFamily: font.stack }}
                        >
                          The quick brown fox jumps over the lazy dog
                        </div>
                        
                        <div
                          className="text-sm text-[#a0a0a0]"
                          style={{ fontFamily: font.stack }}
                        >
                          ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 0123456789
                        </div>
                        
                        <div className="bg-[#0d0d0d] rounded-lg p-4 border border-[#2a2a2a]">
                          <code className="text-xs text-[#a0a0a0] font-mono">
                            font-family: {font.stack};
                          </code>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {Object.keys(filteredFonts).length === 0 && (
            <div className="text-center py-16">
              <p className="text-[#a0a0a0] text-lg">
                No fonts found matching your search.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
