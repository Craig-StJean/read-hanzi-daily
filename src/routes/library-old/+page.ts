import type { PageLoad } from './$types';

import { appDataDir, sep } from '@tauri-apps/api/path';
import { readDir, BaseDirectory } from '@tauri-apps/api/fs';
import type { FileEntry } from '@tauri-apps/api/fs';

import { MONTH_NAMES, PUBLICATION_CODES } from '$lib/data/Constants';
import type { PublicationCode } from '$lib/data/Constants';

type PubData = {
	publication: string;
	script: string;
	year: string;
	month: string;
	path: string;
}

export const load = (async ({ params }) => {
	
	const appDataDirPath = await appDataDir();
	
	const entries: FileEntry[] = await readDir('epubs', { dir: BaseDirectory.AppData, recursive: true });
	
	let data: PubData[] = [];
	
	for (const entry of entries) {
		const fileName = entry.path.slice(entry.path.lastIndexOf(sep) + 1);
		if (fileName.includes('.')) {
			continue;
		}
		
		const splitfolderName = fileName.split('_');
		let pubData: PubData;
		if (splitfolderName[0] == 'w') {
			pubData = {
				publication: 'Watchtower',
				script: (splitfolderName[1] == 'CHS') ? 'Simplified' : 'Traditional',
				year: splitfolderName[2].slice(0, 4),
				month: MONTH_NAMES[Number(splitfolderName[2].slice(4, 6)) - 1],
				path: entry.path.replace(appDataDirPath, ''),
			};
			data.push(pubData);
		} else if (splitfolderName[0] == 'g') {
			// TODO handle other publications
		} else {
			pubData = {
				publication: getPublicationNameFromCode(splitfolderName[0]),
				script: (splitfolderName[1] == 'CHS') ? 'Simplified' : 'Traditional',
				year: '',
				month: '',
				path: entry.path.replace(appDataDirPath, ''),
			};
			data.push(pubData);
		}
	}
	
	return {
		pubData: data
	};
	
	
	function getPublicationNameFromCode(code: string): string {
		for (const publicationData of PUBLICATION_CODES) {
			if (publicationData.code == code) {
				return publicationData.nameE;
			}
		}
		
		return '';
	}
}) satisfies PageLoad;