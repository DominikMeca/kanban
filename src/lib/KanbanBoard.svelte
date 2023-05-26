<script lang="ts">
	import KanbanColumn from '$lib/KanbanColumn.svelte';
	import type { Validation } from 'sveltekit-superforms/index';
	import type { Section, taskAddSchema, taskEditSchema } from './section';

	export let formAdd: Validation<typeof taskAddSchema>;
	export let formEdit: Validation<typeof taskEditSchema>;
	export let data: Section[];
</script>

<div class="kanban-board">
	{#each data as column}
		<KanbanColumn
			sections={data}
			id={column.id}
			title={column.title}
			items={column.tasks}
			{formAdd}
			{formEdit}
		/>
	{/each}
</div>

<style>
	.kanban-board {
		width: 100%;
		flex: 1;
		padding: 1.5rem;
		overflow-x: auto;

		display: grid;
		gap: 1.5rem;
		scroll-snap-type: x mandatory;
		scroll-padding-left: 1.5rem;
		scroll-padding-right: 1.5rem;
		grid-auto-flow: column;
		align-items: flex-start;
		scroll-behavior: smooth;
		grid-auto-columns: 340px;
	}
</style>
