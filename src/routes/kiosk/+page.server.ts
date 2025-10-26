import { produce } from 'sveltekit-sse';
import { clients } from '$lib/state/clients';
import { globalSettings } from '$lib/state/global.svelte';

export const load = async () => {
	return {
		settings: globalSettings
	};
};
