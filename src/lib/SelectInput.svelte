<script lang="ts">
	type SelectionItem = {
		id: string;
		text: string;
	};

	export let id: string;
	export let label: string | undefined = undefined;
	export let value: string | undefined = undefined;
	export let multiline: boolean = false;
	export let error: boolean = false;
	export let items: SelectionItem[] = [];
</script>

{#if label}
	<label for={id}>{label}</label>
{/if}
<select
	{id}
	name={id}
	class="input"
	class:multiline
	class:error
	bind:value
	on:input
	on:change
	on:focus
	on:focusin
	on:focusout
	on:blur
	{...$$restProps}
>
	{#each items as item}
		<option id={item.id} value={item.id}>{item.text}</option>
	{/each}
</select>

<style>
	label {
		font-weight: bold;
		display: block;
		margin-bottom: 4px;
	}

	label:after {
		content: ': ';
	}

	.input {
		width: 100%;
		border: 1px solid #1f3a8a24;
		border-radius: 4px;
		padding: 0.8rem;
		outline: 0;
		font-family: var(--base-font);
		height: 3.3rem;
		appearance: none;
		-webkit-appearance: none;
	}

	.input:focus {
		border-color: var(--primary-color);
		outline: 1px solid var(--primary-color);
	}

	.input.multiline {
		height: auto;
		resize: vertical;
		min-height: 8rem;
	}

	.input.error {
		border-color: var(--priority-high);
	}

	.input.error:focus {
		border-color: var(--priority-high);
		color: var(--priority-high);
		outline: 1px solid var(--priority-high);
	}
</style>
