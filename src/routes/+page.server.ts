import { clients, emitToAllClients } from '$lib/state/clients';
import {
	globalSettings,
	updateGlobalSettings,
	type GlobalSettings
} from '$lib/state/global.svelte';
import type { Actions } from './$types';
import { Buffer } from 'node:buffer';

export const load = async () => {
	return {
		settings: globalSettings
	};
};

type ActionResult = {
	name: 'update';
	type: 'success' | 'error';
	message?: string;
};

export const actions = {
	update: async ({ request }): Promise<ActionResult> => {
		const formData = await request.formData();
		const bgColor = formData.get('color');
		// const imageFit = formData.get('imageFit');

		const newSettings: GlobalSettings = {
			...globalSettings,
			color: bgColor?.toString() ?? '#fff'
			// imageFit: (imageFit?.toString() as 'none') ?? 'none'
		};

		const imageData = formData.get('bgImage');
		if (imageData) {
			if (!(imageData instanceof File)) {
				return {
					name: 'update',
					type: 'error',
					message: 'Invalid image data'
				};
			}

			if (!imageData.type.startsWith('image/')) {
				return {
					name: 'update',
					type: 'error',
					message: 'Uploaded file is not an image'
				};
			}

			const MAX_SIZE = 10 * 1024 * 1024; //10mb
			if (imageData.size > MAX_SIZE) {
				return {
					name: 'update',
					type: 'error',
					message: 'Image size exceeds 10MB limit'
				};
			}

			const arrayBuffer = await imageData.arrayBuffer();
			const bytes = new Uint8Array(arrayBuffer);
			const base64 = Buffer.from(bytes).toString('base64');
			const dataUrl = `data:${imageData.type};base64,${base64}`;

			newSettings.imageBase64 = dataUrl;
		}
		// TODO: validate the input? for now we just assert and hope for the best

		console.log('New settings...', newSettings);
		updateGlobalSettings(newSettings);
		emitToAllClients(JSON.stringify(newSettings));
		return {
			name: 'update',
			type: 'success',
			message: 'Success'
		};
	}
} satisfies Actions;
