import { marked } from 'marked';

export interface PostMeta {
	slug: string;
	title: string;
	date: string;
	description?: string;
	tags?: string[];
}

export interface Post extends PostMeta {
	content: string;
}

// Simple frontmatter parser (no Node.js dependencies)
function parseFrontmatter(raw: string): { data: Record<string, unknown>; content: string } {
	const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
	if (!match) return { data: {}, content: raw };

	const yaml = match[1];
	const content = match[2];
	const data: Record<string, unknown> = {};

	let currentKey = '';
	let inArray = false;
	const arrayValues: string[] = [];

	for (const line of yaml.split('\n')) {
		const trimmed = line.trim();
		if (!trimmed) continue;

		if (inArray) {
			if (trimmed.startsWith('- ')) {
				arrayValues.push(trimmed.slice(2).trim());
			} else {
				data[currentKey] = arrayValues.slice();
				inArray = false;
				arrayValues.length = 0;
			}
		}

		if (!inArray) {
			const colonIdx = trimmed.indexOf(':');
			if (colonIdx > 0) {
				currentKey = trimmed.slice(0, colonIdx).trim();
				const value = trimmed.slice(colonIdx + 1).trim();
				if (value === '') {
					inArray = true;
				} else {
					data[currentKey] = value;
				}
			}
		}
	}

	if (inArray && arrayValues.length > 0) {
		data[currentKey] = arrayValues;
	}

	return { data, content };
}

function parseMarkdown(raw: string, slug: string): Post {
	const { data, content } = parseFrontmatter(raw);
	return {
		slug,
		title: (data.title as string) || slug,
		date: (data.date as string) || '',
		description: data.description as string | undefined,
		tags: data.tags as string[] | undefined,
		content: marked(content) as string
	};
}

// Import all markdown files at build time via Vite
const blogFiles = import.meta.glob('/src/content/blog/*.md', { eager: true, query: '?raw', import: 'default' }) as Record<string, string>;
const docsFiles = import.meta.glob('/src/content/docs/*.md', { eager: true, query: '?raw', import: 'default' }) as Record<string, string>;

function getPostsFromGlob(files: Record<string, string>): Post[] {
	return Object.entries(files).map(([path, raw]) => {
		const slug = path.split('/').pop()!.replace(/\.md$/, '');
		return parseMarkdown(raw, slug);
	});
}

export function getAllPosts(category: 'blog' | 'docs'): PostMeta[] {
	const files = category === 'blog' ? blogFiles : docsFiles;
	return getPostsFromGlob(files)
		.map(({ content, ...meta }) => meta)
		.sort((a, b) => (a.date > b.date ? -1 : 1));
}

export function getPostBySlug(category: 'blog' | 'docs', slug: string): Post | null {
	const files = category === 'blog' ? blogFiles : docsFiles;
	const posts = getPostsFromGlob(files);
	return posts.find((p) => p.slug === slug) || null;
}

export function getPostSlugs(category: 'blog' | 'docs'): string[] {
	const files = category === 'blog' ? blogFiles : docsFiles;
	return Object.keys(files).map((path) => path.split('/').pop()!.replace(/\.md$/, ''));
}
