'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { toast } from 'sonner';
import * as LucideIcons from 'lucide-react';

// Get all available icons from lucide-react (computed once at module load)
const iconList = Object.entries(LucideIcons)
  .filter(([key, value]) => {
    // Skip utility functions, internal exports, and alias icons (ending with 'Icon')
    if (key === 'createLucideIcon' || key === 'default' || key === 'icons' || key.endsWith('Icon')) {
      return false;
    }
    // Only include actual icon components (objects/functions that start with uppercase)
    return (typeof value === 'function' || typeof value === 'object') && /^[A-Z]/.test(key);
  })
  .map(([name, component]) => ({
    name,
    component,
  }));

const categories = [
  'All',
  'Accessibility',
  'Alerts',
  'Arrows',
  'Audio',
  'Brand',
  'Buildings',
  'Business',
  'Calendar',
  'Charts',
  'Communication',
  'Currency',
  'Design',
  'Development',
  'Devices',
  'Ecommerce',
  'Editor',
  'File',
  'Folders',
  'Food',
  'Gaming',
  'Health',
  'Layout',
  'Maps',
  'Math',
  'Media',
  'Navigation',
  'Nature',
  'Numbers',
  'Payments',
  'Security',
  'Shapes',
  'Shopping',
  'Social',
  'Sports',
  'System',
  'Text',
  'Time',
  'Toggle',
  'Transport',
  'UI',
  'Users',
  'Weather',
];

export default function IconsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [iconSize, setIconSize] = useState(24);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const iconsPerPage = 120; // Show 120 icons per page for better performance

  // Memoize filtered icons to avoid recalculating on every render
  const filteredIcons = useMemo(() => iconList.filter((icon) => {
    const matchesSearch = icon.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Enhanced category matching - All category shows everything
    if (selectedCategory === 'All') {
      return matchesSearch;
    }
    
    const iconNameLower = icon.name.toLowerCase();
    const categoryLower = selectedCategory.toLowerCase();
    
    // Check if icon name contains category keyword
    if (iconNameLower.includes(categoryLower)) {
      return matchesSearch;
    }
    
    // Additional pattern matching for better categorization
    const categoryPatterns: Record<string, string[]> = {
      'accessibility': ['accessible', 'eye', 'ear', 'glasses', 'braille'],
      'alerts': ['alert', 'bell', 'notification', 'warning', 'info', 'help', 'circle-alert', 'triangle-alert', 'octagon-alert'],
      'arrows': ['arrow', 'chevron', 'corner', 'move', 'trending', 'up', 'down', 'left', 'right', 'diagonal'],
      'audio': ['music', 'volume', 'mic', 'headphones', 'speaker', 'radio', 'audio', 'sound'],
      'brand': ['facebook', 'twitter', 'github', 'gitlab', 'figma', 'slack', 'chrome', 'youtube', 'linkedin', 'instagram', 'discord', 'twitch', 'dribbble', 'codepen', 'codesandbox'],
      'buildings': ['building', 'home', 'house', 'hotel', 'hospital', 'school', 'church', 'warehouse', 'landmark', 'castle'],
      'business': ['briefcase', 'presentation', 'chart', 'trending', 'handshake', 'balance'],
      'calendar': ['calendar', 'date', 'event', 'schedule', 'clock', 'timer'],
      'charts': ['bar-chart', 'line-chart', 'pie-chart', 'activity', 'trending', 'analytics', 'chart'],
      'communication': ['mail', 'message', 'chat', 'phone', 'video', 'call', 'contact', 'at-sign', 'inbox', 'send'],
      'currency': ['dollar', 'euro', 'pound', 'yen', 'bitcoin', 'banknote', 'currency'],
      'design': ['brush', 'palette', 'pen', 'paint', 'dropper', 'crop', 'wand', 'pipette', 'stamp', 'eraser'],
      'development': ['code', 'terminal', 'git', 'brackets', 'bug', 'command', 'binary', 'cpu', 'database', 'server', 'webhook'],
      'devices': ['smartphone', 'tablet', 'laptop', 'desktop', 'watch', 'monitor', 'tv', 'printer', 'keyboard', 'mouse', 'router', 'cast'],
      'ecommerce': ['tag', 'barcode', 'scan', 'receipt', 'package', 'box', 'truck', 'store'],
      'editor': ['bold', 'italic', 'underline', 'strikethrough', 'heading', 'list', 'quote', 'pilcrow', 'subscript', 'superscript'],
      'file': ['file', 'document', 'page', 'text', 'archive', 'attachment', 'paperclip', 'copy'],
      'folders': ['folder', 'directory', 'archive'],
      'food': ['coffee', 'pizza', 'utensils', 'wine', 'apple', 'soup', 'cake', 'ice-cream'],
      'gaming': ['gamepad', 'dice', 'puzzle', 'joystick'],
      'health': ['heart', 'pulse', 'thermometer', 'activity', 'pill', 'syringe', 'stethoscope', 'cross'],
      'layout': ['layout', 'grid', 'columns', 'rows', 'sidebar', 'panel', 'align', 'distribute'],
      'maps': ['map', 'pin', 'marker', 'location', 'route', 'compass', 'navigation', 'milestone', 'signpost'],
      'math': ['plus', 'minus', 'divide', 'equal', 'percent', 'calculator', 'sigma', 'infinity'],
      'media': ['play', 'pause', 'stop', 'skip', 'repeat', 'shuffle', 'film', 'video', 'camera', 'image', 'picture', 'photo', 'gallery', 'frame', 'clapperboard'],
      'navigation': ['home', 'menu', 'compass', 'locate', 'milestone', 'signpost'],
      'nature': ['tree', 'leaf', 'flower', 'sprout', 'palm', 'waves', 'mountain', 'sunrise', 'sunset'],
      'numbers': ['hash', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'zero'],
      'payments': ['credit-card', 'card', 'wallet', 'coins', 'banknote', 'receipt', 'dollar', 'euro', 'pound'],
      'security': ['lock', 'unlock', 'key', 'shield', 'eye-off', 'fingerprint', 'shield-check', 'shield-alert', 'shield-close'],
      'shapes': ['circle', 'square', 'triangle', 'hexagon', 'octagon', 'diamond', 'pentagon'],
      'shopping': ['shopping-cart', 'shopping-bag', 'basket', 'store', 'tag'],
      'social': ['share', 'thumbs-up', 'thumbs-down', 'star', 'bookmark', 'rss', 'at-sign'],
      'sports': ['trophy', 'award', 'target', 'dumbbell', 'bike', 'football', 'medal'],
      'system': ['power', 'battery', 'wifi', 'bluetooth', 'signal', 'download', 'upload', 'refresh', 'rotate', 'sync', 'loader', 'settings', 'sliders'],
      'text': ['type', 'text', 'font', 'case-sensitive', 'case-upper', 'case-lower', 'whole-word', 'spell-check'],
      'time': ['clock', 'timer', 'alarm', 'hourglass', 'stopwatch'],
      'toggle': ['toggle-left', 'toggle-right', 'switch', 'radio', 'check', 'minus', 'circle-dot'],
      'transport': ['car', 'truck', 'bus', 'train', 'plane', 'ship', 'bike', 'ambulance', 'ferry', 'rocket', 'tractor', 'tramway'],
      'ui': ['check', 'x', 'plus', 'minus', 'settings', 'trash', 'edit', 'delete', 'copy', 'scissors', 'maximize', 'minimize', 'expand', 'shrink', 'zoom-in', 'zoom-out', 'more', 'ellipsis'],
      'users': ['user', 'users', 'account', 'profile', 'person', 'people', 'contact'],
      'weather': ['cloud', 'sun', 'moon', 'rain', 'snow', 'wind', 'thunderstorm', 'cloudy', 'drizzle', 'snowflake', 'tornado', 'rainbow'],
    };

    const patterns = categoryPatterns[categoryLower] || [];
    const matchesCategory = patterns.some((pattern) => iconNameLower.includes(pattern));
    
    return matchesSearch && matchesCategory;
  }), [searchQuery, selectedCategory]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredIcons.length / iconsPerPage);
  const startIndex = (currentPage - 1) * iconsPerPage;
  const endIndex = startIndex + iconsPerPage;
  const currentIcons = filteredIcons.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  // Scroll to top when page changes
  useEffect(() => {
    console.log('Page changed to:', currentPage);
    console.log('Scroll position before:', window.scrollY);
    
    // Scroll to the top of the icons section instead of the whole page
    const iconsSection = document.querySelector('#icons-section');
    if (iconsSection) {
      iconsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      console.log('Scrolled to icons section');
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      console.log('Scrolled to top of page');
    }
    
    setTimeout(() => {
      console.log('Scroll position after:', window.scrollY);
    }, 500);
  }, [currentPage]);

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
              placeholder="Search icons by name (e.g., heart, arrow, file)..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <label className="text-sm text-muted whitespace-nowrap">Size:</label>
              <input
                type="range"
                min="16"
                max="64"
                value={iconSize}
                onChange={(e) => setIconSize(Number(e.target.value))}
                className="w-24"
              />
              <span className="text-sm font-medium w-12">{iconSize}px</span>
            </div>
            <div className="flex gap-1 bg-zinc-900 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1 rounded text-sm transition-colors ${
                  viewMode === 'grid' ? 'bg-primary text-white' : 'text-muted hover:text-foreground'
                }`}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-1 rounded text-sm transition-colors ${
                  viewMode === 'list' ? 'bg-primary text-white' : 'text-muted hover:text-foreground'
                }`}
              >
                List
              </button>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => handleCategoryChange(category)}
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
            <div className="text-sm text-muted">Showing {startIndex + 1}-{Math.min(endIndex, filteredIcons.length)}</div>
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
      <section id="icons-section" className="space-y-4">
        <div className="flex items-center justify-between border-b border-border pb-2">
          <h2 className="text-2xl font-semibold">
            Available Icons
          </h2>
          {totalPages > 1 && (
            <div className="text-sm text-muted">
              Page {currentPage} of {totalPages}
            </div>
          )}
        </div>

        {filteredIcons.length > 0 ? (
          viewMode === 'grid' ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3">
              {currentIcons.map((icon) => {
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
            <div className="space-y-2">
              {currentIcons.map((icon) => {
                const IconComponent = icon.component as React.ComponentType<any>;
                return (
                  <Card
                    key={icon.name}
                    className="p-4 hover:border-primary/50 transition-all cursor-pointer group"
                    onClick={() => copyIconName(icon.name)}
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-12 h-12 group-hover:scale-110 transition-transform">
                        <IconComponent size={iconSize} className="text-foreground" />
                      </div>
                      <div className="flex-1">
                        <p className="font-mono text-sm font-medium">{icon.name}</p>
                        <p className="text-xs text-muted mt-1">Click to copy name</p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            copyImportStatement(icon.name);
                          }}
                        >
                          Copy Import
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            copyJSX(icon.name);
                          }}
                        >
                          Copy JSX
                        </Button>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          )
        ) : (
          <div className="text-center py-12">
            <p className="text-muted">No icons found matching your search.</p>
            <p className="text-sm text-muted mt-2">Try searching for: arrow, heart, file, user, settings</p>
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && filteredIcons.length > 0 && (
          <div className="flex items-center justify-center gap-2 pt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
            >
              First
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            
            <div className="flex items-center gap-1">
              {/* Show page numbers with smart ellipsis */}
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter(page => {
                  // Always show first page, last page, current page, and pages around current
                  return page === 1 || 
                         page === totalPages || 
                         Math.abs(page - currentPage) <= 1;
                })
                .map((page, index, array) => {
                  // Add ellipsis if there's a gap
                  const prevPage = array[index - 1];
                  const showEllipsis = prevPage && page - prevPage > 1;
                  
                  return (
                    <React.Fragment key={page}>
                      {showEllipsis && (
                        <span className="px-2 text-muted">...</span>
                      )}
                      <Button
                        variant={currentPage === page ? 'primary' : 'ghost'}
                        size="sm"
                        onClick={() => setCurrentPage(page)}
                        className="min-w-10"
                      >
                        {page}
                      </Button>
                    </React.Fragment>
                  );
                })}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
            >
              Last
            </Button>
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
