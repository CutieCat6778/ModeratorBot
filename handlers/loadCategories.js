const category = require('../asset/useFullObject/categories');

module.exports = (client) => {
    try {
        for (let a in category) {
            client.category.set(a, a)
            if (category.hasOwnProperty(a)) {
                let value = category[a];
                value.map(b => client.category.get(b) ? null : client.category.set(b, a))
            }
        }
        console.log('--- All categories has been loaded ---')
        return true;
    } catch (e) {
        return require('../tools/function/error')(e)
    }
}