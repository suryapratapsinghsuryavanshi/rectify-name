const { getAllFileName } = require("../index");

test('Test: getAllFileName', () => {
    expect(getAllFileName()).toBe("dev");
});
