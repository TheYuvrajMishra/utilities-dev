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
  const baseStyles = 'group cursor-pointer relative isolate inline-flex items-center justify-center rounded-2xl font-medium tracking-tight transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 disabled:opacity-40 disabled:pointer-events-none overflow-hidden shadow-[0_1px_0_rgba(255,255,255,0.15)]';
  
  const variants = {
    primary: 'text-white bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.1),rgba(99,102,241,0.01))] border border-white/15 hover:border-white/30 hover:bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.3),rgba(99,102,241,0.45))]',
    secondary: 'text-white bg-white/8 border border-white/15 backdrop-blur hover:bg-white/12 hover:border-white/25 shadow-[0_20px_45px_rgba(15,23,42,0.45)]',
    ghost: 'text-white/75 border border-white/10 bg-transparent hover:bg-white/5 hover:text-white shadow-none',
    outline: 'text-white border border-white/25 bg-white/3 hover:bg-white/8 hover:border-white/40 shadow-[0_15px_35px_rgba(255,255,255,0.08)]',
  };
  
  const sizes = {
    sm: 'h-7 px-2 text-sm',
    md: 'h-9 px-3 text-sm',
    lg: 'h-10 px-4 text-sm',
    xl: 'h-11 px-5 text-[14px]'
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
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700 -translate-x-full group-hover:translate-x-full"
        style={{
          background: 'linear-gradient(120deg, transparent, rgba(255,255,255,0.18), transparent)',
          transitionTimingFunction: 'cubic-bezier(.19,1,.22,1)',
        }}
      />

      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </button>
  );
}
