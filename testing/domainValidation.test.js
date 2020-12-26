const f = require('../tools/domainValidation');

test("Check does a string is an domain", () => {
    expect(f('google.com')).toBe(true);
    expect(f('googlecom')).toBe(false);
})