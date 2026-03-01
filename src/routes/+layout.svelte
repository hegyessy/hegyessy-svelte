<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { createSupabaseBrowserClient } from '$lib/supabase';
	import { invalidate } from '$app/navigation';
	import { setContext, onMount } from 'svelte';

	let { data, children } = $props();

	const supabase = createSupabaseBrowserClient();
	setContext('supabase', supabase);

	onMount(() => {
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange((event, session) => {
			// Invalidate the supabase:auth dependency to re-run layout server load
			// and keep SSR session cookies in sync after client-side auth changes.
			if (session?.expires_at !== data.session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => subscription.unsubscribe();
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children()}
