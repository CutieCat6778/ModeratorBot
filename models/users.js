const mongoose = require("mongoose");

const guildSchema = mongoose.Schema({
    id: String,
    password: String,
    username: String
})

module.exports = mongoose.model("users", guildSchema);