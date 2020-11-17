const { MessageEmbed } = require("discord.js")

module.exports = function help(prefix) {
    let embed = new MessageEmbed()
        .setColor("#40598F")
        .setTitle("Role management ")
        .setDescription("It includes many helpfull commands. It will help you to manage your server's roles better.")
        .setTimestamp()
    return embed;
}