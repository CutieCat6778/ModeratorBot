const f = require('../tools/isUpperCase');

test("Check does a string contain a lot of Upper Cases", () => {
    expect(f('WASSUP BROS BROOOo')).toBe(true);
    expect(f('Wassup Bros, How are you?')).toBe(false);
})