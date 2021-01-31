const { MessageEmbed } = require("discord.js")

module.exports = function welcomelogs(channel, welcome) {
    let embed = new MessageEmbed()
        .setColor("#40598F")
        .setTitle("Updated welcome messages")
        .addField("Channel name", `${channel.name}`)
        .addField("Status", welcome.enable)
        .setTimestamp()
    return embed
}