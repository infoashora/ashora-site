import { cn } from '@/lib/utils';
import { Product } from '@/data/products';

interface IntentionBadgeProps {
  intention: Product['intention'];
  className?: string;
}

const intentionStyles = {
  'Manifestation': 'bg-gold text-ink',
  'Love & Self-Love': 'bg-accentPink text-ink',
  'Wealth & Abundance': 'bg-accentGreen text-ink',  
  'Peace & Healing': 'bg-accentBlue text-ink'
};

export default function IntentionBadge({ intention, className }: IntentionBadgeProps) {
  return (
    <span className={cn(
      'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium',
      intentionStyles[intention],
      className
    )}>
      {intention}
    </span>
  );
}
