import { motion } from 'motion/react';
import Image from 'next/legacy/image';
import { Typography } from '../Typography';

type OurResultsIconProp = {
  image: string;
  title: string;
  value: string;
};

const OurResultsIcon = ({ image, title, value }: OurResultsIconProp) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    className="flex flex-col items-center justify-center text-center"
  >
    <Image
      src={`/icons/${image}`}
      width={60}
      height={60}
      alt={`Icone ${title}`}
      title={`Icone ${title}`}
    />
    <h3 className="mt-4">
      <span className="block text-[36px] font-bold leading-tight text-transparent [-webkit-text-stroke-width:2px] [-webkit-text-stroke-color:white]">
        {value}
      </span>
      <Typography weight="700" variant="body1" className="text-white">
        {title}
      </Typography>
    </h3>
  </motion.div>
);

export { OurResultsIcon };
