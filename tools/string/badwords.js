const badwords = require("../../asset/useFullArrays/badwords");
let a = false;
module.exports = function bad(message, data) {
    for(let b of badwords){
        if((message.includes(b) && !data?.whitelist?.includes(b)) || data?.blacklist?.includes(b)){
            a = true;
        }
    }
    return a;
}