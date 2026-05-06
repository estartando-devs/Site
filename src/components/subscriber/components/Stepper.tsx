import { motion } from 'motion/react';
import { ReactNode } from 'react';

type StepperProps = {
  step: number;
  steps: ReactNode[];
  onStepClick?: (idx: number) => void;
  isStepEnabled?: (idx: number) => boolean;
};

export const Stepper = ({
  step,
  steps,
  onStepClick,
  isStepEnabled,
}: StepperProps) => (
  <div className="flex items-center justify-center gap-2 mb-12">
    {steps.map((icon, idx) => {
      const isCompleted = step > idx;
      const isCurrent = step === idx;

      return (
        <div key={idx} className="flex items-center">
          <motion.button
            type="button"
            disabled={
              !onStepClick ||
              isCurrent ||
              (isStepEnabled ? !isStepEnabled(idx) : false)
            }
            onClick={onStepClick ? () => onStepClick(idx) : undefined}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{
              scale: isCurrent ? 1.2 : 1,
              opacity: 1,
            }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className={`flex items-center justify-center rounded-xl w-10 h-10 sm:w-12 sm:h-12 border transition-all duration-300
              ${
                isCurrent
                  ? 'bg-brand-teal text-surface-dark border-brand-teal shadow-[0_0_15px_rgba(0,191,166,0.4)]'
                  : isCompleted
                  ? 'bg-brand-teal/20 text-brand-teal border-brand-teal/30'
                  : 'bg-surface-variant/30 text-white/20 border-white/5'
              }
              ${
                onStepClick && !isCurrent
                  ? 'cursor-pointer hover:bg-white/5'
                  : 'cursor-default'
              }
            `}
            aria-current={isCurrent ? 'step' : undefined}
          >
            <div className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center">
              {icon}
            </div>
          </motion.button>

          {idx < steps.length - 1 && (
            <div className="w-4 sm:w-8 h-px bg-white/5 mx-1">
              <motion.div
                className="h-full bg-brand-teal/30"
                initial={{ width: 0 }}
                animate={{ width: isCompleted ? '100%' : 0 }}
                transition={{ duration: 0.5 }}
              />
            </div>
          )}
        </div>
      );
    })}
  </div>
);
