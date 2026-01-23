import type { PostMeta } from './markdown';

export interface TagGroup {
	tag: string;
	posts: PostMeta[];
	count: number;
}

export function groupByTags(posts: PostMeta[]): TagGroup[] {
	const tagMap = new Map<string, PostMeta[]>();

	for (const post of posts) {
		const tags = post.tags || [];
		for (const tag of tags) {
			if (!tagMap.has(tag)) {
				tagMap.set(tag, []);
			}
			tagMap.get(tag)!.push(post);
		}
	}

	return Array.from(tagMap.entries())
		.map(([tag, posts]) => ({
			tag,
			posts: posts.sort((a, b) => (a.date > b.date ? -1 : 1)),
			count: posts.length
		}))
		.sort((a, b) => a.tag.localeCompare(b.tag));
}

export function getAllTags(posts: PostMeta[]): string[] {
	const tags = new Set<string>();
	for (const post of posts) {
		for (const tag of post.tags || []) {
			tags.add(tag);
		}
	}
	return Array.from(tags).sort();
}
