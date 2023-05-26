// See https://kit.svelte.dev/docs/types#app

import type { User } from '$lib/user';

// for information about these interfaces
type PocketLoad = typeof fetch;

declare global {
	namespace App {
		// interface Error {}

		interface Locals {
			pb: PocketLoad;
			user?: User;
			session?: string;
		}

		// interface PageData {}
		// interface Platform {}
	}
}

export {};
