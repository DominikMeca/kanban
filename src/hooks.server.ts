import { POCKETBASE_URI } from '$env/static/private';
import { userSchema } from '$lib/user';

export async function handle({ event, resolve }) {
	event.locals.session = event.cookies.get('session');

	if (event.locals.session) {
		// Attempt to auth the user here, we'll also use the result to
		// populate the auth store
		try {
			const result = await event
				.fetch(`${POCKETBASE_URI}/api/collections/users/auth-refresh`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: event.locals.session
					}
				})
				.then((res) => res.json());

			if (!result.record) {
				// This will get caught at the bottom, wiping the session!
				throw new Error('Not authorized!');
			}

			const user = await userSchema.parse(result.record);
			const token = result.token;

			event.cookies.set('session', token);
			event.locals.user = user;
		} catch (err) {
			console.error(err);

			event.cookies.delete('session');
			delete event.locals.session;
		}
	}

	// Setup auth by pulling the auth cookie from the request
	// and forwarding it to the fetch
	event.locals.pb = (url, options) => {
		const finalUrl = `${POCKETBASE_URI}/${url}`;
		return event.fetch(finalUrl, {
			...options,
			headers: {
				...options?.headers,
				'Content-Type': 'application/json',
				Authorization: event.locals.session ?? ''
			}
		});
	};

	return await resolve(event);
}
