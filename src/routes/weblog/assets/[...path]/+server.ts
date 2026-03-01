import { readFile } from 'node:fs/promises';
import { error } from '@sveltejs/kit';
import { getContentFilePath } from '$lib/blog/loader.server.js';
import { lookup } from 'mrmime';

export async function GET({ params }) {
	const resolved = getContentFilePath(params.path);
	if (!resolved) {
		error(403, 'Forbidden');
	}

	let data: Buffer;
	try {
		data = await readFile(resolved);
	} catch {
		error(404, 'Not found');
	}

	const contentType = lookup(resolved) ?? 'application/octet-stream';
	return new Response(new Uint8Array(data), {
		headers: { 'Content-Type': contentType }
	});
}
