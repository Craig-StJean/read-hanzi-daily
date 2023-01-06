import { writableStreamFromWriter } from "https://deno.land/std@0.167.0/streams/mod.ts";

simpleDownload(Deno.args[0], Deno.args[1], Deno.args[2], Deno.args[3], Deno.args[4]);

export default async function simpleDownload(publication: string, issue: string, language: string, fileFormat: string, destinationWithFileName: string) {
	try {
		const pathResponse = await fetch(`https://b.jw-cdn.org/apis/pub-media/GETPUBMEDIALINKS?pub=${publication}&issue=${issue}&fileformat=${fileFormat}&langwritten=${language}`);
		const json = await pathResponse.json();
		console.log('Downloading file from: ' + json.files[language][fileFormat][0].file.url);

		const fileResponse = await fetch(json.files[language][fileFormat][0].file.url);

		const file = await Deno.open(destinationWithFileName, { write: true, create: true });
		const writableStream = writableStreamFromWriter(file);
		await fileResponse.body?.pipeTo(writableStream);
		console.log('Download complete 🎉');
	} catch(error) {
		console.log('I done goofed 😭');
	}
	
}