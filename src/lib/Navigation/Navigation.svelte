<script lang="ts">
	import { drawerStore } from '@skeletonlabs/skeleton';

	function drawerClose(): void {
		drawerStore.close();
	}
</script>

<nav class="list-nav p-4">
	<ul>
		<li><a href="/" on:click={drawerClose}>Homepage</a></li>
		<li><a href="/add" on:click={drawerClose}>Add</a></li>
		<li><a href="/library" on:click={drawerClose}>Library</a></li>
		<li><a href="/read" on:click={drawerClose}>Read</a></li>
	</ul>
</nav>