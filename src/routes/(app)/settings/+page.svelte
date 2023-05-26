<script lang="ts">
	import ColorInput from '$lib/ColorInput.svelte';
	import FormItem from '$lib/FormItem.svelte';
	import FileInput from '$lib/FileInput.svelte';
</script>

<div class="content content--narrow">
	<div class="panel">
		<h2 class="panel__title">Settings</h2>
		<div class="panel__body">
			<div class="form">
				<FormItem>
					<ColorInput label={'Primary Color'} storageKey={'primary'} />
				</FormItem>
				<FormItem>
					<ColorInput label={'Secondary Color'} storageKey={'secondary'} />
				</FormItem>
				<FormItem>
					<ColorInput label={'Ternary Color'} storageKey={'ternary'} />
				</FormItem>
				<FormItem>
					<ColorInput label={'Text Color'} storageKey={'text'} />
				</FormItem>
				<FormItem>
					<FileInput />
				</FormItem>
			</div>
		</div>
	</div>
</div>

<style>
	.content {
		padding: 1.5rem;
		margin-inline: auto;
		width: 100%;
		overflow: auto;
	}

	.content--narrow {
		max-width: 980px;
	}

	.panel {
		backdrop-filter: blur(1px);
		background-color: rgba(255, 255, 255, 0.6);
		border-radius: 5px;
		display: flex;
		flex-direction: column;
	}

	.panel__title {
		margin: 0;
		padding: 1rem;
		border-bottom: 1px solid #1f3a8a0f;
	}

	.panel__body {
		padding: 1rem;
	}
	.form {
		display: grid;
		gap: 1.4rem;
	}
</style>
