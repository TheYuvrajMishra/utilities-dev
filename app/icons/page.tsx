'use client';

import { useState } from 'react';
import { Sidebar } from '../components/Sidebar';
import { SearchBar } from '../components/SearchBar';
import { CopyButton } from '../components/CopyButton';
import * as Icons from 'lucide-react';

type IconName = keyof typeof Icons;

const iconCategories = {
  'System': [
    'Home', 'Settings', 'Search', 'Menu', 'X', 'Plus', 'Minus', 'Check', 
    'ChevronRight', 'ChevronLeft', 'ChevronUp', 'ChevronDown', 'MoreVertical', 
    'MoreHorizontal', 'Trash2', 'Edit', 'Copy', 'Download', 'Upload', 'Save'
  ],
  'UI Elements': [
    'Bell', 'User', 'Users', 'Mail', 'Phone', 'Calendar', 'Clock', 
    'MapPin', 'Globe', 'Star', 'Heart', 'Eye', 'EyeOff', 'Lock', 'Unlock',
    'Shield', 'AlertCircle', 'AlertTriangle', 'Info', 'HelpCircle'
  ],
  'Development': [
    'Code', 'Terminal', 'FileCode', 'GitBranch', 'GitCommit', 'GitMerge', 
    'Github', 'Database', 'Server', 'Cloud', 'Package', 'Cpu', 'HardDrive',
    'Bug', 'Zap', 'Activity', 'BarChart', 'PieChart', 'TrendingUp'
  ],
  'Media': [
    'Image', 'Video', 'Music', 'Film', 'Camera', 'Mic', 'Play', 'Pause', 
    'SkipForward', 'SkipBack', 'Volume2', 'VolumeX', 'Maximize', 'Minimize'
  ],
  'Files': [
    'File', 'FileText', 'Folder', 'FolderOpen', 'Archive', 'Bookmark',
    'Clipboard', 'Link', 'Paperclip', 'Share2', 'ExternalLink'
  ],
  'Communication': [
    'MessageCircle', 'MessageSquare', 'Send', 'Inbox', 'AtSign', 
    'Hash', 'ThumbsUp', 'ThumbsDown', 'Smile', 'Frown'
  ],
  'Shopping': [
    'ShoppingCart', 'ShoppingBag', 'CreditCard', 'DollarSign', 
    'Tag', 'Gift', 'Package', 'Truck'
  ],
};

export default function IconsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', ...Object.keys(iconCategories)];

  const filteredIcons = Object.entries(iconCategories).reduce((acc, [category, icons]) => {
    if (selectedCategory !== 'All' && selectedCategory !== category) return acc;
    
    const filtered = icons.filter(icon =>
      icon.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    if (filtered.length > 0) {
      acc[category] = filtered;
    }
    
    return acc;
  }, {} as Record<string, string[]>);

  const getIconSvg = (iconName: string) => {
    return `<${iconName} className="w-6 h-6" />`;
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      
      <main className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto p-8 lg:p-12">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-3">SVG & Icons Library</h1>
            <p className="text-lg text-[#a0a0a0]">
              Professional icon library powered by Lucide React
            </p>
          </div>

          {/* Search and Filter */}
          <div className="mb-8 space-y-4">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search icons..."
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

          {/* Icons Grid */}
          <div className="space-y-12">
            {Object.entries(filteredIcons).map(([category, icons]) => (
              <div key={category}>
                <h2 className="text-2xl font-bold text-white mb-6 pb-2 border-b border-[#2a2a2a]">
                  {category}
                </h2>
                
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {icons.map((iconName) => {
                    const IconComponent = Icons[iconName as IconName] as React.ComponentType<any>;
                    
                    return (
                      <div
                        key={iconName}
                        className="group bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6 hover:border-white/20 transition-all flex flex-col items-center gap-3"
                      >
                        {IconComponent && <IconComponent className="w-8 h-8 text-white" />}
                        
                        <div className="text-center">
                          <p className="text-xs text-[#a0a0a0] mb-2 break-all">
                            {iconName}
                          </p>
                          <CopyButton 
                            text={getIconSvg(iconName)} 
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {Object.keys(filteredIcons).length === 0 && (
            <div className="text-center py-16">
              <p className="text-[#a0a0a0] text-lg">
                No icons found matching your search.
              </p>
            </div>
          )}

          {/* Usage Guide */}
          <div className="mt-16 bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Usage</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-[#a0a0a0] mb-2">Install Lucide React:</p>
                <div className="bg-[#0d0d0d] rounded-lg p-4 border border-[#2a2a2a]">
                  <code className="text-xs text-white font-mono">
                    npm install lucide-react
                  </code>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-[#a0a0a0] mb-2">Import and use:</p>
                <div className="bg-[#0d0d0d] rounded-lg p-4 border border-[#2a2a2a]">
                  <code className="text-xs text-white font-mono">
                    {`import { Home } from 'lucide-react';\n\n<Home className="w-6 h-6" />`}
                  </code>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
