const badwords = require("../../asset/useFullArrays/badwords");
let a;
module.exports = function bad(message, guildCache) {
    message.toLowerCase().split(" ").forEach(word => {
        if(badwords.includes(word) && !guildCache.textfilter.badwords.whitelist.includes(word) || guildCache.textfilter.badwords.blacklist.includes(word)){
            a = true;
        }else {
            a = false;
        }
    })
    return a;
}