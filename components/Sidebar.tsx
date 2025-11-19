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
  Shield,
  X,
  ArrowUpRight
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navGroups = [
  {
    title: 'Core',
    items: [
      { name: 'Home', href: '/', icon: Home },
      { name: 'Typography', href: '/typography', icon: Type },
      { name: 'Icons & SVG', href: '/icons', icon: Image },
      { name: 'Colors & Gradients', href: '/colors', icon: Palette },
    ],
  },
  {
    title: 'Developer',
    items: [
      { name: 'Code Snippets', href: '/snippets', icon: Code },
      { name: 'Data Tools', href: '/data-tools', icon: FileJson },
      { name: 'Generators', href: '/generators', icon: Sparkles },
    ],
  },
  {
    title: 'Utilities',
    items: [
      { name: 'Text & Regex', href: '/text-tools', icon: Regex },
      { name: 'Colors & Gradients', href: '/colors', icon: Palette },
    ],
  },
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
          'fixed top-0 left-0 h-screen w-64 bg-black/80 border-r border-white/10 z-50 backdrop-blur-xl',
          'transition-transform duration-300 ease-in-out',
          'lg:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo/Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-9 h-9 bg-linear-to-br from-white/20 via-white/5 to-transparent border border-white/20 rounded-xl flex items-center justify-center shadow-inner">
                <Code className="w-4.5 h-4.5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-[15px] font-semibold tracking-wide uppercase text-white">Utilities.dev</span>
                <span className="text-[10px] text-white/50 tracking-[0.35em]">Workspace</span>
              </div>
            </Link>
            <button
              onClick={onClose}
              className="lg:hidden p-1 hover:bg-white/10 rounded-md transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-3 overflow-y-auto">
            {navGroups.map((group) => (
              <div key={group.title}>
                <p className="px-3 pb-2 text-[11px] uppercase tracking-[0.35em] text-white/45">{group.title}</p>
                <div className="space-y-1">
                  {group.items.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.name + item.href}
                        href={item.href}
                        onClick={onClose}
                        className={clsx(
                          'group relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-200 border border-transparent',
                          isActive
                            ? 'text-white bg-white/10 border-white/20 shadow-[0_10px_30px_rgba(15,23,42,0.35)]'
                            : 'text-white/55 hover:text-white hover:bg-white/5 hover:border-white/10'
                        )}
                      >
                        <span
                          className={clsx(
                            'absolute left-1 h-7 w-0.5 rounded-full transition-all duration-300',
                            isActive ? 'bg-linear-to-b from-white/80 to-white/30' : 'bg-transparent group-hover:bg-white/30'
                          )}
                        />
                        <Icon
                          className={clsx(
                            'w-5 h-5 transition-colors duration-200',
                            isActive ? 'text-white' : 'text-white/40 group-hover:text-white/70'
                          )}
                        />
                        <span className="flex-1">{item.name}</span>
                        {isActive && (
                          <span className="text-[10px] uppercase tracking-[0.3em] text-white/60">Live</span>
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>

          {/* Footer */}
          <div className="p-6 border-t border-white/10">
            <div className="rounded-xl p-4 space-y-3 border border-white/10 bg-white/3 backdrop-blur">
              <p className="text-[12px] font-semibold text-white">Need another utility?</p>
              <p className="text-[12px] text-white/60 leading-relaxed">
                Drop a request and we&rsquo;ll prioritize tools that unblock your workflow.
              </p>
              <a
                href="https://github.com/TheYuvrajMishra/utilities-dev"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex whitespace-nowrap items-center gap-2 text-[10px] uppercase text-blue-500/80 hover:text-white transition-colors"
              >
                Submit request <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
