const { MessageEmbed } = require("discord.js")

module.exports = function help(prefix) {
    let embed = new MessageEmbed()
        .setColor("#40598F")
        .setTitle("Rules ")
        .setDescription("This category will help your server members understand the rules much better")
        .setTimestamp()
    return embed;
}