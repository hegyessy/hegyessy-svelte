import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import yaml from 'js-yaml';

declare const __CONTENT_DIR__: string;

export async function load() {
	const raw = await readFile(join(__CONTENT_DIR__, 'work-history.yaml'), 'utf-8');
	const roles = yaml.load(raw) as Array<{
		title: string;
		company: string;
		start: number | string;
		end: number | string;
		description: string;
	}>;

	return { roles };
}
