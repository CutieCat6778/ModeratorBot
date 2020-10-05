const { MessageEmbed } = require("discord.js")

module.exports = function wellcomelogs(channel, logs) {
    let embed = new MessageEmbed()
        .setColor("#eec4c6")
        .setTitle("Logging")
        .addField("Log channel", `${channel.name}`)
        .addField("Status", logs.enable)
        .setTimestamp()
    return embed;
}