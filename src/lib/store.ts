import { storage } from 'svelte-legos';
import { writable } from 'svelte/store';

export type Theme = {
	primary: string;
	secondary: string;
	ternary: string;
	text: string;
	background: string;
};

export const theme = storage(
	writable({
		primary: '#233d4d',
		secondary: '#fe7f2d',
		ternary: '#fcca46',
		text: '#fe7f2d',
		background: ''
	}),
	'theme'
);
