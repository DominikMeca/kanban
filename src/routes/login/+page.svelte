<script lang="ts">
	import Button from '$lib/Button.svelte';
	import Form from '$lib/Form.svelte';
	import FormItem from '$lib/FormItem.svelte';
	import PasswordInput from '$lib/PasswordInput.svelte';
	import TextInput from '$lib/TextInput.svelte';
</script>

<div class="login">
	<div class="login__panel">
		<h2 class="login__title">Login</h2>
		<Form>
			<FormItem>
				<TextInput id="input-username" label="Username" />
			</FormItem>
			<FormItem>
				<PasswordInput id="input-password" label="Password" />
			</FormItem>
			<FormItem>
				<Button type="submit" align="end">Log In</Button>
			</FormItem>
		</Form>
	</div>
</div>

<style>
	.login {
		height: 100dvh;
		display: grid;
		place-items: center;
	}

	.login__panel {
		backdrop-filter: blur(1px);
		background-color: rgba(255, 255, 255, 0.9);
		border-radius: 5px;
		margin: 0 auto;
		padding: 2rem;
		width: 100%;
		max-width: 600px;
	}

	.login__title {
		margin: 0 0 2rem;
	}
</style>
