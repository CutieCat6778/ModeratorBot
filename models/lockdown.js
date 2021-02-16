const mongoose = require("mongoose");

const guildSchema = mongoose.Schema({
    _id: String,
    lock: Boolean,
    arr: [{
        id: String,
        deny: Number,
        allow: Number
    }]
})

module.exports = mongoose.model("Lockdown", guildSchema);