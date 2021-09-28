import { getContext, onMount } from 'svelte';
import { writable, derived } from 'svelte/store';

export const width = writable(1000);
export const height = writable(800);
export const pixelRatio = writable(window.devicePixelRatio);
export const context = writable();
export const canvas = writable();
export const time = writable(0);

export const props = deriveObject({
	context,
	canvas,
	width,
	height,
	pixelRatio,
	time
});

export const key = Symbol();
export const getState = () => {
	const api = getContext(key);
	return api.getState();
};

export const renderable = (render) => {
	const api = getContext(key);
	const element = {
		ready: false,
		mounted: false,
	};
	element.render = render;
	api.add(element);
	onMount(() => {
		element.mounted = true;
		return () => {
			api.remove(element);
			element.mounted = false;
		};
	});
}

function deriveObject (obj) {
	const keys = Object.keys(obj);
	const list = keys.map(key => {
		return obj[key];
	});
	return derived(list, (array) => {
		return array.reduce((dict, value, i) => {
			dict[keys[i]] = value;
			return dict;
		}, {});
	});
}