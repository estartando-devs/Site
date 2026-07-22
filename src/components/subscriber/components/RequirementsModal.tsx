import { CheckCircle2, ShieldAlert, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { FC } from 'react';

interface RequirementsModalProps {
  open: boolean;
  onClose: () => void;
  track: string | null;
}

export const RequirementsModal: FC<RequirementsModalProps> = ({
  open,
  onClose,
  track,
}) => {
  const isImpulso = track === 'impulso';

  const requirements = isImpulso
    ? [
        'Cursando ou concluído o 3º ano do Ensino Médio',
        'Desejo de ingressar na área de tecnologia ou transição',
        'Atender aos pré-requisitos específicos do curso',
        'Disponibilidade para aulas noturnas (Ter/Qui)',
        'Comprometimento com as entregas semanais',
      ]
    : [
        'Cursando ou concluído o 3º ano do Ensino Médio',
        'Desejo de ingressar na área de tecnologia ou transição',
        'Comprometimento com as entregas semanais',
      ];

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
            className="bg-surface-container border border-white/10 text-white rounded-3xl shadow-2xl max-w-2xl w-full relative z-10 overflow-hidden max-h-[85vh] flex flex-col"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-purple to-brand-teal" />

            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-white/20 hover:text-white hover:bg-white/5 rounded-full transition-all"
            >
              <X size={24} />
            </button>

            <header className="shrink-0 flex flex-col items-center text-center space-y-4 p-8 pb-4">
              <div className="w-16 h-16 rounded-2xl bg-brand-purple/10 flex items-center justify-center text-brand-purple border border-brand-purple/20">
                <ShieldAlert className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h2 className="text-2xl font-bold font-display uppercase tracking-tight">
                  Requisitos Mínimos
                </h2>
                <p className="text-white/40 font-medium">
                  {isImpulso
                    ? 'Esta trilha é voltada para quem já possui conhecimentos base.'
                    : 'Esta trilha é voltada para quem está começando do zero.'}
                </p>
              </div>
            </header>

            <div className="flex-1 min-h-0 overflow-y-auto px-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {requirements.map((req, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-4 bg-black/20 rounded-2xl border border-white/5"
                  >
                    <CheckCircle2 className="w-5 h-5 text-brand-teal shrink-0 mt-0.5" />
                    <p className="text-sm text-white/80 font-medium leading-relaxed">
                      {req}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="shrink-0 text-center p-8 pt-4">
              <p className="text-xs text-white/20 mb-6 italic">
                * Temos vagas para ampla concorrência e público prioritário.
              </p>
              <button
                className="w-full bg-brand-teal text-surface-dark font-black py-4 rounded-2xl transition-all hover:bg-brand-teal/90 shadow-[0_4px_20px_rgba(0,191,166,0.3)] hover:scale-[1.02] active:scale-[0.98]"
                onClick={onClose}
              >
                ESTOU DE ACORDO, QUERO CONTINUAR
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
