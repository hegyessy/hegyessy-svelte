<script lang="ts">
	let { data } = $props();
</script>

<svelte:head>
	<title>{data.article.title}</title>
</svelte:head>

<main class="mx-auto max-w-2xl px-4 py-12">
	<a href="/weblog" class="text-sm text-gray-500 hover:underline">&larr; Back to weblog</a>

	<article class="mt-6">
		<time class="text-sm text-gray-500" datetime={data.article.date}>{data.article.date}</time>
		<h1 class="mt-1 text-3xl font-bold">{data.article.title}</h1>

		{#if data.article.tags?.length}
			<div class="mt-3 flex gap-2">
				{#each data.article.tags as tag}
					<span class="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-600">{tag}</span>
				{/each}
			</div>
		{/if}

		<div class="prose mt-8">
			{@html data.article.html}
		</div>
	</article>
</main>
