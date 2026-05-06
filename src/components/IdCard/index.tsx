import { Code2, MapPin, ShieldCheck } from 'lucide-react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { CourseKey } from '../../mocks';
import { useIdCardHandlers } from './idCardHandlers';

export type IdCardProps = {
  name?: string;
  team?: boolean;
  image?: {
    src: string;
    alt: string;
  };
  course?: string;
  address?: {
    city: string;
    state: string;
  };
};

const COLORS = {
  teal: '#00BFA6',
  purple: '#6C63FF',
  cyan: '#1EC0D6',
  orange: '#F76B15',
  dark: '#0a0a0a',
  surface: '#1e201f',
  white: '#ffffff',
  black: '#000000',
};

const styleByCourse: Record<
  CourseKey | 'softskills',
  { hex: string; bgImage: string }
> = {
  frontend: {
    hex: COLORS.teal,
    bgImage: "url('/bg-card-front.jpg')",
  },
  backend: {
    hex: COLORS.cyan,
    bgImage: "url('/bg-card-back.jpg')",
  },
  design: {
    hex: COLORS.purple,
    bgImage: "url('/bg-card-design.png')",
  },
  softskills: {
    hex: COLORS.orange,
    bgImage: "url('/bg-card-design.png')",
  },
};

export const IdCard = ({
  name = 'estartando devs',
  team,
  course = 'dev backend',
  address = {
    city: 'rio de janeiro',
    state: 'rj',
  },
  image = {
    src: 'https://res.cloudinary.com/elite-devs/images/logo',
    alt: 'imagem aluno(a)',
  },
}: IdCardProps) => {
  const { imageSrc, courseKey, ref, handleDownloadImage } = useIdCardHandlers({
    image: image as any,
    course: course as any,
  });

  const { back } = useRouter();
  const currentStyle =
    styleByCourse[courseKey as CourseKey] || styleByCourse.frontend;

  const [scale, setScale] = useState(1);

  useEffect(() => {
    const updateScale = () => {
      const availableWidth = Math.min(window.innerWidth - 64, 1290);
      setScale(availableWidth / 1290);
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  // Standard label style for the ID Card
  const labelStyle = {
    display: 'block',
    fontSize: '11px',
    fontWeight: 900,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.2em',
    color: 'rgba(255, 255, 255, 0.4)',
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-[1290px] mx-auto py-8 font-sans">
      {/* Container Principal */}
      <div
        className="relative w-full flex items-center justify-center overflow-hidden rounded-[40px] transition-all duration-300 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)]"
        style={{
          height: `${720 * scale}px`,
          backgroundColor: COLORS.dark,
          border: '1px solid rgba(255,255,255,0.05)',
        }}
      >
        <div
          ref={ref}
          className="absolute left-1/2 top-0 -translate-x-1/2 origin-top flex justify-between w-[1290px] h-[720px] bg-cover bg-center p-[4rem_5rem]"
          style={{
            transform: `scale(${scale})`,
            backgroundImage: currentStyle.bgImage,
            color: COLORS.white, // Default text color for the whole card
          }}
        >
          {/* Camada de Gradiente Overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `linear-gradient(to bottom right, ${currentStyle.hex}33, transparent)`,
              opacity: 0.6,
            }}
          />

          {/* Grid/Mesh Tech Overlay */}
          <div className="absolute inset-0 opacity-[0.07] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] mix-blend-overlay" />

          {/* Conteúdo Esquerdo: Informações */}
          <div className="relative flex flex-col justify-between z-10 w-[65%] h-full">
            <div className="flex items-center gap-6">
              <div
                className="w-[12rem] h-14 bg-[url('/logoCard.svg')] bg-contain bg-no-repeat bg-left"
                style={{ filter: 'drop-shadow(0 10px 10px rgba(0,0,0,0.3))' }}
              />
              <div
                className="h-8 w-px"
                style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
              />
              <div
                className="flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-md"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
              >
                <ShieldCheck size={16} color={COLORS.teal} />
                <span
                  style={{
                    fontSize: '10px',
                    fontWeight: 900,
                    textTransform: 'uppercase',
                    letterSpacing: '0.2em',
                    color: 'rgba(255,255,255,0.8)',
                  }}
                >
                  {team ? 'Equipe Verificada' : 'Membro 2026'}
                </span>
              </div>
            </div>

            <div className="mt-12 space-y-8 flex-1">
              <div style={{ textShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
                <h1
                  style={{
                    margin: 0,
                    fontSize: '5.5rem',
                    lineHeight: '0.9',
                    fontWeight: 900,
                    letterSpacing: '-0.05em',
                  }}
                >
                  {name.split(' ')[0]}
                  <span
                    style={{
                      display: 'block',
                      color: 'rgba(255, 255, 255, 0.4)',
                      fontSize: '4rem',
                      fontWeight: 500,
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {name.split(' ').slice(1).join(' ')}
                  </span>
                </h1>
              </div>

              <div className="flex items-center gap-8">
                <div className="flex items-center gap-2.5">
                  <MapPin size={20} color={COLORS.teal} />
                  <span
                    style={{
                      fontSize: '18px',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      color: 'rgba(255, 255, 255, 0.9)',
                    }}
                  >
                    {`${address?.city || 'Rio de Janeiro'} • ${
                      address?.state?.toUpperCase() || 'RJ'
                    }`}
                  </span>
                </div>
              </div>

              <div
                className="relative p-8 rounded-3xl backdrop-blur-xl shadow-2xl overflow-hidden"
                style={{
                  backgroundColor: 'rgba(30, 32, 31, 0.4)',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
              >
                <div
                  className="absolute top-0 left-0 w-1 h-full"
                  style={{
                    background: `linear-gradient(to bottom, ${currentStyle.hex}, ${COLORS.purple})`,
                  }}
                />
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <Code2 size={16} color="rgba(255,255,255,0.3)" />
                    <span style={labelStyle}>
                      {team ? 'Membro da Equipe' : 'Trilha Estartando'}
                    </span>
                  </div>
                  <h2
                    style={{
                      margin: 0,
                      fontSize: '2.8rem',
                      fontWeight: 900,
                      textTransform: 'uppercase',
                      letterSpacing: '-0.02em',
                      lineHeight: '1',
                      color: currentStyle.hex,
                    }}
                  >
                    {course}
                  </h2>
                </div>
              </div>
            </div>

            <div className="mt-auto flex items-center gap-4">
              <span
                style={{
                  fontSize: '14px',
                  fontWeight: 500,
                  fontFamily: 'monospace',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'rgba(255, 255, 255, 0.3)',
                }}
              >
                Transformando o mundo através da tecnologia
              </span>
              <div
                className="h-px flex-1"
                style={{
                  background:
                    'linear-gradient(to right, rgba(255,255,255,0.1), transparent)',
                }}
              />
            </div>
          </div>

          {/* Conteúdo Direito: Avatar e Status */}
          <div className="relative flex flex-col items-center justify-between w-[30%] z-10 h-full">
            <div className="relative mt-4">
              {/* Círculos Decorativos */}
              <div
                className="absolute inset-[-20px] rounded-full border"
                style={{
                  borderColor: 'rgba(255,255,255,0.05)',
                  animation: 'spin 20s linear infinite',
                }}
              />
              <div
                className="absolute inset-[-40px] rounded-full border"
                style={{
                  borderColor: 'rgba(255,255,255,0.05)',
                  animation: 'spin 30s linear infinite reverse',
                }}
              />

              <div className="relative rounded-full w-[28rem] h-[28rem] flex items-center justify-center shrink-0">
                {/* Glow Principal */}
                <div
                  className="absolute inset-0 rounded-full opacity-30 blur-[60px]"
                  style={{
                    background: `linear-gradient(to bottom right, ${COLORS.purple}, ${COLORS.teal})`,
                  }}
                />

                {/* Ring Layers */}
                <div
                  className="absolute inset-0 rounded-full p-1.5"
                  style={{
                    background: `linear-gradient(to bottom right, ${COLORS.purple}, rgba(255,255,255,0.2), ${COLORS.teal})`,
                    boxShadow: '0 0 50px rgba(0, 191, 166, 0.3)',
                  }}
                >
                  <div
                    className="w-full h-full rounded-full p-2"
                    style={{ backgroundColor: COLORS.dark }}
                  >
                    <div
                      className="w-full h-full rounded-full p-1"
                      style={{
                        background: `linear-gradient(to bottom right, ${COLORS.purple}, ${COLORS.teal})`,
                      }}
                    >
                      <div
                        className="w-full h-full rounded-full overflow-hidden"
                        style={{ backgroundColor: '#121212' }}
                      >
                        <div
                          className="w-full h-full bg-cover bg-center transition-transform hover:scale-110 duration-500"
                          style={{ backgroundImage: `url(${imageSrc.src})` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Badge Flutuante */}
                <div
                  className="absolute bottom-6 -right-2 px-4 py-2 rounded-xl"
                  style={{
                    backgroundColor: COLORS.teal,
                    color: COLORS.dark,
                    fontSize: '12px',
                    fontWeight: 900,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                    transform: 'rotate(3deg)',
                  }}
                >
                  {team ? 'Equipe' : 'Ativo'}
                </div>
              </div>
            </div>

            <div className="text-right w-full space-y-1">
              <div
                style={{
                  fontSize: '20px',
                  fontWeight: 900,
                  textTransform: 'uppercase',
                  letterSpacing: '0.3em',
                  color: COLORS.white,
                }}
              >
                Estartando <span style={{ color: COLORS.teal }}>Devs</span>
              </div>
              <div
                style={{
                  fontSize: '12px',
                  fontWeight: 500,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  fontFamily: 'monospace',
                  color: 'rgba(255, 255, 255, 0.4)',
                }}
              >
                estartandodevs.com.br
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Botões de Ação - Fora da área de captura */}
      <div className="flex flex-col sm:flex-row gap-6 mt-16 w-full justify-center px-4">
        <button
          onClick={() => back()}
          className="w-full sm:w-[280px] py-4 rounded-2xl border-2 border-white/5 text-white/60 font-black text-sm uppercase tracking-[0.2em] hover:bg-white/5 hover:text-white hover:border-white/20 transition-all active:scale-95"
        >
          Voltar
        </button>
        <button
          onClick={handleDownloadImage}
          className="group relative w-full sm:w-[320px] py-4 rounded-2xl bg-white text-surface-dark font-black text-sm uppercase tracking-[0.2em] hover:shadow-[0_20px_40px_-10px_rgba(255,255,255,0.3)] transition-all active:scale-95 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#00BFA6] to-[#6C63FF] opacity-0 group-hover:opacity-10 transition-opacity" />
          Baixar ID Card
        </button>
      </div>
    </div>
  );
};
