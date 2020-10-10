const { MessageEmbed } = require("discord.js")

module.exports = function help(prefix) {
    let embed = new MessageEmbed()
        .setColor("#eec4c6")
        .setTitle("Management ")
        .setDescription("Dashboard category will help you to control Shinoneko better and view your server's status")
        .setTimestamp()
    return embed;
}