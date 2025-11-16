'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { toast } from 'sonner';
import * as LucideIcons from 'lucide-react';

// Get all available icons from lucide-react
const iconList = Object.entries(LucideIcons)
  .filter(([key, value]) => {
    return (
      key !== 'createLucideIcon' && 
      key !== 'default' &&
      typeof value === 'function' &&
      key[0] === key[0].toUpperCase()
    );
  })
  .map(([name, component]) => ({
    name,
    component,
  }));

const categories = [
  'All',
  'Arrows',
  'Audio',
  'Brand',
  'Communication',
  'Design',
  'Development',
  'Devices',
  'File',
  'Media',
  'Navigation',
  'Social',
  'UI',
];

export default function IconsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [iconSize, setIconSize] = useState(24);

  const filteredIcons = iconList.filter((icon) => {
    const matchesSearch = icon.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All' ||
      icon.name.toLowerCase().includes(selectedCategory.toLowerCase());
    return matchesSearch && matchesCategory;
  });

  const copyIconName = (name: string) => {
    navigator.clipboard.writeText(name);
    toast.success(`Copied "${name}" to clipboard!`);
  };

  const copyImportStatement = (name: string) => {
    const importStatement = `import { ${name} } from 'lucide-react';`;
    navigator.clipboard.writeText(importStatement);
    toast.success('Import statement copied!');
  };

  const copyJSX = (name: string) => {
    const jsx = `<${name} className="w-6 h-6" />`;
    navigator.clipboard.writeText(jsx);
    toast.success('JSX code copied!');
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="space-y-2">
          <h1 className="text-3xl lg:text-4xl font-bold tracking-tight">Icons & SVG Library</h1>
          <p className="text-muted">
            Browse and copy from 1000+ professional icons from Lucide React
          </p>
        </div>

        {/* Search and Controls */}
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search icons..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm text-muted whitespace-nowrap">Icon Size:</label>
            <input
              type="range"
              min="16"
              max="48"
              value={iconSize}
              onChange={(e) => setIconSize(Number(e.target.value))}
              className="w-32"
            />
            <span className="text-sm font-medium w-12">{iconSize}px</span>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="whitespace-nowrap"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Stats */}
      <Card className="p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="space-y-1">
            <div className="text-2xl font-bold text-primary">{iconList.length}</div>
            <div className="text-sm text-muted">Total Icons</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-bold text-primary">{filteredIcons.length}</div>
            <div className="text-sm text-muted">Filtered Results</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-bold text-primary">{iconSize}px</div>
            <div className="text-sm text-muted">Current Size</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-bold text-primary">MIT</div>
            <div className="text-sm text-muted">License</div>
          </div>
        </div>
      </Card>

      {/* Icons Grid */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold border-b border-border pb-2">
          Available Icons
        </h2>

        {filteredIcons.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3">
            {filteredIcons.map((icon) => {
              const IconComponent = icon.component as React.ComponentType<any>;
              return (
                <Card
                  key={icon.name}
                  className="p-4 hover:border-primary/50 transition-all cursor-pointer group"
                  onClick={() => copyIconName(icon.name)}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-center h-16 group-hover:scale-110 transition-transform">
                      <IconComponent size={iconSize} className="text-foreground" />
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs text-center font-mono truncate text-muted group-hover:text-foreground transition-colors">
                        {icon.name}
                      </p>
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            copyImportStatement(icon.name);
                          }}
                          className="flex-1 px-2 py-1 bg-zinc-800 hover:bg-zinc-700 rounded text-[10px] transition-colors"
                          title="Copy import"
                        >
                          Import
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            copyJSX(icon.name);
                          }}
                          className="flex-1 px-2 py-1 bg-zinc-800 hover:bg-zinc-700 rounded text-[10px] transition-colors"
                          title="Copy JSX"
                        >
                          JSX
                        </button>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted">No icons found matching your search.</p>
          </div>
        )}
      </section>

      {/* Usage Guide */}
      <Card className="p-6 space-y-4">
        <h3 className="text-xl font-semibold">Quick Start Guide</h3>
        <div className="space-y-3">
          <div>
            <p className="text-sm font-medium mb-2">1. Install Lucide React</p>
            <code className="block px-4 py-3 bg-zinc-900 rounded-lg text-sm font-mono">
              npm install lucide-react
            </code>
          </div>
          <div>
            <p className="text-sm font-medium mb-2">2. Import and use an icon</p>
            <code className="block px-4 py-3 bg-zinc-900 rounded-lg text-sm font-mono">
              {`import { Heart } from 'lucide-react';\n\n<Heart className="w-6 h-6" />`}
            </code>
          </div>
          <div>
            <p className="text-sm font-medium mb-2">3. Customize with props</p>
            <code className="block px-4 py-3 bg-zinc-900 rounded-lg text-sm font-mono">
              {`<Heart size={24} color="red" strokeWidth={2} />`}
            </code>
          </div>
        </div>
      </Card>
    </div>
  );
}
