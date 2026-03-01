export interface BaseEntry {
	title: string;
	date: string;
	slug: string;
	description?: string;
	tags?: string[];
	folder: string;
	status: 'published' | 'draft' | 'dev';
}

export interface ArticleEntry extends BaseEntry {
	type: 'article';
	html: string;
}

export interface LinkEntry extends BaseEntry {
	type: 'link';
	url: string;
	commentaryHtml: string;
}

export type WeblogEntry = ArticleEntry | LinkEntry;
