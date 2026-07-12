import { Compass } from 'lucide-react';

type Track = {
  label: string;
  value: string;
  description: string;
  icon: typeof Compass;
};

type Props = {
  tracks: Track[];
  selectedTrack: string | null;
  setSelectedTrack: (v: string | null) => void;
  disabledTracks?: string[];
};

export const TrackSelector = ({
  tracks,
  selectedTrack,
  setSelectedTrack,
  disabledTracks = [],
}: Props) => {
  return (
    <div className="flex flex-col items-center gap-6">
      <span className="text-base sm:text-lg font-semibold text-brand-teal/80 mb-2">
        Qual trilha você quer seguir?
      </span>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
        {tracks.map((track) => {
          const isSelected = selectedTrack === track.value;
          const isDisabled = disabledTracks.includes(track.value);
          const Icon = track.icon;

          return (
            <button
              key={track.value}
              type="button"
              disabled={isDisabled}
              className={`flex flex-col items-start gap-4 p-6 rounded-3xl border transition-all duration-300 text-left group
                ${
                  isDisabled
                    ? 'bg-surface-variant/10 border-white/5 text-white/20 cursor-not-allowed opacity-50'
                    : isSelected
                      ? 'bg-brand-teal/10 border-brand-teal/50 text-white shadow-[0_0_20px_rgba(0,191,166,0.1)]'
                      : 'bg-surface-variant/30 border-white/5 text-white/60 hover:bg-white/5 hover:border-white/10 hover:text-white'
                }
              `}
              onClick={() => !isDisabled && setSelectedTrack(track.value)}
            >
              <div
                className={`p-3 rounded-2xl transition-colors ${
                  isDisabled
                    ? 'bg-white/5 text-white/20'
                    : isSelected
                      ? 'bg-brand-teal text-surface-dark'
                      : 'bg-white/5 text-white/40 group-hover:text-white'
                }`}
              >
                <Icon size={24} />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-xl">{track.label}</h3>
                <p className="text-sm leading-relaxed opacity-70">
                  {track.description}
                </p>
              </div>
              <div
                className={`mt-2 flex items-center gap-2 text-xs font-black uppercase tracking-widest ${
                  isDisabled
                    ? 'text-white/20'
                    : isSelected
                      ? 'text-brand-teal'
                      : 'text-white/20 group-hover:text-white/40'
                }`}
              >
                {isDisabled
                  ? 'Inscrições Encerradas'
                  : isSelected
                    ? 'Trilha Selecionada'
                    : 'Selecionar Trilha'}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
