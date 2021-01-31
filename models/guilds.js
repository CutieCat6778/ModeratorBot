const mongoose = require("mongoose");

const guildSchema = mongoose.Schema({
    _id: String,
    moderators: [String],
    channels: [{
        "name": String, "id": String
    }],
    roles: [{
        "name": String, "id": String
    }],
    autorole: {
        "_id": String, "enable": Boolean
    },
    welcome: {
        "_id": String, "enable": Boolean, "join": {
            "text": String, "default": Boolean
        }, "leave": {
            "text": String, "default": Boolean
        }
    },
    warn: [
        { "userId": String, "time": Number, "reason": String }
    ],
    logs: {
        "id": String, "enable": Boolean, "token": String, "_id": String
    },
    prefix: String,
    case: [
        { name: String, num: Number, reason: String, author: String, target: String, time: String }
    ],
    captcha: {
        "channels": [String], "enable": Boolean
    },
    textfilter: { "enable": Boolean, 
        "badwords":{
            "whitelist": [String], "blacklist": [String], "enable": Boolean
        }, "links":Boolean, "cap": Boolean
    },
    rules: {
        "enable": Boolean, "_id": String, "messageId": String, "rulesArr": [
            { "ruleNum": Number, "ruleContent": String }
        ]
    }
})

module.exports = mongoose.model("Guild", guildSchema);