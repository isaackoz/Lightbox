import { networkInterfaces } from 'node:os';

type GlobalSettings = {
	// imageFit: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
	imageBase64: string | null;
	backgroundType: 'image' | 'color';
	color: string;
	serverIps: string[];
	scaleFactor?: number;
	rotationInterval?: number;
};

function getServerIp(): string[] {
	const nets = networkInterfaces();
	const results: string[] = [];
	for (const name of Object.keys(nets)) {
		for (const net of nets[name]!) {
			// Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
			// 'IPv4' is in Node <= 17, from 18 it's a number 4 or 6
			const familyV4Value = typeof net.family === 'string' ? 'IPv4' : 4;
			if (net.family === familyV4Value && !net.internal) {
				results.push(net.address);
			}
		}
	}
	return results;
}

let globalSettings: GlobalSettings = {
	// imageFit: 'contain',
	imageBase64: null,
	backgroundType: 'color',
	color: '#123',
	serverIps: getServerIp(),
	rotationInterval: 0,
	scaleFactor: 1
};

function updateGlobalSettings(newSettings: GlobalSettings): void {
	globalSettings = newSettings;
}

// Shallow update function to modify only specified properties. Does not deep merge! Just top level.
function shallowUpdateGlobalSettings(partialSettings: Partial<GlobalSettings>): void {
	globalSettings = { ...globalSettings, ...partialSettings };
}

export { globalSettings, type GlobalSettings, updateGlobalSettings, shallowUpdateGlobalSettings };
