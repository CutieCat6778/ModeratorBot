const { MessageEmbed } = require("discord.js")

module.exports = function welcomelogs(channelName, logsStatus) {
    let embed = new MessageEmbed()
        .setColor("#40598F")
        .setTitle("Updated logger")
        .addField("Log channel", `${channelName}`)
        .addField("Status", logsStatus)
        .setTimestamp()
    return embed;
}