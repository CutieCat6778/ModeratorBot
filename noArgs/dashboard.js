const { MessageEmbed } = require("discord.js")

module.exports = function help(prefix) {
    let embed = new MessageEmbed()
        .setColor("#eec4c6")
        .setTitle("Management ")
        .setDescription("Dashboard category will help you to control process.env.name better and view your server's status")
        .setTimestamp()
    return embed;
}