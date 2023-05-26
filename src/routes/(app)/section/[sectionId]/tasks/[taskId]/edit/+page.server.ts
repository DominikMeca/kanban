import { ensureSession } from '$lib/auth.server.js';
import { taskEditSchema } from '$lib/section.js';
import { error, fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';

export async function load({ params, locals, url }) {
	ensureSession(locals, url.pathname);

	const result = await locals
		.pb(`api/collections/tasks/records/${params.taskId}`)
		.then((res) => res.json());

	if (result.code === 404) {
		throw error(404, {
			message: 'Not found!'
		});
	}

	const editForm = await superValidate(result, taskEditSchema, {
		id: 'edit-task'
	});

	return { editForm };
}

export const actions = {
	async default({ request, fetch }) {
		const form = await superValidate(request, taskEditSchema, {
			id: 'edit-task'
		});

		if (!form.valid) {
			return fail(400, { form });
		}

		const response = await fetch(`/api/tasks/${form.data.id}`, {
			method: 'PATCH',
			body: JSON.stringify(form.data)
		}).then((res) => res.json());

		// None of these errors should happen!
		if (response.code === 403) {
			throw redirect(307, '/login');
		}

		if (response.code === 400) {
			return fail(400, { form });
		}

		// Kick the user back to the index page!
		throw redirect(303, '/');
	}
};
