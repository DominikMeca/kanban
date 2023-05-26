export function load({ locals, depends }) {
	depends('session');

	return {
		user: locals.user,
		session: locals.session
	};
}
