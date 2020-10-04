const { MessageEmbed } = require("discord.js")

module.exports = function help(prefix) {
    let embed = new MessageEmbed()
        .setColor("#eec4c6")
        .setTitle("Moderation ")
        .setDescription("This category includes many moderations commands and protect you from raids")
        .setTimestamp()
    return embed;
}