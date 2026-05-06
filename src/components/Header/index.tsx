import { ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import Image from 'next/legacy/image';
import Link from 'next/link';
import { Logo } from '../Logo';
import { Typography } from '../Typography';

export const Header = () => (
  <header className="relative flex items-center w-full min-h-screen overflow-hidden">
    {/* Dynamic Background */}
    <div className="absolute inset-0 z-0">
      <Image
        priority
        alt="Banner mãos estartando devs"
        title="Banner mãos estartando devs."
        layout="fill"
        objectFit="cover"
        src="/images/header-bg.webp"
        className="scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-surface-dark/80 via-surface-dark/60 to-surface-dark" />

      {/* Decorative Orbs */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-brand-teal/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-brand-purple/20 rounded-full blur-[120px] animate-pulse delay-700" />
    </div>

    <section className="relative z-10 w-full max-w-desktop_fullhd mx-auto px-8 md:px-30 py-20 flex flex-col items-center md:items-start">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <Logo width={120} height={174} priority className="drop-shadow-2xl" />
      </motion.div>

      <div className="flex flex-col items-center md:items-start max-w-[800px] gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-purple/10 border border-brand-purple/20 backdrop-blur-md mb-2"
        >
          <Sparkles className="w-4 h-4 text-brand-purple" />
          <span className="text-xs font-bold text-brand-purple uppercase tracking-widest">
            Inscrições 2026 — Impulso Abertas
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="space-y-4"
        >
          <Typography
            variant="h1"
            className="text-white text-5xl md:text-[5.5rem] leading-[1.1] font-black tracking-tighter text-center md:text-left drop-shadow-2xl"
          >
            Estartando{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-teal to-brand-purple">
              Devs
            </span>
          </Typography>

          <Typography
            weight="400"
            className="text-xl md:text-2xl text-white/70 max-w-[600px] text-center md:text-left leading-relaxed font-sans"
          >
            Acreditamos no poder da tecnologia como ferramenta de{' '}
            <strong className="text-brand-teal font-bold">
              transformação social
            </strong>
          </Typography>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-8 flex flex-col sm:flex-row items-center gap-6 w-full"
        >
          <Link
            href="/inscricao"
            className="group relative flex items-center justify-center gap-3 w-full sm:w-auto px-10 py-5 rounded-2xl bg-brand-teal text-surface-dark font-display font-black text-xl hover:bg-brand-teal/90 transition-all shadow-[0_8px_30px_rgba(0,191,166,0.4)] active:scale-95 overflow-hidden text-center"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:animate-shimmer" />
            Quero me inscrever!
            <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
          </Link>

          <a
            href="#what-we-teach"
            className="flex items-center gap-2 text-white/60 hover:text-white font-bold tracking-wide uppercase text-sm transition-all"
          >
            Saiba mais sobre nós
          </a>
        </motion.div>
      </div>

      {/* Floating Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 opacity-30"
      >
        <span className="text-[10px] uppercase font-black tracking-widest">
          Scroll
        </span>
        <div className="w-0.5 h-10 bg-gradient-to-b from-brand-teal to-transparent rounded-full" />
      </motion.div>
    </section>
  </header>
);
