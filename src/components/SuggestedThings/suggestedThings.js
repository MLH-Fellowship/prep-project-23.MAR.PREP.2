import * as icons from '../../assets/images/SuggestedThings/icons.js';

/* The suggestedThings variable holds the Map/Dictionary of key value pairs
where key is weather type and values are the suggested items */
const suggestedThings = {
	Thunderstorm: {
		'Rain Coat': icons.raincoat,
		'Flash Light': icons.flashlight,
		'Waterproof Boots': icons.waterproofBoots,
	},
	Drizzle: {
		'Rain Coat': icons.raincoat,
		'Waterproof Boots': icons.waterproofBoots,
		Umbrella: icons.umbrella,
	},
	Rain: {
		'Rain Coat': icons.raincoat,
		'Waterproof Boots': icons.waterproofBoots,
		Umbrella: icons.umbrella,
	},
	Snow: {
		Googles: icons.googles,
		Gloves: icons.gloves,
		Jacket: icons.jacket,
	},
	Mist: {
		Watch: icons.watch,
		Googles: icons.googles,
		Mask: icons.mask,
	},
	Smoke: {
		Watch: icons.watch,
		Googles: icons.googles,
		Mask: icons.mask,
	},
	Haze: {
		Watch: icons.watch,
		Googles: icons.googles,
		Mask: icons.mask,
	},
	Dust: {
		'Face Wipes': icons.wipes,
		Googles: icons.googles,
		Mask: icons.mask,
	},
	Fog: {
		Watch: icons.watch,
		Googles: icons.googles,
		Mask: icons.mask,
	},
	Sand: {
		Mask: icons.mask,
		Googles: icons.googles,
		'Sand Scarf': icons.sandScarf,
	},
	Ash: {
		'Face Wipes': icons.wipes,
		Googles: icons.googles,
		Mask: icons.mask,
	},
	Squall: {
		Watch: icons.watch,
		Googles: icons.googles,
		Mask: icons.mask,
	},
	Tornado: {
		Sanitation: icons.sanitation,
		'Flash Light': icons.flashlight,
		Googles: icons.googles,
	},
	Clear: {
		'Sun Glasses': icons.sunglasses,
		'Baseball Cap': icons.cap,
		'Sun Screen': icons.sunscreen,
	},
	Clouds: {
		'Baseball Cap': icons.cap,
		Watch: icons.watch,
		'Mosquito Repellent': icons.mosquitoRepellent,
	},

	Sunny: {
		'Sun Glasses': icons.sunglasses,
		'Baseball Cap': icons.cap,
		'Sun Screen': icons.sunscreen,
	},
};

export default suggestedThings;