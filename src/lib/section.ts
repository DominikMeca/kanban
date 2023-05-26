import { z } from 'zod';

export const taskSchema = z.object({
	id: z.string(),
	title: z.string(),
	description: z.string().optional(),
	field: z.string()
});

export const taskSchemaInput = taskSchema.extend({
	section: z.string()
});

export type Task = z.infer<typeof taskSchema>;

export const sectionSchema = z.object({
	id: z.string(),
	title: z.string(),
	order: z.number(),
	tasks: z.array(taskSchema)
});

export type Section = z.infer<typeof sectionSchema>;
