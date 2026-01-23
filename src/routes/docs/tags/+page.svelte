<script lang="ts">
	import { getAllPosts } from '$lib/markdown';
	import { groupByTags } from '$lib/tags';

	const tagGroups = groupByTags(getAllPosts('docs'));

	let expanded = $state<Record<string, boolean>>({});

	function toggle(tag: string) {
		expanded[tag] = !expanded[tag];
	}
</script>

<svelte:head>
	<title>Docs Tags</title>
	<meta name="description" content="Browse documentation by tags" />
</svelte:head>

<main class="mx-auto max-w-4xl p-6">
	<h1 class="mb-8 text-3xl font-bold">Docs Tags</h1>

	<div id="archives">
		{#each tagGroups as group}
			<div class="archive-group mb-4">
				<h2 class="tag-head flex items-center text-base">
					<button
						class="toggle mr-2 border border-current px-1.5 cursor-pointer"
						onclick={() => toggle(group.tag)}
					>
						{expanded[group.tag] ? '−' : '+'}
					</button>
					{group.tag}
					<span class="post-count ml-2 font-normal text-gray-500">({group.count})</span>
				</h2>

				{#if expanded[group.tag]}
					<div class="posts-list ml-5 mt-2">
						{#each group.posts as post, i}
							<article class="archive-item">
								<span class="text-gray-400">{i === group.posts.length - 1 ? '└' : '├'}</span>
								<a href="/docs/{post.slug}" class="ml-1 hover:underline">{post.title}</a>
							</article>
						{/each}
					</div>
				{/if}
			</div>
		{/each}
	</div>
</main>
