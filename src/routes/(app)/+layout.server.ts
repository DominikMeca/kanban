import { ensureSession } from '$lib/auth.server';

export function load(args) {
	ensureSession(args.locals, args.url.pathname);
}
