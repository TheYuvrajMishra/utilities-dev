import React from 'react';
import { clsx } from 'clsx';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function Card({ className, children, ...props }: CardProps) {
  return (
    <div
      className={clsx(
        'bg-card border border-border rounded-lg backdrop-blur-sm',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
