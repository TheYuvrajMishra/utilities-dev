'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Type, 
  Image, 
  Palette, 
  Code, 
  RefreshCw, 
  Sparkles, 
  FileCode,
  Home
} from 'lucide-react';
import { clsx } from 'clsx';

const navigation = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Typography', href: '/typography', icon: Type },
  { name: 'SVG & Icons', href: '/icons', icon: Image },
  { name: 'Colors & Gradients', href: '/colors', icon: Palette },
  { name: 'UI/Code Snippets', href: '/snippets', icon: Code },
  { name: 'Data Converters', href: '/converters', icon: RefreshCw },
  { name: 'Generators', href: '/generators', icon: Sparkles },
  { name: 'Formatters', href: '/formatters', icon: FileCode },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-gradient-to-b from-[#0d0d0d] to-black border-r border-white/5 flex flex-col h-screen sticky top-0 backdrop-blur-xl">
      <div className="p-6 border-b border-white/5">
        <h1 className="text-2xl font-bold text-white tracking-tight mb-1 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
          DevUtilities
        </h1>
        <p className="text-xs text-[#666] font-medium">Professional Dev Tools</p>
      </div>
      
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={clsx(
                'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 group',
                isActive
                  ? 'bg-gradient-to-r from-white to-gray-200 text-[#0d0d0d] shadow-lg shadow-white/10'
                  : 'text-[#666] hover:text-white hover:bg-white/5 hover:translate-x-1'
              )}
            >
              <Icon className={clsx('w-5 h-5 transition-transform duration-300', isActive ? '' : 'group-hover:scale-110')} />
              {item.name}
            </Link>
          );
        })}
      </nav>
      
      <div className="p-4 border-t border-white/5 text-xs text-[#666] font-medium">
        <p>© 2025 DevUtilities</p>
      </div>
    </aside>
  );
}
