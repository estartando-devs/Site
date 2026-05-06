import React from 'react';

import { CheckCircle2, Mail, MessageSquare, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

interface ConfirmationModalProps {
  open: boolean;
  onClose: () => void;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  open,
  onClose,
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
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-teal to-brand-purple" />

            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-white/20 hover:text-white hover:bg-white/5 rounded-full transition-all"
            >
              <X size={20} />
            </button>

            <div className="flex flex-col items-center text-center space-y-6">
              <div className="w-20 h-20 rounded-2xl bg-brand-teal/10 flex items-center justify-center text-brand-teal border border-brand-teal/20 shadow-[0_0_30px_rgba(0,191,166,0.1)]">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl font-bold font-display">
                  Inscrição Confirmada!
                </h2>
                <p className="text-white/60">
                  Recebemos seus dados com sucesso. Agora é só aguardar o
                  contato da nossa equipe.
                </p>
              </div>

              <div className="w-full space-y-3">
                <div className="flex items-center gap-4 p-4 bg-black/20 rounded-2xl border border-white/5">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-brand-purple">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-bold text-white/40 uppercase tracking-widest">
                      E-mail de Confirmação
                    </p>
                    <p className="text-sm text-white/80 font-medium">
                      Verifique sua caixa de entrada e spam.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-black/20 rounded-2xl border border-white/5">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-sky-400">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-bold text-white/40 uppercase tracking-widest">
                      Canal no Discord
                    </p>
                    <p className="text-sm text-white/80 font-medium">
                      Fique por dentro das novidades.
                    </p>
                  </div>
                </div>
              </div>

              <div className="w-full grid grid-cols-1 gap-3 pt-4">
                <a
                  href="https://discord.gg/dPwaMwWxRJ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-brand-teal text-surface-dark font-bold py-3.5 rounded-xl transition-all hover:bg-brand-teal/90 flex items-center justify-center gap-2"
                >
                  <MessageSquare size={18} /> Entrar no Discord
                </a>
                <button
                  onClick={onClose}
                  className="bg-white/5 text-white/60 font-bold py-3.5 rounded-xl hover:bg-white/10 hover:text-white transition-all"
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
