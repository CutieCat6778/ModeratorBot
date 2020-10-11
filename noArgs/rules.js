const { MessageEmbed } = require("discord.js")

module.exports = function help(prefix) {
    let embed = new MessageEmbed()
        .setColor("#669fd2")
        .setTitle("Rules ")
        .setDescription("This category will help your server members understand the rules much better")
        .setTimestamp()
    return embed;
}