import { BookOpen, Code2, Users } from 'lucide-react';
import { motion } from 'motion/react';
import Image from 'next/legacy/image';
import { WhatWeTeachProps } from '../../mocks/WhatWeTeach.mock';
import { Typography } from '../Typography';

export const WhatWeTeach = ({ title, description }: WhatWeTeachProps) => (
  <section
    id="what-we-teach"
    className="w-full bg-surface-dark py-24 md:py-32 overflow-hidden"
  >
    <div className="max-w-desktop_fullhd mx-auto px-8 md:px-30 grid grid-cols-1 lg:grid-cols-[1fr_500px] gap-20 items-center">
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="flex flex-col gap-10"
      >
        <div className="space-y-6">
          <Typography
            variant="h2"
            className="text-[40px] md:text-[56px] leading-tight font-black text-white [&>span]:text-brand-teal"
            dangerouslySetInnerHTML={{ __html: title }}
          />
          <div className="w-20 h-1.5 bg-gradient-to-r from-brand-teal to-brand-purple rounded-full" />
        </div>

        <Typography
          variant="body2"
          className="text-lg md:text-xl text-white/60 leading-relaxed max-w-[600px] [&>span]:text-white [&>span]:font-bold"
          dangerouslySetInnerHTML={{ __html: description }}
        />

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-4">
          {[
            { icon: Code2, label: 'Tecnologia' },
            { icon: BookOpen, label: 'Mentoria' },
            { icon: Users, label: 'Comunidade' },
          ].map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-3 p-4 rounded-xl bg-surface-container border border-white/5 shadow-lg"
            >
              <item.icon className="w-5 h-5 text-brand-teal" />
              <span className="font-bold text-xs uppercase tracking-widest text-white/80">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative group"
      >
        <div className="absolute -inset-4 bg-gradient-to-tr from-brand-teal/20 to-brand-purple/20 rounded-3xl blur-2xl group-hover:opacity-100 transition-opacity duration-500 opacity-50" />
        <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
          <Image
            src="images/ensinando"
            width={503}
            height={407}
            layout="responsive"
            alt="Ensino prático no Estartando Devs"
            className="grayscale group-hover:grayscale-0 transition-all duration-700"
          />
        </div>
      </motion.div>
    </div>
  </section>
);
