<script lang="ts">
	import { page } from '$app/stores';
	import { getPostBySlug } from '$lib/markdown';

	const post = $derived(getPostBySlug('blog', $page.params.slug));
</script>

<svelte:head>
	{#if post}
		<title>{post.title}</title>
		{#if post.description}
			<meta name="description" content={post.description} />
		{/if}
	{/if}
</svelte:head>

{#if post}
	<article class="prose prose-lg dark:prose-invert mx-auto max-w-4xl p-6">
		<header class="mb-8">
			<h1 class="mb-2">{post.title}</h1>
			{#if post.date}
				<time class="text-gray-500">{post.date}</time>
			{/if}
			{#if post.tags?.length}
				<div class="mt-2 flex gap-2">
					{#each post.tags as tag}
						<span class="rounded bg-gray-200 px-2 py-1 text-sm dark:bg-gray-700">{tag}</span>
					{/each}
				</div>
			{/if}
		</header>

		<div class="content">
			{@html post.content}
		</div>
	</article>
{:else}
	<p class="p-6">Post not found</p>
{/if}
