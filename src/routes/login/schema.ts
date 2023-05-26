import { z } from 'zod';

export const loginSchema = z.object({
	redirectUrl: z.string().optional(),
	username: z.string().min(4, 'Username must be at least 4 characters!'),
	password: z.string().min(8, 'Password must be at least 8 chracter!')
});
