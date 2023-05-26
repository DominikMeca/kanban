import { taskAddSchemaWithSection } from '$lib/section.js';
import { json } from '@sveltejs/kit';

export async function POST({ locals, request }) {
	if (!locals.session) throw Error('Not authorized!');

	const body = await request.json();
	const validatedBody = await taskAddSchemaWithSection.parseAsync(body);
	delete (validatedBody as Record<string, unknown>)['id'];

	const response = await locals
		.pb('api/collections/tasks/records', {
			method: 'POST',
			body: JSON.stringify(validatedBody)
		})
		.then((res) => res.json());

	return json(response);
}
