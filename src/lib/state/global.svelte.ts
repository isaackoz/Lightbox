type GlobalSettings = {
	// imageFit: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
	imageBase64: string | null;
	backgroundType: 'image' | 'color';
	color: string;
};
let globalSettings: GlobalSettings = {
	// imageFit: 'contain',
	imageBase64: null,
	backgroundType: 'color',
	color: '#123'
};

function updateGlobalSettings(newSettings: GlobalSettings): void {
	globalSettings = newSettings;
}

// Shallow update function to modify only specified properties. Does not deep merge! Just top level.
function shallowUpdateGlobalSettings(partialSettings: Partial<GlobalSettings>): void {
	globalSettings = { ...globalSettings, ...partialSettings };
}

export { globalSettings, type GlobalSettings, updateGlobalSettings, shallowUpdateGlobalSettings };
