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

### 📑 Use as a CLI Package
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
