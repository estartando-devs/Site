import { CheckCircle2, Circle, Clock } from 'lucide-react';
import { motion } from 'motion/react';
import { ScheduleSectionProps } from '../../mocks/Schedule.mock';
import { Typography } from '../Typography';

export const SelectiveProcess = ({
  title,
  stagesList,
  schedule,
}: ScheduleSectionProps) => {
  return (
    <section className="w-full bg-[#0f1110] py-32 overflow-hidden">
      <div className="max-w-desktop_fullhd mx-auto px-8 md:px-30 flex flex-col gap-24">
        {/* Stages Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <Typography
              variant="h2"
              className="text-[40px] md:text-[56px] font-black text-white leading-[1.1] uppercase italic [&>span]:text-brand-teal"
              dangerouslySetInnerHTML={{ __html: title }}
            />
            <div className="w-24 h-2 bg-brand-teal rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 gap-10">
            {stagesList.map(({ key, stage }, idx) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="group p-8 rounded-3xl bg-surface-container/40 border border-white/5 hover:border-brand-teal/30 transition-all shadow-xl relative overflow-hidden"
              >
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-brand-teal/5 rounded-full blur-2xl group-hover:bg-brand-teal/10 transition-all" />
                <div className="flex items-start gap-6 relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-brand-teal/10 border border-brand-teal/20 flex items-center justify-center shrink-0">
                    <span className="font-display font-black text-brand-teal text-xl">
                      {idx + 1}
                    </span>
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-xl font-display font-black text-white uppercase tracking-tight group-hover:text-brand-teal transition-colors">
                      {stage.title}
                    </h3>
                    <p className="text-white/50 leading-relaxed font-medium">
                      {stage.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Timeline Grid */}
        <div className="space-y-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">
              Cronograma do Processo
            </h3>
            <div className="h-px flex-1 bg-white/5 hidden md:block mx-10" />
            <div className="flex items-center gap-2 text-brand-teal text-xs font-bold">
              <Clock className="w-4 h-4" /> CICLO 2026.1
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {schedule.map((item, idx) => (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`relative p-8 rounded-[32px] border-2 flex flex-col gap-6 transition-all duration-500 ${
                  !item.disable
                    ? 'bg-brand-teal/10 border-brand-teal/30 shadow-[0_10px_40px_rgba(0,191,166,0.1)]'
                    : 'bg-white/[0.02] border-white/5 opacity-40 grayscale'
                }`}
              >
                {!item.disable && (
                  <div className="absolute -top-3 left-8 bg-brand-teal text-surface-dark px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest animate-bounce">
                    Agora
                  </div>
                )}

                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-colors ${
                    !item.disable
                      ? 'bg-brand-teal border-brand-teal text-surface-dark'
                      : 'bg-white/5 border-white/10 text-white/20'
                  }`}
                >
                  {!item.disable ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : (
                    <Circle className="w-5 h-5" />
                  )}
                </div>

                <div className="space-y-2">
                  <h4
                    className={`font-display font-black text-lg leading-tight uppercase tracking-tight ${
                      !item.disable ? 'text-white' : 'text-white/40'
                    }`}
                  >
                    {item.title}
                  </h4>
                  <p
                    className={`text-sm font-bold ${
                      !item.disable ? 'text-brand-teal' : 'text-white/20'
                    }`}
                  >
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
