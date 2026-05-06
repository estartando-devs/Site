import { Calendar, Mail, Phone, User } from 'lucide-react';
import { useState } from 'react';
import { personalDataSchema } from '../schemas/personalDataSchema';
import { usePersonalDataStore } from '../store/personalDataStore';

function formatPhone(value: string) {
  const digits = value.replace(/\D/g, '');
  if (digits.length <= 2) {
    return digits;
  }
  if (digits.length <= 7) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  }
  if (digits.length <= 11) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(
      7,
      11,
    )}`;
  }
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
}

export const PersonalDataForm = () => {
  const [errors, setErrors] = useState<{ [k: string]: string }>({});
  const { name, email, birth, phone, setName, setEmail, setBirth, setPhone } =
    usePersonalDataStore();

  const validateField = (field: keyof typeof errors, value: string) => {
    const partialData = { name, email, birth, phone, [field]: value };
    const result = personalDataSchema.safeParse(partialData);

    if (!result.success) {
      const fieldError = result.error.errors.find(
        (err) => err.path[0] === field,
      );
      setErrors((prev) => ({
        ...prev,
        [field]: fieldError ? fieldError.message : '',
      }));
    } else {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <label
          className="text-[11px] font-black text-white/40 uppercase tracking-[0.2em]"
          htmlFor="name"
        >
          Nome Completo
        </label>
        <div className="relative group">
          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-brand-teal transition-colors" />
          <input
            type="text"
            id="name"
            placeholder="Seu nome aqui"
            className="w-full bg-black/20 border border-white/5 rounded-2xl py-3.5 pl-12 pr-4 text-white placeholder:text-white/10 focus:outline-none focus:border-brand-teal/50 focus:ring-4 focus:ring-brand-teal/5 transition-all"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={(e) => validateField('name', e.target.value)}
          />
        </div>
        {errors.name && (
          <span className="text-red-400 text-[10px] font-bold uppercase tracking-wider pl-1">
            {errors.name}
          </span>
        )}
      </div>

      <div className="space-y-2">
        <label
          className="text-[11px] font-black text-white/40 uppercase tracking-[0.2em]"
          htmlFor="email"
        >
          E-mail
        </label>
        <div className="relative group">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-brand-teal transition-colors" />
          <input
            type="email"
            id="email"
            placeholder="seu@email.com"
            className="w-full bg-black/20 border border-white/5 rounded-2xl py-3.5 pl-12 pr-4 text-white placeholder:text-white/10 focus:outline-none focus:border-brand-teal/50 focus:ring-4 focus:ring-brand-teal/5 transition-all"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={(e) => validateField('email', e.target.value)}
          />
        </div>
        {errors.email && (
          <span className="text-red-400 text-[10px] font-bold uppercase tracking-wider pl-1">
            {errors.email}
          </span>
        )}
      </div>

      <div className="space-y-2">
        <label
          className="text-[11px] font-black text-white/40 uppercase tracking-[0.2em]"
          htmlFor="birth"
        >
          Data de Nascimento
        </label>
        <div className="relative group">
          <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-brand-teal transition-colors" />
          <input
            type="date"
            id="birth"
            className="w-full bg-black/20 border border-white/5 rounded-2xl py-3.5 pl-12 pr-4 text-white placeholder:text-white/10 focus:outline-none focus:border-brand-teal/50 focus:ring-4 focus:ring-brand-teal/5 transition-all"
            value={birth}
            onChange={(e) => setBirth(e.target.value)}
            onBlur={(e) => validateField('birth', e.target.value)}
          />
        </div>
        {errors.birth && (
          <span className="text-red-400 text-[10px] font-bold uppercase tracking-wider pl-1">
            {errors.birth}
          </span>
        )}
      </div>

      <div className="space-y-2">
        <label
          className="text-[11px] font-black text-white/40 uppercase tracking-[0.2em]"
          htmlFor="phone"
        >
          Telefone / WhatsApp
        </label>
        <div className="relative group">
          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-brand-teal transition-colors" />
          <input
            type="tel"
            id="phone"
            placeholder="(00) 00000-0000"
            className="w-full bg-black/20 border border-white/5 rounded-2xl py-3.5 pl-12 pr-4 text-white placeholder:text-white/10 focus:outline-none focus:border-brand-teal/50 focus:ring-4 focus:ring-brand-teal/5 transition-all"
            value={formatPhone(phone)}
            onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
            onBlur={(e) => validateField('phone', e.target.value)}
          />
        </div>
        {errors.phone && (
          <span className="text-red-400 text-[10px] font-bold uppercase tracking-wider pl-1">
            {errors.phone}
          </span>
        )}
      </div>
    </div>
  );
};
