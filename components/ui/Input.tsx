import React from 'react';
import { clsx } from 'clsx';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({ label, error, className, ...props }: InputProps) {
  return (
    <div className="space-y-2 w-full">
      {label && (
        <label className="text-sm font-medium text-white/70">
          {label}
        </label>
      )}
      <input
        className={clsx(
          'w-full h-10 px-3 py-2 bg-white/3 border border-white/10 rounded-lg text-white placeholder:text-white/50',
          'transition-colors duration-200',
          'focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:border-transparent',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          error && 'border-red-500 focus:ring-red-500',
          className
        )}
        {...props}
      />
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}
