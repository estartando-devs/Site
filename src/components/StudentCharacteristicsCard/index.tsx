import { HeartHandshake, Repeat, ShieldCheck, Target, Zap } from 'lucide-react';
import { motion } from 'motion/react';
import { Typography } from '../Typography';

type PropsCard = {
  description: string;
  index: number;
};

const iconMapping = [Target, ShieldCheck, Zap, HeartHandshake, Repeat];

export const StudentCharacteristicsCard = ({
  description,
  index,
}: PropsCard) => {
  const Icon = iconMapping[index % iconMapping.length];

  return (
    <motion.div
      whileHover={{ scale: 1.05, x: index % 2 === 0 ? 5 : -5 }}
      className={`relative w-full max-w-[320px] p-6 rounded-2xl bg-surface-container/30 border border-white/5 backdrop-blur-sm flex items-center gap-5 group transition-all hover:border-brand-teal/30 hover:bg-surface-container/50 shadow-xl ${
        index % 2 === 0 ? 'self-start' : 'self-end'
      }`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-brand-teal/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />

      <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-brand-teal/10 group-hover:border-brand-teal/20 transition-colors">
        <Icon className="w-6 h-6 text-brand-teal group-hover:scale-110 transition-transform" />
      </div>

      <Typography
        variant="body2"
        className="text-sm font-bold text-white/80 leading-tight group-hover:text-white transition-colors"
      >
        {description}
      </Typography>

      {/* Decorative accent */}
      <div
        className={`absolute top-1/2 -translate-y-1/2 w-1 h-8 rounded-full bg-brand-teal/20 group-hover:bg-brand-teal transition-all ${
          index % 2 === 0 ? '-left-[2px]' : '-right-[2px]'
        }`}
      />
    </motion.div>
  );
};
