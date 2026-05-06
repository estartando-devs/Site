import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from '../Logo';
import { Typography } from '../Typography';
import { SocialShareButtons } from './SocialShareButtons';

export const Footer = () => {
  const pathName = usePathname();

  return (
    <footer className="w-full bg-[#0f1110] border-t border-white/5 pt-24 pb-12 overflow-hidden relative">
      {/* Decorative Blur */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[300px] bg-brand-purple/5 blur-[120px] pointer-events-none" />

      <div className="max-w-desktop_fullhd mx-auto px-8 md:px-30 flex flex-col gap-20 relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-16">
          <div className="space-y-8 max-w-[400px]">
            <Link
              href="/"
              className="inline-block transition-transform hover:scale-105"
            >
              <Logo width={80} height={116} />
            </Link>
            <Typography
              variant="body2"
              className="text-white/40 leading-relaxed font-medium"
            >
              Transformando o mundo através da tecnologia. Um projeto social
              dedicado a formar novos desenvolvedores e designers.
            </Typography>
            <SocialShareButtons />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-12 md:gap-24 w-full lg:w-auto">
            <div className="space-y-6">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-teal">
                Início
              </h4>
              <ul className="space-y-4">
                <li>
                  <Link
                    href="/"
                    className="text-white/60 hover:text-white text-sm font-bold transition-colors"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="#what-we-teach"
                    className="text-white/60 hover:text-white text-sm font-bold transition-colors"
                  >
                    O que ensinamos
                  </Link>
                </li>
                <li>
                  <Link
                    href="#resultado"
                    className="text-white/60 hover:text-white text-sm font-bold transition-colors"
                  >
                    Resultados
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-teal">
                Acesso
              </h4>
              <ul className="space-y-4">
                <li>
                  <a
                    href="#"
                    className="text-white/60 hover:text-white text-sm font-bold transition-colors"
                  >
                    Login Aluno
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-white/60 hover:text-white text-sm font-bold transition-colors"
                  >
                    Inscrições
                  </a>
                </li>
                <li>
                  <Link
                    href="/perguntas-frequentes"
                    className="text-white/60 hover:text-white text-sm font-bold transition-colors"
                  >
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link
                    href="/politicas-de-privacidade"
                    className="text-white/60 hover:text-white text-sm font-bold transition-colors"
                  >
                    Privacidade
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-teal">
                Social
              </h4>
              <ul className="space-y-4">
                <li>
                  <a
                    href="https://instagram.com/estartandodevs"
                    target="_blank"
                    className="text-white/60 hover:text-white text-sm font-bold transition-colors"
                    rel="noreferrer"
                  >
                    Instagram
                  </a>
                </li>
                <li>
                  <a
                    href="https://linkedin.com/company/estartando-devs"
                    target="_blank"
                    className="text-white/60 hover:text-white text-sm font-bold transition-colors"
                    rel="noreferrer"
                  >
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/estartando-devs"
                    target="_blank"
                    className="text-white/60 hover:text-white text-sm font-bold transition-colors"
                    rel="noreferrer"
                  >
                    GitHub
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-12 border-t border-white/5">
          <Typography
            variant="body3"
            className="text-white/20 font-bold text-xs uppercase tracking-widest"
          >
            {`© ${new Date().getFullYear()} Estartando Devs • Todos os direitos reservados.`}
          </Typography>

          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/5">
            <div className="w-1.5 h-1.5 rounded-full bg-brand-teal animate-pulse" />
            <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">
              System Status: Online
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
