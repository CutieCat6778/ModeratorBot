const category = require('../../asset/useFullObject/categories');

module.exports = (value) => {
    const aliases = {};
    for(let a in category) {
        if(category.hasOwnProperty(a)) {
            let value = category[a];
            value.map(b => aliases[b] = a)
        }
    }
    console.log(aliases)
    return aliases[value] ? aliases[value] : undefined;
}