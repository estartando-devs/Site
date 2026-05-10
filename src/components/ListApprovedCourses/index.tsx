import { ArrowRight, Calendar, MessageSquare, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { Typography } from '../Typography';
import { ApprovedCourses } from './ApprovedCourses';

export type ObjectCourseType = {
  color: 'green_dark' | 'blue_dark' | 'purple';
  course: string;
  students: string[];
};

export type ApprovedListCourseType = {
  approvedListCourse: Array<ObjectCourseType>;
};

export const ListApprovedCourses = ({
  approvedListCourse,
}: ApprovedListCourseType) => (
  <section
    id="resultado"
    className="w-full bg-surface-dark py-32 relative overflow-hidden"
  >
    {/* Decorative background orbs */}
    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-purple/5 rounded-full blur-[120px] pointer-events-none" />
    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-teal/5 rounded-full blur-[120px] pointer-events-none" />

    <div className="max-w-desktop_fullhd mx-auto px-8 md:px-30 relative z-10">
      {/* Celebration Header */}
      <div className="flex flex-col items-center text-center gap-6 mb-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="w-20 h-20 rounded-full bg-brand-teal/10 border border-brand-teal/20 flex items-center justify-center shadow-lg shadow-brand-teal/10 mb-4"
        >
          <Sparkles className="w-10 h-10 text-brand-teal" />
        </motion.div>

        <div className="space-y-4">
          <Typography
            variant="h2"
            className="text-4xl md:text-6xl text-white font-black leading-tight italic"
          >
            Parabéns aos{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-teal to-brand-purple">
              Aprovados
            </span>
            !
          </Typography>
          <p className="text-xl text-white/50 max-w-[700px] mx-auto font-medium">
            Confira abaixo a lista oficial dos candidatos aprovados do Ciclo
            2026.
          </p>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="flex flex-col gap-4">
        {approvedListCourse?.map((objectCourse: ObjectCourseType) => (
          <ApprovedCourses
            key={objectCourse?.course}
            approvedCourse={objectCourse}
          />
        ))}
      </div>

      {/* Next Steps Guide */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-32 p-8 md:p-16 rounded-[40px] bg-surface-container/60 border border-white/5 backdrop-blur-xl relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 p-12 text-white/5 rotate-12 pointer-events-none hidden md:block">
          <Calendar className="w-48 h-48" />
        </div>

        <div className="relative z-10 flex flex-col gap-12">
          <div className="space-y-4">
            <div className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-purple">
              Próximos Passos
            </div>
            <Typography
              variant="h2"
              className="text-3xl md:text-4xl text-white font-black italic"
            >
              O que acontece{' '}
              <span className="text-brand-purple underline underline-offset-8">
                agora
              </span>
              ?
            </Typography>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                icon: MessageSquare,
                title: 'Convocação',
                desc: 'Fique de olho no seu e-mail e WhatsApp. Nosso time entrará em contato para agendar o horário da sua entrevista.',
              },
              {
                icon: Calendar,
                title: 'Entrevistas',
                desc: 'As conversas serão online e individuais. Prepare-se para contar um pouco mais sobre sua história e motivação.',
              },
              {
                icon: ArrowRight,
                title: 'Resultado Final',
                desc: 'Após as entrevistas, divulgaremos a lista final dos alunos matriculados para iniciar as aulas em Maio.',
              },
            ].map((step, i) => (
              <div key={step.title} className="space-y-4 group">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-brand-purple/10 group-hover:border-brand-purple/20 transition-all">
                  <step.icon className="w-6 h-6 text-brand-purple" />
                </div>
                <h4 className="text-white font-black uppercase tracking-tight text-lg italic">
                  {step.title}
                </h4>
                <p className="text-white/40 text-sm font-medium leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center gap-6">
            <p className="text-white/60 text-sm font-bold italic">
              Ficou com alguma dúvida?
            </p>
            <a
              href="/perguntas-frequentes"
              className="text-brand-teal font-black uppercase tracking-widest text-xs hover:underline"
            >
              Acesse o FAQ do Processo Seletivo
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);
