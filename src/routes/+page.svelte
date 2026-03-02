<script lang="ts">
	import WorkHistory from '$lib/components/WorkHistory.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>Jason Hegyessy — Software Designer</title>
	<meta
		name="description"
		content="Software designer with fifteen years of experience shaping enterprise-scale products into clear, intuitive experiences."
	/>
</svelte:head>

<main class="mx-auto max-w-[38rem] px-6 py-12 leading-relaxed max-sm:px-5 max-sm:pt-14 max-sm:pb-20">
	<header class="mb-12">
		<h1 class="m-0 mb-5 font-serif text-[2.75rem] font-normal leading-tight tracking-wide max-sm:text-[2rem]">
			Jason Hegyessy
		</h1>
		<p class="m-0 max-w-[30rem] text-xl">
			Software designer with fifteen years of experience shaping complex,
			enterprise-scale products into clear, intuitive experiences for web and mobile.
		</p>
	</header>

	<WorkHistory roles={data.roles} />
</main>
