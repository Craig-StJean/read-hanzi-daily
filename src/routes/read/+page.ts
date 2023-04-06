import type { PageLoad } from './$types';
import { goto } from '$app/navigation';

import { readTextFile, BaseDirectory } from '@tauri-apps/api/fs';
import { appDataDir } from '@tauri-apps/api/path';
import { sep } from '@tauri-apps/api/path';

import { readingHistory } from '$lib/data/AppSaveData';
import HtmlAdjuster from './HtmlAdjuster';

export const load = (async ({ params }) => {
	let latestRead: string;
	readingHistory.subscribe(v => {
		latestRead = v.latestRead();
	})
	if (latestRead === undefined) {
		// if there's no read history it sends you back to the library
		goto('/library');
	} else {
		const htmlText = await readTextFile(latestRead, { dir: BaseDirectory.AppData });
		const parser = new DOMParser();
		const html = parser.parseFromString(htmlText, 'text/html');
		
		const appDataDirPath = await appDataDir();
		const pathToFileFolder = appDataDirPath + latestRead.slice(0, latestRead.lastIndexOf(sep) + 1);
		let htmlAdjuster = new HtmlAdjuster(html, pathToFileFolder);
		
		console.log({pathToFileFolder, html, newHtml: htmlAdjuster.html})
		
		return {
			bodyInnerHtml: htmlAdjuster.html.body.innerHTML,
		};
	}
	
	
}) satisfies PageLoad;