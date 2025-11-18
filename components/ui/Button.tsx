import React from 'react';
import { clsx } from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  children: React.ReactNode;
}

export function Button({ 
  variant = 'primary', 
  size = 'md', 
  className, 
  children, 
  ...props 
}: ButtonProps) {
  const baseStyles = 'cursor-pointer inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-50 disabled:pointer-events-none relative overflow-hidden';
  
  const variants = {
    primary: 'bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:from-blue-500 hover:to-blue-400 active:scale-[0.98] shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 border border-blue-400/20',
    secondary: 'bg-gradient-to-r from-zinc-800 to-zinc-700 text-white hover:from-zinc-700 hover:to-zinc-600 active:scale-[0.98] shadow-lg shadow-black/20 hover:shadow-xl hover:shadow-black/30 border border-white/5',
    ghost: 'bg-white/[0.03] backdrop-blur-sm text-white/80 hover:bg-white/[0.08] hover:text-white border border-white/10 hover:border-white/20 shadow-sm hover:shadow-md',
    outline: 'border border-white/20 bg-white/[0.02] backdrop-blur-sm text-white/90 hover:bg-white/[0.06] hover:border-white/30 shadow-sm hover:shadow-md',
  };
  
  const sizes = {
    sm: 'h-8 px-3 text-sm',
    md: 'h-10 px-4 text-sm',
    lg: 'h-12 px-6 text-base',
    xl: 'h-14 px-8 text-[15px]'
  };
  
  // ensure button type defaults to button (avoid accidental form submit)
  const type = props.type ?? 'button';

  return (
    <button
      type={type}
      className={clsx(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {/* Subtle shine effect on hover - pointer-events-none to avoid intercepting clicks */}
      <span
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-0 hover:opacity-100 transition-opacity duration-500 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.06),transparent)] -translate-x-full hover:translate-x-full"
        style={{ transform: 'translateX(-100%)', transition: 'transform 0.65s cubic-bezier(.2,.9,.2,1), opacity 0.4s' }}
      />

      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </button>
  );
}
