const { MessageEmbed } = require("discord.js")

module.exports = function wellcomelogs(channel, logs) {
    let embed = new MessageEmbed()
        .setColor("#669fd2")
        .setTitle("Logging")
        .addField("Log channel", `${channel.name}`)
        .addField("Status", logs.enable)
        .setTimestamp()
    return embed;
}