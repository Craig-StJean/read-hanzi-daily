import type { PageLoad } from './$types';

import { appDataDir, sep } from '@tauri-apps/api/path';
import { readDir, readTextFile, BaseDirectory } from '@tauri-apps/api/fs';
import type { FileEntry } from '@tauri-apps/api/fs';

import { readingHistory } from '$lib/data/AppSaveData';

import { goto } from '$app/navigation';

export const load = (async ({ params }) => {
	let latestRead: string;
	readingHistory.subscribe(v => {
		latestRead = v.latestRead();
	})
	if (latestRead === undefined) {
		// if there's no read history it sends you back to the library
		goto('/library');
	} else {
		const appDataDirPath: string = await appDataDir();
		const directory: string = appDataDirPath + latestRead + sep + 'OEBPS' + sep;
		
		const entries: FileEntry[] = await readDir(directory);
		
		const parser = new DOMParser();
		
		let articleFileNames: string[] = [];
		for (const entry of entries) {
			const fileName: string = entry.path.slice(entry.path.lastIndexOf(sep) + 1);
			if (fileName == 'content.opf') {
				const contentText = await readTextFile(directory + fileName);
				const contentXML = parser.parseFromString(contentText, 'text/xml');
				
				
				for (let chapterNumber = 1; chapterNumber < 1000; chapterNumber++) {
					const itemElement = contentXML.getElementById('chapter' + chapterNumber);
					
					if (itemElement === null) {
						break;
					}
					
					if (itemElement.getAttribute('href') === null) {
						continue;
					}
					
					const href = itemElement.getAttribute('href') as string;
					
					if (href.includes('pagenav') || href.includes('-extracted')) {
						continue;
					}
					
					articleFileNames.push(href);
				}
				break;
			}
		}
		console.log(articleFileNames);
		
		return {
			html: ''
		};
	}
	
	
}) satisfies PageLoad;