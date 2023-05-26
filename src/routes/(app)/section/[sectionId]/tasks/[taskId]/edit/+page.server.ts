import { ensureSession } from '$lib/auth.server.js';
import { sectionSchema, taskEditSchema, type Task } from '$lib/section.js';
import { error, fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { z } from 'zod';

const sectionLoadSchema = z.array(sectionSchema.omit({ tasks: true }));

export async function load({ params, locals, url }) {
	ensureSession(locals, url.pathname);

	const taskResult = await locals
		.pb(`api/collections/tasks/records/${params.taskId}`)
		.then((res) => res.json());

	if (taskResult.code === 404) {
		throw error(404, {
			message: 'Not found!'
		});
	}

	const sectionResult = await locals
		.pb(`api/collections/sections/records`)
		.then((res) => res.json());

	if (sectionResult.code === 400) {
		throw error(400, {
			message: 'Error'
		});
	}

	const sections = await sectionLoadSchema.parseAsync(sectionResult.items);

	const editForm = await superValidate(taskResult, taskEditSchema, {
		id: 'edit-task'
	});

	return { task: taskResult as Task, editForm, sections };
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
