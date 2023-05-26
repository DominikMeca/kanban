<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let open: boolean = false;
	export let title: string | undefined = undefined;

	let closing = false;

	let dispatcher = createEventDispatcher<{ close: void }>();

	let dialog: HTMLDialogElement;
	const toggleOpen = (newOpen: boolean) => {
		if (!dialog) return;
		if (newOpen === dialog.hasAttribute('open')) return;

		if (newOpen) {
			dialog.showModal();
		} else {
			handleClose();
		}
	};

	const handleClose = () => {
		closing = true;
	};

	const handleAnimationEnd = () => {
		if (!closing) return;
		closing = false;
		dialog.close();
		dispatcher('close');
	};

	$: dialog && toggleOpen(open);
</script>

<dialog
	bind:this={dialog}
	class="modal"
	class:open
	class:closing
	on:animationend={handleAnimationEnd}
>
	<slot name="title">
		{#if title}
			<h2 class="title">{title}</h2>
		{/if}
	</slot>
	<button class="close-button" on:click={handleClose}>
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
			<path
				fill="currentColor"
				d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
			/>
		</svg>
	</button>

	{#if open || closing}
		<slot />
	{/if}
</dialog>

<style>
	.modal {
		background: #fff;
		padding: 1.5rem;
		border-radius: 5px;
		width: 100%;
		max-width: 500px;
		max-height: 100%;
	}

	.modal::backdrop {
		background: rgba(0, 0, 0, 0.8);
		backdrop-filter: blur(8px);
	}

	.title {
		margin: 0 0 1.6rem;
	}

	.close-button {
		background: transparent;
		border: none;
		color: var(--text-color);
		padding: 1rem;
		cursor: pointer;
		position: absolute;
		top: 0;
		right: 0;
	}

	.close-button svg {
		height: 1.3rem;
		width: auto;
	}

	.modal.open {
		animation: opening 0.3s ease-in-out forwards;
	}

	.modal.closing {
		animation: closing 0.3s ease-in-out forwards;
	}

	@keyframes opening {
		from {
			transform: scale(0.3);
			opacity: 0;
		}
		to {
			transform: scale(1);
			opacity: 1;
		}
	}

	@keyframes closing {
		from {
			transform: scale(1);
			opacity: 1;
		}
		to {
			transform: scale(0.3);
			opacity: 0;
		}
	}
</style>
