import { motion } from 'motion/react';
import Image from 'next/legacy/image';
import Link from 'next/link';
import { Typography } from '../Typography';

export const Subscribe = () => (
  <motion.section
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="w-full max-w-desktop_fullhd mx-auto px-8 md:px-30 py-20 flex flex-col md:flex-row items-center justify-center gap-12"
  >
    <div className="hidden lg:block">
      <Image
        src="/images/inscricao-check"
        width={294}
        height={364}
        alt="Inscrição check"
        title="Inscrição check"
      />
    </div>

    <div className="flex flex-col items-center justify-center gap-6 text-center">
      <Typography variant="h2" className="text-[3rem] text-white">
        Inscreva-se (Impulso)
      </Typography>
      <Link
        href="/inscricao"
        className="w-full max-w-[242px] py-4 rounded-lg bg-brand-purple text-white font-bold text-lg shadow-lg shadow-brand-purple/20 hover:opacity-90 transition-all active:scale-[0.98] text-center"
      >
        Faça parte!
      </Link>
    </div>

    <div className="hidden lg:block">
      <Image
        src="/images/inscricao-calendar"
        width={294}
        height={364}
        objectFit="contain"
        alt="Calendário inscrição"
        title="Calendário inscrição"
      />
    </div>
  </motion.section>
);
