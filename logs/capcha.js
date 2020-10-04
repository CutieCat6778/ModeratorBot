const { MessageEmbed } = require("discord.js")

module.exports = function wellcomelogs(autorole) {
    let embed = new MessageEmbed()
        .setColor("#a1ee33")
        .setTitle("Capcha")
        .addField("Status", autorole.enable)
        .setTimestamp()
    return embed;
}