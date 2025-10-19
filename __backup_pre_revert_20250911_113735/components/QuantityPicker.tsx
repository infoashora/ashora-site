'use client';

import { Minus, Plus } from 'lucide-react';
import Button from './Button';

interface QuantityPickerProps {
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  min?: number;
  max?: number;
  className?: string;
}

export default function QuantityPicker({
  quantity,
  onQuantityChange,
  min = 1,
  max = 10,
  className
}: QuantityPickerProps) {
  const handleDecrease = () => {
    if (quantity > min) {
      onQuantityChange(quantity - 1);
    }
  };

  const handleIncrease = () => {
    if (quantity < max) {
      onQuantityChange(quantity + 1);
    }
  };

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <Button
        variant="outline"
        size="sm"
        onClick={handleDecrease}
        disabled={quantity <= min}
        className="w-8 h-8 p-0"
        aria-label="Decrease quantity"
      >
        <Minus className="h-3 w-3" />
      </Button>
      
      <span className="text-base font-medium min-w-[2rem] text-center">
        {quantity}
      </span>
      
      <Button
        variant="outline"
        size="sm"
        onClick={handleIncrease}
        disabled={quantity >= max}
        className="w-8 h-8 p-0"
        aria-label="Increase quantity"
      >
        <Plus className="h-3 w-3" />
      </Button>
    </div>
  );
}
