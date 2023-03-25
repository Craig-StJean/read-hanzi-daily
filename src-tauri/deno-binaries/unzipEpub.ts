import { exec } from "https://deno.land/x/exec/mod.ts";

// Only one arg, the name of the epub eg. "w_E_202301.epub"
const fileName = Deno.args[0];

// default path to the epubs folder
const path = 'C:\\Users\\Craig\\AppData\\Roaming\\com.tauri.dev\\epubs\\';


const fileNameNoExt = fileName.slice(0, fileName.lastIndexOf('.'));
const pathToFile = path + fileName;
const pathToDestination = path + fileNameNoExt;

console.log('working...')
const result = await exec(`tar -xf ${pathToFile} -C ${pathToDestination}`);

console.log(result);