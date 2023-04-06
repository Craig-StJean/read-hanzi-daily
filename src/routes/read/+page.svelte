<script lang="ts">
	import type { PageData } from './$types';
	
	export let data;
</script>

<article class="prose prose-xl dark:prose-invert">{@html data.bodyInnerHtml}</article>