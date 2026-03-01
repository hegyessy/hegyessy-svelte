import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import yaml from 'js-yaml';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import { dev } from '$app/environment';
import type { ArticleEntry, LinkEntry, WeblogEntry } from './types.js';

declare const __CONTENT_DIR__: string;

const WEBLOG_DIR = join(__CONTENT_DIR__, 'weblog');

const markdownProcessor = unified()
	.use(remarkParse)
	.use(remarkRehype)
	.use(rehypeStringify);

async function renderMarkdown(source: string): Promise<string> {
	const result = await markdownProcessor.process(source);
	return String(result);
}

interface RawData {
	title: string;
	date: string;
	type: 'article' | 'link';
	slug: string;
	description?: string;
	tags?: string[];
	url?: string;
	status?: 'published' | 'draft' | 'dev';
}

async function loadEntry(folderName: string): Promise<WeblogEntry> {
	const folderPath = join(WEBLOG_DIR, folderName);

	const dataRaw = await readFile(join(folderPath, 'data.yaml'), 'utf-8');
	const data = yaml.load(dataRaw) as RawData;

	const markdown = await readFile(join(folderPath, 'entry.md'), 'utf-8');
	const html = await renderMarkdown(markdown);

	const base = {
		title: data.title,
		date: data.date,
		slug: data.slug,
		description: data.description,
		tags: data.tags,
		folder: folderName,
		status: data.status ?? 'published'
	};

	if (data.type === 'link') {
		return {
			...base,
			type: 'link',
			url: data.url!,
			commentaryHtml: html
		} satisfies LinkEntry;
	}

	return {
		...base,
		type: 'article',
		html
	} satisfies ArticleEntry;
}

export async function getAllEntries(): Promise<WeblogEntry[]> {
	const items = await readdir(WEBLOG_DIR, { withFileTypes: true });
	const folders = items
		.filter((d) => d.isDirectory())
		.map((d) => d.name)
		.sort()
		.reverse();

	const entries = await Promise.all(folders.map(loadEntry));
	return entries.filter((e) => e.status === 'published' || (e.status === 'dev' && dev));
}

export async function getArticleBySlug(slug: string): Promise<ArticleEntry | null> {
	const entries = await getAllEntries();
	const entry = entries.find((e) => e.type === 'article' && e.slug === slug);
	return (entry as ArticleEntry) ?? null;
}

export function getContentFilePath(filePath: string): string | null {
	const resolved = join(WEBLOG_DIR, filePath);
	if (!resolved.startsWith(WEBLOG_DIR)) {
		return null;
	}
	return resolved;
}
