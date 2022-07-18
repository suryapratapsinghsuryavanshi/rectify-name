type caseType = [
	"lower-case",	// lowercase
	"camel-case", 	// camelCase
	"capital-case",	// Capital Case or Title Case
	"constant-case",// CONSTANT_CASE
	"kebab-case",	// kebab-case
	"pascal-case",	// PascalCase
	"snake-case"	// sanke_case
];

type optionsType = {
	dir: string,
	case: caseType,
	caps: boolean
}


/**
 * A method that rectifies file name convert all file names into other case file name type according to given options.
 * @param options {caseTey} object contain directory path, types of case and capitalization options.
 * @param fileNameArray {string[]} a string array of filenames
 * @returns {{ actualFiles: string[], renamedFiles: string[] }} a object containe `actual file` names and `rectifies file` name you can apply these
 * hanges with the help of `reflectRenameOnSystem` method.
 */
export function renameFile(options: optionsType, fileNameArray: string[]): { actualFiles: string[], renamedFiles: string[] }

/**
 * A method to reflect the file rectification on the system.
 * @param dir {string} directory path
 * @param param1 {{ actualFiles: string[], renamedFiles: string[] }} actual and rectifies file names array.
 * @returns {never} Return nothing.
 */
export function reflectRenameOnSystem(dir: string, { actualFiles, renamedFile }: { actualFiles: string[], renamedFiles: string[] }): never
