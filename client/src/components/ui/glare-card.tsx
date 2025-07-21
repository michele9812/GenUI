import React from 'react';
import { cn } from '@/lib/utils';

interface GlareCardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function GlareCard({ children, className, style }: GlareCardProps) {
  return (
    <div className={cn('glare-card rounded-xl p-6', className)} style={style}>
      {children}
    </div>
  );
}
