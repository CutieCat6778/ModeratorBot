const { MessageEmbed } = require("discord.js")

module.exports = function wellcomelogs(autorole) {
    let embed = new MessageEmbed()
        .setColor("#eec4c6")
        .setTitle("Capcha")
        .addField("Status", autorole.enable)
        .setTimestamp()
    return embed;
}