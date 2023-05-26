<script lang="ts">
	import { theme } from '$lib/store';

    const processFile = (event: ) => {

    }
</script>

<label for="input-background-image">Background Image</label>
<input
	accept="image/png, image/jpeg"
	id="input-background-image"
	class="input"
	type="file"
	on:change={processFile}
/>

<style>
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

	label {
		font-weight: bold;
		display: block;
		margin-bottom: 4px;
	}

	label:after {
		content: ': ';
	}
</style>
