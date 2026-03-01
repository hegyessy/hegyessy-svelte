<script lang="ts">
	interface Role {
		title: string;
		company: string;
		start: number | string;
		end: number | string;
		description: string;
	}

	let { roles }: { roles: Role[] } = $props();
</script>

<section>
	<h2
		class="m-0 mb-6 text-xs font-medium uppercase tracking-widest text-stone-500"
	>
		Work
	</h2>

	<ol class="m-0 list-none p-0">
		{#each roles as role}
			<li
				class="grid grid-cols-[8.5rem_1fr] gap-2 border-t border-stone-300 py-5
					last:border-b max-sm:grid-cols-1 max-sm:gap-0.5"
			>
				<span class="pt-0.5 text-sm tabular-nums text-stone-500">
					{role.start} – {role.end}
				</span>
				<div>
					<strong class="block mb-1 text-base font-medium">
						{role.title}, {role.company}
					</strong>
					<p class="m-0 text-[0.9375rem] font-light text-stone-500">
						{role.description}
					</p>
				</div>
			</li>
		{/each}
	</ol>
</section>
