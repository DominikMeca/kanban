<script lang="ts">
	import Sortable from 'sortablejs';
	import KanbanColumnItem from '$lib/KanbanColumnItem.svelte';
	import type { Section, Task, taskAddSchema, taskEditSchema } from './section';
	import { invalidate } from '$app/navigation';
	import Modal from './Modal.svelte';
	import type { Validation } from 'sveltekit-superforms/index';
	import KanbanAddForm from './KanbanAddForm.svelte';
	import LinkButton from './LinkButton.svelte';

	export let formAdd: Validation<typeof taskAddSchema>;
	export let formEdit: Validation<typeof taskEditSchema>;
	export let id: string;
	export let title: string;
	export let items: Task[];
	export let sections: Section[];

	type ModalData = {
		title: string;
		open: boolean;
	};
	let modal: ModalData = {
		title: 'Add Task',
		open: false
	};

	const handleOpen = (ev: MouseEvent) => {
		ev.preventDefault();
		modal.open = true;
	};

	const handleClose = () => {
		modal.open = false;
	};

	function sortable(el: HTMLElement, name: string) {
		Sortable.create(el, {
			group: {
				name: name,
				put: true
			},
			animation: 200,
			sort: false,
			draggable: '.kanban-item',
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
			<KanbanColumnItem {sections} sectionId={id} task={item} form={formEdit} />
		{/each}
	</div>
	<footer class="kanban-column__footer" data-add-task>
		<LinkButton href="/section/{id}/tasks/new" size="small" on:click={handleOpen}>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
				<path
					fill="currentColor"
					d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"
				/>
			</svg>
			Add Task
		</LinkButton>
	</footer>
</section>

<Modal title={modal.title} open={modal.open} on:close={handleClose}>
	<KanbanAddForm sectionId={id} form={formAdd} />
</Modal>

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
