const { test, expect } = require("@jest/globals");
const { ignoreFiles, getFileName } = require("../index");

test("Test: ignoreFiles", () => {
    expect(ignoreFiles("package.json")).toBe(true);
});

test("Test: getFileName", () => {
    expect(getFileName("test.js")).toEqual(["test", "js"]);
});
