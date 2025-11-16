'use client';

import React from 'react';
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
  X
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navigation = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Typography', href: '/typography', icon: Type },
  { name: 'Icons & SVG', href: '/icons', icon: Image },
  { name: 'Colors & Gradients', href: '/colors', icon: Palette },
  { name: 'Code Snippets', href: '/snippets', icon: Code },
  { name: 'Data Tools', href: '/data-tools', icon: FileJson },
  { name: 'Generators', href: '/generators', icon: Sparkles },
  { name: 'Text & Regex', href: '/text-tools', icon: Regex },
];

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

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
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-blue-700 rounded-lg flex items-center justify-center">
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
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {navigation.map((item) => {
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
                      ? 'bg-primary text-white shadow-lg shadow-primary/20'
                      : 'text-muted hover:text-foreground hover:bg-zinc-900'
                  )}
                >
                  <Icon className="w-5 h-5" />
                  {item.name}
                </Link>
              );
            })}
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
