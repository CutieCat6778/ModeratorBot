const { MessageEmbed } = require("discord.js")

module.exports = (prefix) => {
    let embed = new MessageEmbed()
        .setColor("#5780cd")
        .setTitle("Management ")
        .setDescription("It includes many helpfull commands. It will help you to manage your server better")
        .setTimestamp()
    return embed;
}