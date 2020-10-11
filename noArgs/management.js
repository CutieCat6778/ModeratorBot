const { MessageEmbed } = require("discord.js")

module.exports = function help(prefix) {
    let embed = new MessageEmbed()
        .setColor("#669fd2")
        .setTitle("Management ")
        .setDescription("It includes many helpfull commands. It will help you to manage your server better")
        .setTimestamp()
    return embed;
}