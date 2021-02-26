const { MessageEmbed } = require("discord.js")

module.exports = function help(prefix) {
    let embed = new MessageEmbed()
        .setColor("#40598F")
        .setTitle("Informations")
        .setDescription("It will show you informations about something that you need for!")
        .setTimestamp()
    return embed;
}