<script lang="ts">
	let { data } = $props();
</script>

<div class="p-8">
	<h1>Dashboard</h1>
	<p>Signed in as: {data.session?.user.email}</p>

	<form method="POST" action="/auth/logout" class="mt-4">
		<button type="submit">Sign out</button>
	</form>
</div>
