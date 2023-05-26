<script lang="ts">
	export let type: 'button' | 'submit' = 'button';
	export let size: 'small' | 'normal' = 'normal';
	export let align: 'start' | 'end' | undefined = undefined;
</script>

<button
	{type}
	class="button"
	class:submit={type === 'submit'}
	class:small={size === 'small'}
	class:end={align === 'end'}
	class:start={align === 'start'}
	on:click
>
	<slot />
</button>

<style>
	.button {
		background: var(--primary-color);
		color: white;
		border: none;
		display: inline-flex;
		align-items: center;
		gap: 1em;
		font-family: var(--base-font);
		text-transform: uppercase;
		padding: 0.8rem 1rem;
		border-radius: 5px;
		font-weight: 600;
		cursor: pointer;
	}

	.button svg {
		height: 1.1em;
		width: auto;
	}

	.button.small {
		font-size: 0.8rem;
		padding: 0.4rem 0.8rem;
	}

	.button.end {
		align-self: flex-end;
	}

	.button.start {
		align-self: flex-start;
	}
</style>
