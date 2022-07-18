![logo](./static/logo.gif)
A simple npm package rectifies all file names according to provided case extension.

### 📥 Rectify files with the help of npx
```sh
npx rectify-name help
# or
npx rectify-name <options> [args]
```

### 📦 Install with the help of npm or yarn
```sh
# Use -g or global if you want to be install package as a CLI package.
npm install -g rectify-name
# or
yarn global add rectify-name
```

<br/>

## 📑 Use as a CLI Package
The options and args provided by the rectify-name package are below mentioned.
| Options(flags) | Supported args `default` | Options Description |
| - | - | - |
| -d, --directory | directory-path as string `"./"` | Rectify given directory files, if a directory exists. | 
| -c, --case | [case-type](#📔-case-type) `"lower-case"` | Rectify pwd files to a given case-type. |
| --caps |  | Apply capitalization, if case-type is supported. |
| -h, --help, help |  | Get help manual |
| -v, --version, version |  | Get the current package version |

#### 🧪 CLI Example
```sh
rectify-name -d "./test" -c "camel-case" --caps
```
In the above example is an option `-d` to set the directory path, `-c` is used to set the case-type and last option --caps is said to capitalize the camelCase type to CamelCase.

### 📔 case-type
Below case-type will be supported by the rectify-name package, as the case-type args.

| case-type | Support capitalization | Example | Capitalization |
| - | - | - | - |
| lower-case | | "my file.txt", "test file.txt" | |
| camle-case | YES | "myFile.txt", "testFile.txt" | "MyFile.txt", "TestFile.txt" |
| capital-case | | "My File.txt", "Test File.txt" | |
| constant-case | | "MY_FILE.txt", "TEST_FILE.txt" | |
| kebab-case | YES | "my-file.txt", "test-file.txt" | "My-File.txt", "Test-File.txt" |
| pascal-case | | "MyFile.txt", "TestFile.txt" | |
| snake-case | YES | "my_file.txt", "test_file.txt" | "My_File.txt", "Test_File.txt" |

<br/>

## 📄 Use as a Package Dependency
This package is also capable to use as a dependency package with the help of importing two method.

```js
// CommonJS
const { renameFile, reflectRenameOnSystem } = require("rectify-name");

// ES6
import { renameFile, reflectRenameOnSystem } from "rectify-name";
```

### 📝 renameFile
The renameFile method takes two parameters, the first is the options object and the second is the file name array. and returns an object with the actual filename and the changed filename.

```js
// dir: name of the directory.
// case: according to the case type table refer to the case-type.
// caps: if the case is supported, then capitalization will work.
const defaultOptions = { dir: './', case: 'lower-case', caps: false };

/* File name array you will get your file name to 
an array with the help of readdir or readdirSync 
method in the fs module in NodeJs. */
const fileNameArray = [
	'blog-1.txt',
	'blog_2.txt',
	'camelCase.txt',
	'Capital Case.txt',
	'CONSTANT_CASE.txt',
	'details file me.js',
	'PascalCase.txt'
];
const actualAndRenamedFiles = renameFile(defaultOptions, fileNameArray);
```

### 🗃️ reflectRenameOnSystem
As the name suggests this method will apply to rename files on the system, and it will rename the provided directory files, first argument of this method is the directory path.
```js
// The response provided by the renameFile method is used as the second argument of this method.
const actualAndRenamedFiles = renameFile(defaultOptions, fileNameArray);

// This method does not return anything, you can see the output on the provided path.
reflectRenameOnSystem("./", actualAndRenamedFiles);
```
<hr>

### Thanks 💻
