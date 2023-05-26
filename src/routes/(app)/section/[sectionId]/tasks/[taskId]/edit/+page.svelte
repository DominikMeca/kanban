<script lang="ts">
	import KanbanEditForm from '$lib/KanbanEditForm.svelte';
	import { page } from '$app/stores';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="login">
	<div class="login__panel">
		<KanbanEditForm
			task={data.task}
			form={data.editForm}
			sections={data.sections}
			sectionId={$page.params.sectionId}
		/>
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
