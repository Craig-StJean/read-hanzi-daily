<script lang="ts">
	import Nothing from '$lib/CreateFoldersAndFiles';
	
	import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
	import '@skeletonlabs/skeleton/styles/all.css';
	import "../app.postcss";
	
	import { AppShell, AppBar, LightSwitch, Drawer, drawerStore, type DrawerSettings } from '@skeletonlabs/skeleton';
	import { Toast, toastStore } from '@skeletonlabs/skeleton';
	import type { ToastSettings } from '@skeletonlabs/skeleton';
	import { Modal, modalStore } from '@skeletonlabs/skeleton';
	import type { ModalSettings, ModalComponent } from '@skeletonlabs/skeleton';
	import WordModal from '$lib/Read/WordModal.svelte';
	
	import Navigation from '$lib/Navigation/Navigation.svelte';
	import { save, readingHistory, knownWords, knownCharacters, userDictionary } from '$lib/data/AppSaveData';
	import { publicationsInfo, myDictionary, readHtml, updateReadHtml } from '$lib/data/Preload';
	
	console.log('layout')
	// save data on change
	$: save($readingHistory, 'readingHistory');
	$: save($knownWords, 'knownWords');
	$: save($knownCharacters, 'knownCharacters');
	$: save($userDictionary, 'userDictionary');
	
	// persist preloaded data
	const unsubscribe1 = publicationsInfo.subscribe(value => {});
	const unsubscribe2 = myDictionary.subscribe(value => {});
	const unsubscribe3 = readHtml.subscribe(value => {});
	
	// update $readHtml when $readingHistory changes
	$: $readingHistory, updateReadHtml();
	
	// show toasts when you learn new things 😄
	let wordCount = 0;
	$: {
		const newWordCount = $knownWords.getAllWords().length;
		if (newWordCount > wordCount) {
			const t: ToastSettings = {
				message: `You know ${$knownWords.getAllWords().length} words 🥳🎉`,
				timeout: 3000,
				background: 'variant-filled-secondary',
			};
			toastStore.trigger(t);
		}
		wordCount = newWordCount;
	}
	let characterCount = 0;
	$: {
		const newCharacterCount = $knownCharacters.getAllCharacters().length;
		if (newCharacterCount > characterCount) {
			const t: ToastSettings = {
				message: `You know ${$knownCharacters.getAllCharacters().length} characters 🥳🎉`,
				timeout: 3000,
				background: 'variant-filled-tertiary',
			};
			toastStore.trigger(t);
		}
		characterCount = newCharacterCount;
	}
	
	// word modal stuff
	const modalComponentRegistry: Record<string, ModalComponent> = {
		wordComponent: {
			ref: WordModal,
			props: {},
			slot: '',
		}
	};
	
	function drawerOpen(): void {
		drawerStore.open({});
	}
	
	function drawerClose(): void {
		drawerStore.close();
	}
</script>

<Toast />
<Modal components={modalComponentRegistry} />

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