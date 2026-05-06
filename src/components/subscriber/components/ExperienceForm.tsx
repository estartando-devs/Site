import { Briefcase } from 'lucide-react';
import { useState } from 'react';
import { experienceSchema } from '../schemas/experienceSchema';
import { useExperienceStore } from '../store/experienceStore';

export const ExperienceForm = () => {
  const [error, setError] = useState('');
  const { experience, setExperience } = useExperienceStore();

  const validate = (value: string) => {
    const result = experienceSchema.safeParse({ experience: value });
    setError(result.success ? '' : result.error.errors[0]?.message || '');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center justify-center text-center gap-2 mb-4">
        <div className="w-14 h-14 rounded-2xl bg-brand-purple/10 flex items-center justify-center text-brand-purple border border-brand-purple/20 mb-2">
          <Briefcase className="w-7 h-7" />
        </div>
        <span className="text-lg font-bold text-white">Sua Experiência</span>
        <p className="text-sm text-white/40 max-w-md">
          Você tem alguma experiência na área do curso escolhido? Conta pra
          gente! (Mínimo 50 caracteres)
        </p>
      </div>

      <div className="space-y-2">
        <textarea
          className="w-full bg-black/20 border border-white/5 rounded-2xl p-6 text-white text-base focus:outline-none focus:border-brand-purple/40 transition-all placeholder:text-white/10 resize-none min-h-[200px]"
          placeholder="Conte um pouco sobre sua experiência (ou diga que está começando agora)"
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
          onBlur={(e) => validate(e.target.value)}
          required
        />
        {error && (
          <span className="text-red-400 text-[10px] font-bold uppercase tracking-wider pl-1">
            {error}
          </span>
        )}
      </div>
    </div>
  );
};
