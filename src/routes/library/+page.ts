import type { PageLoad } from './$types';

import MyFiles from '$lib/Classes/MyFiles';
 
export const load = (async ({ params }) => {
	let pubInfo = await MyFiles.getPublicationsInfo();
	
	return {
		myPublicationsInfo: pubInfo 
	};
}) satisfies PageLoad;