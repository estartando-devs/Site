import { BookOpen, CheckCircle2, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { FC } from 'react';

interface RequirementBlock {
  title: string;
  items?: string[];
}

interface CourseRequirementsModalProps {
  open: boolean;
  onClose: () => void;
  course: string | null;
}

const COURSE_REQUIREMENTS: Record<
  string,
  { subtitle: string; blocks: RequirementBlock[] }
> = {
  'Design UI/UX': {
    subtitle:
      'Conhecimentos esperados para acompanhar a trilha de Design UI/UX.',
    blocks: [
      {
        title:
          'Conhecimento em Processos de UX/UI: Imersão, Definição, Ideação e Prototipação',
        items: [
          'Ferramentas e métodos: Personas, Matriz CSD, Jornada do Usuário, Benchmarking, Pesquisas e entrevistas com usuário, Fluxo de usuário, Ferramentas de Ideação, Matriz Esforço x Impacto',
        ],
      },
      {
        title: 'Fundamentos de UI Design',
        items: [
          'Noções práticas de aplicação de estrutura e elementos de interface',
          'Sistema de cores e tipografia',
          'Heurísticas de usabilidade',
        ],
      },
      {
        title: 'Ferramentas',
        items: [
          'Experiência básica com Figma',
          'Criação de wireframes e protótipos',
        ],
      },
    ],
  },
  'Desenvolvimento Web': {
    subtitle: 'Conhecimentos esperados para acompanhar a trilha de Frontend.',
    blocks: [
      {
        title: 'HTML',
        items: ['Estrutura básica, principais tags e atributos'],
      },
      {
        title: 'CSS',
        items: [
          'Seletores, propriedades básicas, margin, padding, border, e media queries',
        ],
      },
      {
        title: 'JavaScript',
        items: [
          'Tipos primitivos, var/let/const, condicionais, laços, funções e métodos de array (.map, .filter, .find, forEach)',
        ],
      },
    ],
  },
  'Desenvolvimento Backend': {
    subtitle: 'Conhecimentos esperados para acompanhar a trilha de Backend.',
    blocks: [
      { title: 'Lógica de programação' },
      { title: 'Fundamentos do C#' },
      { title: 'MySQL Básico' },
      { title: 'Git' },
    ],
  },
};

export const CourseRequirementsModal: FC<CourseRequirementsModalProps> = ({
  open,
  onClose,
  course,
}) => {
  const requirements = course ? COURSE_REQUIREMENTS[course] : undefined;

  return (
    <AnimatePresence>
      {open && requirements && (
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
                <BookOpen className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h2 className="text-2xl font-bold font-display uppercase tracking-tight">
                  Requisitos do Curso
                </h2>
                <p className="text-white/40 font-medium">
                  {requirements.subtitle}
                </p>
              </div>
            </header>

            <div className="flex-1 min-h-0 overflow-y-auto px-8">
              <div className="space-y-4">
                {requirements.blocks.map((block, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-black/20 rounded-2xl border border-white/5"
                  >
                    <p className="text-sm font-bold text-white mb-3">
                      {block.title}
                    </p>
                    {block.items && (
                      <div className="space-y-2">
                        {block.items.map((item, itemIdx) => (
                          <div key={itemIdx} className="flex items-start gap-3">
                            <CheckCircle2 className="w-4 h-4 text-brand-teal shrink-0 mt-0.5" />
                            <p className="text-sm text-white/70 font-medium leading-relaxed">
                              {item}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="shrink-0 text-center p-8 pt-4">
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
