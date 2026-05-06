import { Home, MapPin, Navigation } from 'lucide-react';
import { useEffect, useState } from 'react';
import { addressSchema } from '../schemas/addressSchema';
import { useAddressStore } from '../store/addressStore';

export const AddressForm = () => {
  const [errors, setErrors] = useState<{ [k: string]: string }>({});
  const {
    cep,
    address,
    district,
    city,
    setCep,
    setAddress,
    setDistrict,
    setCity,
  } = useAddressStore();

  useEffect(() => {
    const fetchAddress = async (cepValue: string) => {
      try {
        const cleanCep = cepValue.replace(/\D/g, '');
        if (cleanCep.length === 8) {
          const response = await fetch(
            `https://viacep.com.br/ws/${cleanCep}/json/`,
          );
          const data = await response.json();
          if (!data.erro) {
            setAddress(data.logradouro || '');
            setDistrict(data.bairro || '');
            setCity(data.localidade || '');
          }
        }
      } catch (error) {
        console.error(error);
      }
    };
    if (cep && /^\d{5}-?\d{3}$/.test(cep)) {
      fetchAddress(cep);
    }
  }, [cep, setAddress, setCity, setDistrict]);

  const validateField = (field: keyof typeof errors, value: string) => {
    const partialData = { cep, address, district, city, [field]: value };
    const result = addressSchema.safeParse(partialData);
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

  function formatCep(value: string) {
    const digits = value.replace(/\D/g, '');
    if (digits.length <= 5) return digits;
    return digits.slice(0, 5) + '-' + digits.slice(5, 8);
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <label
          className="text-[11px] font-black text-white/40 uppercase tracking-[0.2em]"
          htmlFor="cep"
        >
          CEP (Opcional)
        </label>
        <div className="relative group">
          <Navigation className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-brand-teal transition-colors" />
          <input
            type="text"
            id="cep"
            className="w-full bg-black/20 border border-white/5 rounded-2xl py-3.5 pl-12 pr-4 text-white placeholder:text-white/10 focus:outline-none focus:border-brand-teal/50 focus:ring-4 focus:ring-brand-teal/5 transition-all"
            value={formatCep(cep)}
            onChange={(e) => {
              const digits = e.target.value.replace(/\D/g, '').slice(0, 8);
              setCep(digits);
            }}
            onBlur={(e) => validateField('cep', e.target.value)}
            placeholder="00000-000"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label
          className="text-[11px] font-black text-white/40 uppercase tracking-[0.2em]"
          htmlFor="city"
        >
          Cidade
        </label>
        <div className="relative group">
          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-brand-teal transition-colors" />
          <input
            type="text"
            id="city"
            placeholder="Sua cidade"
            className="w-full bg-black/20 border border-white/5 rounded-2xl py-3.5 pl-12 pr-4 text-white placeholder:text-white/10 focus:outline-none focus:border-brand-teal/50 focus:ring-4 focus:ring-brand-teal/5 transition-all"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onBlur={(e) => validateField('city', e.target.value)}
          />
        </div>
        {errors.city && (
          <span className="text-red-400 text-[10px] font-bold uppercase tracking-wider pl-1">
            {errors.city}
          </span>
        )}
      </div>

      <div className="space-y-2 md:col-span-2">
        <label
          className="text-[11px] font-black text-white/40 uppercase tracking-[0.2em]"
          htmlFor="address"
        >
          Endereço
        </label>
        <div className="relative group">
          <Home className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-brand-teal transition-colors" />
          <input
            type="text"
            id="address"
            placeholder="Rua, número, complemento"
            className="w-full bg-black/20 border border-white/5 rounded-2xl py-3.5 pl-12 pr-4 text-white placeholder:text-white/10 focus:outline-none focus:border-brand-teal/50 focus:ring-4 focus:ring-brand-teal/5 transition-all"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            onBlur={(e) => validateField('address', e.target.value)}
          />
        </div>
        {errors.address && (
          <span className="text-red-400 text-[10px] font-bold uppercase tracking-wider pl-1">
            {errors.address}
          </span>
        )}
      </div>

      <div className="space-y-2 md:col-span-2">
        <label
          className="text-[11px] font-black text-white/40 uppercase tracking-[0.2em]"
          htmlFor="district"
        >
          Bairro
        </label>
        <div className="relative group">
          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-brand-teal transition-colors" />
          <input
            type="text"
            id="district"
            placeholder="Seu bairro"
            className="w-full bg-black/20 border border-white/5 rounded-2xl py-3.5 pl-12 pr-4 text-white placeholder:text-white/10 focus:outline-none focus:border-brand-teal/50 focus:ring-4 focus:ring-brand-teal/5 transition-all"
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            onBlur={(e) => validateField('district', e.target.value)}
          />
        </div>
        {errors.district && (
          <span className="text-red-400 text-[10px] font-bold uppercase tracking-wider pl-1">
            {errors.district}
          </span>
        )}
      </div>
    </div>
  );
};
