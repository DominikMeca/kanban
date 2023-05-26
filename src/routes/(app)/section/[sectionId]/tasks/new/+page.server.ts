import { taskAddSchema } from '$lib/section.js';
import { fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';

export const actions = {
	async default({ request, fetch, params }) {
		const form = await superValidate(request, taskAddSchema, {
			id: 'add-task'
		});

		if (!form.valid) {
			return fail(400, { form });
		}

		const response = await fetch('/api/tasks', {
			method: 'POST',
			body: JSON.stringify({
				...form.data,
				section: params.sectionId
			})
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
