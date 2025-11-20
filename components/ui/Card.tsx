import React from 'react';
import { clsx } from 'clsx';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function Card({ className, children, ...props }: CardProps) {
  return (
    <div
      className={clsx(
        // Default to a dark, translucent card that matches the landing page style.
        // Consumers can still override or extend via the `className` prop.
        'rounded-2xl border border-white/10 bg-black/30 backdrop-blur-sm',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
