<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageProps } from './$types';
	let { form, data }: PageProps = $props();
	let settings = $state(data.settings);

	$inspect(data.settings);
</script>

<main class="flex flex-col items-center justify-center space-y-4 p-1">
	<h1 class="text-4xl">Lightbox Settings</h1>

	<form
		method="POST"
		action="?/update"
		use:enhance
		class="rounded-2xl bg-base-300 p-4"
		enctype="multipart/form-data"
	>
		<!-- Color wheel -->
		<fieldset class="fieldset">
			<legend class="fieldset-legend">Background Color</legend>
			<input type="color" name="color" bind:value={settings.color} />
			<div>{settings.color}</div>
		</fieldset>
		<fieldset class="fieldset">
			<legend class="fieldset-legend">Upload Image</legend>
			<input type="file" class="file-input file-input-md" name="bgImage" />
			<p class="label">Optional</p>
		</fieldset>

		<!-- <fieldset class="fieldset">
			<legend class="fieldset-legend">Image Fit</legend>
			<select class="select" name="imageFit" bind:value={settings.imageFit}>
				<option selected value="none">None</option>
				<option value="contain">Contain</option>
				<option value="fill">Fill</option>
				<option value="cover">Cover</option>
				<option value="scale-down">Scale Down</option>
			</select>
			<span class="label">Optional</span>
		</fieldset> -->
		{#if settings.imageBase64}
			<div
				class="relative h-56 w-96 border border-red-500"
				style={`background-color: ${settings.color}`}
			>
				<img src={settings.imageBase64} alt="preview" class="h-full w-full object-contain" />
			</div>
		{/if}

		<button class="btn w-full btn-xl btn-primary" type="submit">Update</button>
		{#if form?.name === 'update'}
			<p class="text-success">{form.message}</p>
		{/if}
	</form>
</main>
