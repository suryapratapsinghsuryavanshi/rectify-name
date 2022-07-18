const { test, expect } = require("@jest/globals");
const { ignoreFiles, getFileName, renameFile } = require("./../index");

test("Test: ignoreFiles", () => {
    expect(ignoreFiles("package.json")).toBe(true);
});

test("Test: getFileName", () => {
    expect(getFileName("test.js")).toEqual(["test", "js"]);
});

test("Test: Normal => lower case", () => {
	expect(renameFile({ dir: './', case: 'lower-case', caps: false }, [
		'blog-1.txt',
		'blog_2.txt',
		'camelCase.txt',
		'Capital Case.txt',
		'CONSTANT_CASE.txt',
		'details file me.js',
		'PascalCase.txt'
	])).toStrictEqual({
		actualFiles: [
			'blog-1.txt',
			'blog_2.txt',
			'camelCase.txt',
			'Capital Case.txt',
			'CONSTANT_CASE.txt',
			'details file me.js',
			'PascalCase.txt'
		],
		renamedFiles: [
			'blog 1.txt',
			'blog 2.txt',
			'camel case.txt',
			'capital case.txt',
			'constant case.txt',
			'details file me.js',
			'pascal case.txt'
		]
	});
});

test("Test: Normal => camelCase", () => {
	expect(renameFile({ dir: './', case: 'camel-case', caps: false }, [
		'blog-1.txt',
		'blog_2.txt',
		'camelCase.txt',
		'Capital Case.txt',
		'CONSTANT_CASE.txt',
		'details file me.js',
		'PascalCase.txt'
	])).toStrictEqual({
		actualFiles: [
		  'blog-1.txt',
		  'blog_2.txt',
		  'camelCase.txt',
		  'Capital Case.txt',
		  'CONSTANT_CASE.txt',
		  'details file me.js',
		  'PascalCase.txt'
		],
		renamedFiles: [
		  'blog1.txt',
		  'blog2.txt',
		  'camelCase.txt',
		  'capitalCase.txt',
		  'constantCase.txt',
		  'detailsFileMe.js',
		  'pascalCase.txt'
		]
	});
});

test("Test: Normal => CamelCase(caps)", () => {
	expect(renameFile({ dir: './', case: 'camel-case', caps: true }, [
		'blog-1.txt',
		'blog_2.txt',
		'camelCase.txt',
		'Capital Case.txt',
		'CONSTANT_CASE.txt',
		'details file me.js',
		'PascalCase.txt'
	])).toStrictEqual({
		actualFiles: [
		  'blog-1.txt',
		  'blog_2.txt',
		  'camelCase.txt',
		  'Capital Case.txt',
		  'CONSTANT_CASE.txt',
		  'details file me.js',
		  'PascalCase.txt'
		],
		renamedFiles: [
		  'Blog1.txt',
		  'Blog2.txt',
		  'CamelCase.txt',
		  'CapitalCase.txt',
		  'ConstantCase.txt',
		  'DetailsFileMe.js',
		  'PascalCase.txt'
		]
	});
});

test("Test: Normal => Capital Case", () => {
	expect(renameFile({ dir: './', case: 'capital-case', caps: false }, [
		'blog-1.txt',
		'blog_2.txt',
		'camelCase.txt',
		'Capital Case.txt',
		'CONSTANT_CASE.txt',
		'details file me.js',
		'PascalCase.txt'
	])).toStrictEqual({
		actualFiles: [
		  'blog-1.txt',
		  'blog_2.txt',
		  'camelCase.txt',
		  'Capital Case.txt',
		  'CONSTANT_CASE.txt',
		  'details file me.js',
		  'PascalCase.txt'
		],
		renamedFiles: [
		  'Blog 1.txt',
		  'Blog 2.txt',
		  'Camel Case.txt',
		  'Capital Case.txt',
		  'Constant Case.txt',
		  'Details File Me.js',
		  'Pascal Case.txt'
		]
	});
});

test("Test: Normal => CONSTANT_CASE", () => {
	expect(renameFile({ dir: './', case: 'constant-case', caps: false }, [
		'blog-1.txt',
		'blog_2.txt',
		'camelCase.txt',
		'Capital Case.txt',
		'CONSTANT_CASE.txt',
		'details file me.js',
		'PascalCase.txt'
	])).toStrictEqual({
		actualFiles: [
			'blog-1.txt',
			'blog_2.txt',
			'camelCase.txt',
			'Capital Case.txt',
			'CONSTANT_CASE.txt',
			'details file me.js',
			'PascalCase.txt'
		],
		renamedFiles: [
			'BLOG_1.txt',
			'BLOG_2.txt',
			'CAMEL_CASE.txt',
			'CAPITAL_CASE.txt',
			'CONSTANT_CASE.txt',
			'DETAILS_FILE_ME.js',
			'PASCAL_CASE.txt'
		]
	});
});

test("Test: Normal => kebab-case", () => {
	expect(renameFile({ dir: './', case: 'kebab-case', caps: false }, [
		'blog-1.txt',
		'blog_2.txt',
		'camelCase.txt',
		'Capital Case.txt',
		'CONSTANT_CASE.txt',
		'details file me.js',
		'PascalCase.txt'
	])).toStrictEqual({
		actualFiles: [
			'blog-1.txt',
			'blog_2.txt',
			'camelCase.txt',
			'Capital Case.txt',
			'CONSTANT_CASE.txt',
			'details file me.js',
			'PascalCase.txt'
		],
		renamedFiles: [
			'blog-1.txt',
			'blog-2.txt',
			'camel-case.txt',
			'capital-case.txt',
			'constant-case.txt',
			'details-file-me.js',
			'pascal-case.txt'
		]
	});
});

test("Test: Normal => Kebab-Case(caps)", () => {
	expect(renameFile({ dir: './', case: 'kebab-case', caps: true }, [
		'blog-1.txt',
		'blog_2.txt',
		'camelCase.txt',
		'Capital Case.txt',
		'CONSTANT_CASE.txt',
		'details file me.js',
		'PascalCase.txt'
	])).toStrictEqual({
		actualFiles: [
			'blog-1.txt',
			'blog_2.txt',
			'camelCase.txt',
			'Capital Case.txt',
			'CONSTANT_CASE.txt',
			'details file me.js',
			'PascalCase.txt'
		],
		renamedFiles: [
			'Blog-1.txt',
			'Blog-2.txt',
			'Camel-Case.txt',
			'Capital-Case.txt',
			'Constant-Case.txt',
			'Details-File-Me.js',
			'Pascal-Case.txt'
		]
	});
});

test("Test: Normal => PascalCase", () => {
	expect(renameFile({ dir: './', case: 'pascal-case', caps: false }, [
		'blog-1.txt',
		'blog_2.txt',
		'camelCase.txt',
		'Capital Case.txt',
		'CONSTANT_CASE.txt',
		'details file me.js',
		'PascalCase.txt'
	])).toStrictEqual({
		actualFiles: [
			'blog-1.txt',
			'blog_2.txt',
			'camelCase.txt',
			'Capital Case.txt',
			'CONSTANT_CASE.txt',
			'details file me.js',
			'PascalCase.txt'
		],
		renamedFiles: [
			'Blog1.txt',
			'Blog2.txt',
			'CamelCase.txt',
			'CapitalCase.txt',
			'ConstantCase.txt',
			'DetailsFileMe.js',
			'PascalCase.txt'
		]
	});
});

test("Test: Normal => snake_case", () => {
	expect(renameFile({ dir: './', case: 'snake-case', caps: false }, [
		'blog-1.txt',
		'blog_2.txt',
		'camelCase.txt',
		'Capital Case.txt',
		'CONSTANT_CASE.txt',
		'details file me.js',
		'PascalCase.txt'
	])).toStrictEqual({
		actualFiles: [
			'blog-1.txt',
			'blog_2.txt',
			'camelCase.txt',
			'Capital Case.txt',
			'CONSTANT_CASE.txt',
			'details file me.js',
			'PascalCase.txt'
		],
		renamedFiles: [
			'blog_1.txt',
			'blog_2.txt',
			'camel_case.txt',
			'capital_case.txt',
			'constant_case.txt',
			'details_file_me.js',
			'pascal_case.txt'
		]
	});
});

test("Test: Normal => Snake_Case(caps)", () => {
	expect(renameFile({ dir: './', case: 'snake-case', caps: true }, [
		'blog-1.txt',
		'blog_2.txt',
		'camelCase.txt',
		'Capital Case.txt',
		'CONSTANT_CASE.txt',
		'details file me.js',
		'PascalCase.txt'
	])).toStrictEqual({
		actualFiles: [
			'blog-1.txt',
			'blog_2.txt',
			'camelCase.txt',
			'Capital Case.txt',
			'CONSTANT_CASE.txt',
			'details file me.js',
			'PascalCase.txt'
		],
		renamedFiles: [
			'Blog_1.txt',
			'Blog_2.txt',
			'Camel_Case.txt',
			'Capital_Case.txt',
			'Constant_Case.txt',
			'Details_File_Me.js',
			'Pascal_Case.txt'
		]
	});
});

test("Test: CONSTANT_CASE => lower case", () => {
	expect(renameFile({ dir: './', case: 'lower-case', caps: false }, [
		'BLOG1.txt',
		'BLOG2.txt',
		'CAMEL_CASE.txt',
		'CAPITAL_CASE.txt',
		'CONSTANT_CASE.txt',
		'DETAILS_FILE_ME.js',
		'PASCAL_CASE.txt'
	]).renamedFiles).toStrictEqual([
		'blog1.txt',
		'blog2.txt',
		'camel case.txt',
		'capital case.txt',
		'constant case.txt',
		'details file me.js',
		'pascal case.txt'
	]);
});

test("Test: CONSTANT_CASE => camelCase", () => {
	expect(renameFile({ dir: './', case: 'camel-case', caps: false }, [
		'BLOG1.txt',
		'BLOG2.txt',
		'CAMEL_CASE.txt',
		'CAPITAL_CASE.txt',
		'CONSTANT_CASE.txt',
		'DETAILS_FILE_ME.js',
		'PASCAL_CASE.txt'
	]).renamedFiles).toStrictEqual([
		'blog1.txt',
		'blog2.txt',
		'camelCase.txt',
		'capitalCase.txt',
		'constantCase.txt',
		'detailsFileMe.js',
		'pascalCase.txt'
	]);
});

test("Test: CONSTANT_CASE => camelCase(caps)", () => {
	expect(renameFile({ dir: './', case: 'camel-case', caps: true }, [
		'BLOG1.txt',
		'BLOG2.txt',
		'CAMEL_CASE.txt',
		'CAPITAL_CASE.txt',
		'CONSTANT_CASE.txt',
		'DETAILS_FILE_ME.js',
		'PASCAL_CASE.txt'
	]).renamedFiles).toStrictEqual([
		'Blog1.txt',
		'Blog2.txt',
		'CamelCase.txt',
		'CapitalCase.txt',
		'ConstantCase.txt',
		'DetailsFileMe.js',
		'PascalCase.txt'
	]);
});

test("Test: CONSTANT_CASE => Capital Case", () => {
	expect(renameFile({ dir: './', case: 'capital-case', caps: false }, [
		'BLOG1.txt',
		'BLOG2.txt',
		'CAMEL_CASE.txt',
		'CAPITAL_CASE.txt',
		'CONSTANT_CASE.txt',
		'DETAILS_FILE_ME.js',
		'PASCAL_CASE.txt'
	]).renamedFiles).toStrictEqual([
		'Blog1.txt',
		'Blog2.txt',
		'Camel Case.txt',
		'Capital Case.txt',
		'Constant Case.txt',
		'Details File Me.js',
		'Pascal Case.txt'
	]);
});

test("Test: CONSTANT_CASE => CONSTANT_CASE", () => {
	expect(renameFile({ dir: './', case: 'constant-case', caps: false }, [
		'BLOG1.txt',
		'BLOG2.txt',
		'CAMEL_CASE.txt',
		'CAPITAL_CASE.txt',
		'CONSTANT_CASE.txt',
		'DETAILS_FILE_ME.js',
		'PASCAL_CASE.txt'
	]).renamedFiles).toStrictEqual([
		'BLOG1.txt',
		'BLOG2.txt',
		'CAMEL_CASE.txt',
		'CAPITAL_CASE.txt',
		'CONSTANT_CASE.txt',
		'DETAILS_FILE_ME.js',
		'PASCAL_CASE.txt'
	]);
});

test("Test: CONSTANT_CASE => kebab-case", () => {
	expect(renameFile({ dir: './', case: 'kebab-case', caps: false }, [
		'BLOG1.txt',
		'BLOG2.txt',
		'CAMEL_CASE.txt',
		'CAPITAL_CASE.txt',
		'CONSTANT_CASE.txt',
		'DETAILS_FILE_ME.js',
		'PASCAL_CASE.txt'
	]).renamedFiles).toStrictEqual([
		'blog1.txt',
		'blog2.txt',
		'camel-case.txt',
		'capital-case.txt',
		'constant-case.txt',
		'details-file-me.js',
		'pascal-case.txt'
	]);
});

test("Test: CONSTANT_CASE => Kebab-Case(caps)", () => {
	expect(renameFile({ dir: './', case: 'kebab-case', caps: true }, [
		'BLOG1.txt',
		'BLOG2.txt',
		'CAMEL_CASE.txt',
		'CAPITAL_CASE.txt',
		'CONSTANT_CASE.txt',
		'DETAILS_FILE_ME.js',
		'PASCAL_CASE.txt'
	]).renamedFiles).toStrictEqual([
		'Blog1.txt',
		'Blog2.txt',
		'Camel-Case.txt',
		'Capital-Case.txt',
		'Constant-Case.txt',
		'Details-File-Me.js',
		'Pascal-Case.txt'
	]);
});

test("Test: CONSTANT_CASE => PascalCase", () => {
	expect(renameFile({ dir: './', case: 'pascal-case', caps: false }, [
		'BLOG1.txt',
		'BLOG2.txt',
		'CAMEL_CASE.txt',
		'CAPITAL_CASE.txt',
		'CONSTANT_CASE.txt',
		'DETAILS_FILE_ME.js',
		'PASCAL_CASE.txt'
	]).renamedFiles).toStrictEqual([
		'Blog1.txt',
		'Blog2.txt',
		'CamelCase.txt',
		'CapitalCase.txt',
		'ConstantCase.txt',
		'DetailsFileMe.js',
		'PascalCase.txt'
	]);
});

test("Test: CONSTANT_CASE => snake_case", () => {
	expect(renameFile({ dir: './', case: 'snake-case', caps: false }, [
		'BLOG1.txt',
		'BLOG2.txt',
		'CAMEL_CASE.txt',
		'CAPITAL_CASE.txt',
		'CONSTANT_CASE.txt',
		'DETAILS_FILE_ME.js',
		'PASCAL_CASE.txt'
	]).renamedFiles).toStrictEqual([
		'blog1.txt',
		'blog2.txt',
		'camel_case.txt',
		'capital_case.txt',
		'constant_case.txt',
		'details_file_me.js',
		'pascal_case.txt'
	]);
});

test("Test: CONSTANT_CASE => Snake_Case(caps)", () => {
	expect(renameFile({ dir: './', case: 'snake-case', caps: true }, [
		'BLOG1.txt',
		'BLOG2.txt',
		'CAMEL_CASE.txt',
		'CAPITAL_CASE.txt',
		'CONSTANT_CASE.txt',
		'DETAILS_FILE_ME.js',
		'PASCAL_CASE.txt'
	]).renamedFiles).toStrictEqual([
		'Blog1.txt',
		'Blog2.txt',
		'Camel_Case.txt',
		'Capital_Case.txt',
		'Constant_Case.txt',
		'Details_File_Me.js',
		'Pascal_Case.txt'
	]);
});

test("Test: camelCase => lower case", () => {
	expect(renameFile({ dir: './', case: 'lower-case', caps: false }, [
		'blog1.txt',
		'blog2.txt',
		'camelCase.txt',
		'capitalCase.txt',
		'constantCase.txt',
		'detailsFileMe.js',
		'pascalCase.txt'
	]).renamedFiles).toStrictEqual([
		'blog1.txt',
		'blog2.txt',
		'camel case.txt',
		'capital case.txt',
		'constant case.txt',
		'details file me.js',
		'pascal case.txt'
	]);
});

test("Test: camelCase => camelCase", () => {
	expect(renameFile({ dir: './', case: 'camel-case', caps: false }, [
		'blog1.txt',
		'blog2.txt',
		'camelCase.txt',
		'capitalCase.txt',
		'constantCase.txt',
		'detailsFileMe.js',
		'pascalCase.txt'
	]).renamedFiles).toStrictEqual([
		'blog1.txt',
		'blog2.txt',
		'camelCase.txt',
		'capitalCase.txt',
		'constantCase.txt',
		'detailsFileMe.js',
		'pascalCase.txt'
	]);
});

test("Test: camelCase => camelCase(caps)", () => {
	expect(renameFile({ dir: './', case: 'camel-case', caps: true }, [
		'blog1.txt',
		'blog2.txt',
		'camelCase.txt',
		'capitalCase.txt',
		'constantCase.txt',
		'detailsFileMe.js',
		'pascalCase.txt'
	]).renamedFiles).toStrictEqual([
		'Blog1.txt',
		'Blog2.txt',
		'CamelCase.txt',
		'CapitalCase.txt',
		'ConstantCase.txt',
		'DetailsFileMe.js',
		'PascalCase.txt'
	]);
});

test("Test: camelCase => Capital Case", () => {
	expect(renameFile({ dir: './', case: 'capital-case', caps: false }, [
		'blog1.txt',
		'blog2.txt',
		'camelCase.txt',
		'capitalCase.txt',
		'constantCase.txt',
		'detailsFileMe.js',
		'pascalCase.txt'
	]).renamedFiles).toStrictEqual([
		'Blog1.txt',
		'Blog2.txt',
		'Camel Case.txt',
		'Capital Case.txt',
		'Constant Case.txt',
		'Details File Me.js',
		'Pascal Case.txt'
	]);
});

test("Test: camelCase => CONSTANT_CASE", () => {
	expect(renameFile({ dir: './', case: 'constant-case', caps: false }, [
		'blog1.txt',
		'blog2.txt',
		'camelCase.txt',
		'capitalCase.txt',
		'constantCase.txt',
		'detailsFileMe.js',
		'pascalCase.txt'
	]).renamedFiles).toStrictEqual([
		'BLOG1.txt',
		'BLOG2.txt',
		'CAMEL_CASE.txt',
		'CAPITAL_CASE.txt',
		'CONSTANT_CASE.txt',
		'DETAILS_FILE_ME.js',
		'PASCAL_CASE.txt'
	]);
});

test("Test: camelCase => kebab-case", () => {
	expect(renameFile({ dir: './', case: 'kebab-case', caps: false }, [
		'blog1.txt',
		'blog2.txt',
		'camelCase.txt',
		'capitalCase.txt',
		'constantCase.txt',
		'detailsFileMe.js',
		'pascalCase.txt'
	]).renamedFiles).toStrictEqual([
		'blog1.txt',
		'blog2.txt',
		'camel-case.txt',
		'capital-case.txt',
		'constant-case.txt',
		'details-file-me.js',
		'pascal-case.txt'
	]);
});

test("Test: camelCase => Kebab-Case(caps)", () => {
	expect(renameFile({ dir: './', case: 'kebab-case', caps: true }, [
		'blog1.txt',
		'blog2.txt',
		'camelCase.txt',
		'capitalCase.txt',
		'constantCase.txt',
		'detailsFileMe.js',
		'pascalCase.txt'
	]).renamedFiles).toStrictEqual([
		'Blog1.txt',
		'Blog2.txt',
		'Camel-Case.txt',
		'Capital-Case.txt',
		'Constant-Case.txt',
		'Details-File-Me.js',
		'Pascal-Case.txt'
	]);
});

test("Test: camelCase => PascalCase", () => {
	expect(renameFile({ dir: './', case: 'pascal-case', caps: false }, [
		'blog1.txt',
		'blog2.txt',
		'camelCase.txt',
		'capitalCase.txt',
		'constantCase.txt',
		'detailsFileMe.js',
		'pascalCase.txt'
	]).renamedFiles).toStrictEqual([
		'Blog1.txt',
		'Blog2.txt',
		'CamelCase.txt',
		'CapitalCase.txt',
		'ConstantCase.txt',
		'DetailsFileMe.js',
		'PascalCase.txt'
	]);
});

test("Test: camelCase => snake_case", () => {
	expect(renameFile({ dir: './', case: 'snake-case', caps: false }, [
		'blog1.txt',
		'blog2.txt',
		'camelCase.txt',
		'capitalCase.txt',
		'constantCase.txt',
		'detailsFileMe.js',
		'pascalCase.txt'
	]).renamedFiles).toStrictEqual([
		'blog1.txt',
		'blog2.txt',
		'camel_case.txt',
		'capital_case.txt',
		'constant_case.txt',
		'details_file_me.js',
		'pascal_case.txt'
	]);
});

test("Test: camelCase => Snake_Case(caps)", () => {
	expect(renameFile({ dir: './', case: 'snake-case', caps: true }, [
		'blog1.txt',
		'blog2.txt',
		'camelCase.txt',
		'capitalCase.txt',
		'constantCase.txt',
		'detailsFileMe.js',
		'pascalCase.txt'
	]).renamedFiles).toStrictEqual([
		'Blog1.txt',
		'Blog2.txt',
		'Camel_Case.txt',
		'Capital_Case.txt',
		'Constant_Case.txt',
		'Details_File_Me.js',
		'Pascal_Case.txt'
	]);
});


test("Test: CamelCase(caps) => lower case", () => {
	expect(renameFile({ dir: './', case: 'lower-case', caps: false }, [
		'Blog1.txt',
		'Blog2.txt',
		'CamelCase.txt',
		'CapitalCase.txt',
		'ConstantCase.txt',
		'DetailsFileMe.js',
		'PascalCase.txt'
	]).renamedFiles).toStrictEqual([
		'blog1.txt',
		'blog2.txt',
		'camel case.txt',
		'capital case.txt',
		'constant case.txt',
		'details file me.js',
		'pascal case.txt'
	]);
});

test("Test: CamelCase(caps) => camelCase", () => {
	expect(renameFile({ dir: './', case: 'camel-case', caps: false }, [
		'Blog1.txt',
		'Blog2.txt',
		'CamelCase.txt',
		'CapitalCase.txt',
		'ConstantCase.txt',
		'DetailsFileMe.js',
		'PascalCase.txt'
	]).renamedFiles).toStrictEqual([
		'blog1.txt',
		'blog2.txt',
		'camelCase.txt',
		'capitalCase.txt',
		'constantCase.txt',
		'detailsFileMe.js',
		'pascalCase.txt'
	]);
});

test("Test: CamelCase(caps) => camelCase(caps)", () => {
	expect(renameFile({ dir: './', case: 'camel-case', caps: true }, [
		'Blog1.txt',
		'Blog2.txt',
		'CamelCase.txt',
		'CapitalCase.txt',
		'ConstantCase.txt',
		'DetailsFileMe.js',
		'PascalCase.txt'
	]).renamedFiles).toStrictEqual([
		'Blog1.txt',
		'Blog2.txt',
		'CamelCase.txt',
		'CapitalCase.txt',
		'ConstantCase.txt',
		'DetailsFileMe.js',
		'PascalCase.txt'
	]);
});

test("Test: CamelCase(caps) => Capital Case", () => {
	expect(renameFile({ dir: './', case: 'capital-case', caps: false }, [
		'Blog1.txt',
		'Blog2.txt',
		'CamelCase.txt',
		'CapitalCase.txt',
		'ConstantCase.txt',
		'DetailsFileMe.js',
		'PascalCase.txt'
	]).renamedFiles).toStrictEqual([
		'Blog1.txt',
		'Blog2.txt',
		'Camel Case.txt',
		'Capital Case.txt',
		'Constant Case.txt',
		'Details File Me.js',
		'Pascal Case.txt'
	]);
});

test("Test: CamelCase(caps) => CONSTANT_CASE", () => {
	expect(renameFile({ dir: './', case: 'constant-case', caps: false }, [
		'Blog1.txt',
		'Blog2.txt',
		'CamelCase.txt',
		'CapitalCase.txt',
		'ConstantCase.txt',
		'DetailsFileMe.js',
		'PascalCase.txt'
	]).renamedFiles).toStrictEqual([
		'BLOG1.txt',
		'BLOG2.txt',
		'CAMEL_CASE.txt',
		'CAPITAL_CASE.txt',
		'CONSTANT_CASE.txt',
		'DETAILS_FILE_ME.js',
		'PASCAL_CASE.txt'
	]);
});

test("Test: CamelCase(caps) => kebab-case", () => {
	expect(renameFile({ dir: './', case: 'kebab-case', caps: false }, [
		'Blog1.txt',
		'Blog2.txt',
		'CamelCase.txt',
		'CapitalCase.txt',
		'ConstantCase.txt',
		'DetailsFileMe.js',
		'PascalCase.txt'
	]).renamedFiles).toStrictEqual([
		'blog1.txt',
		'blog2.txt',
		'camel-case.txt',
		'capital-case.txt',
		'constant-case.txt',
		'details-file-me.js',
		'pascal-case.txt'
	]);
});

test("Test: CamelCase(caps) => Kebab-Case(caps)", () => {
	expect(renameFile({ dir: './', case: 'kebab-case', caps: true }, [
		'Blog1.txt',
		'Blog2.txt',
		'CamelCase.txt',
		'CapitalCase.txt',
		'ConstantCase.txt',
		'DetailsFileMe.js',
		'PascalCase.txt'
	]).renamedFiles).toStrictEqual([
		'Blog1.txt',
		'Blog2.txt',
		'Camel-Case.txt',
		'Capital-Case.txt',
		'Constant-Case.txt',
		'Details-File-Me.js',
		'Pascal-Case.txt'
	]);
});

test("Test: CamelCase(caps) => PascalCase", () => {
	expect(renameFile({ dir: './', case: 'pascal-case', caps: false }, [
		'Blog1.txt',
		'Blog2.txt',
		'CamelCase.txt',
		'CapitalCase.txt',
		'ConstantCase.txt',
		'DetailsFileMe.js',
		'PascalCase.txt'
	]).renamedFiles).toStrictEqual([
		'Blog1.txt',
		'Blog2.txt',
		'CamelCase.txt',
		'CapitalCase.txt',
		'ConstantCase.txt',
		'DetailsFileMe.js',
		'PascalCase.txt'
	]);
});

test("Test: CamelCase(caps) => snake_case", () => {
	expect(renameFile({ dir: './', case: 'snake-case', caps: false }, [
		'Blog1.txt',
		'Blog2.txt',
		'CamelCase.txt',
		'CapitalCase.txt',
		'ConstantCase.txt',
		'DetailsFileMe.js',
		'PascalCase.txt'
	]).renamedFiles).toStrictEqual([
		'blog1.txt',
		'blog2.txt',
		'camel_case.txt',
		'capital_case.txt',
		'constant_case.txt',
		'details_file_me.js',
		'pascal_case.txt'
	]);
});

test("Test: CamelCase(caps) => Snake_Case(caps)", () => {
	expect(renameFile({ dir: './', case: 'snake-case', caps: true }, [
		'Blog1.txt',
		'Blog2.txt',
		'CamelCase.txt',
		'CapitalCase.txt',
		'ConstantCase.txt',
		'DetailsFileMe.js',
		'PascalCase.txt'
	]).renamedFiles).toStrictEqual([
		'Blog1.txt',
		'Blog2.txt',
		'Camel_Case.txt',
		'Capital_Case.txt',
		'Constant_Case.txt',
		'Details_File_Me.js',
		'Pascal_Case.txt'
	]);
});

test("Test: Capital Case => lower case", () => {
	expect(renameFile({ dir: './', case: 'lower-case', caps: false }, [
		'Blog1.txt',
		'Blog2.txt',
		'Camel Case.txt',
		'Capital Case.txt',
		'Constant Case.txt',
		'Details File Me.js',
		'Pascal Case.txt'
	]).renamedFiles).toStrictEqual([
		'blog1.txt',
		'blog2.txt',
		'camel case.txt',
		'capital case.txt',
		'constant case.txt',
		'details file me.js',
		'pascal case.txt'
	]);
});

test("Test: Capital Case => camelCase", () => {
	expect(renameFile({ dir: './', case: 'camel-case', caps: false }, [
		'Blog1.txt',
		'Blog2.txt',
		'Camel Case.txt',
		'Capital Case.txt',
		'Constant Case.txt',
		'Details File Me.js',
		'Pascal Case.txt'
	]).renamedFiles).toStrictEqual([
		'blog1.txt',
		'blog2.txt',
		'camelCase.txt',
		'capitalCase.txt',
		'constantCase.txt',
		'detailsFileMe.js',
		'pascalCase.txt'
	]);
});

test("Test: Capital Case => camelCase(caps)", () => {
	expect(renameFile({ dir: './', case: 'camel-case', caps: true }, [
		'Blog1.txt',
		'Blog2.txt',
		'Camel Case.txt',
		'Capital Case.txt',
		'Constant Case.txt',
		'Details File Me.js',
		'Pascal Case.txt'
	]).renamedFiles).toStrictEqual([
		'Blog1.txt',
		'Blog2.txt',
		'CamelCase.txt',
		'CapitalCase.txt',
		'ConstantCase.txt',
		'DetailsFileMe.js',
		'PascalCase.txt'
	]);
});

test("Test: Capital Case => Capital Case", () => {
	expect(renameFile({ dir: './', case: 'capital-case', caps: false }, [
		'Blog1.txt',
		'Blog2.txt',
		'Camel Case.txt',
		'Capital Case.txt',
		'Constant Case.txt',
		'Details File Me.js',
		'Pascal Case.txt'
	]).renamedFiles).toStrictEqual([
		'Blog1.txt',
		'Blog2.txt',
		'Camel Case.txt',
		'Capital Case.txt',
		'Constant Case.txt',
		'Details File Me.js',
		'Pascal Case.txt'
	]);
});

test("Test: Capital Case => CONSTANT_CASE", () => {
	expect(renameFile({ dir: './', case: 'constant-case', caps: false }, [
		'Blog1.txt',
		'Blog2.txt',
		'Camel Case.txt',
		'Capital Case.txt',
		'Constant Case.txt',
		'Details File Me.js',
		'Pascal Case.txt'
	]).renamedFiles).toStrictEqual([
		'BLOG1.txt',
		'BLOG2.txt',
		'CAMEL_CASE.txt',
		'CAPITAL_CASE.txt',
		'CONSTANT_CASE.txt',
		'DETAILS_FILE_ME.js',
		'PASCAL_CASE.txt'
	]);
});

test("Test: Capital Case => kebab-case", () => {
	expect(renameFile({ dir: './', case: 'kebab-case', caps: false }, [
		'Blog1.txt',
		'Blog2.txt',
		'Camel Case.txt',
		'Capital Case.txt',
		'Constant Case.txt',
		'Details File Me.js',
		'Pascal Case.txt'
	]).renamedFiles).toStrictEqual([
		'blog1.txt',
		'blog2.txt',
		'camel-case.txt',
		'capital-case.txt',
		'constant-case.txt',
		'details-file-me.js',
		'pascal-case.txt'
	]);
});

test("Test: Capital Case => Kebab-Case(caps)", () => {
	expect(renameFile({ dir: './', case: 'kebab-case', caps: true }, [
		'Blog1.txt',
		'Blog2.txt',
		'Camel Case.txt',
		'Capital Case.txt',
		'Constant Case.txt',
		'Details File Me.js',
		'Pascal Case.txt'
	]).renamedFiles).toStrictEqual([
		'Blog1.txt',
		'Blog2.txt',
		'Camel-Case.txt',
		'Capital-Case.txt',
		'Constant-Case.txt',
		'Details-File-Me.js',
		'Pascal-Case.txt'
	]);
});

test("Test: Capital Case => PascalCase", () => {
	expect(renameFile({ dir: './', case: 'pascal-case', caps: false }, [
		'Blog1.txt',
		'Blog2.txt',
		'Camel Case.txt',
		'Capital Case.txt',
		'Constant Case.txt',
		'Details File Me.js',
		'Pascal Case.txt'
	]).renamedFiles).toStrictEqual([
		'Blog1.txt',
		'Blog2.txt',
		'CamelCase.txt',
		'CapitalCase.txt',
		'ConstantCase.txt',
		'DetailsFileMe.js',
		'PascalCase.txt'
	]);
});

test("Test: Capital Case => snake_case", () => {
	expect(renameFile({ dir: './', case: 'snake-case', caps: false }, [
		'Blog1.txt',
		'Blog2.txt',
		'Camel Case.txt',
		'Capital Case.txt',
		'Constant Case.txt',
		'Details File Me.js',
		'Pascal Case.txt'
	]).renamedFiles).toStrictEqual([
		'blog1.txt',
		'blog2.txt',
		'camel_case.txt',
		'capital_case.txt',
		'constant_case.txt',
		'details_file_me.js',
		'pascal_case.txt'
	]);
});

test("Test: Capital Case => Snake_Case(caps)", () => {
	expect(renameFile({ dir: './', case: 'snake-case', caps: true }, [
		'Blog1.txt',
		'Blog2.txt',
		'Camel Case.txt',
		'Capital Case.txt',
		'Constant Case.txt',
		'Details File Me.js',
		'Pascal Case.txt'
	]).renamedFiles).toStrictEqual([
		'Blog1.txt',
		'Blog2.txt',
		'Camel_Case.txt',
		'Capital_Case.txt',
		'Constant_Case.txt',
		'Details_File_Me.js',
		'Pascal_Case.txt'
	]);
});

test("Test: CONSTANT_CASE => lower case", () => {
	expect(renameFile({ dir: './', case: 'lower-case', caps: false }, [
		'BLOG1.txt',
		'BLOG2.txt',
		'CAMEL_CASE.txt',
		'CAPITAL_CASE.txt',
		'CONSTANT_CASE.txt',
		'DETAILS_FILE_ME.js',
		'PASCAL_CASE.txt'
	]).renamedFiles).toStrictEqual([
		'blog1.txt',
		'blog2.txt',
		'camel case.txt',
		'capital case.txt',
		'constant case.txt',
		'details file me.js',
		'pascal case.txt'
	]);
});

test("Test: CONSTANT_CASE => camelCase", () => {
	expect(renameFile({ dir: './', case: 'camel-case', caps: false }, [
		'BLOG1.txt',
		'BLOG2.txt',
		'CAMEL_CASE.txt',
		'CAPITAL_CASE.txt',
		'CONSTANT_CASE.txt',
		'DETAILS_FILE_ME.js',
		'PASCAL_CASE.txt'
	]).renamedFiles).toStrictEqual([
		'blog1.txt',
		'blog2.txt',
		'camelCase.txt',
		'capitalCase.txt',
		'constantCase.txt',
		'detailsFileMe.js',
		'pascalCase.txt'
	]);
});

test("Test: CONSTANT_CASE => camelCase(caps)", () => {
	expect(renameFile({ dir: './', case: 'camel-case', caps: true }, [
		'BLOG1.txt',
		'BLOG2.txt',
		'CAMEL_CASE.txt',
		'CAPITAL_CASE.txt',
		'CONSTANT_CASE.txt',
		'DETAILS_FILE_ME.js',
		'PASCAL_CASE.txt'
	]).renamedFiles).toStrictEqual([
		'Blog1.txt',
		'Blog2.txt',
		'CamelCase.txt',
		'CapitalCase.txt',
		'ConstantCase.txt',
		'DetailsFileMe.js',
		'PascalCase.txt'
	]);
});

test("Test: CONSTANT_CASE => Capital Case", () => {
	expect(renameFile({ dir: './', case: 'capital-case', caps: false }, [
		'BLOG1.txt',
		'BLOG2.txt',
		'CAMEL_CASE.txt',
		'CAPITAL_CASE.txt',
		'CONSTANT_CASE.txt',
		'DETAILS_FILE_ME.js',
		'PASCAL_CASE.txt'
	]).renamedFiles).toStrictEqual([
		'Blog1.txt',
		'Blog2.txt',
		'Camel Case.txt',
		'Capital Case.txt',
		'Constant Case.txt',
		'Details File Me.js',
		'Pascal Case.txt'
	]);
});

test("Test: CONSTANT_CASE => CONSTANT_CASE", () => {
	expect(renameFile({ dir: './', case: 'constant-case', caps: false }, [
		'BLOG1.txt',
		'BLOG2.txt',
		'CAMEL_CASE.txt',
		'CAPITAL_CASE.txt',
		'CONSTANT_CASE.txt',
		'DETAILS_FILE_ME.js',
		'PASCAL_CASE.txt'
	]).renamedFiles).toStrictEqual([
		'BLOG1.txt',
		'BLOG2.txt',
		'CAMEL_CASE.txt',
		'CAPITAL_CASE.txt',
		'CONSTANT_CASE.txt',
		'DETAILS_FILE_ME.js',
		'PASCAL_CASE.txt'
	]);
});

test("Test: CONSTANT_CASE => kebab-case", () => {
	expect(renameFile({ dir: './', case: 'kebab-case', caps: false }, [
		'BLOG1.txt',
		'BLOG2.txt',
		'CAMEL_CASE.txt',
		'CAPITAL_CASE.txt',
		'CONSTANT_CASE.txt',
		'DETAILS_FILE_ME.js',
		'PASCAL_CASE.txt'
	]).renamedFiles).toStrictEqual([
		'blog1.txt',
		'blog2.txt',
		'camel-case.txt',
		'capital-case.txt',
		'constant-case.txt',
		'details-file-me.js',
		'pascal-case.txt'
	]);
});

test("Test: CONSTANT_CASE => Kebab-Case(caps)", () => {
	expect(renameFile({ dir: './', case: 'kebab-case', caps: true }, [
		'BLOG1.txt',
		'BLOG2.txt',
		'CAMEL_CASE.txt',
		'CAPITAL_CASE.txt',
		'CONSTANT_CASE.txt',
		'DETAILS_FILE_ME.js',
		'PASCAL_CASE.txt'
	]).renamedFiles).toStrictEqual([
		'Blog1.txt',
		'Blog2.txt',
		'Camel-Case.txt',
		'Capital-Case.txt',
		'Constant-Case.txt',
		'Details-File-Me.js',
		'Pascal-Case.txt'
	]);
});

test("Test: CONSTANT_CASE => PascalCase", () => {
	expect(renameFile({ dir: './', case: 'pascal-case', caps: false }, [
		'BLOG1.txt',
		'BLOG2.txt',
		'CAMEL_CASE.txt',
		'CAPITAL_CASE.txt',
		'CONSTANT_CASE.txt',
		'DETAILS_FILE_ME.js',
		'PASCAL_CASE.txt'
	]).renamedFiles).toStrictEqual([
		'Blog1.txt',
		'Blog2.txt',
		'CamelCase.txt',
		'CapitalCase.txt',
		'ConstantCase.txt',
		'DetailsFileMe.js',
		'PascalCase.txt'
	]);
});

test("Test: CONSTANT_CASE => snake_case", () => {
	expect(renameFile({ dir: './', case: 'snake-case', caps: false }, [
		'BLOG1.txt',
		'BLOG2.txt',
		'CAMEL_CASE.txt',
		'CAPITAL_CASE.txt',
		'CONSTANT_CASE.txt',
		'DETAILS_FILE_ME.js',
		'PASCAL_CASE.txt'
	]).renamedFiles).toStrictEqual([
		'blog1.txt',
		'blog2.txt',
		'camel_case.txt',
		'capital_case.txt',
		'constant_case.txt',
		'details_file_me.js',
		'pascal_case.txt'
	]);
});

test("Test: CONSTANT_CASE => Snake_Case(caps)", () => {
	expect(renameFile({ dir: './', case: 'snake-case', caps: true }, [
		'BLOG1.txt',
		'BLOG2.txt',
		'CAMEL_CASE.txt',
		'CAPITAL_CASE.txt',
		'CONSTANT_CASE.txt',
		'DETAILS_FILE_ME.js',
		'PASCAL_CASE.txt'
	]).renamedFiles).toStrictEqual([
		'Blog1.txt',
		'Blog2.txt',
		'Camel_Case.txt',
		'Capital_Case.txt',
		'Constant_Case.txt',
		'Details_File_Me.js',
		'Pascal_Case.txt'
	]);
});

test("Test: kebab-case => lower case", () => {
	expect(renameFile({ dir: './', case: 'lower-case', caps: false }, [
		'blog1.txt',
		'blog2.txt',
		'camel-case.txt',
		'capital-case.txt',
		'constant-case.txt',
		'details-file-me.js',
		'pascal-case.txt'
	]).renamedFiles).toStrictEqual([
		'blog1.txt',
		'blog2.txt',
		'camel case.txt',
		'capital case.txt',
		'constant case.txt',
		'details file me.js',
		'pascal case.txt'
	]);
});

test("Test: kebab-case => camelCase", () => {
	expect(renameFile({ dir: './', case: 'camel-case', caps: false }, [
		'blog1.txt',
		'blog2.txt',
		'camel-case.txt',
		'capital-case.txt',
		'constant-case.txt',
		'details-file-me.js',
		'pascal-case.txt'
	]).renamedFiles).toStrictEqual([
		'blog1.txt',
		'blog2.txt',
		'camelCase.txt',
		'capitalCase.txt',
		'constantCase.txt',
		'detailsFileMe.js',
		'pascalCase.txt'
	]);
});

test("Test: kebab-case => camelCase(caps)", () => {
	expect(renameFile({ dir: './', case: 'camel-case', caps: true }, [
		'blog1.txt',
		'blog2.txt',
		'camel-case.txt',
		'capital-case.txt',
		'constant-case.txt',
		'details-file-me.js',
		'pascal-case.txt'
	]).renamedFiles).toStrictEqual([
		'Blog1.txt',
		'Blog2.txt',
		'CamelCase.txt',
		'CapitalCase.txt',
		'ConstantCase.txt',
		'DetailsFileMe.js',
		'PascalCase.txt'
	]);
});

test("Test: kebab-case => Capital Case", () => {
	expect(renameFile({ dir: './', case: 'capital-case', caps: false }, [
		'blog1.txt',
		'blog2.txt',
		'camel-case.txt',
		'capital-case.txt',
		'constant-case.txt',
		'details-file-me.js',
		'pascal-case.txt'
	]).renamedFiles).toStrictEqual([
		'Blog1.txt',
		'Blog2.txt',
		'Camel Case.txt',
		'Capital Case.txt',
		'Constant Case.txt',
		'Details File Me.js',
		'Pascal Case.txt'
	]);
});

test("Test: kebab-case => CONSTANT_CASE", () => {
	expect(renameFile({ dir: './', case: 'constant-case', caps: false }, [
		'blog1.txt',
		'blog2.txt',
		'camel-case.txt',
		'capital-case.txt',
		'constant-case.txt',
		'details-file-me.js',
		'pascal-case.txt'
	]).renamedFiles).toStrictEqual([
		'BLOG1.txt',
		'BLOG2.txt',
		'CAMEL_CASE.txt',
		'CAPITAL_CASE.txt',
		'CONSTANT_CASE.txt',
		'DETAILS_FILE_ME.js',
		'PASCAL_CASE.txt'
	]);
});

test("Test: kebab-case => kebab-case", () => {
	expect(renameFile({ dir: './', case: 'kebab-case', caps: false }, [
		'blog1.txt',
		'blog2.txt',
		'camel-case.txt',
		'capital-case.txt',
		'constant-case.txt',
		'details-file-me.js',
		'pascal-case.txt'
	]).renamedFiles).toStrictEqual([
		'blog1.txt',
		'blog2.txt',
		'camel-case.txt',
		'capital-case.txt',
		'constant-case.txt',
		'details-file-me.js',
		'pascal-case.txt'
	]);
});

test("Test: kebab-case => Kebab-Case(caps)", () => {
	expect(renameFile({ dir: './', case: 'kebab-case', caps: true }, [
		'blog1.txt',
		'blog2.txt',
		'camel-case.txt',
		'capital-case.txt',
		'constant-case.txt',
		'details-file-me.js',
		'pascal-case.txt'
	]).renamedFiles).toStrictEqual([
		'Blog1.txt',
		'Blog2.txt',
		'Camel-Case.txt',
		'Capital-Case.txt',
		'Constant-Case.txt',
		'Details-File-Me.js',
		'Pascal-Case.txt'
	]);
});

test("Test: kebab-case => PascalCase", () => {
	expect(renameFile({ dir: './', case: 'pascal-case', caps: false }, [
		'blog1.txt',
		'blog2.txt',
		'camel-case.txt',
		'capital-case.txt',
		'constant-case.txt',
		'details-file-me.js',
		'pascal-case.txt'
	]).renamedFiles).toStrictEqual([
		'Blog1.txt',
		'Blog2.txt',
		'CamelCase.txt',
		'CapitalCase.txt',
		'ConstantCase.txt',
		'DetailsFileMe.js',
		'PascalCase.txt'
	]);
});

test("Test: kebab-case => snake_case", () => {
	expect(renameFile({ dir: './', case: 'snake-case', caps: false }, [
		'blog1.txt',
		'blog2.txt',
		'camel-case.txt',
		'capital-case.txt',
		'constant-case.txt',
		'details-file-me.js',
		'pascal-case.txt'
	]).renamedFiles).toStrictEqual([
		'blog1.txt',
		'blog2.txt',
		'camel_case.txt',
		'capital_case.txt',
		'constant_case.txt',
		'details_file_me.js',
		'pascal_case.txt'
	]);
});

test("Test: kebab-case => Snake_Case(caps)", () => {
	expect(renameFile({ dir: './', case: 'snake-case', caps: true }, [
		'blog1.txt',
		'blog2.txt',
		'camel-case.txt',
		'capital-case.txt',
		'constant-case.txt',
		'details-file-me.js',
		'pascal-case.txt'
	]).renamedFiles).toStrictEqual([
		'Blog1.txt',
		'Blog2.txt',
		'Camel_Case.txt',
		'Capital_Case.txt',
		'Constant_Case.txt',
		'Details_File_Me.js',
		'Pascal_Case.txt'
	]);
});

test("Test: Kebab-Case(caps) => lower case", () => {
	expect(renameFile({ dir: './', case: 'lower-case', caps: false }, [
		'Blog1.txt',
		'Blog2.txt',
		'Camel-Case.txt',
		'Capital-Case.txt',
		'Constant-Case.txt',
		'Details-File-Me.js',
		'Pascal-Case.txt'
	]).renamedFiles).toStrictEqual([
		'blog1.txt',
		'blog2.txt',
		'camel case.txt',
		'capital case.txt',
		'constant case.txt',
		'details file me.js',
		'pascal case.txt'
	]);
});

test("Test: Kebab-Case(caps) => camelCase", () => {
	expect(renameFile({ dir: './', case: 'camel-case', caps: false }, [
		'Blog1.txt',
		'Blog2.txt',
		'Camel-Case.txt',
		'Capital-Case.txt',
		'Constant-Case.txt',
		'Details-File-Me.js',
		'Pascal-Case.txt'
	]).renamedFiles).toStrictEqual([
		'blog1.txt',
		'blog2.txt',
		'camelCase.txt',
		'capitalCase.txt',
		'constantCase.txt',
		'detailsFileMe.js',
		'pascalCase.txt'
	]);
});

test("Test: Kebab-Case(caps) => camelCase(caps)", () => {
	expect(renameFile({ dir: './', case: 'camel-case', caps: true }, [
		'Blog1.txt',
		'Blog2.txt',
		'Camel-Case.txt',
		'Capital-Case.txt',
		'Constant-Case.txt',
		'Details-File-Me.js',
		'Pascal-Case.txt'
	]).renamedFiles).toStrictEqual([
		'Blog1.txt',
		'Blog2.txt',
		'CamelCase.txt',
		'CapitalCase.txt',
		'ConstantCase.txt',
		'DetailsFileMe.js',
		'PascalCase.txt'
	]);
});

test("Test: Kebab-Case(caps) => Capital Case", () => {
	expect(renameFile({ dir: './', case: 'capital-case', caps: false }, [
		'Blog1.txt',
		'Blog2.txt',
		'Camel-Case.txt',
		'Capital-Case.txt',
		'Constant-Case.txt',
		'Details-File-Me.js',
		'Pascal-Case.txt'
	]).renamedFiles).toStrictEqual([
		'Blog1.txt',
		'Blog2.txt',
		'Camel Case.txt',
		'Capital Case.txt',
		'Constant Case.txt',
		'Details File Me.js',
		'Pascal Case.txt'
	]);
});

test("Test: Kebab-Case(caps) => CONSTANT_CASE", () => {
	expect(renameFile({ dir: './', case: 'constant-case', caps: false }, [
		'Blog1.txt',
		'Blog2.txt',
		'Camel-Case.txt',
		'Capital-Case.txt',
		'Constant-Case.txt',
		'Details-File-Me.js',
		'Pascal-Case.txt'
	]).renamedFiles).toStrictEqual([
		'BLOG1.txt',
		'BLOG2.txt',
		'CAMEL_CASE.txt',
		'CAPITAL_CASE.txt',
		'CONSTANT_CASE.txt',
		'DETAILS_FILE_ME.js',
		'PASCAL_CASE.txt'
	]);
});

test("Test: Kebab-Case(caps) => kebab-case", () => {
	expect(renameFile({ dir: './', case: 'kebab-case', caps: false }, [
		'Blog1.txt',
		'Blog2.txt',
		'Camel-Case.txt',
		'Capital-Case.txt',
		'Constant-Case.txt',
		'Details-File-Me.js',
		'Pascal-Case.txt'
	]).renamedFiles).toStrictEqual([
		'blog1.txt',
		'blog2.txt',
		'camel-case.txt',
		'capital-case.txt',
		'constant-case.txt',
		'details-file-me.js',
		'pascal-case.txt'
	]);
});

test("Test: Kebab-Case(caps) => Kebab-Case(caps)", () => {
	expect(renameFile({ dir: './', case: 'kebab-case', caps: true }, [
		'Blog1.txt',
		'Blog2.txt',
		'Camel-Case.txt',
		'Capital-Case.txt',
		'Constant-Case.txt',
		'Details-File-Me.js',
		'Pascal-Case.txt'
	]).renamedFiles).toStrictEqual([
		'Blog1.txt',
		'Blog2.txt',
		'Camel-Case.txt',
		'Capital-Case.txt',
		'Constant-Case.txt',
		'Details-File-Me.js',
		'Pascal-Case.txt'
	]);
});

test("Test: Kebab-Case(caps) => PascalCase", () => {
	expect(renameFile({ dir: './', case: 'pascal-case', caps: false }, [
		'Blog1.txt',
		'Blog2.txt',
		'Camel-Case.txt',
		'Capital-Case.txt',
		'Constant-Case.txt',
		'Details-File-Me.js',
		'Pascal-Case.txt'
	]).renamedFiles).toStrictEqual([
		'Blog1.txt',
		'Blog2.txt',
		'CamelCase.txt',
		'CapitalCase.txt',
		'ConstantCase.txt',
		'DetailsFileMe.js',
		'PascalCase.txt'
	]);
});

test("Test: Kebab-Case(caps) => snake_case", () => {
	expect(renameFile({ dir: './', case: 'snake-case', caps: false }, [
		'Blog1.txt',
		'Blog2.txt',
		'Camel-Case.txt',
		'Capital-Case.txt',
		'Constant-Case.txt',
		'Details-File-Me.js',
		'Pascal-Case.txt'
	]).renamedFiles).toStrictEqual([
		'blog1.txt',
		'blog2.txt',
		'camel_case.txt',
		'capital_case.txt',
		'constant_case.txt',
		'details_file_me.js',
		'pascal_case.txt'
	]);
});

test("Test: Kebab-Case(caps) => Snake_Case(caps)", () => {
	expect(renameFile({ dir: './', case: 'snake-case', caps: true }, [
		'Blog1.txt',
		'Blog2.txt',
		'Camel-Case.txt',
		'Capital-Case.txt',
		'Constant-Case.txt',
		'Details-File-Me.js',
		'Pascal-Case.txt'
	]).renamedFiles).toStrictEqual([
		'Blog1.txt',
		'Blog2.txt',
		'Camel_Case.txt',
		'Capital_Case.txt',
		'Constant_Case.txt',
		'Details_File_Me.js',
		'Pascal_Case.txt'
	]);
});

test("Test: PascalCase => lower case", () => {
	expect(renameFile({ dir: './', case: 'lower-case', caps: false }, [
		'Blog1.txt',
		'Blog2.txt',
		'CamelCase.txt',
		'CapitalCase.txt',
		'ConstantCase.txt',
		'DetailsFileMe.js',
		'PascalCase.txt'
	]).renamedFiles).toStrictEqual([
		'blog1.txt',
		'blog2.txt',
		'camel case.txt',
		'capital case.txt',
		'constant case.txt',
		'details file me.js',
		'pascal case.txt'
	]);
});

test("Test: PascalCase => camelCase", () => {
	expect(renameFile({ dir: './', case: 'camel-case', caps: false }, [
		'Blog1.txt',
		'Blog2.txt',
		'CamelCase.txt',
		'CapitalCase.txt',
		'ConstantCase.txt',
		'DetailsFileMe.js',
		'PascalCase.txt'
	]).renamedFiles).toStrictEqual([
		'blog1.txt',
		'blog2.txt',
		'camelCase.txt',
		'capitalCase.txt',
		'constantCase.txt',
		'detailsFileMe.js',
		'pascalCase.txt'
	]);
});

test("Test: PascalCase => camelCase(caps)", () => {
	expect(renameFile({ dir: './', case: 'camel-case', caps: true }, [
		'Blog1.txt',
		'Blog2.txt',
		'CamelCase.txt',
		'CapitalCase.txt',
		'ConstantCase.txt',
		'DetailsFileMe.js',
		'PascalCase.txt'
	]).renamedFiles).toStrictEqual([
		'Blog1.txt',
		'Blog2.txt',
		'CamelCase.txt',
		'CapitalCase.txt',
		'ConstantCase.txt',
		'DetailsFileMe.js',
		'PascalCase.txt'
	]);
});

test("Test: PascalCase => Capital Case", () => {
	expect(renameFile({ dir: './', case: 'capital-case', caps: false }, [
		'Blog1.txt',
		'Blog2.txt',
		'CamelCase.txt',
		'CapitalCase.txt',
		'ConstantCase.txt',
		'DetailsFileMe.js',
		'PascalCase.txt'
	]).renamedFiles).toStrictEqual([
		'Blog1.txt',
		'Blog2.txt',
		'Camel Case.txt',
		'Capital Case.txt',
		'Constant Case.txt',
		'Details File Me.js',
		'Pascal Case.txt'
	]);
});

test("Test: PascalCase => CONSTANT_CASE", () => {
	expect(renameFile({ dir: './', case: 'constant-case', caps: false }, [
		'Blog1.txt',
		'Blog2.txt',
		'CamelCase.txt',
		'CapitalCase.txt',
		'ConstantCase.txt',
		'DetailsFileMe.js',
		'PascalCase.txt'
	]).renamedFiles).toStrictEqual([
		'BLOG1.txt',
		'BLOG2.txt',
		'CAMEL_CASE.txt',
		'CAPITAL_CASE.txt',
		'CONSTANT_CASE.txt',
		'DETAILS_FILE_ME.js',
		'PASCAL_CASE.txt'
	]);
});

test("Test: PascalCase => kebab-case", () => {
	expect(renameFile({ dir: './', case: 'kebab-case', caps: false }, [
		'Blog1.txt',
		'Blog2.txt',
		'CamelCase.txt',
		'CapitalCase.txt',
		'ConstantCase.txt',
		'DetailsFileMe.js',
		'PascalCase.txt'
	]).renamedFiles).toStrictEqual([
		'blog1.txt',
		'blog2.txt',
		'camel-case.txt',
		'capital-case.txt',
		'constant-case.txt',
		'details-file-me.js',
		'pascal-case.txt'
	]);
});

test("Test: PascalCase => Kebab-Case(caps)", () => {
	expect(renameFile({ dir: './', case: 'kebab-case', caps: true }, [
		'Blog1.txt',
		'Blog2.txt',
		'CamelCase.txt',
		'CapitalCase.txt',
		'ConstantCase.txt',
		'DetailsFileMe.js',
		'PascalCase.txt'
	]).renamedFiles).toStrictEqual([
		'Blog1.txt',
		'Blog2.txt',
		'Camel-Case.txt',
		'Capital-Case.txt',
		'Constant-Case.txt',
		'Details-File-Me.js',
		'Pascal-Case.txt'
	]);
});

test("Test: PascalCase => PascalCase", () => {
	expect(renameFile({ dir: './', case: 'pascal-case', caps: false }, [
		'Blog1.txt',
		'Blog2.txt',
		'CamelCase.txt',
		'CapitalCase.txt',
		'ConstantCase.txt',
		'DetailsFileMe.js',
		'PascalCase.txt'
	]).renamedFiles).toStrictEqual([
		'Blog1.txt',
		'Blog2.txt',
		'CamelCase.txt',
		'CapitalCase.txt',
		'ConstantCase.txt',
		'DetailsFileMe.js',
		'PascalCase.txt'
	]);
});

test("Test: PascalCase => snake_case", () => {
	expect(renameFile({ dir: './', case: 'snake-case', caps: false }, [
		'Blog1.txt',
		'Blog2.txt',
		'CamelCase.txt',
		'CapitalCase.txt',
		'ConstantCase.txt',
		'DetailsFileMe.js',
		'PascalCase.txt'
	]).renamedFiles).toStrictEqual([
		'blog1.txt',
		'blog2.txt',
		'camel_case.txt',
		'capital_case.txt',
		'constant_case.txt',
		'details_file_me.js',
		'pascal_case.txt'
	]);
});

test("Test: PascalCase => Snake_Case(caps)", () => {
	expect(renameFile({ dir: './', case: 'snake-case', caps: true }, [
		'Blog1.txt',
		'Blog2.txt',
		'CamelCase.txt',
		'CapitalCase.txt',
		'ConstantCase.txt',
		'DetailsFileMe.js',
		'PascalCase.txt'
	]).renamedFiles).toStrictEqual([
		'Blog1.txt',
		'Blog2.txt',
		'Camel_Case.txt',
		'Capital_Case.txt',
		'Constant_Case.txt',
		'Details_File_Me.js',
		'Pascal_Case.txt'
	]);
});

test("Test: snake_case => lower case", () => {
	expect(renameFile({ dir: './', case: 'lower-case', caps: false }, [
		'blog1.txt',
		'blog2.txt',
		'camel_case.txt',
		'capital_case.txt',
		'constant_case.txt',
		'details_file_me.js',
		'pascal_case.txt'
	]).renamedFiles).toStrictEqual([
		'blog1.txt',
		'blog2.txt',
		'camel case.txt',
		'capital case.txt',
		'constant case.txt',
		'details file me.js',
		'pascal case.txt'
	]);
});

test("Test: snake_case => camelCase", () => {
	expect(renameFile({ dir: './', case: 'camel-case', caps: false }, [
		'blog1.txt',
		'blog2.txt',
		'camel_case.txt',
		'capital_case.txt',
		'constant_case.txt',
		'details_file_me.js',
		'pascal_case.txt'
	]).renamedFiles).toStrictEqual([
		'blog1.txt',
		'blog2.txt',
		'camelCase.txt',
		'capitalCase.txt',
		'constantCase.txt',
		'detailsFileMe.js',
		'pascalCase.txt'
	]);
});

test("Test: snake_case => camelCase(caps)", () => {
	expect(renameFile({ dir: './', case: 'camel-case', caps: true }, [
		'blog1.txt',
		'blog2.txt',
		'camel_case.txt',
		'capital_case.txt',
		'constant_case.txt',
		'details_file_me.js',
		'pascal_case.txt'
	]).renamedFiles).toStrictEqual([
		'Blog1.txt',
		'Blog2.txt',
		'CamelCase.txt',
		'CapitalCase.txt',
		'ConstantCase.txt',
		'DetailsFileMe.js',
		'PascalCase.txt'
	]);
});

test("Test: snake_case => Capital Case", () => {
	expect(renameFile({ dir: './', case: 'capital-case', caps: false }, [
		'blog1.txt',
		'blog2.txt',
		'camel_case.txt',
		'capital_case.txt',
		'constant_case.txt',
		'details_file_me.js',
		'pascal_case.txt'
	]).renamedFiles).toStrictEqual([
		'Blog1.txt',
		'Blog2.txt',
		'Camel Case.txt',
		'Capital Case.txt',
		'Constant Case.txt',
		'Details File Me.js',
		'Pascal Case.txt'
	]);
});

test("Test: snake_case => CONSTANT_CASE", () => {
	expect(renameFile({ dir: './', case: 'constant-case', caps: false }, [
		'blog1.txt',
		'blog2.txt',
		'camel_case.txt',
		'capital_case.txt',
		'constant_case.txt',
		'details_file_me.js',
		'pascal_case.txt'
	]).renamedFiles).toStrictEqual([
		'BLOG1.txt',
		'BLOG2.txt',
		'CAMEL_CASE.txt',
		'CAPITAL_CASE.txt',
		'CONSTANT_CASE.txt',
		'DETAILS_FILE_ME.js',
		'PASCAL_CASE.txt'
	]);
});

test("Test: snake_case => kebab-case", () => {
	expect(renameFile({ dir: './', case: 'kebab-case', caps: false }, [
		'blog1.txt',
		'blog2.txt',
		'camel_case.txt',
		'capital_case.txt',
		'constant_case.txt',
		'details_file_me.js',
		'pascal_case.txt'
	]).renamedFiles).toStrictEqual([
		'blog1.txt',
		'blog2.txt',
		'camel-case.txt',
		'capital-case.txt',
		'constant-case.txt',
		'details-file-me.js',
		'pascal-case.txt'
	]);
});

test("Test: snake_case => Kebab-Case(caps)", () => {
	expect(renameFile({ dir: './', case: 'kebab-case', caps: true }, [
		'blog1.txt',
		'blog2.txt',
		'camel_case.txt',
		'capital_case.txt',
		'constant_case.txt',
		'details_file_me.js',
		'pascal_case.txt'
	]).renamedFiles).toStrictEqual([
		'Blog1.txt',
		'Blog2.txt',
		'Camel-Case.txt',
		'Capital-Case.txt',
		'Constant-Case.txt',
		'Details-File-Me.js',
		'Pascal-Case.txt'
	]);
});

test("Test: snake_case => PascalCase", () => {
	expect(renameFile({ dir: './', case: 'pascal-case', caps: false }, [
		'blog1.txt',
		'blog2.txt',
		'camel_case.txt',
		'capital_case.txt',
		'constant_case.txt',
		'details_file_me.js',
		'pascal_case.txt'
	]).renamedFiles).toStrictEqual([
		'Blog1.txt',
		'Blog2.txt',
		'CamelCase.txt',
		'CapitalCase.txt',
		'ConstantCase.txt',
		'DetailsFileMe.js',
		'PascalCase.txt'
	]);
});

test("Test: snake_case => snake_case", () => {
	expect(renameFile({ dir: './', case: 'snake-case', caps: false }, [
		'blog1.txt',
		'blog2.txt',
		'camel_case.txt',
		'capital_case.txt',
		'constant_case.txt',
		'details_file_me.js',
		'pascal_case.txt'
	]).renamedFiles).toStrictEqual([
		'blog1.txt',
		'blog2.txt',
		'camel_case.txt',
		'capital_case.txt',
		'constant_case.txt',
		'details_file_me.js',
		'pascal_case.txt'
	]);
});

test("Test: snake_case => Snake_Case(caps)", () => {
	expect(renameFile({ dir: './', case: 'snake-case', caps: true }, [
		'blog1.txt',
		'blog2.txt',
		'camel_case.txt',
		'capital_case.txt',
		'constant_case.txt',
		'details_file_me.js',
		'pascal_case.txt'
	]).renamedFiles).toStrictEqual([
		'Blog1.txt',
		'Blog2.txt',
		'Camel_Case.txt',
		'Capital_Case.txt',
		'Constant_Case.txt',
		'Details_File_Me.js',
		'Pascal_Case.txt'
	]);
});

test("Test: Snake_Case(caps) => lower case", () => {
	expect(renameFile({ dir: './', case: 'lower-case', caps: false }, [
		'Blog1.txt',
		'Blog2.txt',
		'Camel_Case.txt',
		'Capital_Case.txt',
		'Constant_Case.txt',
		'Details_File_Me.js',
		'Pascal_Case.txt'
	]).renamedFiles).toStrictEqual([
		'blog1.txt',
		'blog2.txt',
		'camel case.txt',
		'capital case.txt',
		'constant case.txt',
		'details file me.js',
		'pascal case.txt'
	]);
});

test("Test: Snake_Case(caps) => camelCase", () => {
	expect(renameFile({ dir: './', case: 'camel-case', caps: false }, [
		'Blog1.txt',
		'Blog2.txt',
		'Camel_Case.txt',
		'Capital_Case.txt',
		'Constant_Case.txt',
		'Details_File_Me.js',
		'Pascal_Case.txt'
	]).renamedFiles).toStrictEqual([
		'blog1.txt',
		'blog2.txt',
		'camelCase.txt',
		'capitalCase.txt',
		'constantCase.txt',
		'detailsFileMe.js',
		'pascalCase.txt'
	]);
});

test("Test: Snake_Case(caps) => camelCase(caps)", () => {
	expect(renameFile({ dir: './', case: 'camel-case', caps: true }, [
		'Blog1.txt',
		'Blog2.txt',
		'Camel_Case.txt',
		'Capital_Case.txt',
		'Constant_Case.txt',
		'Details_File_Me.js',
		'Pascal_Case.txt'
	]).renamedFiles).toStrictEqual([
		'Blog1.txt',
		'Blog2.txt',
		'CamelCase.txt',
		'CapitalCase.txt',
		'ConstantCase.txt',
		'DetailsFileMe.js',
		'PascalCase.txt'
	]);
});

test("Test: Snake_Case(caps) => Capital Case", () => {
	expect(renameFile({ dir: './', case: 'capital-case', caps: false }, [
		'Blog1.txt',
		'Blog2.txt',
		'Camel_Case.txt',
		'Capital_Case.txt',
		'Constant_Case.txt',
		'Details_File_Me.js',
		'Pascal_Case.txt'
	]).renamedFiles).toStrictEqual([
		'Blog1.txt',
		'Blog2.txt',
		'Camel Case.txt',
		'Capital Case.txt',
		'Constant Case.txt',
		'Details File Me.js',
		'Pascal Case.txt'
	]);
});

test("Test: Snake_Case(caps) => CONSTANT_CASE", () => {
	expect(renameFile({ dir: './', case: 'constant-case', caps: false }, [
		'Blog1.txt',
		'Blog2.txt',
		'Camel_Case.txt',
		'Capital_Case.txt',
		'Constant_Case.txt',
		'Details_File_Me.js',
		'Pascal_Case.txt'
	]).renamedFiles).toStrictEqual([
		'BLOG1.txt',
		'BLOG2.txt',
		'CAMEL_CASE.txt',
		'CAPITAL_CASE.txt',
		'CONSTANT_CASE.txt',
		'DETAILS_FILE_ME.js',
		'PASCAL_CASE.txt'
	]);
});

test("Test: Snake_Case(caps) => kebab-case", () => {
	expect(renameFile({ dir: './', case: 'kebab-case', caps: false }, [
		'Blog1.txt',
		'Blog2.txt',
		'Camel_Case.txt',
		'Capital_Case.txt',
		'Constant_Case.txt',
		'Details_File_Me.js',
		'Pascal_Case.txt'
	]).renamedFiles).toStrictEqual([
		'blog1.txt',
		'blog2.txt',
		'camel-case.txt',
		'capital-case.txt',
		'constant-case.txt',
		'details-file-me.js',
		'pascal-case.txt'
	]);
});

test("Test: Snake_Case(caps) => Kebab-Case(caps)", () => {
	expect(renameFile({ dir: './', case: 'kebab-case', caps: true }, [
		'Blog1.txt',
		'Blog2.txt',
		'Camel_Case.txt',
		'Capital_Case.txt',
		'Constant_Case.txt',
		'Details_File_Me.js',
		'Pascal_Case.txt'
	]).renamedFiles).toStrictEqual([
		'Blog1.txt',
		'Blog2.txt',
		'Camel-Case.txt',
		'Capital-Case.txt',
		'Constant-Case.txt',
		'Details-File-Me.js',
		'Pascal-Case.txt'
	]);
});

test("Test: Snake_Case(caps) => PascalCase", () => {
	expect(renameFile({ dir: './', case: 'pascal-case', caps: false }, [
		'Blog1.txt',
		'Blog2.txt',
		'Camel_Case.txt',
		'Capital_Case.txt',
		'Constant_Case.txt',
		'Details_File_Me.js',
		'Pascal_Case.txt'
	]).renamedFiles).toStrictEqual([
		'Blog1.txt',
		'Blog2.txt',
		'CamelCase.txt',
		'CapitalCase.txt',
		'ConstantCase.txt',
		'DetailsFileMe.js',
		'PascalCase.txt'
	]);
});

test("Test: Snake_Case(caps) => snake_case", () => {
	expect(renameFile({ dir: './', case: 'snake-case', caps: false }, [
		'Blog1.txt',
		'Blog2.txt',
		'Camel_Case.txt',
		'Capital_Case.txt',
		'Constant_Case.txt',
		'Details_File_Me.js',
		'Pascal_Case.txt'
	]).renamedFiles).toStrictEqual([
		'blog1.txt',
		'blog2.txt',
		'camel_case.txt',
		'capital_case.txt',
		'constant_case.txt',
		'details_file_me.js',
		'pascal_case.txt'
	]);
});

test("Test: Snake_Case(caps) => Snake_Case(caps)", () => {
	expect(renameFile({ dir: './', case: 'snake-case', caps: true }, [
		'Blog1.txt',
		'Blog2.txt',
		'Camel_Case.txt',
		'Capital_Case.txt',
		'Constant_Case.txt',
		'Details_File_Me.js',
		'Pascal_Case.txt'
	]).renamedFiles).toStrictEqual([
		'Blog1.txt',
		'Blog2.txt',
		'Camel_Case.txt',
		'Capital_Case.txt',
		'Constant_Case.txt',
		'Details_File_Me.js',
		'Pascal_Case.txt'
	]);
});
