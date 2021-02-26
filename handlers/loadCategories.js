const category = require('../asset/useFullObject/categories');

module.exports = (client) => {
    try {
        const aliases = {};
        for (let a in category) {
            aliases[a] = a;
            if (category.hasOwnProperty(a)) {
                let value = category[a];
                value.map(b => aliases[b] = a)
            }
        }
        client.category = aliases;
        console.log('--- All categories has been loaded ---')
        return true;
    } catch (e) {
        return require('../tools/function/error')(e)
    }
}