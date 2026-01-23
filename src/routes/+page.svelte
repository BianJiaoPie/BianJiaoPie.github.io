<script lang="ts">
	import { getAllPosts } from '$lib/markdown';

	const posts = getAllPosts('blog');
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Welcome to my blog" />
</svelte:head>

<main class="mx-auto max-w-4xl p-6">
	<h1 class="mb-8 text-3xl font-bold">Recent Posts</h1>

	<ul class="space-y-6">
		{#each posts as post}
			<li class="border-b border-gray-200 pb-4 dark:border-gray-700">
				<a href="/blog/{post.slug}" class="text-xl font-semibold hover:underline">
					{post.title}
				</a>
				{#if post.date}
					<p class="text-sm text-gray-500">{post.date}</p>
				{/if}
				{#if post.description}
					<p class="mt-2 text-gray-600 dark:text-gray-300">{post.description}</p>
				{/if}
				{#if post.tags?.length}
					<div class="mt-2 flex gap-2">
						{#each post.tags as tag}
							<span class="rounded bg-gray-200 px-2 py-0.5 text-xs dark:bg-gray-700">{tag}</span>
						{/each}
					</div>
				{/if}
			</li>
		{/each}
	</ul>

	<nav class="mt-8 flex gap-4">
		<a href="/blog" class="text-blue-600 hover:underline dark:text-blue-400">All Posts</a>
		<a href="/blog/tags" class="text-blue-600 hover:underline dark:text-blue-400">Tags</a>
		<a href="/docs" class="text-blue-600 hover:underline dark:text-blue-400">Docs</a>
	</nav>
</main>
