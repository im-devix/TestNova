import { motion } from 'framer-motion';
import { forwardRef } from 'react';

const Card = forwardRef(({ 
  children, 
  className = '', 
  interactive = false,
  padding = 'default',
  ...props 
}, ref) => {
  const baseClasses = 'bg-white rounded-2xl border border-neutral-200/60 shadow-soft transition-all duration-300';
  const interactiveClasses = interactive ? 'hover:shadow-medium hover:scale-[1.02] active:scale-[0.98] cursor-pointer' : '';
  
  const paddings = {
    none: '',
    sm: 'p-4',
    default: 'p-6',
    lg: 'p-8',
    xl: 'p-10',
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`${baseClasses} ${interactiveClasses} ${paddings[padding]} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
});

Card.displayName = 'Card';

export default Card;