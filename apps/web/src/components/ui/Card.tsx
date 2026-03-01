import { clsx } from 'clsx';
import type { HTMLAttributes, ReactNode } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  hover?: boolean;
  padding?: 'sm' | 'md' | 'lg';
}

export function Card({ children, hover = true, padding = 'md', className, ...props }: CardProps) {
  return (
    <div
      className={clsx(
        'bg-white rounded-card border border-gray-100 shadow-sm',
        hover && 'hover:shadow-md transition-shadow duration-200',
        {
          'p-4': padding === 'sm',
          'p-6': padding === 'md',
          'p-8': padding === 'lg',
        },
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
