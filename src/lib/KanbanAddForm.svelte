<script lang="ts">
	import type { Validation } from 'sveltekit-superforms/index';
	import Button from './Button.svelte';
	import Form from './Form.svelte';
	import FormItem from './FormItem.svelte';
	import TextInput from './TextInput.svelte';
	import AreaInput from './AreaInput.svelte';
	import SelectInput from './SelectInput.svelte';

	import { superForm } from 'sveltekit-superforms/client';
	import { taskAddSchema } from './section';

	export let form: Validation<typeof taskAddSchema>;
	export let sectionId: string;

	let priorities = ['low', 'medium', 'high'].map((p) => ({ id: p, text: p }));

	const {
		form: formData,
		constraints,
		errors,
		enhance
	} = superForm<typeof taskAddSchema>(form, {
		validators: taskAddSchema,
		id: 'add-task',
		resetForm: true
	});
</script>

<Form {enhance} method="POST" action="/section/{sectionId}/tasks/new">
	<FormItem error={!!$errors.title}>
		<TextInput
			id="title"
			label="Title"
			bind:value={$formData.title}
			error={!!$errors.title}
			{...$constraints.title}
		/>
	</FormItem>
	<FormItem error={!!$errors.field}>
		<SelectInput
			id="field"
			label="Priority"
			bind:value={$formData.field}
			items={priorities}
			error={!!$errors.field}
			{...$constraints.field}
		/>
	</FormItem>
	<FormItem error={!!$errors.description}>
		<AreaInput
			id="description"
			label="Description"
			bind:value={$formData.description}
			error={!!$errors.description}
			{...$constraints.description}
		/>
	</FormItem>
	<FormItem>
		<Button type="submit" align="end">Submit</Button>
	</FormItem>
</Form>
