const { MessageEmbed } = require("discord.js")

module.exports = function wellcomelogs(channelName, logsStatus) {
    let embed = new MessageEmbed()
        .setColor("#40598F")
        .setTitle("Logger")
        .addField("Log channel", `${channelName}`)
        .addField("Status", logsStatus)
        .setTimestamp()
    return embed;
}