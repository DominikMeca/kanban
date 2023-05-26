<script lang="ts">
	export let error: boolean = false;
</script>

<div class="item" class:error>
	<slot />
</div>

<style>
	.error {
		color: var(--priority-high);
	}

	.item {
		display: flex;
		flex-direction: column;
	}
</style>
