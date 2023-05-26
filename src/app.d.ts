// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
type PocketLoad = typeof fetch;

declare global {
	namespace App {
		// interface Error {}

		interface Locals {
			pb: PocketLoad;
		}

		// interface PageData {}
		// interface Platform {}
	}
}

export {};
