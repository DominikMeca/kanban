<script lang="ts">
	import Modal from '$lib/Modal.svelte';
	import { writable } from 'svelte/store';
	// import { kanbanData } from '$lib/Kanban';
	import KanbanBoard from '$lib/KanbanBoard.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	$: kanbanData = writable(data.sections);
	$: console.log(data.sections);
</script>

{#key JSON.stringify(data.sections)}
	<KanbanBoard data={$kanbanData} />
{/key}
