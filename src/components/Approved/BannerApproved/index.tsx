import { Megaphone } from 'lucide-react';
import { motion } from 'motion/react';
import { Typography } from '../../Typography';

export const BannerApproved = () => (
  <motion.div
    initial={{ y: -100 }}
    animate={{ y: 0 }}
    className="w-full bg-brand-purple py-4 px-8 flex justify-center items-center relative z-[100]"
  >
    <div className="flex items-center gap-4 text-white">
      <div className="p-2 bg-white/20 rounded-lg hidden md:block">
        <Megaphone className="w-5 h-5 text-white" />
      </div>
      <Typography
        variant="body3"
        className="font-black uppercase tracking-[0.1em] text-center md:text-left text-xs md:text-sm"
      >
        A lista final de aprovados já está disponível!
      </Typography>
      <a
        href="#resultado"
        className="bg-white text-brand-purple px-4 py-1.5 rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-white/90 transition-all shadow-lg"
      >
        Ver Resultado
      </a>
    </div>
  </motion.div>
);
