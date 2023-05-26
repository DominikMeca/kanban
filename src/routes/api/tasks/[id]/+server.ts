import { taskSchemaInput } from '$lib/section.js';
import { json } from '@sveltejs/kit';

export async function PATCH({ locals, params, request }) {
	if (!locals.session) throw Error('Not authorized!');
	const { id } = params;
	const body = await request.json();
	const validatedBody = await taskSchemaInput.parseAsync(body);

	const response = await locals
		.pb(`api/collections/tasks/records/${id}`, {
			method: 'PATCH',
			body: JSON.stringify(validatedBody)
		})
		.then((res) => res.json());

	return json(response);
}
