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

export const taskDeleteSchema = taskSchema.pick({
	id: true
});

export const taskAddSchema = taskSchema.pick({
	field: true,
	description: true,
	title: true
});

export const taskAddSchemaWithSection = taskAddSchema.extend({
	section: z.string()
});

export const taskEditSchema = taskSchema
	.pick({
		id: true,
		field: true,
		description: true,
		title: true
	})
	.extend({
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
