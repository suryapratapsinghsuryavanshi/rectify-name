const { test, expect } = require("@jest/globals");
const { ignoreFiles, getFileName, renameFile } = require("./../index");

test("Test: ignoreFiles", () => {
    expect(ignoreFiles("package.json")).toBe(true);
});

test("Test: getFileName", () => {
    expect(getFileName("test.js")).toEqual(["test", "js"]);
});

test("Test: lower case", () => {
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
			'blog-1.txt',
			'blog_2.txt',
			'camelcase.txt',
			'capital case.txt',
			'constant_case.txt',
			'details file me.js',
			'pascalcase.txt'
		]
	});
});

test("Test: camelCae", () => {
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

test("Test: CamelCase(caps)", () => {
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

test("Test: Capital Case", () => {
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

test("Test: CONSTENT_CASE", () => {
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

test("Test: kebab-case", () => {
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

test("Test: Kebab-Case(caps)", () => {
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

test("Test: PascalCase", () => {
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

test("Test: snake_case", () => {
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

test("Test: Snake_Case(caps)", () => {
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
