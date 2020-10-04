const { MessageEmbed } = require("discord.js")

module.exports = function help(prefix) {
    let embed = new MessageEmbed()
                .setColor("#eec4c6")

        .setTitle("Application programming interface(API)")
        .setDescription("The API category will help you get a correct and importain data about something")
        .setTimestamp()
    return embed;
}