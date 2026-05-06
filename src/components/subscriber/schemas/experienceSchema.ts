import { z } from 'zod';

export const experienceSchema = z.object({
  experience: z
    .string()
    .min(10, 'Informe sua experiência com pelo menos 10 caracteres.')
    .max(500, 'Máximo de 500 caracteres.'),
});
