/* eslint-disable @next/next/no-img-element */
import { ArrowRight, Check, Star } from 'lucide-react';
import { motion } from 'motion/react';

const modalities = [
  {
    badge: 'Inscrições abertas!',
    title: 'Estartando',
    bg: '/estartando.png',
    accent: 'brand-teal',
    description:
      'Seu primeiro passo no mundo da tecnologia começa aqui! Nesse módulo, você aprende do zero, com aulas gravadas e ao vivo pra ganhar confiança.',
    list: [
      'Aulas gravadas para você rever quando quiser',
      'Mentoria pra te guiar em cada etapa',
      'Acesso à comunidade no Discord',
      'Aulas de Soft Skills',
    ],
    button: {
      text: 'Quero começar!',
      disabled: false,
      href: process.env.NEXT_PUBLIC_INSCRICOES_URL || '/',
    },
  },
  {
    badge: 'Vagas limitadas!',
    title: 'Impulso',
    bg: '/impulso.png',
    accent: 'brand-purple',
    isPremium: true,
    description:
      'Hora de acelerar! Além de tudo do módulo inicial, aqui você participa de aulas ao vivo por 4 meses com conteúdo avançado e projetos práticos.',
    list: [
      'Mentoria contínua personalizada',
      'Projetos práticos reais (Hands-on)',
      'Aulas ao vivo exclusivas',
      'Direcionamento de carreira',
    ],
    button: {
      text: 'Quero evoluir!',
      disabled: true,
      href: '/',
    },
  },
];

export const Modalities = () => {
  return (
    <section className="w-full bg-[#0f1110] py-32 px-8 md:px-0 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[1200px] h-[600px] bg-brand-teal/5 blur-[150px] pointer-events-none" />

      <div className="max-w-desktop_fullhd mx-auto px-8 md:px-30 flex flex-col items-center gap-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-6"
        >
          <h2 className="text-[42px] md:text-[80px] font-display font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20 tracking-tighter uppercase leading-none drop-shadow-2xl">
            Escolha sua{' '}
            <span className="[-webkit-text-stroke-width:1.5px] md:[-webkit-text-stroke-width:2px] [-webkit-text-stroke-color:var(--color-brand-teal)]">
              Jornada
            </span>
          </h2>
          <p className="text-xl text-white/50 max-w-[700px] mx-auto font-sans font-medium">
            Duas modalidades pensadas para diferentes momentos da sua carreira.
            Do zero ao profissional.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-12 w-full">
          {modalities.map((modality, idx) => (
            <motion.div
              key={modality.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className={`group flex flex-col max-w-[440px] w-full bg-surface-container/40 backdrop-blur-xl border-2 rounded-[32px] overflow-hidden transition-all duration-500 hover:scale-[1.02] shadow-2xl relative ${
                modality.isPremium
                  ? 'border-brand-purple/20 hover:border-brand-purple/50'
                  : 'border-white/5 hover:border-brand-teal/50'
              }`}
            >
              {modality.isPremium && (
                <div className="absolute top-6 right-6 z-20 bg-brand-purple/20 text-brand-purple px-4 py-1.5 rounded-full border border-brand-purple/30 text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                  <Star className="w-3 h-3 fill-current" /> Destaque
                </div>
              )}

              <div className="h-[300px] w-full relative overflow-hidden">
                <img
                  src={modality.bg}
                  alt={modality.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-70 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-container/90 via-surface-container/40 to-transparent" />

                <div className="absolute bottom-8 left-8 right-8 flex items-end justify-between">
                  <div className="space-y-1">
                    <div
                      className={`text-[10px] font-black uppercase tracking-widest ${
                        modality.accent === 'brand-teal'
                          ? 'text-brand-teal'
                          : 'text-brand-purple'
                      }`}
                    >
                      {modality.badge}
                    </div>
                    <h3 className="text-[48px] font-display font-black text-white leading-none tracking-tighter">
                      {modality.title}
                    </h3>
                  </div>
                </div>
              </div>

              <div className="p-10 pt-4 flex flex-col gap-8 flex-1">
                <p className="text-lg text-white/60 leading-relaxed font-sans font-medium min-h-[84px]">
                  {modality.description}
                </p>

                <div className="space-y-4">
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/30">
                    O que está incluso:
                  </p>
                  <ul className="space-y-4">
                    {modality.list.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 group/item">
                        <div
                          className={`mt-1 p-0.5 rounded-full bg-white/5 border border-white/10 ${
                            modality.accent === 'brand-teal'
                              ? 'group-hover/item:text-brand-teal'
                              : 'group-hover/item:text-brand-purple'
                          } transition-colors`}
                        >
                          <Check className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-white/80 text-sm font-bold tracking-tight leading-tight">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-auto pt-4">
                  <a
                    href={modality.button.href}
                    target={modality.button.disabled ? undefined : '_blank'}
                    rel="noopener noreferrer"
                    className={`group/btn relative flex items-center justify-center gap-3 w-full py-5 rounded-2xl font-display font-black text-xl text-center transition-all ${
                      modality.button.disabled
                        ? 'bg-surface-variant/50 text-white/20 cursor-not-allowed border border-white/5'
                        : modality.accent === 'brand-teal'
                        ? 'bg-brand-teal text-surface-dark shadow-[0_8px_30px_rgba(0,191,166,0.3)] hover:shadow-[0_8px_40px_rgba(0,191,166,0.5)]'
                        : 'bg-brand-purple text-white shadow-[0_8px_30px_rgba(108,99,255,0.3)] hover:shadow-[0_8px_40px_rgba(108,99,255,0.5)]'
                    }`}
                    onClick={(e) =>
                      modality.button.disabled && e.preventDefault()
                    }
                  >
                    {modality.button.text}
                    {!modality.button.disabled && (
                      <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1.5 transition-transform" />
                    )}
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
