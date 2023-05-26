<script lang="ts">
	import Sortable from 'sortablejs';
	import KanbanColumnItem from '$lib/KanbanColumnItem.svelte';
	import type { Task } from './section';
	import { invalidate } from '$app/navigation';

	export let id: string;
	export let title: string;
	export let items: Task[];

	function sortable(el: HTMLElement, name: string) {
		Sortable.create(el, {
			group: {
				name: name,
				put: true
			},
			animation: 200,
			sort: false,
			onEnd(ev) {
				ev.preventDefault();

				const taskId = ev.item.getAttribute('data-id');
				const task = items.find((item) => item.id === taskId);

				if (!task) {
					// TODO: Throw error?
				}

				const sectionId = ev.to.getAttribute('data-id');
				fetch(`/api/tasks/${taskId}`, {
					method: 'PATCH',
					credentials: 'include',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						...task,
						section: sectionId
					})
				}).then(() => invalidate('sections'));
			}
		});
	}
</script>

<section class="kanban-column">
	<header class="kanban-column__header">
		<input class="kanban-column__title-input" type="text" value={title} />
	</header>
	<div class="kanban-column__content" use:sortable={title} data-id={id}>
		{#each items as item}
			<KanbanColumnItem
				id={item.id}
				description={item.description}
				title={item.title}
				priority={item.field}
			/>
		{/each}
	</div>
</section>

<style>
	.kanban-column {
		backdrop-filter: blur(1px);
		background-color: rgba(255, 255, 255, 0.6);
		border-radius: 5px;
		display: flex;
		flex-direction: column;
		scroll-snap-stop: always;
		scroll-snap-align: start;
	}

	.kanban-column--new {
		padding: 1rem;
		align-self: flex-start;
	}

	.kanban-column__header {
		background: transparent;
		padding: 0.4rem;
		border-bottom: 1px solid #1f3a8a0f;
	}

	.kanban-column__footer {
		display: flex;
		justify-content: flex-end;
		background-color: rgba(255, 255, 255, 0.4);
		padding: 1rem;
	}

	.kanban-column__title-input {
		background: transparent;
		border: 1px solid transparent;
		font-family: var(--base-font);
		color: var(--text-color);
		padding: 0.4rem;
		border-radius: 4px;
		display: block;
		width: 100%;
		font-weight: 800;
		font-size: 1.2rem;
	}

	.kanban-column__title-input:focus {
		border: 1px solid var(--primary-color);
	}

	.kanban-column > button:not(:only-child) {
		margin-righ: 1rem;
		margin-left: auto;
	}

	.kanban-column > button:only-child {
		align-self: flex-start;
	}
</style>
