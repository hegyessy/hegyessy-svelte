import { getAllEntries } from '$lib/blog/loader.server.js';

export async function load() {
	const entries = await getAllEntries();
	return { entries };
}
