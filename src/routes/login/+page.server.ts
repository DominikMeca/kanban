import { setError, superValidate } from 'sveltekit-superforms/server';
import { loginSchema } from './schema.js';
import { fail, redirect } from '@sveltejs/kit';

export const actions = {
	async default({ request, cookies, locals }) {
		const form = await superValidate(request, loginSchema, {
			id: 'login'
		});

		if (!form.valid) {
			return fail(400, { form });
		}

		const { username, password, redirectUrl } = form.data;

		const result = await locals
			.pb('api/collections/users/auth-with-password', {
				method: 'POST',
				body: JSON.stringify({ identity: username, password })
			})
			.then((res) => res.json());

		if (result.code === 400) {
			return setError(form, 'password', 'Incorrect username or password!');
		}

		const token = result.token;

		cookies.set('session', token);
		throw redirect(307, redirectUrl ?? '/');
	}
};
