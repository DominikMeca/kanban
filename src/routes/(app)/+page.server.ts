import { taskSchema, type Section } from '$lib/section.js';
import { z } from 'zod';

const loadResult = z.object({
	page: z.number(),
	perPage: z.number(),
	totalPages: z.number(),
	totalItems: z.number(),
	items: z.array(
		z.object({
			id: z.string(),
			title: z.string(),
			order: z.number(),
			expand: z
				.object({
					'tasks(section)': z.array(taskSchema)
				})
				.optional()
		})
	)
});

export async function load({ locals, depends }) {
	depends('sections');
	depends('tasks');

	const result = await locals
		.pb('api/collections/sections/records?expand=tasks(section)')
		.then((res) => res.json());

	const data = await loadResult.parseAsync(result);
	return {
		sections: data.items.map(
			(item): Section => ({
				id: item.id,
				title: item.title,
				order: item.order,
				tasks: item.expand?.['tasks(section)'] ?? []
			})
		)
	};
}
