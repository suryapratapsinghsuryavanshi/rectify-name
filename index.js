#!/usr/bin/env node

const { existsSync, readdirSync, renameSync } = require("fs");
const { join } = require('path');
const pkgJson = require("./package.json");
const caseShift = require("case-shift");

// Global CONSTANTS
const LOWER_CASE = "lower-case";		// lowercase
const CAMEL_CASE = "camel-case"; 		// camelCase
const CAPITAL_CASE = "capital-case";	// Capital Case or Title Case
const CONSTANT_CASE = "constant-case";	// CONSTANT_CASE
const KEBAB_CASE = "kebab-case";		// kebab-case
const PASCAL_CASE = "pascal-case";		// PascalCase
const SNAKE_CASE = "snake-case";		// sanke_case

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

// detect which type of case use in files name.
function caseDetect(case_type) {
	// ![\s_-], regex check all the cases have no -, _ or no space.
	if(!case_type.match(/[\s_-]/g)) {
		let [ lowerToUpperTrans, firstLaterSmall ] = [case_type.match(/([a-z][A-Z])/g), case_type.match(/^([a-z])/g)];
		if(lowerToUpperTrans !== null && firstLaterSmall !== null) {
			if((lowerToUpperTrans.length >= 1) && (firstLaterSmall.length >= 1)) {
				return "camel-case";
			}
		}

		[ lowerToUpperTrans, firstLaterCap ] = [case_type.match(/([a-z][A-Z])/g), case_type.match(/^([A-Z])/g)];
		if(lowerToUpperTrans !== null && firstLaterCap !== null) {
			if((lowerToUpperTrans.length >= 1) && (firstLaterCap.length >= 1)) {
				return "pascal-case";
			}
		}else if(firstLaterCap !== null) {
			let upperToLowerTrans = case_type.match(/([A-Z][a-z])/g);
			if(upperToLowerTrans !== null && upperToLowerTrans.length >= 1) {
				// it was a confilit(it may we camel-case or pascal-case also) so we resolve it as pascal-case.
				return "pascal-case";
			}
		}
	}

	// [\s_-], regex check all the cases have -, _ or space.
	if(case_type.match(/[\s_-]/g)) {
		let [ separatorSymbol, caseTransition ] = [ case_type.match(/([_])/g), case_type.toUpperCase() ];
		if(separatorSymbol !== null) {
			if(separatorSymbol.length >= 1 && case_type === caseTransition) {
				return "constant-case";
			}else if(separatorSymbol.length >= 1) {
				return "snake-case";
			}
		}

		separatorSymbol = case_type.match(/([-])/g);
		if(separatorSymbol !== null) {
			if(separatorSymbol.length >= 1) {
				return "kebab-case";
			}
		}

		[ separatorSymbol, caseTransition ] = [ case_type.match(/([\s])/g), case_type.replace(/\w\S*/g, (str) => str.charAt(0).toUpperCase() + str.substr(1).toLowerCase()) ];
		if(separatorSymbol !== null) {
			if(separatorSymbol.length >= 1 && case_type === caseTransition) {
				return "capital-case";
			}
		}

		if(case_type === case_type.toLowerCase()) {
			return "lower-case";
		}
	}

	// only lower case.
	if(case_type === case_type.toLowerCase()) {
		return "lower-case";
	}

	// only CONSTANT_CASE if without _ include.
	if(case_type === case_type.toUpperCase()) {
		return "constant-case";
	}
}

const finalConfig = {
	dir: "./",
	case: "lower-case",
	caps: false
}

const caseType = [
	"lower-case",	// lowercase
	"camel-case", 	// camelCase
	"capital-case",	// Capital Case or Title Case
	"constant-case",// CONSTANT_CASE
	"kebab-case",	// kebab-case
	"pascal-case",	// PascalCase
	"snake-case"	// sanke_case
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
					let dir = existsSync(args[1]);
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
							console.log(`${args[1] !== undefined ? "Invalid" : args[1]}, directory not exists!\n`);
							process.exit(1);
						}
					}
					break;
				case "-c":
				case "--case":
					if(args.length >= 2 && (!(args[1].startsWith("--") || args[1].startsWith("-")) && caseType.includes(args[1]))) {
						finalConfig.case = args[1];
						if(args[2] === "-d" || args[2] === "--directory") {
							let dir = existsSync(args[3]);
							if(dir) {
								finalConfig.dir = args[3];
							}else {
								if(args[1].startsWith("--") || args[1].startsWith("-")) {
									console.log(`If you specify a -d or --directory option, must specify the path!\n`);
									process.exit(1);
								}else {
									console.log(`${args[3] !== undefined ? "Invalid" : args[3]}, directory not exists!\n`);
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

			if(args.includes("--caps")) {
				finalConfig.caps = true;
			}

			// Getting all current directory files.
			let fileNameArray = readdirSync(finalConfig.dir, { encoding: "utf8" });
			// rename the file according to the above parameters.
			let renamedAndActualFiles =  renameFile(finalConfig, fileNameArray);
			reflectRenameOnSystem(finalConfig.dir, renamedAndActualFiles);
		}else {
			console.log(help());
		}
	}catch(e) {
		console.log("Error:", e);
		console.log(`Check all options properly!, use rectify-name -h\n`);
		process.exit(1);
	}
}

// pass all the filenames to the renameFile method they take care about what file we will ignore or what are eligible to rectify.
// final file name, rename method.
/**
 * A method that rectifies file name convert all file names into other case file name type according to given options.
 * @param options {{ dir: string, case: [ "lower-case", "camel-case",  "capital-case", "constant-case" "kebab-case", "pascal-case", "snake-case" ], caps: boolean }} object contain directory path, types of case and capitalization options.
 * @param fileNameArray {string[]} a string array of filenames
 * @returns {{ actualFiles: string[], renamedFiles: string[] }} a object containe `actual file` names and `rectifies file` name you can apply these
 * hanges with the help of `reflectRenameOnSystem` method.
 */
function renameFile(options, fileNameArray) {

	let rectifiedFileNames = {
		actualFiles: [],
		renamedFiles: []
	}
	fileNameArray.map(file => {
		// rename files
		if (!ignoreFiles(file)) {
			let [fName, fExt] = getFileName(file);
			let nFName = fName;
			let file_case_type = caseDetect(nFName);
			switch(options.case) {
				// check what type of case-type file name is used and convert it into the given type, need auto-detecting case-type API.
				case CAMEL_CASE:
					switch(file_case_type) {
						case CAPITAL_CASE:
							nFName = caseShift.capitalToCamel(nFName, options.caps);
							break;
						case CONSTANT_CASE:
							nFName = caseShift.constantToCamel(nFName, options.caps);
							break;
						case KEBAB_CASE:
							nFName = caseShift.kebabToCamel(nFName, options.caps);
							break;
						case PASCAL_CASE:
							nFName = caseShift.pascalToCamel(nFName, options.caps);
							break;
						case SNAKE_CASE:
							nFName = caseShift.snakeToCamel(nFName, options.caps);
							break;
						case CAMEL_CASE:
							nFName = caseShift.pascalToCamel(nFName[0].toUpperCase() + nFName.slice(1), options.caps);
							break;
						case LOWER_CASE:
							nFName = caseShift.constantToCamel(nFName.replace(/ /g, "_"), options.caps);
							break;
					}
					break;
				case CAPITAL_CASE:
					switch(file_case_type) {
						case CAMEL_CASE:
							nFName = caseShift.camelToCapital(nFName);
							break;
						case CONSTANT_CASE:
							nFName = caseShift.constantToCapital(nFName);
							break;
						case KEBAB_CASE:
							nFName = caseShift.kebabToCapital(nFName);
							break;
						case PASCAL_CASE:
							nFName = caseShift.pascalToCapital(nFName);
							break;
						case SNAKE_CASE:
							nFName = caseShift.snakeToCapital(nFName);
							break;
						case CAPITAL_CASE:
							nFName = nFName;
							break;
						case LOWER_CASE:
							nFName = caseShift.constantToCapital(nFName.replace(/ /g, "_"));
							break;
					}
					break;
				case CONSTANT_CASE:
					switch(file_case_type) {
						case CAMEL_CASE:
							nFName = caseShift.camelToConstant(nFName);
							break;
						case CAPITAL_CASE:
							nFName = caseShift.capitalToConstant(nFName);
							break;
						case KEBAB_CASE:
							nFName = caseShift.kebabToConstant(nFName);
							break;
						case PASCAL_CASE:
							nFName = caseShift.pascalToConstant(nFName);
							break;
						case SNAKE_CASE:
							nFName = caseShift.snakeToConstant(nFName);
							break;
						case CONSTANT_CASE:
							nFName = nFName;
							break;
						case LOWER_CASE:
							nFName = nFName.replace(/ /g, "_").toUpperCase();
							break;
					}
					break;
				case KEBAB_CASE:
					switch(file_case_type) {
						case CAMEL_CASE:
							nFName = caseShift.camelToKebab(nFName, options.caps);
							break;
						case CAPITAL_CASE:
							nFName = caseShift.capitalToKebab(nFName, options.caps);
							break;
						case CONSTANT_CASE:
							nFName = caseShift.constantToKebab(nFName, options.caps);
							break;
						case PASCAL_CASE:
							nFName = caseShift.pascalToKebab(nFName, options.caps);
							break;
						case SNAKE_CASE:
							nFName = caseShift.snakeToKebab(nFName, options.caps);
							break;
						case KEBAB_CASE:
							nFName = caseShift.constantToKebab(nFName.replace(/-/g, "_"), options.caps);
							break;
						case LOWER_CASE:
							nFName = caseShift.constantToKebab(nFName.replace(/ /g, "_"), options.caps);
							break;
					}
					break;
				case PASCAL_CASE:
					switch(file_case_type) {
						case CAMEL_CASE:
							nFName = caseShift.camelToPascal(nFName);
							break;
						case CAPITAL_CASE:
							nFName = caseShift.capitalToPascal(nFName);
							break;
						case CONSTANT_CASE:
							nFName = caseShift.constantToPascal(nFName);
							break;
						case KEBAB_CASE:
							nFName = caseShift.kebabToPascal(nFName);
							break;
						case SNAKE_CASE:
							nFName = caseShift.snakeToPascal(nFName);
							break;
						case PASCAL_CASE:
							nFName = nFName;
							break;
						case LOWER_CASE:
							nFName = caseShift.constantToPascal(nFName.replace(/ /g, "_"));
							break;
					}
					break;
				case SNAKE_CASE:
					switch(file_case_type) {
						case CAMEL_CASE:
							nFName = caseShift.camelToSnake(nFName, options.caps);
							break;
						case CAPITAL_CASE:
							nFName = caseShift.capitalToSnake(nFName, options.caps);
							break;
						case CONSTANT_CASE:
							nFName = caseShift.constantToSnake(nFName, options.caps);
							break;
						case KEBAB_CASE:
							nFName = caseShift.kebabToSnake(nFName, options.caps);
							break;
						case PASCAL_CASE:
							nFName = caseShift.pascalToSnake(nFName, options.caps);
							break;
						case SNAKE_CASE:
							nFName = caseShift.constantToSnake(nFName, options.caps);
							break;
						case LOWER_CASE:
							nFName = caseShift.constantToSnake(nFName.replace(/ /g, "_"), options.caps);
							break;
					}
					break;
				case LOWER_CASE:
					nFName = nFName.replace(/[\s_-]/g, " ")
					const nFNameCaseTrans = nFName.match(/([a-z][A-Z])/g);
					if(nFNameCaseTrans !== null && nFNameCaseTrans.length >= 1) {
						for(let ele of nFNameCaseTrans) {
							nFName = nFName.replace(ele, ele.split("").join(" "));
						}
					}
					nFName = nFName.toLowerCase();
					break;
			}
			rectifiedFileNames.actualFiles.push(`${fName}.${fExt}`);
			rectifiedFileNames.renamedFiles.push(`${nFName}.${fExt}`);
		}
	});
	return rectifiedFileNames;
}

/**
 * A method to reflect the file rectification on the system.
 * @param dir {string} directory path
 * @param param1 {{ actualFiles: string[], renamedFiles: string[] }} actual and rectifies file names array.
 * @returns {never} Return nothing.
 */
function reflectRenameOnSystem(dir, { actualFiles, renamedFiles }) {
	if(actualFiles !== undefined && renameFile !== undefined) {
		for(let i = 0; i < actualFiles.length; ++i) {
			try {
				renameSync(join(dir, actualFiles[i]), join(dir, renamedFiles[i]));
			}catch(e) {
				console.log("Error: ", e);
			}
		}
	}
}

processArgs();

module.exports = {
	getFileName,
	ignoreFiles,
	renameFile,
	reflectRenameOnSystem
}
