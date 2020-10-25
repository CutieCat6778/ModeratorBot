const { MessageEmbed } = require("discord.js")

module.exports = function help(prefix) {
    let embed = new MessageEmbed()
        .setColor("#669fd2")
        .setTitle("Leveling system ")
        .setDescription("It helps you to know, who is talk the most in your server and it will make members in your server talk more often")
        .setTimestamp()
    return embed;
}