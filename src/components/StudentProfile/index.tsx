import {
  Briefcase,
  ChevronRight,
  Globe,
  Heart,
  Swords,
  UserCheck,
} from 'lucide-react';
import { motion } from 'motion/react';
import { studentSectionProfile } from '../../mocks/DescriptionProfile.mock';
import { Typography } from '../Typography';

const profileRequirements = [
  {
    icon: Heart,
    text: 'Pessoas em situação de <strong>vulnerabilidade social e econômica</strong>. Priorizamos quem enfrenta maiores barreiras no acesso à educação.',
  },
  {
    icon: Swords,
    text: 'Pessoas <strong>dedicadas</strong> e que gostem de desafios constantes.',
  },
  {
    icon: UserCheck,
    text: 'Pessoas <strong>responsáveis</strong>, determinadas e comprometidas com o aprendizado.',
  },
  {
    icon: Globe,
    text: 'Pessoas de <strong>qualquer lugar do mundo</strong> com acesso à internet e vontade de crescer.',
  },
  {
    icon: Briefcase,
    text: 'Interessados em ingressar no <strong>mercado de trabalho</strong> na área de tecnologia.',
  },
];

export const StudentProfile = ({ title }: studentSectionProfile) => (
  <section className="relative w-full py-32 bg-[#0f1110] overflow-hidden">
    {/* Background Image Layer */}
    <div className="absolute inset-0 z-0 opacity-20 grayscale pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-r from-surface-dark via-surface-dark/80 to-transparent z-10" />
      <img
        src="/perfil-aluno-bg.webp"
        alt=""
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover object-right"
      />
    </div>

    <div className="relative z-10 max-w-desktop_fullhd mx-auto px-8 md:px-30">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-16 lg:gap-24">
        {/* Left Column: Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col justify-center"
        >
          <div className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-purple mb-4">
            Público Alvo
          </div>
          <Typography
            variant="h2"
            className="text-[40px] md:text-[60px] font-black text-white leading-tight italic [&>strong]:text-brand-teal [&>strong]:not-italic [&>br]:hidden md:[&>br]:block"
            dangerouslySetInnerHTML={{ __html: title }}
          />
          <div className="mt-10 p-6 rounded-2xl bg-brand-purple/5 border border-brand-purple/10 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-brand-purple/20 flex items-center justify-center shrink-0">
              <ChevronRight className="text-brand-purple w-6 h-6" />
            </div>
            <p className="text-white/60 font-medium italic">
              Buscamos talentos escondidos pela falta de oportunidade. Nosso
              processo é focado no{' '}
              <span className="text-brand-purple font-bold">
                potencial humano
              </span>
              .
            </p>
          </div>
        </motion.div>

        {/* Right Column: Grid of Requirements */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {profileRequirements.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`p-8 rounded-[32px] border transition-all duration-500 hover:scale-[1.03] shadow-2xl flex flex-col gap-6 ${
                idx === 0
                  ? 'sm:col-span-2 bg-brand-teal/10 border-brand-teal/20'
                  : 'bg-surface-container/40 border-white/5'
              }`}
            >
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center border ${
                  idx === 0
                    ? 'bg-brand-teal/20 border-brand-teal/30 text-brand-teal'
                    : 'bg-white/5 border-white/10 text-white/40'
                }`}
              >
                <item.icon className="w-7 h-7" />
              </div>
              <p
                className={`text-lg leading-relaxed font-sans ${
                  idx === 0 ? 'text-white' : 'text-white/70'
                } [&>strong]:text-brand-teal`}
              >
                <span dangerouslySetInnerHTML={{ __html: item.text }} />
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);
