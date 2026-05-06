import { z } from 'zod';

export const personalDataSchema = z.object({
  name: z.string().min(2, 'Nome obrigatório'),
  email: z.string().email('Email inválido'),
  birth: z
    .string()
    .min(8, 'Data obrigatória')
    .refine(
      (dateStr) => {
        const date = new Date(dateStr);
        if (isNaN(date.getTime())) return false;
        const today = new Date();
        const minBirth = new Date(
          today.getFullYear() - 15,
          today.getMonth(),
          today.getDate(),
        );
        return date <= minBirth;
      },
      {
        message: 'Você precisa ter pelo menos 15 anos',
      },
    ),
  phone: z.string().min(11, 'Telefone obrigatório'),
});

export type PersonalData = z.infer<typeof personalDataSchema>;
