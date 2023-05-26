<script lang="ts">
	import KanbanAddForm from '$lib/KanbanAddForm.svelte';
	import type { taskSchemaInput } from '$lib/section';
	import type { Validation } from 'sveltekit-superforms/index';
	import { page } from '$app/stores';

	export let form: Validation<typeof taskSchemaInput>;
</script>

<div class="login">
	<div class="login__panel">
		<KanbanAddForm sectionId={$page.params.sectionId} {form} />
	</div>
</div>

<style>
	.login {
		height: 80dvh;
		display: grid;
		place-items: center;
	}

	.login__panel {
		backdrop-filter: blur(1px);
		background-color: rgba(255, 255, 255, 0.9);
		border-radius: 5px;
		margin: 0 auto;
		padding: 2rem;
		width: 100%;
		max-width: 600px;
	}
</style>
