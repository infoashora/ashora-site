import { cn } from '@/lib/utils';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  background?: 'parchment' | 'white';
  padding?: 'sm' | 'md' | 'lg' | 'xl';
}

const paddingSizes = {
  sm: 'py-8',
  md: 'py-12',
  lg: 'py-16', 
  xl: 'py-24'
};

const backgrounds = {
  parchment: 'bg-parchment',
  white: 'bg-white'
};

export default function Section({ 
  children, 
  className,
  background = 'parchment',
  padding = 'lg'
}: SectionProps) {
  return (
    <section className={cn(
      backgrounds[background],
      paddingSizes[padding],
      className
    )}>
      {children}
    </section>
  );
}
