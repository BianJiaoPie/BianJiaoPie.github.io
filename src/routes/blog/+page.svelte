<script lang="ts">
	import { getAllPosts } from '$lib/markdown';

	const posts = getAllPosts('blog');
</script>

<svelte:head>
	<title>Blog</title>
	<meta name="description" content="Blog posts" />
</svelte:head>

<main class="mx-auto max-w-4xl p-6">
	<h1 class="mb-8 text-3xl font-bold">Blog</h1>

	<ul class="space-y-6">
		{#each posts as post}
			<li class="border-b pb-4">
				<a href="/blog/{post.slug}" class="text-xl font-semibold hover:underline">
					{post.title}
				</a>
				{#if post.date}
					<p class="text-sm text-gray-500">{post.date}</p>
				{/if}
				{#if post.description}
					<p class="mt-2 text-gray-600 dark:text-gray-300">{post.description}</p>
				{/if}
			</li>
		{/each}
	</ul>
</main>
