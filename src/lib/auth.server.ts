import { redirect } from '@sveltejs/kit';

export function ensureSession(locals: App.Locals, url: string) {
	// console.log('Here: ', `/login?redirectUrl=${url}`);
	if (!locals.session) throw redirect(307, `/login?redirectUrl=${url}`);
}
