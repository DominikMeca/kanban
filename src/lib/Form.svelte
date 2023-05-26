<script lang="ts">
	export let enhance: Function;
	export let action: string | undefined = undefined;
	export let method: 'POST' | 'GET' = 'POST';
</script>

<form class="form" {action} {method} use:enhance>
	<slot />
</form>

<style>
	.form {
		display: grid;
		gap: 1.4rem;
	}
</style>
