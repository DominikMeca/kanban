import { redirect } from '@sveltejs/kit';

export function load({ cookies }) {
	cookies.delete('session');
	throw redirect(307, '/login');
}
