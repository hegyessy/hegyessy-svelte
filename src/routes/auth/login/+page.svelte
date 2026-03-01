<script lang="ts">
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();
</script>

<div class="p-8">
	<h1>Sign in</h1>

	{#if form?.error}
		<p>{form.error}</p>
	{/if}

	<form method="POST" class="flex flex-col gap-4 mt-4">
		<label>
			Email
			<input type="email" name="email" required />
		</label>
		<label>
			Password
			<input type="password" name="password" required />
		</label>
		<button type="submit">Sign in</button>
	</form>
</div>
