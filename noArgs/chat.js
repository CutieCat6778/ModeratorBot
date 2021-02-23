const { MessageEmbed } = require("discord.js")

module.exports = function help(prefix) {
    let embed = new MessageEmbed()
        .setColor("#40598F")
        .setTitle("Chat commands")
        .setDescription("Just some Utility commands that will convert a Text to something fun!")
        .setTimestamp()
    return embed;
}