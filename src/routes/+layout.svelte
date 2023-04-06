<script lang="ts">
	import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
	import '@skeletonlabs/skeleton/styles/all.css';
	import "../app.postcss";
	
	import { AppShell, AppBar, LightSwitch, Drawer, drawerStore, type DrawerSettings } from '@skeletonlabs/skeleton';
	import { Toast } from '@skeletonlabs/skeleton';
	
	import Navigation from '$lib/Navigation/Navigation.svelte';
	
	function drawerOpen(): void {
		drawerStore.open({});
	}
	
	function drawerClose(): void {
		drawerStore.close();
	}
</script>

<Toast />

<Drawer class='w-[70px] justify-center overflow-x-hidden'>
	<div class='flex h-max justify-center overflow-x-hidden' on:click={drawerClose}>
		<Navigation />
	</div>
</Drawer>

<AppShell slotSidebarLeft="bg-surface-500/5 w-0 lg:w-64">
	<svelte:fragment slot="header">
		<AppBar>
			<svelte:fragment slot="lead">
				<div class="flex items-center">
					<button class="lg:hidden btn btn-sm mr-4" on:click={drawerOpen}>
						<span>
							<svg viewBox="0 0 100 80" class="fill-token w-4 h-4">
								<rect width="100" height="20" />
								<rect y="30" width="100" height="20" />
								<rect y="60" width="100" height="20" />
							</svg>
						</span>
					</button>
					<span class="text-3xl uppercase">天天阅读汉字</span>
				</div>
			</svelte:fragment>
			Read Hanzi Daily
			<svelte:fragment slot="trail"><LightSwitch /></svelte:fragment>
		</AppBar>
	</svelte:fragment>
	
	<svelte:fragment slot="sidebarLeft">
		<Navigation />
	</svelte:fragment>
	
	<div class="container p-10">
		<slot />
	</div>
	
</AppShell>