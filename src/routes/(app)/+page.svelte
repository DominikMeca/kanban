<script lang="ts">
	import Modal from '$lib/Modal.svelte';
	import { writable } from 'svelte/store';
	// import { kanbanData } from '$lib/Kanban';
	import KanbanBoard from '$lib/KanbanBoard.svelte';
	import type { PageData } from './$types';
	import type { Validation } from 'sveltekit-superforms/index';
	import type { taskEditSchema, taskAddSchema } from '$lib/section';

	export let formAdd: Validation<typeof taskAddSchema>;
	export let formEdit: Validation<typeof taskEditSchema>;
	export let data: PageData;
	$: kanbanData = writable(data.sections);
</script>

{#key JSON.stringify(data.sections)}
	<KanbanBoard data={$kanbanData} {formAdd} {formEdit} />
{/key}
