<script lang="ts">
	import { getAllPosts } from '$lib/markdown';

	const docs = getAllPosts('docs');
</script>

<svelte:head>
	<title>Documentation</title>
	<meta name="description" content="Documentation" />
</svelte:head>

<main class="mx-auto max-w-4xl p-6">
	<h1 class="mb-8 text-3xl font-bold">Documentation</h1>

	<ul class="space-y-4">
		{#each docs as doc}
			<li>
				<a href="/docs/{doc.slug}" class="text-xl font-semibold hover:underline">
					{doc.title}
				</a>
				{#if doc.description}
					<p class="mt-1 text-gray-600 dark:text-gray-300">{doc.description}</p>
				{/if}
			</li>
		{/each}
	</ul>
</main>
