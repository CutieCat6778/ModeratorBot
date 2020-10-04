const mongoose = require("mongoose");

const guildSchema = mongoose.Schema({
    userId: String,
    key: String,
    date: Date,
    text: String
})

module.exports = mongoose.model("Tag", guildSchema);