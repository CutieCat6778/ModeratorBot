const { MessageEmbed } = require("discord.js")

module.exports = function welcomelogs(captcha) {
    let embed = new MessageEmbed()
        .setColor("#40598F")
        .setTitle("Updated captcha")
        .addField("Status", captcha.enable)
        .addField("Ignored channel ID", captcha.channels)
        .setTimestamp()
    return embed;
}