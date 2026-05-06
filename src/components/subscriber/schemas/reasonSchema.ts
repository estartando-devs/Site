import { z } from 'zod';

export const reasonSchema = z.object({
  reason: z
    .string()
    .min(10, 'Informe seu motivo com pelo menos 10 caracteres.')
    .max(500, 'Máximo de 500 caracteres.'),
});
