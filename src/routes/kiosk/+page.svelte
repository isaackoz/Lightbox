<script lang="ts">
	import { type GlobalSettings } from '$lib/state/global.svelte';
	import { onMount } from 'svelte';
	import { source } from 'sveltekit-sse';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const connection = source('/kiosk/sse');
	const globalSettingsStore = connection.select('kiosk').json<GlobalSettings>(function or({
		error,
		raw,
		previous
	}) {
		console.error('Could not parse message as JSON:', { error, raw, previous });
		return previous;
	});

	let globalSettings = $state<GlobalSettings | null>(data.settings);

	let unsubscribe = globalSettingsStore.subscribe((val) => {
		console.log('Received global settings:', val);
		if (!val) return;
		globalSettings = val;
	});

	onMount(() => {
		return () => {
			console.log('Unsubscribng from store');
			unsubscribe();
		};
	});

	$inspect(globalSettings);
</script>

{#if !globalSettings}
	<div class="text-red-500">Could not load settings, try refreshing the page</div>
{:else}
	<div class="fixed right-0 bottom-0 z-10 text-xs">
		{#each globalSettings.serverIps as ip}
			| {ip} |
		{/each}
	</div>
	<div
		class="fixed top-0 right-0 bottom-0 left-0"
		style={`
      background-color: ${globalSettings.color};
    `}
	>
		{#if globalSettings.imageBase64}
			<img
				src={globalSettings.imageBase64}
				alt="preview"
				class="h-full w-full object-contain"
				style={`
      transform: scale(${globalSettings.scaleFactor ?? 1}) rotate(${globalSettings.rotationInterval ?? 0}deg);
      `}
			/>
		{/if}
	</div>
{/if}
