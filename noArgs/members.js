const { MessageEmbed } = require("discord.js")

module.exports = function help(prefix) {
    let embed = new MessageEmbed()
                .setColor("#669fd2")

        .setTitle("Members ")
        .setDescription("Members category some utility and funny commands and make the server more happy ")
        .setTimestamp()
    return embed;
}