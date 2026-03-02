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
		class="m-0 text-xs font-medium uppercase tracking-widest"
	>
		Work
	</h2>

	<ol class="m-0 list-none p-0">
		{#each roles as role}
			<li
				class="grid grid-cols-[8.5rem_1fr] gap-2 py-3
					max-sm:grid-cols-1 max-sm:gap-0.5"
			>
				<span class="pt-0.5 text-sm tabular-nums dark:text-bg/80">
					{role.start} – {role.end}
				</span>
				<div>
					<strong class="block mb-1 text-base font-bold">
						{role.title}, {role.company}
					</strong>
					<p class="m-0 text-[0.9375rem] text-fg dark:text-bg/80">
						{role.description}
					</p>
				</div>
			</li>
		{/each}
	</ol>
</section>
