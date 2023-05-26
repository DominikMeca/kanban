<script lang="ts">
	import { theme, type Theme } from '$lib/store';

	export let label: string;
	export let storageKey: keyof Theme;
</script>

<label for={`input-${storageKey}-color`}>{label}</label>
<input
	id={`input-${storageKey}-color`}
	type="color"
	class="input"
	bind:value={$theme[storageKey]}
/>

<style>
	.input {
		width: 100%;
		border: 1px solid #1f3a8a24;
		border-radius: 4px;
		padding: 0.8rem;
		outline: 0;
		font-family: var(--base-font);
		height: 3.3rem;
		appearance: none;
		-webkit-appearance: none;
	}

	label {
		font-weight: bold;
		display: block;
		margin-bottom: 4px;
	}

	label:after {
		content: ': ';
	}
</style>
