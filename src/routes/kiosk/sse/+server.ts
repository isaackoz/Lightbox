import { clients } from '$lib/state/clients';
import { globalSettings } from '$lib/state/global.svelte';
import { produce } from 'sveltekit-sse';

export function POST() {
	const sessionId = crypto.randomUUID();
	console.log('New sse', sessionId);
	return produce(
		function start({ emit }) {
			clients.set(sessionId, emit);
			// on load, send the current global settings
			emit('/kiosk', JSON.stringify(globalSettings));
		},
		{
			stop() {
				clients.delete(sessionId);
			}
		}
	);
}
