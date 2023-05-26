<script lang="ts">
	import Button from '$lib/Button.svelte';
	import Form from '$lib/Form.svelte';
	import FormItem from '$lib/FormItem.svelte';
	import PasswordInput from '$lib/PasswordInput.svelte';
	import TextInput from '$lib/TextInput.svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import { loginSchema } from './schema';
	import type { Validation } from 'sveltekit-superforms/index';
	import { page } from '$app/stores';

	export let form: Validation<typeof loginSchema>;

	const {
		form: formData,
		constraints,
		errors,
		enhance
	} = superForm<typeof loginSchema>(form, {
		validators: loginSchema,
		id: 'login'
	});

	$: pageQuery = $page.url.searchParams.get('redirectUrl') ?? $page?.form?.redirectUrl ?? '/';
</script>

<div class="login">
	<div class="login__panel">
		<h2 class="login__title">Login</h2>
		<Form method="POST" {enhance}>
			<input type="hidden" name="redirectUrl" value={pageQuery} />
			<FormItem error={!!$errors.username}>
				<TextInput
					id="username"
					label="Username"
					bind:value={$formData.username}
					error={!!$errors.username}
					{...$constraints.username}
				/>
			</FormItem>
			<FormItem error={!!$errors.password}>
				<PasswordInput
					id="password"
					label="Password"
					bind:value={$formData.password}
					error={!!$errors.password}
					{...$constraints.password}
				/>
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
