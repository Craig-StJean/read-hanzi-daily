import { fetch, ResponseType, type HttpVerb } from '@tauri-apps/api/http';
import { createDir, readBinaryFile, writeBinaryFile, BaseDirectory } from '@tauri-apps/api/fs';
import { appDataDir, sep } from '@tauri-apps/api/path';
import { Command } from '@tauri-apps/api/shell';

const epubsFolder = 'epubs';

export async function getNewEpub(publication: string, issue: string, language: string) {
	const url = await getDownloadUrl(publication, issue, language, 'EPUB');
	const fileName = url.slice(url.lastIndexOf('/') + 1);
	
	//await createDir(epubsFolder, { dir: BaseDirectory.AppData, recursive: true });
	//await downloadFile(url, epubsFolder);
	
	await unzipEpub(fileName);
}

export async function getDownloadUrl(publication: string, issue: string, language: string, fileFormat: string): Promise<string> {
	const pathResponse = await fetch(`https://b.jw-cdn.org/apis/pub-media/GETPUBMEDIALINKS?pub=${publication}&issue=${issue}&fileformat=${fileFormat}&langwritten=${language}`);
	console.log(pathResponse);
	const json = await pathResponse.data;
	const url: string = json.files[language][fileFormat][0].file.url;
	console.log(json.pubName + ' can be requested from: ' + url);
	return url;
}

export async function downloadFile(url: string, downloadFolder: string) {
	const fileName = url.slice(url.lastIndexOf('/') + 1);
	const fetchOptions = {
		method: 'GET' as HttpVerb,
		responseType: ResponseType.Binary
	}
	
	const fileResponse = await fetch(url, fetchOptions);
	
	const path = pathWithCorrectSlash(downloadFolder, fileName)
	await writeBinaryFile(path, fileResponse.data, { dir: BaseDirectory.AppData });
	console.log(`"${fileName}" successfully downloaded to "${path}"`);
}

export async function unzipEpub(fileName: string) {
	const appDataDirPath = await appDataDir();
	const filePath = appDataDirPath + pathWithCorrectSlash(epubsFolder, fileName);
	const fileNameNoExt = fileName.slice(0, fileName.lastIndexOf('.'));
	const destinationPath = appDataDirPath + pathWithCorrectSlash(epubsFolder, fileNameNoExt);
	
	await createDir(pathWithCorrectSlash(epubsFolder, fileNameNoExt), { dir: BaseDirectory.AppData, recursive: true });
	
	const output = await new Command('tar', ['-xf', filePath, '-C', destinationPath]).execute();
	
	console.log(`tar -xf ${filePath} -C ${destinationPath}`);
	console.log(output);
}

export function pathWithCorrectSlash(...arrayOfFolders: string[]): string {
	return arrayOfFolders.join(sep);
}