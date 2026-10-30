import type { ReactNode } from 'react';

interface AIStudioFeatureProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export function AIStudioFeature({ icon, title, description }: AIStudioFeatureProps) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center mb-4">
        <span className="text-lg">{icon}</span>
      </div>
      <h4 className="text-sm tracking-widest uppercase mb-2">{title}</h4>
      <p className="text-xs text-muted">{description}</p>
    </div>
  );
}
