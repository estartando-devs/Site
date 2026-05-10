import { Eye, EyeOff, Search, Trophy, Users } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useMemo, useState } from 'react';
import { ObjectCourseType } from '.';
import { Typography } from '..';

type PropsCourse = {
  approvedCourse: ObjectCourseType;
  acordionTitle?: string;
  withAnimation?: boolean;
};

const colorMapping = {
  green_dark: {
    bg: 'bg-brand-teal/10',
    border: 'border-brand-teal/20',
    text: 'text-brand-teal',
    badge: 'bg-brand-teal',
  },
  blue_dark: {
    bg: 'bg-sky-400/10',
    border: 'border-sky-400/20',
    text: 'text-sky-400',
    badge: 'bg-sky-400',
  },
  purple: {
    bg: 'bg-brand-purple/10',
    border: 'border-brand-purple/20',
    text: 'text-brand-purple',
    badge: 'bg-brand-purple',
  },
};

export const ApprovedCourses = ({
  approvedCourse,
  withAnimation = true,
}: PropsCourse) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const style = colorMapping[approvedCourse.color] || colorMapping.green_dark;

  const filteredStudents = useMemo(() => {
    return approvedCourse.students.filter((student) =>
      student.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [approvedCourse.students, searchTerm]);

  return (
    <motion.div
      initial={withAnimation ? { opacity: 0, y: 20 } : {}}
      whileInView={withAnimation ? { opacity: 1, y: 0 } : {}}
      viewport={{ once: true }}
      className={`w-full group rounded-3xl border ${style.border} ${style.bg} backdrop-blur-xl transition-all duration-500 overflow-hidden mb-8 shadow-2xl hover:shadow-${approvedCourse.color}/10`}
    >
      {/* Header Info */}
      <div className="p-8 md:p-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div className="flex items-start gap-6">
          <div
            className={`w-16 h-16 rounded-2xl ${style.badge}/20 border ${style.border} flex items-center justify-center shrink-0`}
          >
            <Trophy className={`w-8 h-8 ${style.text}`} />
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span
                className={`text-[10px] font-black uppercase tracking-[0.3em] ${style.text}`}
              >
                Aprovados 2026
              </span>
              <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
              <div className="flex items-center gap-1.5 text-white/40 text-[10px] font-bold uppercase tracking-widest">
                <Users className="w-3 h-3" /> {approvedCourse.students.length}{' '}
              </div>
            </div>
            <Typography
              variant="h2"
              className="text-3xl md:text-4xl text-white font-black tracking-tight"
            >
              {approvedCourse.course}
            </Typography>
          </div>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center gap-3 px-8 py-3.5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all ${
            isOpen
              ? 'bg-white/10 text-white border border-white/10'
              : `${style.badge} text-surface-dark shadow-lg`
          }`}
        >
          {isOpen ? (
            <>
              Fechar Lista <EyeOff className="w-4 h-4" />
            </>
          ) : (
            <>
              Ver Aprovados <Eye className="w-4 h-4" />
            </>
          )}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-white/5 bg-black/20"
          >
            <div className="p-8 md:p-10 space-y-8">
              {/* Search Bar */}
              <div className="relative group max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-brand-teal transition-colors" />
                <input
                  type="text"
                  placeholder="Buscar seu nome na lista..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-surface-dark/40 border border-white/5 rounded-xl py-3 pl-11 pr-4 text-white text-sm focus:outline-none focus:border-brand-teal/50 transition-all placeholder:text-white/10"
                />
              </div>

              {/* Names Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-4">
                {filteredStudents.length > 0 ? (
                  filteredStudents.map((name, index) => (
                    <motion.div
                      key={name}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.01 }}
                      className="flex items-center gap-3 group/name"
                    >
                      <div
                        className={`w-1.5 h-1.5 rounded-full ${style.badge} opacity-40 group-hover/name:opacity-100 transition-opacity`}
                      />
                      <span className="text-white/70 font-medium text-sm md:text-base group-hover/name:text-white transition-colors">
                        {name}
                      </span>
                    </motion.div>
                  ))
                ) : (
                  <div className="col-span-full py-10 text-center space-y-2">
                    <p className="text-white/20 font-bold uppercase tracking-widest text-xs">
                      Nenhum nome encontrado
                    </p>
                    <button
                      onClick={() => setSearchTerm('')}
                      className="text-brand-teal text-sm font-bold hover:underline"
                    >
                      Limpar busca
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
