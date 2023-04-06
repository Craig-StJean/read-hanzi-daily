<script lang="ts">
	import { RadioGroup, RadioItem } from '@skeletonlabs/skeleton';
	
	export let script: string = 'CHS';
</script>

<div class="flex justify-center">
	<RadioGroup active="variant-filled-primary" hover="hover:variant-soft-primary" class="mx-auto">
		<RadioItem bind:group={script} name="justify" value="CHS" class="text-4xl">
			<ruby>
				<ruby>
					简<rt>jiǎn</rt>体<rt>tǐ</rt>
				</ruby>
				<rt>simplified</rt>
			</ruby>
		</RadioItem>
		<RadioItem bind:group={script} name="justify" value="CH" class="font-light">
			<ruby>
				<ruby>
					繁<rt>fán</rt>體<rt>tǐ</rt>
				</ruby>
				<rt>traditional</rt>
			</ruby>
		</RadioItem>
	</RadioGroup>
</div>

<style>
	RadioItem, ruby {
		font-size: 1.5rem;
		line-height: 2rem;
	}
</style>