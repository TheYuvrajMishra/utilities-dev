'use client';

import { Search } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function SearchBar({ 
  value, 
  onChange, 
  placeholder = 'Search...', 
  className = '' 
}: SearchBarProps) {
  return (
    <div className={`relative ${className}`}>
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#666]" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-linear-to-br from-white/5 to-white/2 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-white placeholder:text-[#666] focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/30 transition-all duration-300 hover:border-white/20"
      />
    </div>
  );
}
