import type { BinaryFileContents } from '@tauri-apps/api/fs';
import { fetch, ResponseType, type HttpVerb } from '@tauri-apps/api/http';
import { createDir, readBinaryFile, writeBinaryFile, BaseDirectory } from '@tauri-apps/api/fs';
import { appDataDir, sep } from '@tauri-apps/api/path';
import { Command } from '@tauri-apps/api/shell';

const epubsFolder = 'epubs';

export type DownloadCallbackResult = {
	stage: string;
	success: boolean;
	percentage: number;
};

export async function getNewEpub(publication: string, issue: string, language: string, downloadCallback: (result: DownloadCallbackResult) => any) {
	try {
		downloadCallback({
			stage: 'Querying JW.org for a download link...',
			success: false,
			percentage: 0,
		});
		const url = await getDownloadUrl(publication, issue, language, 'EPUB');
		const fileName = url.slice(url.lastIndexOf('/') + 1);
		
		downloadCallback({
			stage: 'Downloading...',
			success: false,
			percentage: 0,
		});
		await createDir(epubsFolder, { dir: BaseDirectory.AppData, recursive: true });
		await downloadFile(url, epubsFolder, downloadCallback);
		
		downloadCallback({
			stage: 'Extracting...',
			success: false,
			percentage: 0,
		});
		await unzipEpub(fileName);
		
		downloadCallback({
			stage: 'Finished',
			success: true,
			percentage: 100,
		});
	}
	catch (error) {
		downloadCallback({
			stage: 'Finished',
			success: false,
			percentage: 0,
		});
		console.log(error);
	}
}

export async function getDownloadUrl(publication: string, issue: string, language: string, fileFormat: string): Promise<string> {
	console.log('Querying jw.org about publication...')
	let url: string = ''
	try {
		const pathResponse = await fetch(`https://b.jw-cdn.org/apis/pub-media/GETPUBMEDIALINKS?pub=${publication}&issue=${issue}&fileformat=${fileFormat}&langwritten=${language}`);
		
		const json = await pathResponse.data as any;
		url = json.files[language][fileFormat][0].file.url;
		console.log(`"${json.pubName}" can be requested from "${url}"`);
	}
	catch (error) {
		console.log('There was an error querying jw.org 😭');
		throw error;
	}
	
	return url;
}

export async function downloadFile(url: string, downloadFolder: string, downloadCallback: (result: DownloadCallbackResult) => any) {
	const fileName = url.slice(url.lastIndexOf('/') + 1);
	const fetchOptions = {
		method: 'GET' as HttpVerb,
		responseType: ResponseType.Binary
	}
	
	try {
		console.log('Attempting download...')
		const fileResponse = await fetch(url, fetchOptions);
		
		const path = pathWithCorrectSlash(downloadFolder, fileName)
		await writeBinaryFile(path, fileResponse.data as BinaryFileContents, { dir: BaseDirectory.AppData });
		console.log(`"${fileName}" successfully downloaded to "${path}"`);
	}
	catch (error) {
		console.log('There was an error downloading 😭');
		throw error;
	}
	
}

export async function unzipEpub(fileName: string) {
	const appDataDirPath = await appDataDir();
	const filePath = appDataDirPath + pathWithCorrectSlash(epubsFolder, fileName);
	const fileNameNoExt = fileName.slice(0, fileName.lastIndexOf('.'));
	const destinationPath = appDataDirPath + pathWithCorrectSlash(epubsFolder, fileNameNoExt);
	
	await createDir(pathWithCorrectSlash(epubsFolder, fileNameNoExt), { dir: BaseDirectory.AppData, recursive: true });
	
	console.log(`Executing command "tar -xf ${filePath} -C ${destinationPath}"`);
	const output = await new Command('tar', ['-xf', filePath, '-C', destinationPath]).execute();
	
	if (output.stderr) {
		console.log('There was an error extracting 😭')
		throw new Error(output.stderr);
	}
	else {
		console.log('Successfully extracted.')
	}
}

export function pathWithCorrectSlash(...arrayOfFolders: string[]): string {
	return arrayOfFolders.join(sep);
}