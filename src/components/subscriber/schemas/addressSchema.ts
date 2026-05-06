import { z } from 'zod';

export const addressSchema = z.object({
  cep: z
    .string()
    .optional()
    .refine((val) => !val || /^\d{5}-?\d{3}$/.test(val), {
      message: 'CEP inválido',
    }),
  address: z.string().min(1, 'Endereço obrigatório'),
  district: z.string().min(1, 'Bairro obrigatório'),
  city: z.string().min(1, 'Cidade obrigatória'),
});

export type AddressData = z.infer<typeof addressSchema>;
