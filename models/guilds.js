const mongoose = require("mongoose");

const guildSchema = mongoose.Schema({
    guildId: String,
    moderators: Array,
    channels: [{
        "name": String, "id": String
    }],
    roles: [{
        "name": String, "id": String
    }],
    autorole: {
        "roleId":String, "enable":Boolean
    },
    wellcome: {
        "channelId": String, "enable":Boolean, "join":{
            "text": String, "default": Boolean
        },"leave":{
            "text": String, "default": Boolean
        }
    },
    warn: [
        {"userId": String, "time": Number, "reason":String}
    ],
    logs: {
        "id": String, "enable":Boolean, "token": String
    },
    prefix: String,
    case: [
        {name:String, num: Number, reason: String, author: String, target: String, time: String}
    ],
    capcha: {
        "channels": Array, "enable":Boolean
    },
    textfilter: {
        "enable":Boolean, "whitelist":Array
    },
    rules: {"enable": Boolean, "channelId": String, "messageId": String, "rulesArr":[
        {"ruleNum": Number, "ruleContent": String}
    ]}
})

module.exports = mongoose.model("Guild", guildSchema);