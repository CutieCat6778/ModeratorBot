const f = require('../tools/string/mentions');

test("Function test does a string is a mentions format from Discord", () => {
    expect(f('<@12343567>')).toBe('12343567');
    expect(f('a;sdlfj')).toBe(undefined);
})