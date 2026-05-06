import { ReactNode } from 'react';
import { useFormContext } from 'react-hook-form';
import { InputProps } from './types/InputProps';

export const Input = ({
  id,
  validation,
  placeholder,
  className = '',
  icon,
  ...restProps
}: InputProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const isError = errors && !!errors[id as string];
  const errorMessage = errors[id as string]?.message;

  return (
    <div className="w-full space-y-2">
      {placeholder && (
        <label
          htmlFor={id}
          className="block text-[11px] font-black text-white/40 uppercase tracking-[0.2em] ml-1"
        >
          {placeholder}
        </label>
      )}

      <div className="relative group">
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-brand-teal transition-all duration-300 z-10">
            {icon}
          </div>
        )}
        <input
          id={id}
          {...register(id, validation)}
          {...restProps}
          className={`w-full bg-black/20 border rounded-2xl py-4 ${
            icon ? 'pl-12' : 'px-5'
          } pr-5 text-white text-base focus:outline-none focus:border-brand-teal/50 focus:ring-4 focus:ring-brand-teal/5 transition-all placeholder:text-white/10 ${
            isError ? 'border-red-500/50' : 'border-white/5'
          } ${className}`}
          placeholder={placeholder}
        />
      </div>

      {isError && (
        <span className="text-red-400 text-[10px] font-bold uppercase tracking-wider px-2">
          {errorMessage as ReactNode}
        </span>
      )}
    </div>
  );
};
