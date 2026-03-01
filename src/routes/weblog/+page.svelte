<script lang="ts">
	let { data } = $props();
</script>

<svelte:head>
	<title>Weblog</title>
</svelte:head>

<main class="mx-auto max-w-2xl px-4 py-12">
	<h1 class="mb-8 text-3xl font-bold">Weblog</h1>

	<ul class="space-y-8">
		{#each data.entries as entry}
			<li>
				<time class="text-sm text-gray-500" datetime={entry.date}>{entry.date}</time>

				{#if entry.type === 'article'}
					<h2 class="text-xl font-semibold">
						<a href="/weblog/article/{entry.slug}" class="hover:underline">{entry.title}</a>
					</h2>
					{#if entry.description}
						<p class="mt-1 text-gray-600">{entry.description}</p>
					{/if}
				{:else}
					<h2 class="text-xl font-semibold">
						<a href={entry.url} target="_blank" rel="noopener noreferrer" class="hover:underline">
							{entry.title}
							<span class="text-sm text-gray-400">&nearr;</span>
						</a>
					</h2>
					<div class="prose mt-2 text-sm">{@html entry.commentaryHtml}</div>
				{/if}

				{#if entry.tags?.length}
					<div class="mt-2 flex gap-2">
						{#each entry.tags as tag}
							<span class="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-600">{tag}</span>
						{/each}
					</div>
				{/if}
			</li>
		{/each}
	</ul>
</main>
