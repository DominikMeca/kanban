<script lang="ts">
	import FormItem from '$lib/FormItem.svelte';
</script>

<div class="panel">
	<h2 class="panel__title">Settings</h2>
	<div class="panel__body">
		<form class="form" action="">
			<FormItem>
				<label for="input-primary-color">Primary color</label>
				<input id="input-primary-color" type="color" class="input" value="#2563eb" data-primary />
			</FormItem>
		</form>
	</div>
</div>

<style>
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
</style>
