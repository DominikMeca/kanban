<script lang="ts">
	import KanbanColumn from '$lib/KanbanColumn.svelte';
	import type { Section } from './section';

	export let data: Section[];
</script>

<div class="kanban-board">
	{#each data as column}
		<KanbanColumn id={column.id} title={column.title} items={column.tasks} />
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
