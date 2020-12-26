const byteConverter = require('../tools/byteConverter');

test('Just convert a byte to a number that we can read', () => {
    expect(byteConverter('2347832')).toBe("2.2 MB")
})