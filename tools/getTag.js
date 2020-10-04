const Tag = require("../models/tags")

module.exports = async (value) => {
    const tag = await Tag.findOne({key: value})
    if(!tag || tag.length == 0){
        return undefined;
    }else if(tag){
        return tag;
    }
}