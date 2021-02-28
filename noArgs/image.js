const { MessageEmbed } = require("discord.js")

module.exports = function help(prefix) {
    let embed = new MessageEmbed()
        .setColor("#40598F")
        .setTitle("Images")
        .setDescription("It is a new category that includes many images converter tools")
        .setTimestamp()
    return embed;
}