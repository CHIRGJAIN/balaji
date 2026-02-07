import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X } from 'lucide-react';

interface CustomToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
  type?: 'success' | 'error' | 'info';
}

const CustomToast: React.FC<CustomToastProps> = ({ 
  message, 
  isVisible, 
  onClose, 
  duration = 3000,
  type = 'success' 
}) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 px-4"
        >
          <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-card border border-border shadow-hover">
            <div className={`p-1 rounded-full ${type === 'success' ? 'bg-green-500/10 text-green-600' : type === 'error' ? 'bg-red-500/10 text-red-600' : 'bg-primary/10 text-primary'}`}>
              <Check className="h-4 w-4" />
            </div>
            <span className="text-sm font-medium text-foreground">{message}</span>
            <button
              onClick={onClose}
              className="p-1 rounded-full hover:bg-muted transition-colors ml-2"
            >
              <X className="h-3 w-3 text-muted-foreground" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CustomToast;
