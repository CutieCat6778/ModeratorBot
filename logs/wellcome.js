const { MessageEmbed } = require("discord.js")

module.exports = function wellcomelogs(channel, wellcome) {
    let embed = new MessageEmbed()
        .setColor("#40598F")
        .setTitle("Updated welcome messages")
        .addField("Channel name", `${channel.name}`)
        .addField("Status", wellcome.enable)
        .setTimestamp()
    return embed
}