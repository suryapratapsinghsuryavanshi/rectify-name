#!/usr/bin/env node

const fs = require("fs");
const pkgJson = require("./package.json");
const caseShift = require("case-shift");

// A method for checking this is an ignorable file or not.
function ignoreFiles(file) {
	return (
		file.startsWith("package") ||
		file.startsWith(".") ||
		!file.includes(".") ||
		file.includes(".git") ||
		file.includes(".DS_Store") ||
		file.includes(".idea") ||
		file.includes(".vscode") ||
		file.includes(".yml") ||
		file.includes(".md") ||
		file.includes("LICENSE") ||
		file.includes(".d.") ||
		file.includes(".test.")
	);
}

// A method for separating file name and their extension.
function getFileName(file) {
	return file.split(".");
}

function help() {
	return(`rectify-name <options>

Usage:

rectify-name					rectify present working directory rectify into lower case type
rectify-name -d [directory]			rectify given directory if directory exists, rectify into given case-type type
rectify-name -c [case-type] 			rectify pwd to given case-type
rectify-name -d [directory] -c [case-type] 	rectify given directory if directory exists, rectify into given case-type type
rectify-name -c [case-type] -d [directory] 	rectify given directory if directory exists, rectify into given case-type type


All options:
rectify-name <options> [args]

-d, --directory	[path]		for specifying a directory
-c, --case [case-type]		for specifying a case-type
-h, --help, help		show help
-v, --version, version 		the show the version number of the package you are using
--caps				capitalize case-type, if supported


[path]:
rectify-name -d ./		support relative or absolute path of the directory


[case-type]:
rectify-name -c [case-type]

lower-case		rectify all directory files name into lower case type
camel-case		rectify all directory files name into camleCase type
capital-case		rectify all directory files name into Capital Case type
constant-case		rectify all directory files name into CONSTANT_CASE type
kebab-case		rectify all directory files name into kebab-case type
pascal-case		rectify all directory files name into PascalCase type
snake-case		rectify all directory files name into snake_case type

If the case support capitalization, you can also use --caps option with it,
this package also recognizes some non-rectifiable files like .npmrc, and skips that.
`);
}

const finalConfig = {
	dir: "./",
	case: "lower-case",
	caps: false
}

const caseType = [
	"lower-case",
	"camel-case",
	"capital-case",
	"constant-case",
	"kebab-case",
	"pascal-case",
	"snake-case"
]

function processArgs() {
	// getting all the option and command pass by the user.
	let args = process.argv.slice(2);
	try {
		if (args.length >= 1) {
			switch (args[0]) {
				case "--help":
				case "-h":
				case "help":
					console.log(help());
					break;
				case "--version":
				case "-v":
				case "version":
					console.log(`v${pkgJson.version}`);
					break;
				case "-d":
				case "--directory":
					let dir = fs.existsSync(args[1]);
					if(dir) {
						finalConfig.dir = args[1];
						if(args[2] === "-c" || args[2] === "--case") {
							if(args.length >= 4 && (args[3].startsWith("--") || args[3].startsWith("-"))) {
								console.log(`If you specify a -c or --case option, must specify [case-type]!\n`);
								process.exit(1);
							}else {
								if(caseType.includes(args[3])) {
									finalConfig.case = args[3];
								}else {
									console.log(`If you specify a -c or --case option, must specify [case-type]!\n`);
									process.exit(1);
								}
							}
						}
					}else {
						if(args.length >= 2 && (args[1].startsWith("--") || args[1].startsWith("-"))) {
							console.log(`If you specify a -d or --directory option, must specify the path!\n`);
							process.exit(1);
						}else {
							console.log(`${args[1] ?? "Invalid"}, directory not exists!\n`);
							process.exit(1);
						}
					}
					break;
				case "-c":
				case "--case":
					if(args.length >= 2 && (!(args[1].startsWith("--") || args[1].startsWith("-")) && caseType.includes(args[1]))) {
						finalConfig.case = args[1];
						if(args[2] === "-d" || args[2] === "--directory") {
							let dir = fs.existsSync(args[3]);
							if(dir) {
								finalConfig.dir = args[3];
							}else {
								if(args[1].startsWith("--") || args[1].startsWith("-")) {
									console.log(`If you specify a -d or --directory option, must specify the path!\n`);
									process.exit(1);
								}else {
									console.log(`${args[3] ?? "Invalid"}, directory not exists!\n`);
									process.exit(1);
								}
							}
						}
					}else {
						console.log(`If you specify a -c or --case option, must specify [case-type]!\n`);
						process.exit(1);
					}
					break;
				default:
					console.log(help());
			}
		}
	}catch(e) {
		console.log("Error:", e);
		console.log(`Check all options properly!, use rectify-name -h\n`);
		process.exit(1);
	}

	// rename the file according to the above parameters.
	renameFile(finalConfig)
}

// final file name, rename method.
function renameFile(options) {

	// Getting all current directory files.
	let fileNameArray = fs.readdirSync(options.dir, { encoding: "utf8" });

	let rectifiedFileNameArray = [];
	fileNameArray.map(file => {
		// rename files
		if (!ignoreFiles(file)) {
			let [fName, fExt] = getFileName(file);
			switch(options.case) {
				// check what type of case-type file name is used and convert it into the given type, need auto-detecting case-type API.
			}
		}
	});
	return rectifiedFileNameArray;
}

// pass all the filenames to the renameFile method they take care about what file we will ignore or what are eligible to rectify.
// renameFile(fileNameArray);
processArgs()

module.exports = {
	ignoreFiles,
	getFileName,
	processArgs
}
