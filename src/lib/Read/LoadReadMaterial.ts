import { get } from 'svelte/store';

import { readTextFile, BaseDirectory } from '@tauri-apps/api/fs';
import { appDataDir } from '@tauri-apps/api/path';
import { sep } from '@tauri-apps/api/path';

import { readingHistory } from '$lib/data/AppSaveData';
import HtmlAdjuster from '$lib/Read/HtmlAdjuster';


export async function readHtmlText(): Promise<string> {
	const history = get(readingHistory);
	let latestRead: string = history.latestRead();
	if (latestRead == '') {
		// if there's no read history it should send you back to the library
		return '';
	} else {
		const htmlText = await readTextFile(latestRead, { dir: BaseDirectory.AppData });
		
		const appDataDirPath = await appDataDir();
		const pathToFileFolder = appDataDirPath + latestRead.slice(0, latestRead.lastIndexOf(sep) + 1);
		let htmlAdjuster = new HtmlAdjuster(htmlText, pathToFileFolder);
		
		return htmlAdjuster.bodyInnerHtml;
	}
}
