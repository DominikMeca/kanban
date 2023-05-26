import { getContext, setContext } from 'svelte';
import type { User } from './user';
import { writable, type Writable } from 'svelte/store';

const AUTH_KEY = Symbol();

type AuthStore = Writable<{ user?: User; session?: string }>;

export function createAuthContext(user?: User, session?: string) {
	const authStore = writable({ user, session });
	return setContext(AUTH_KEY, authStore);
}

export function getAuth(): AuthStore {
	return getContext(AUTH_KEY);
}
