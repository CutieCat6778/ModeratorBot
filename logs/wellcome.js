const { MessageEmbed } = require("discord.js")

module.exports = function wellcomelogs(channel, wellcome) {
    let embed = new MessageEmbed()
        .setColor("#eec4c6")
        .setTitle("Wellcome")
        .addField("Channel name", `${channel.name}`)
        .addField("Status", wellcome.enable)
        .setTimestamp()
    return embed
}