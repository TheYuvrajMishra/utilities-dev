'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { clsx } from 'clsx';
import { 
  Home, 
  Type, 
  Image, 
  Palette, 
  Code, 
  FileJson, 
  Sparkles, 
  Regex,
  X,
  ChevronDown,
  Hash,
  Clock,
  Diff,
  Braces,
  Layout,
  GitBranch,
  Globe,
  QrCode,
  FileCode2,
  Calculator,
  Keyboard,
  Tag,
  Wand2
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NavigationCategory {
  category: string;
  items: Array<{
    name: string;
    href: string;
    icon: any;
  }>;
}

const navigation: NavigationCategory[] = [
  {
    category: 'Overview',
    items: [
      { name: 'Home', href: '/', icon: Home },
    ],
  },
  {
    category: 'Text & String',
    items: [
      { name: 'Text Tools', href: '/text-tools', icon: Type },
      { name: 'Regex Tester', href: '/regex', icon: Regex },
      { name: 'String Encoders', href: '/encoders', icon: Code },
      { name: 'Markdown Editor', href: '/markdown', icon: FileCode2 },
      { name: 'Diff Checker', href: '/diff', icon: Diff },
    ],
  },
  {
    category: 'Data & Format',
    items: [
      { name: 'JSON Tools', href: '/json-tools', icon: Braces },
      { name: 'Code Formatters', href: '/formatters', icon: FileJson },
      { name: 'Data Tools', href: '/data-tools', icon: FileJson },
      { name: 'SQL Tools', href: '/sql-tools', icon: FileJson },
    ],
  },
  {
    category: 'Generators',
    items: [
      { name: 'Generators', href: '/generators', icon: Sparkles },
      { name: 'Hash & Crypto', href: '/hash', icon: Hash },
      { name: 'QR Codes', href: '/qr-code', icon: QrCode },
      { name: 'Lorem Ipsum', href: '/lorem', icon: Wand2 },
      { name: 'Meta Tags', href: '/meta-tags', icon: Tag },
    ],
  },
  {
    category: 'Design & UI',
    items: [
      { name: 'Colors', href: '/colors', icon: Palette },
      { name: 'CSS Tools', href: '/css-tools', icon: Layout },
      { name: 'Typography', href: '/typography', icon: Type },
      { name: 'Icons & SVG', href: '/icons', icon: Image },
      { name: 'Image Tools', href: '/image-tools', icon: Image },
    ],
  },
  {
    category: 'Development',
    items: [
      { name: 'Code Snippets', href: '/snippets', icon: Code },
      { name: 'Git Tools', href: '/git-tools', icon: GitBranch },
      { name: 'API Tester', href: '/api-tester', icon: Globe },
      { name: 'Unit Converter', href: '/converter', icon: Calculator },
    ],
  },
  {
    category: 'Utilities',
    items: [
      { name: 'Time & Date', href: '/time-tools', icon: Clock },
      { name: 'Shortcuts', href: '/shortcuts', icon: Keyboard },
    ],
  },
];

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const [expandedCategories, setExpandedCategories] = useState<string[]>([
    'Overview',
    'Text & String',
    'Data & Format',
    'Generators',
    'Design & UI',
    'Development',
    'Utilities',
  ]);

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={clsx(
          'fixed top-0 left-0 h-screen w-64 bg-[#111] border-r border-border z-50',
          'transition-transform duration-300 ease-in-out',
          'lg:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo/Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 bg-linear-to-br from-primary to-blue-700 rounded-lg flex items-center justify-center">
                <Code className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold tracking-tight">DevUtilities</span>
                <span className="text-[10px] text-muted -mt-1">Developer Tools</span>
              </div>
            </Link>
            <button
              onClick={onClose}
              className="lg:hidden p-1 hover:bg-zinc-800 rounded-md transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-4 overflow-y-auto">
            {navigation.map((section) => (
              <div key={section.category} className="space-y-1">
                {/* Category Header */}
                <button
                  onClick={() => toggleCategory(section.category)}
                  className="flex items-center justify-between w-full px-3 py-2 text-xs font-semibold text-zinc-400 uppercase tracking-wider hover:text-zinc-300 transition-colors"
                >
                  <span>{section.category}</span>
                  <ChevronDown
                    className={clsx(
                      'w-4 h-4 transition-transform duration-200',
                      expandedCategories.includes(section.category) ? 'rotate-0' : '-rotate-90'
                    )}
                  />
                </button>

                {/* Category Items */}
                {expandedCategories.includes(section.category) && (
                  <div className="space-y-1">
                    {section.items.map((item) => {
                      const isActive = pathname === item.href;
                      const Icon = item.icon;

                      return (
                        <Link
                          key={item.name}
                          href={item.href}
                          onClick={onClose}
                          className={clsx(
                            'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
                            isActive
                              ? 'bg-primary text-black shadow-lg shadow-primary/20'
                              : 'text-muted hover:text-foreground hover:bg-zinc-900'
                          )}
                        >
                          <Icon className="w-4 h-4" />
                          {item.name}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Footer */}
          <div className="p-6 border-t border-border">
            <div className="bg-zinc-900 rounded-lg p-4 space-y-2">
              <p className="text-xs font-semibold text-foreground">Need more tools?</p>
              <p className="text-xs text-muted">
                Suggest new utilities via GitHub
              </p>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-primary hover:text-primary-hover transition-colors"
              >
                Submit Request →
              </a>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
