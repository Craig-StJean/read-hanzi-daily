import { writable, get } from "svelte/store";

import MyFiles, { type PublicationInfo } from '$lib/Classes/MyFiles';
import MyDictionary from '$lib/Classes/MyDictionary';
import { userDictionary } from "$lib/data/AppSaveData";
import { readHtmlText } from '$lib/Read/LoadReadMaterial';


// Publications Info Stuff
export const publicationsInfo = writable([] as PublicationInfo[]);
export async function updatePublicationsInfo() {
	publicationsInfo.set(await MyFiles.getPublicationsInfo());
}
updatePublicationsInfo();


// Dictionary
const dictionary = new MyDictionary();
export const myDictionary = writable(dictionary);
async function loadDictionary() {
	await dictionary.initiateType('master');
}
loadDictionary();


// Read Stuff
export const readHtml = writable('');
export const readHtmlLoading = writable(false);
export async function updateReadHtml() {
	readHtmlLoading.set(true);
	readHtml.set(await readHtmlText());
	readHtmlLoading.set(false);
}
updateReadHtml();

console.log('preload')