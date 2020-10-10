const mongoose = require("mongoose");

const guildSchema = mongoose.Schema({
    id: String,
    password: String,
    username: String,
    guildId: Array,
    lastUdpate: Date
})

module.exports = mongoose.model("users", guildSchema);