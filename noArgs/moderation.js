const { MessageEmbed } = require("discord.js")

module.exports = function help(prefix) {
    let embed = new MessageEmbed()
        .setColor("#40598F")
        .setTitle("Moderation ")
        .setDescription("This category includes many moderations commands and protect you from raids")
        .setTimestamp()
    return embed;
}