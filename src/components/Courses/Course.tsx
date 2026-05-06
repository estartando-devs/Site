import { Cpu, Globe, Terminal } from 'lucide-react';
import { motion } from 'motion/react';
import { Typography } from '..';
import { Course as ICourse } from '../../mocks';

type PropsCourse = {
  courseData: ICourse;
  acordionTitle?: string;
  withAnimation?: boolean;
  className?: string;
};

const iconMapping: Record<string, any> = {
  frontend: Globe,
  backend: Terminal,
  design: Cpu,
};

export const Course = ({
  courseData,
  withAnimation = true,
  className = '',
}: PropsCourse) => {
  const courseKey = courseData.title.toLowerCase().includes('front')
    ? 'frontend'
    : courseData.title.toLowerCase().includes('back')
    ? 'backend'
    : 'design';
  const Icon = iconMapping[courseKey];

  return (
    <motion.section
      initial={withAnimation ? { opacity: 0, y: 20 } : {}}
      whileInView={withAnimation ? { opacity: 1, y: 0 } : {}}
      viewport={{ once: true }}
      className={`w-full max-w-desktop_fullhd mx-auto px-8 md:px-30 mt-20 ${className}`}
    >
      <div className="group relative p-10 rounded-[32px] bg-surface-container/40 border border-white/5 hover:border-brand-teal/20 transition-all overflow-hidden">
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-brand-teal/5 rounded-full blur-3xl group-hover:bg-brand-teal/10 transition-all" />

        <div className="flex flex-col md:flex-row gap-10 items-start relative z-10">
          <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
            <Icon className="w-10 h-10 text-brand-teal" />
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-brand-teal animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-teal">
                  Formação Completa
                </span>
              </div>
              <Typography
                variant="h2"
                className="text-3xl md:text-4xl text-white font-black tracking-tight"
              >
                {courseData.title}
              </Typography>
            </div>

            <p className="text-lg text-white/60 leading-relaxed max-w-[800px] font-medium font-sans">
              {courseData.coursePresentation}
            </p>

            <div className="flex flex-wrap gap-3">
              {courseData.courseModules.slice(0, 5).map((module) => (
                <span
                  key={module}
                  className="px-4 py-2 rounded-full bg-white/5 border border-white/5 text-[10px] font-bold uppercase tracking-wider text-white/40"
                >
                  {module}
                </span>
              ))}
              {courseData.courseModules.length > 5 && (
                <span className="px-4 py-2 rounded-full bg-white/5 text-[10px] font-bold text-white/20 uppercase tracking-wider">
                  + {courseData.courseModules.length - 5} módulos
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};
