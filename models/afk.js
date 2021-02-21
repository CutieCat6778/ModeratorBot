const mongoose = require("mongoose");

const guildSchema = mongoose.Schema({
    _id: String,
    status: String,
    enable: Boolean,
    time: String,
    name: Boolean,
    guildId: String
})

module.exports = mongoose.model("Afk", guildSchema);