import { z } from 'zod';

export const userSchema = z.object({
	id: z.string(),
	username: z.string()
});

export type User = z.infer<typeof userSchema>;
