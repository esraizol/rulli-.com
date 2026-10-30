import { cn } from '@/lib/utils';

interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionLabel({ children, className }: SectionLabelProps) {
  return (
    <p className={cn(
      'text-xs uppercase tracking-[0.2em] font-medium text-muted flex items-center gap-4',
      className
    )}>
      <span className="inline-block w-8 h-px bg-muted" />
      {children}
    </p>
  );
}
