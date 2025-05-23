import React from 'react';
import { cn } from "../../lib/utils";
import { Loader2 } from "lucide-react";

interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'default' | 'lg' | 'xl';
}

const sizeMap = {
  sm: 'h-4 w-4',
  default: 'h-6 w-6',
  lg: 'h-8 w-8',
  xl: 'h-12 w-12'
};

export const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
  ({ className, size = 'default', ...props }, ref) => {
    return (
      <div 
        ref={ref} 
        className={cn('flex items-center justify-center', className)} 
        {...props}
      >
        <Loader2 className={cn('animate-spin', sizeMap[size])} />
      </div>
    );
  }
);

Spinner.displayName = 'Spinner'; 