import React from 'react';

import { X, XCircle } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

interface ErrorModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  message: string;
}

export const ErrorModal: React.FC<ErrorModalProps> = ({
  open,
  onClose,
  title,
  message,
}) => {
  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="bg-surface-container border border-white/10 text-white rounded-3xl shadow-2xl max-w-md w-full p-8 relative z-10 overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-red-500" />

            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-white/20 hover:text-white hover:bg-white/5 rounded-full transition-all"
            >
              <X size={20} />
            </button>

            <div className="flex flex-col items-center text-center space-y-6">
              <div className="w-20 h-20 rounded-2xl bg-red-500/10 flex items-center justify-center text-red-500 border border-red-500/20 shadow-[0_0_30px_rgba(239,68,68,0.1)]">
                <XCircle className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl font-bold font-display uppercase tracking-tight">
                  {title}
                </h2>
                <p className="text-white/60 font-medium leading-relaxed">
                  {message}
                </p>
              </div>

              <div className="w-full pt-4">
                <button
                  onClick={onClose}
                  className="w-full bg-red-500 text-white font-bold py-3.5 rounded-xl transition-all hover:bg-red-600 shadow-lg active:scale-[0.98]"
                >
                  Fechar
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
