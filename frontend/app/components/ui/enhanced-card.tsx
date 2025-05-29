import { forwardRef } from 'react';
import { motion, type MotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CardProps extends MotionProps {
  variant?: 'default' | 'glowing';
  className?: string;
  children?: React.ReactNode;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', children, ...props }, ref) => {
    const baseStyles = cn(
      'rounded-lg border bg-card text-card-foreground shadow-sm p-6 relative overflow-hidden',
      className
    );

    if (variant === 'glowing') {
      return (
        <motion.div
          ref={ref}
          className={baseStyles}
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
          {...props}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-radial from-primary/20 via-transparent to-transparent opacity-0"
            initial={{ scale: 0.5 }}
            whileHover={{ 
              scale: 2,
              opacity: 1,
              transition: { duration: 0.3 }
            }}
          />
          <div className="relative z-10">
            {children}
          </div>
        </motion.div>
      );
    }

    return (
      <motion.div
        ref={ref}
        className={baseStyles}
        initial={{ scale: 1 }}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

Card.displayName = 'Card';

export { Card }; 