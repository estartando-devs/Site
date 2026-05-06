import { MessageCircle } from 'lucide-react';
import { useState } from 'react';
import { reasonSchema } from '../schemas/reasonSchema';
import { useReasonStore } from '../store/reasonStore';

export const ReasonForm = () => {
  const [error, setError] = useState('');
  const { reason, setReason } = useReasonStore();

  const validate = (value: string) => {
    const result = reasonSchema.safeParse({ reason: value });
    setError(result.success ? '' : result.error.errors[0]?.message || '');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center justify-center text-center gap-2 mb-4">
        <div className="w-14 h-14 rounded-2xl bg-brand-teal/10 flex items-center justify-center text-brand-teal border border-brand-teal/20 mb-2">
          <MessageCircle className="w-7 h-7" />
        </div>
        <span className="text-lg font-bold text-white">Sua Motivação</span>
        <p className="text-sm text-white/40 max-w-md">
          Por que você quer estudar com a gente? Conta um pouco dos seus sonhos!
          (Mínimo 50 caracteres)
        </p>
      </div>

      <div className="space-y-2">
        <textarea
          className="w-full bg-black/20 border border-white/5 rounded-2xl p-6 text-white text-base focus:outline-none focus:border-brand-teal/40 transition-all placeholder:text-white/10 resize-none min-h-[200px]"
          placeholder="Fale sobre sua motivação para participar do curso"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
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
