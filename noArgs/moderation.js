const { MessageEmbed } = require("discord.js")

module.exports = (prefix) => {
    let embed = new MessageEmbed()
        .setColor("#5780cd")
        .setTitle("Moderation ")
        .setDescription("This category includes many moderations commands and protect you from raids")
        .setTimestamp()
    return embed;
}