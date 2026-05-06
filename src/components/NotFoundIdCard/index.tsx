import { AlertCircle } from 'lucide-react';
import Router from 'next/router';
import { Typography } from '../Typography';

export const NotFoundIdCard = () => {
  const { push } = Router;

  return (
    <main className="mt-20 w-screen h-full flex flex-col items-center justify-center text-center gap-6">
      <AlertCircle className="text-orange-500 w-[200px] h-[200px]" />
      <Typography variant="h1" className="text-white">
        Oops! Página não encontrada.
      </Typography>
      <button
        onClick={() => push('/id-card')}
        className="bg-brand-teal text-surface-dark px-10 py-3 rounded-lg font-bold hover:bg-brand-teal/90 transition-all"
      >
        Voltar
      </button>
    </main>
  );
};
