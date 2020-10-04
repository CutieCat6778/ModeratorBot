const mongoose = require("mongoose");

const guildSchema = mongoose.Schema({
    guildId: String,
    autorole: {
        "roleId":String, "enable":Boolean
    },
    wellcome: {
        "channelId": String, "enable":Boolean
    },
    warn: [
        {"userId": String, "time": Number, "reason":String}
    ],
    logs: {
        "channelId": String, "enable":Boolean
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
    }
})

module.exports = mongoose.model("Guild", guildSchema);