const { MessageEmbed } = require("discord.js")

module.exports = (prefix) => {
    let embed = new MessageEmbed()
        .setColor("#eec4c6")
        .setTitle("Members ")
        .setDescription("Members category some utility and funny commands and make the server more happy ")
        .setTimestamp()
    return embed;
}