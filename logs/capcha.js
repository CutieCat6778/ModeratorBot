const { MessageEmbed } = require("discord.js")

module.exports = function wellcomelogs(capcha) {
    let embed = new MessageEmbed()
        .setColor("#40598F")
        .setTitle("Updated captcha")
        .addField("Status", capcha.enable)
        .addField("Ignored channel ID", capcha.channels)
        .setTimestamp()
    return embed;
}