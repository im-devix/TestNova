import { motion } from 'framer-motion';

const ProgressBar = ({ 
  progress, 
  className = '', 
  showLabel = false, 
  size = 'md',
  variant = 'primary' 
}) => {
  const sizes = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4',
  };

  const variants = {
    primary: 'from-primary-500 to-primary-600',
    accent: 'from-accent-500 to-accent-600',
    success: 'from-success-500 to-success-600',
    warning: 'from-warning-500 to-warning-600',
    error: 'from-error-500 to-error-600',
  };

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-neutral-700">Progress</span>
          <span className="text-sm font-medium text-neutral-500">{Math.round(progress)}%</span>
        </div>
      )}
      
      <div className={`w-full bg-neutral-200 rounded-full overflow-hidden ${sizes[size]}`}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className={`${sizes[size]} bg-gradient-to-r ${variants[variant]} rounded-full shadow-sm`}
        />
      </div>
    </div>
  );
};

export default ProgressBar;