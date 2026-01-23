<script lang="ts">
	import { page } from '$app/stores';
	import { getPostBySlug } from '$lib/markdown';

	const doc = $derived(getPostBySlug('docs', $page.params.slug));
</script>

<svelte:head>
	{#if doc}
		<title>{doc.title}</title>
		{#if doc.description}
			<meta name="description" content={doc.description} />
		{/if}
	{/if}
</svelte:head>

{#if doc}
	<article class="prose prose-lg dark:prose-invert mx-auto max-w-4xl p-6">
		<header class="mb-8">
			<h1>{doc.title}</h1>
		</header>

		<div class="content">
			{@html doc.content}
		</div>
	</article>
{:else}
	<p class="p-6">Document not found</p>
{/if}
