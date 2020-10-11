const { MessageEmbed } = require("discord.js")

module.exports = function help(prefix) {
    let embed = new MessageEmbed()
        .setColor("#669fd2")
        .setTitle("Moderation ")
        .setDescription("This category includes many moderations commands and protect you from raids")
        .setTimestamp()
    return embed;
}