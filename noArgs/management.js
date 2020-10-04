const { MessageEmbed } = require("discord.js")

module.exports = function help(prefix) {
    let embed = new MessageEmbed()
        .setColor("#eec4c6")
        .setTitle("Management ")
        .setDescription("It includes many helpfull commands. It will help you to manage your server better")
        .setTimestamp()
    return embed;
}