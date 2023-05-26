export async function handle({ event, resolve }) {
	const pb_auth = event.cookies.get('pb_auth');

	// Setup auth by pulling the auth cookie from the request
	// and forwarding it to the fetch
	event.locals.pb = (url, options) =>
		event.fetch(url, {
			...options,
			headers: { ...options?.headers, Authorization: pb_auth ?? '' }
		});

	return await resolve(event);
}
