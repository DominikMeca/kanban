<script lang="ts">
	import type { Validation } from 'sveltekit-superforms/index';
	import Button from './Button.svelte';
	import Form from './Form.svelte';
	import FormItem from './FormItem.svelte';
	import TextInput from './TextInput.svelte';
	import AreaInput from './AreaInput.svelte';
	import SelectInput from './SelectInput.svelte';

	import { superForm } from 'sveltekit-superforms/client';
	import { type Task, taskEditSchema, type Section } from './section';

	export let form: Validation<typeof taskEditSchema>;
	export let sectionId: string;
	export let task: Task;
	export let sections: Omit<Section, 'tasks'>[];

	let priorities = ['low', 'medium', 'high'].map((p) => ({ id: p, text: p }));
	const sectionItems = sections.map((section) => ({ id: section.id, text: section.title }));

	const {
		form: formData,
		constraints,
		errors,
		enhance
	} = superForm<typeof taskEditSchema>(form, {
		validators: taskEditSchema,
		id: 'edit-task',
		resetForm: true
	});

	$: console.log($formData.section);
</script>

<Form {enhance} method="POST" action={`/section/${sectionId}/tasks/${task.id}/edit`}>
	<input type="hidden" name="id" value={task.id} />
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
	<FormItem error={!!$errors.field}>
		<SelectInput
			id="section"
			label="Section"
			bind:value={$formData.section}
			items={sectionItems}
			error={!!$errors.section}
			{...$constraints.section}
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
