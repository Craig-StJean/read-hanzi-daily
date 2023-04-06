import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

import { sep } from '@tauri-apps/api/path';
import { readTextFile, BaseDirectory } from '@tauri-apps/api/fs';

import MyFiles from '$lib/Classes/MyFiles';
import TableOfContents from './TableOfContents';
 
export const load = (async ({ params }) => {
	const myPubInfo = await MyFiles.getPublicationsInfo();
	const myPubNames = myPubInfo.map(pubInfo => pubInfo.path.slice(pubInfo.path.lastIndexOf(sep) + 1));
	const index = myPubNames.indexOf(params.pub);
	
	if (index != -1) {
		const relativeDir = `epubs${sep}${params.pub}${sep}OEBPS${sep}`;
		let tocText = await readTextFile(`${relativeDir}toc.ncx`, { dir: BaseDirectory.AppData });
		
		const toc = new TableOfContents(tocText);
		
		return {
			title: toc.docTitle,
			chapterInfo: toc.chapterInfo,
			relativeDirectory: relativeDir,
		};
	}

	throw error(404, 'Not found');
}) satisfies PageLoad;