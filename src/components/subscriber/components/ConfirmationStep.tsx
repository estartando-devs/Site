import { ChevronDown, ShieldCheck, ThumbsDown, ThumbsUp } from 'lucide-react';
import { KNOWN_FROM_OPTIONS, type KnownFrom } from '../store/sourceStore';

type Props = {
  acceptedPolicy: boolean;
  availability: boolean | null;
  enquadramentoRendaPrioritaria: boolean | null;
  setAcceptedPolicy: (v: boolean) => void;
  setAvailability: (v: boolean) => void;
  setEnquadramentoRendaPrioritaria: (v: boolean) => void;
  knownFrom: KnownFrom | '';
  setKnownFrom: (v: KnownFrom | '') => void;
};

const KNOWN_FROM_LABELS: Record<KnownFrom, string> = {
  instagram: 'Instagram',
  linkedin: 'LinkedIn',
  youtube: 'YouTube',
  discord: 'Discord',
  google: 'Google',
  indicacao: 'Indicação de amigo',
  evento: 'Evento/comunidade',
  outro: 'Outro',
};

export const ConfirmationStep = ({
  availability,
  setAvailability,
  enquadramentoRendaPrioritaria,
  setEnquadramentoRendaPrioritaria,
  acceptedPolicy,
  setAcceptedPolicy,
  knownFrom,
  setKnownFrom,
}: Props) => (
  <div className="space-y-10">
    <div className="text-center space-y-2">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-brand-purple/10 border border-brand-purple/20 mb-2">
        <ShieldCheck className="w-3.5 h-3.5 text-brand-purple" />
        <span className="text-[10px] text-brand-purple uppercase tracking-widest font-bold">
          Confirmação Final
        </span>
      </div>
      <h2 className="text-2xl font-bold text-white">Quase lá!</h2>
      <p className="text-white/40 text-sm">
        Confirme as informações abaixo para finalizar sua inscrição.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Availability */}
      <div className="space-y-4">
        <label className="text-[11px] font-black text-white/40 uppercase tracking-[0.2em] block">
          Disponibilidade (Ter e Qui, 19:30 às 21:30)
        </label>
        <div className="flex gap-4">
          <button
            type="button"
            className={`flex-1 flex flex-col items-center justify-center p-6 rounded-2xl border transition-all duration-300
              ${
                availability === true
                  ? 'bg-brand-teal/10 border-brand-teal/50 text-brand-teal'
                  : 'bg-black/20 border-white/5 text-white/40 hover:bg-white/5'
              }`}
            onClick={() => setAvailability(true)}
          >
            <ThumbsUp size={24} className="mb-2" />
            <span className="font-bold text-sm">Sim</span>
          </button>
          <button
            type="button"
            className={`flex-1 flex flex-col items-center justify-center p-6 rounded-2xl border transition-all duration-300
              ${
                availability === false
                  ? 'bg-red-400/10 border-red-400/50 text-red-400'
                  : 'bg-black/20 border-white/5 text-white/40 hover:bg-white/5'
              }`}
            onClick={() => setAvailability(false)}
          >
            <ThumbsDown size={24} className="mb-2" />
            <span className="font-bold text-sm">Não</span>
          </button>
        </div>
      </div>

      {/* Income Priority */}
      <div className="space-y-4">
        <label className="text-[11px] font-black text-white/40 uppercase tracking-[0.2em] block leading-relaxed">
          Candidato com renda familiar bruta per capita igual ou inferior a R$
          810,50?
          <span className="block mt-1 normal-case font-medium text-[10px] opacity-60">
            (A soma de todos os rendimentos da família, dividida pelo número de
            moradores da residência, não pode ultrapassar R$ 810,50.)
          </span>
        </label>
        <div className="flex gap-4">
          <button
            type="button"
            className={`flex-1 flex flex-col items-center justify-center p-6 rounded-2xl border transition-all duration-300
              ${
                enquadramentoRendaPrioritaria === true
                  ? 'bg-brand-purple/10 border-brand-purple/50 text-brand-purple'
                  : 'bg-black/20 border-white/5 text-white/40 hover:bg-white/5'
              }`}
            onClick={() => setEnquadramentoRendaPrioritaria(true)}
          >
            <span className="font-bold text-sm">Sim, me enquadro</span>
          </button>
          <button
            type="button"
            className={`flex-1 flex flex-col items-center justify-center p-6 rounded-2xl border transition-all duration-300
              ${
                enquadramentoRendaPrioritaria === false
                  ? 'bg-white/10 border-white/20 text-white/60'
                  : 'bg-black/20 border-white/5 text-white/40 hover:bg-white/5'
              }`}
            onClick={() => setEnquadramentoRendaPrioritaria(false)}
          >
            <span className="font-bold text-sm">Não me enquadro</span>
          </button>
        </div>
      </div>

      {/* How did you hear about us */}
      <div className="space-y-4 md:col-span-2">
        <label className="text-[11px] font-black text-white/40 uppercase tracking-[0.2em] block">
          Como você conheceu a EstartandoDevs?
        </label>
        <div className="relative group">
          <select
            className="w-full bg-black/20 border border-white/5 rounded-2xl py-4 px-6 text-white appearance-none focus:outline-none focus:border-brand-teal/50 transition-all cursor-pointer"
            value={knownFrom}
            onChange={(e) => setKnownFrom(e.target.value as KnownFrom | '')}
          >
            <option value="" className="bg-surface-dark">
              Selecione uma opção
            </option>
            {KNOWN_FROM_OPTIONS.map((option) => (
              <option key={option} value={option} className="bg-surface-dark">
                {KNOWN_FROM_LABELS[option]}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-hover:text-brand-teal transition-all pointer-events-none" />
        </div>
      </div>
    </div>

    <div className="bg-black/20 border border-white/5 rounded-2xl p-6 flex items-start gap-4">
      <input
        id="privacy"
        type="checkbox"
        checked={acceptedPolicy}
        onChange={(e) => setAcceptedPolicy(e.target.checked)}
        className="mt-1 w-5 h-5 rounded border-white/10 bg-black/20 text-brand-teal focus:ring-brand-teal/20"
      />
      <label
        htmlFor="privacy"
        className="text-sm text-white/60 leading-relaxed cursor-pointer select-none"
      >
        Eu li e concordo com as{' '}
        <a
          href="https://docs.google.com/document/d/1xspDTj_BXuU599g0MP0jrSIknat15wEARxGGYWWZsPo/edit"
          target="_blank"
          rel="noreferrer"
          className="text-brand-teal hover:underline font-bold"
        >
          Políticas de Privacidade
        </a>
        . Candidatos fora do perfil de vulnerabilidade socioeconômica concorrem
        em vagas de ampla concorrência.
      </label>
    </div>
  </div>
);
