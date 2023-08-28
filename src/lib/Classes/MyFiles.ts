import { exists, createDir, readDir, BaseDirectory, type FileEntry } from '@tauri-apps/api/fs';
import { sep } from '@tauri-apps/api/path';

export type PublicationInfo = {
	code: string;
	script: string;
	year: string;
	month: string;
	path: string;
}

export default class MyFiles {
	
	// relative path for app e.g. epubs/OEBPS
	static async getFileList(relativePath: string): Promise<string[]> {
		let files: string[] = [];
		
		const entries: FileEntry[] = await readDir(relativePath, { dir: BaseDirectory.AppData });
		
		for (const entry of entries) {
			files.push(entry.path.slice(entry.path.lastIndexOf(sep) + 1));
		}
		
		return files;
	}
	
	// gets all currently downloaded publications in epubs folder
	static async getPublicationsInfo(): Promise<PublicationInfo[]> {
		
		let publicationsInfo: PublicationInfo[] = [];
		
		const entries: FileEntry[] = await readDir('epubs', { dir: BaseDirectory.AppData });
		
		for (const entry of entries) {
			const fileName = entry.path.slice(entry.path.lastIndexOf(sep) + 1);
			
			if (!fileName.includes('.')) { // only folders
				const folderNameParts = fileName.split('_');
				
				const pubInfo: PublicationInfo = {
					code: folderNameParts[0],
					script: folderNameParts[1],
					year: (folderNameParts.length > 2) ? folderNameParts[2].slice(0, 4) : '',
					month: (folderNameParts.length > 2) ? folderNameParts[2].slice(4, 6) : '',
					path: entry.path,
				}
				
				publicationsInfo.push(pubInfo);
			}
		}
		
		return publicationsInfo;
	}
}