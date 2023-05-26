<script lang="ts">
	import Background from '$lib/Background.svelte';
	import { createAuthContext } from '$lib/auth';
	import type { LayoutData } from './$types';
	import { theme } from '$lib/store';

	export let data: LayoutData;
	let auth = createAuthContext(data.user, data.session);

	// Update auth store when we get new data
	$: $auth.user = data.user;
	$: $auth.session = data.session;
</script>

<div
	class="wrapper"
	style:--primary-color={$theme.primary}
	style:--secondary-color={$theme.secondary}
	style:--ternary-color={$theme.ternary}
	style:--text-color={$theme.text}
>
	<Background />
	<slot />
</div>

<style>
	.wrapper {
		display: contents;
		overflow: hidden;
	}
</style>
