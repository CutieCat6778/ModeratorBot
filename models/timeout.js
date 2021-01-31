const mongoose = require("mongoose");

const guildSchema = mongoose.Schema({
    type: String,
    obj: {
        author: String,
        message: String,
        args: [String]
    },
    from: String,
    to: String,
    function: String
})

module.exports = mongoose.model("Timeout", guildSchema);