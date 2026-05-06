import { animate, motion } from 'motion/react';
import Image from 'next/legacy/image';
import { useEffect, useRef } from 'react';
import { ourResultsMock } from '../../mocks';
import { Typography } from '../Typography';

const Counter = ({ value }: { value: string }) => {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const numericValue = parseInt(value.replace(/\D/g, ''));
  const suffix = value.replace(/\d/g, '');

  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;

    const controls = animate(0, numericValue, {
      duration: 2,
      onUpdate(val) {
        node.textContent = Math.round(val).toLocaleString();
      },
    });

    return () => controls.stop();
  }, [numericValue]);

  return (
    <span className="flex items-baseline justify-center">
      {suffix.includes('+') && <span className="text-[0.7em] mr-1">+</span>}
      <span ref={nodeRef}>0</span>
    </span>
  );
};

export const OurResultsIcon = ({
  image,
  title,
  value,
}: {
  image: string;
  title: string;
  value: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="flex flex-col items-center text-center group w-full"
  >
    <div className="w-24 h-24 rounded-[32px] bg-white/5 border border-white/10 flex items-center justify-center mb-6 transition-all duration-500 group-hover:bg-brand-teal/10 group-hover:border-brand-teal/20 group-hover:-translate-y-2 group-hover:shadow-[0_20px_50px_rgba(0,191,166,0.1)]">
      <div className="relative w-12 h-12 transition-transform duration-500 group-hover:scale-110">
        <Image
          src={`icons/${image}`}
          layout="fill"
          objectFit="contain"
          alt={title}
        />
      </div>
    </div>

    <div className="space-y-1">
      <h3 className="text-[48px] md:text-[56px] font-display font-black text-white leading-none tracking-tighter">
        <Counter value={value} />
      </h3>
      <Typography
        variant="body1"
        className="text-xs md:text-sm font-black uppercase tracking-[0.2em] text-white/40 group-hover:text-brand-teal transition-colors"
      >
        {title}
      </Typography>
    </div>
  </motion.div>
);

const OurResults = () => (
  <section
    id="resultado"
    className="relative w-full py-32 md:py-48 bg-surface-dark overflow-hidden border-y border-white/5"
  >
    {/* Background Image with Parallax-like effect */}
    <div className="absolute inset-0 z-0">
      <Image
        src="/nossos-resultados-bg.webp"
        layout="fill"
        objectFit="cover"
        alt="Nossos Resultados Background"
        className="opacity-20 grayscale"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-surface-dark via-transparent to-surface-dark" />
    </div>

    {/* Animated background stripes */}
    <div className="absolute inset-0 opacity-[0.02] pointer-events-none z-1">
      <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(45deg,white_25%,transparent_25%,transparent_50%,white_50%,white_75%,transparent_75%,transparent)] bg-[length:100px_100px]" />
    </div>

    <div className="max-w-desktop_fullhd mx-auto px-8 md:px-30 relative z-10 flex flex-col gap-24 md:gap-32">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-teal/10 border border-brand-teal/20 text-[10px] font-black uppercase tracking-[0.3em] text-brand-teal">
            <div className="w-1.5 h-1.5 rounded-full bg-brand-teal animate-pulse" />
            Impacto Real
          </div>
          <Typography
            variant="h2"
            className="text-[42px] md:text-[80px] text-white font-black leading-[0.9] uppercase italic tracking-tighter"
          >
            Nossos{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-teal to-brand-purple">
              Resultados
            </span>
          </Typography>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-white/40 max-w-[440px] text-lg md:text-xl font-medium leading-relaxed italic border-l-2 border-brand-teal/20 pl-6"
        >
          A tecnologia é o meio, a transformação social é o nosso objetivo
          final. Confira nossos números de impacto.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16 md:gap-24">
        {ourResultsMock?.map((item, index) => (
          <OurResultsIcon key={index} {...item} />
        ))}
      </div>
    </div>
  </section>
);

export { OurResults };
