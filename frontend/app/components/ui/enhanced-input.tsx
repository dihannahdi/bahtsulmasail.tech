import { forwardRef, useState } from 'react';
import { motion, type MotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

interface InputProps extends MotionProps {
  className?: string;
  type?: string;
  error?: boolean;
  label?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', error, label, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);

    const containerStyles = cn(
      'relative',
      className
    );

    const inputStyles = cn(
      'flex h-10 w-full rounded-md border bg-background px-3 py-2',
      'text-sm ring-offset-background file:border-0 file:bg-transparent',
      'file:text-sm file:font-medium placeholder:text-muted-foreground',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
      'focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
      {
        'border-red-500 focus-visible:ring-red-500': error,
        'border-input': !error,
      }
    );

    return (
      <div className={containerStyles}>
        {label && (
          <motion.label
            className="absolute left-3 text-sm text-muted-foreground pointer-events-none"
            initial={{ y: 0 }}
            animate={{
              y: isFocused ? -24 : 0,
              scale: isFocused ? 0.85 : 1,
              color: isFocused ? 'var(--primary)' : 'var(--muted-foreground)',
            }}
            transition={{ duration: 0.2 }}
          >
            {label}
          </motion.label>
        )}
        <motion.input
          type={type}
          className={inputStyles}
          ref={ref}
          onFocus={() => setIsFocused(true)}
          onBlur={(e) => setIsFocused(e.target.value !== '')}
          {...props}
        />
        <motion.div
          className="absolute bottom-0 left-0 h-0.5 bg-primary"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isFocused ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        />
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input }; 