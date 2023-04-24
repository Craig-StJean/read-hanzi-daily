import { writable } from "svelte/store";

import MyFiles, { type PublicationInfo } from '$lib/Classes/MyFiles';

export const publicationsInfo = writable([] as PublicationInfo[]);
export async function updatePublicationsInfo() {
	publicationsInfo.set(await MyFiles.getPublicationsInfo());
}
updatePublicationsInfo();