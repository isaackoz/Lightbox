export const clients: Map<
	string,
	(eventName: string, data: string) => import('sveltekit-sse').Unsafe<void, Error>
> = new Map();

export function emitToAllClients(data: string) {
	clients.forEach((emit, sid) => {
		emit('kiosk', data);
	});
}
