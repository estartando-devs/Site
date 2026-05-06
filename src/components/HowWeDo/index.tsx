import { Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { StudentCharacteristicsCard } from '..';
import { HowWeDoSectionProps } from '../../mocks';
import { Typography } from '../Typography';

export const HowWeDo = ({
  title,
  description,
  characteristicsList,
}: HowWeDoSectionProps) => (
  <section className="w-full bg-[#121413] py-32 relative overflow-hidden">
    {/* Decorative background grid */}
    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />
    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_30%,rgba(0,191,166,0.05)_0%,transparent_50%)]" />

    <div className="max-w-desktop_fullhd mx-auto px-8 md:px-30 grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-20 items-center relative z-10">
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="flex flex-col gap-10"
      >
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-brand-teal font-black uppercase tracking-[0.3em] text-[10px]">
            <Sparkles className="w-4 h-4" /> Metodologia Própria
          </div>
          <Typography
            variant="h2"
            className="text-[42px] md:text-[64px] font-black text-white leading-[1.1] italic [&>span]:text-brand-teal"
            dangerouslySetInnerHTML={{ __html: title }}
          />
        </div>

        <div className="prose prose-invert max-w-none">
          <Typography
            variant="body2"
            className="text-lg md:text-xl text-white/50 leading-relaxed [&>strong]:text-white [&>strong]:font-black [&>br]:mb-4"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </div>

        <div className="p-8 rounded-[32px] bg-white/5 border border-white/10 backdrop-blur-md">
          <p className="text-white/80 font-medium italic">
            &quot;Nosso foco é formar não apenas técnicos, mas{' '}
            <span className="text-brand-teal font-bold">
              profissionais completos
            </span>{' '}
            para o mercado.&quot;
          </p>
        </div>
      </motion.div>

      <motion.aside
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="flex flex-col gap-6 w-full"
      >
        <div className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 mb-4 text-center lg:text-left">
          Pilares do Aprendizado
        </div>
        <div className="flex flex-col gap-6 relative">
          {/* Timeline line connecting chips */}
          <div className="absolute left-6 lg:left-1/2 top-10 bottom-10 w-px bg-gradient-to-b from-transparent via-brand-teal/20 to-transparent hidden sm:block" />

          {characteristicsList.map((char, index) => (
            <motion.div
              key={char.key}
              initial={{ opacity: 0, y: 20, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, y: 0, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="w-full flex"
            >
              <StudentCharacteristicsCard
                index={index}
                description={char.description}
              />
            </motion.div>
          ))}
        </div>
      </motion.aside>
    </div>
  </section>
);
