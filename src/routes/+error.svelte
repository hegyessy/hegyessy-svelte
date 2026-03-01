<script lang="ts">
	import { page } from '$app/stores';
</script>

<div class="p-8">
	<h1>{$page.status}</h1>
	<p>{$page.error?.message}</p>
	<a href="/">Home</a>
</div>
