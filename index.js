#!/usr/bin/env node

const fs = require('fs');

// A method for checking this is an ignorable file or not.
function ignoreFiles(file) {
    return(
		file.startsWith("package") ||
		file.startsWith(".") ||
		!file.includes(".") ||
		file.includes(".git") ||
		file.includes(".DS_Store") ||
		file.includes(".idea") ||
		file.includes(".vscode") ||
        file.includes(".yml")
	);
}

// A method for separating file name and their extension.
function getFileName(file) {
	return file.split(".");
}

// final file name, rename method.

function renameFile(fileNameArray) {
	fileNameArray.map(file => {
		// rename files
		if(!ignoreFiles(file)) {
			let [fName, fExt] = getFileName(file);
			fs.renameSync(`./${fName}.${fExt}`, `./${fName.toLowerCase()}.${fExt}`);
		}
	});
}

// Getting all current directory files.
fileNameArray = fs.readdirSync("./", { encoding: 'utf8' });

renameFile(fileNameArray);
